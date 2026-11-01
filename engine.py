"""
Game engine logic for the commuter simulation prototype.
Handles the state loop, resource calculations, event rolls, and win/loss conditions.
"""

import os
import sys
import copy
import random
import math
from typing import Optional, List
from models import (
    Character,
    TransitOption,
    RandomEvent,
    EVENT_PROBABILITY,
    DEFAULT_CHARACTERS,
    DEFAULT_TRANSIT_OPTIONS,
    DEFAULT_WEATHER_CONDITIONS,
    DEFAULT_RANDOM_EVENTS,
)


class GameEngine:
    DEFAULT_TOTAL_DISTANCE_KM = 20.0

    def __init__(self, total_distance: float = DEFAULT_TOTAL_DISTANCE_KM):
        self.total_distance = total_distance
        self.distance_left = total_distance
        self.player: Optional[Character] = None
        self.weather = DEFAULT_WEATHER_CONDITIONS[0]
        self.turn = 1
        self.last_event_msg: str = ""
        self.usage_counts: dict = {k: 0 for k in DEFAULT_TRANSIT_OPTIONS}
        self.disabled_modes: List[str] = []
        self.rolled_km: dict = {}

    def clear(self):
        """Clears console if interactive."""
        if sys.stdin.isatty():
            os.system('cls' if os.name == 'nt' else 'clear')

    def select_character(self) -> Character:
        """Prompts user to select from available characters."""
        while True:
            self.clear()
            print("=========================================")
            print("       COMMUTER GAME PROTOTYPE           ")
            print("=========================================\n")
            print("Select Character:")
            for key, char in DEFAULT_CHARACTERS.items():
                disc_text = "Yes (20%)" if char.discount_eligible else "No"
                print(f"[{key}] {char.name}")
                print(f"    Money: ₱{char.money:.2f} | Energy: {char.energy}/{char.max_energy} | Discount: {disc_text}\n")

            choice = input("\nEnter choice: ").strip()
            if choice in DEFAULT_CHARACTERS:
                selected = copy.deepcopy(DEFAULT_CHARACTERS[choice])
                return selected
            else:
                print("Invalid choice. Please select a valid character.")
                if sys.stdin.isatty():
                    input("Press Enter to retry...")

    def display_hud(self):
        """Displays player status and journey progress."""
        #self.clear()
        print("--------------------------------------------------")
        print(f"Character: {self.player.name} | Weather: {self.weather['name']}")
        print(f"Money: ₱{self.player.money:.2f} | Energy: {self.player.energy}/{self.player.max_energy}")
        traveled = self.total_distance - self.distance_left
        print(f"Distance: {traveled:.1f} / {self.total_distance:.1f} km ({self.distance_left:.1f} km remaining)")
        print("--------------------------------------------------")
        if self.last_event_msg:
            print(f"Event: {self.last_event_msg}\n")
            self.last_event_msg = ""

    def get_available_options(self) -> List[TransitOption]:
        """Returns the list of viable transit options for the current node."""
        km_left = int(self.distance_left)
        self.rolled_km = {
            "motor": random.randint(1, km_left),
            "car": random.randint(1, km_left),
        }
        candidates: List[TransitOption] = []
        candidates.append(DEFAULT_TRANSIT_OPTIONS["walk"])
        candidates.append(DEFAULT_TRANSIT_OPTIONS["jeep"])
        
        if self.distance_left > 2.0:
            candidates.append(DEFAULT_TRANSIT_OPTIONS["car"])
        if self.distance_left > 6.0:
            candidates.append(DEFAULT_TRANSIT_OPTIONS["train"])
        if self.distance_left <= 4.0:
            candidates.append(DEFAULT_TRANSIT_OPTIONS["tricycle"])

        if self.weather["name"] != "Rainy":
            candidates.append(DEFAULT_TRANSIT_OPTIONS["motor"])

        # Filter out options that reached max usage limits or are temporarily disabled by events
        options: List[TransitOption] = []
        for opt in candidates:
            # Check maximum usage limit
            if opt.max_uses is not None and self.usage_counts.get(opt.key, 0) >= opt.max_uses:
                continue
            # Check temporary event disable
            if opt.key in self.disabled_modes:
                continue
            options.append(opt)

        # Fallback: Walking is always available so the player is never trapped with 0 options
        if not options:
            options.append(DEFAULT_TRANSIT_OPTIONS["walk"])

        return options

    def roll_random_event(self, chosen_mode: TransitOption):
        """Random encounter roll (gacha check)."""
        if random.random() < EVENT_PROBABILITY:
            matching = [e for e in DEFAULT_RANDOM_EVENTS if not e.applicable_modes or chosen_mode.key in e.applicable_modes]
            if matching:
                event = random.choice(matching)
                print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                print(f"[Random Event: {event.name}]")
                print(f"{event.description}")

                if event.energy_mod != 0:
                    self.player.energy = max(0, min(self.player.max_energy, self.player.energy + event.energy_mod))
                    print(f"Energy change: {event.energy_mod:+d}")

                if event.money_mod != 0:
                    self.player.money = max(0.0, self.player.money + event.money_mod)
                    print(f"Money change: ₱{event.money_mod:+.2f}")

                if event.distance_mod != 0:
                    self.distance_left = max(0.0, self.distance_left - event.distance_mod)
                    print(f"Distance change: {event.distance_mod:+.1f} km")

                if event.disabled_modes:
                    self.disabled_modes.extend(event.disabled_modes)
                    names = [DEFAULT_TRANSIT_OPTIONS[k].name for k in event.disabled_modes if k in DEFAULT_TRANSIT_OPTIONS]
                    print(f"Temporarily disabled for next turn: {', '.join(names)}")

                self.last_event_msg = f"{event.name} ({event.energy_mod:+d} energy, ₱{event.money_mod:+.2f})"
                print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                if sys.stdin.isatty():
                    input("\nPress Enter to continue...")

    def execute_turn(self):
        """Processes one movement segment."""
        self.display_hud()
        options = self.get_available_options()

        print(f"Segment #{self.turn} - Choose Mode of Transportation:\n")
        for idx, opt in enumerate(options, 1):
            effective_km = self.rolled_km.get(opt.key, min(opt.distance_km, self.distance_left))
            cost = opt.calculate_cost(effective_km, self.player.discount_eligible)

            drain = opt.energy_drain
            if self.player.pwd_penalty and opt.key in ["walk", "jeep"]:
                drain += 8
            drain = int(drain * self.weather["drain_mult"])

            affordable = self.player.money >= cost
            cost_label = f"₱{cost:.2f}" if affordable else f"₱{cost:.2f} (Cannot Afford)"

            # Show remaining uses if limited
            if opt.max_uses is not None:
                remaining_uses = max(0, opt.max_uses - self.usage_counts.get(opt.key, 0))
                limit_label = f" [Uses left: {remaining_uses}/{opt.max_uses}]"
            else:
                limit_label = ""

            print(f"[{idx}] {opt.name}{limit_label}")
            print(f"    Distance: +{effective_km:.1f} km | Cost: -{cost_label} | Energy: -{drain}\n")

        while True:
            choice = input(f"\nEnter choice (1-{len(options)}): ").strip()
            if choice.isdigit() and 1 <= int(choice) <= len(options):
                selected_opt = options[int(choice) - 1]
                effective_km = self.rolled_km.get(selected_opt.key, min(selected_opt.distance_km, self.distance_left))
                cost = selected_opt.calculate_cost(effective_km, self.player.discount_eligible)

                if self.player.money < cost:
                    print("Cannot afford this option. Choose another.")
                    continue

                drain = selected_opt.energy_drain
                if self.player.pwd_penalty and selected_opt.key in ["walk", "jeep"]:
                    drain += 8
                drain = int(drain * self.weather["drain_mult"])

                # Apply deductions
                self.player.money -= cost
                self.player.energy = max(0, self.player.energy - drain)
                self.distance_left = max(0.0, self.distance_left - effective_km)
                self.usage_counts[selected_opt.key] = self.usage_counts.get(selected_opt.key, 0) + 1

                print(f"\nSelected: {selected_opt.name}")
                print(f"Deducted: -₱{cost:.2f} | -{drain} Energy")
                print(f"Traveled: +{effective_km:.1f} km\n")

                # Clear previous turn's temporary restrictions before rolling new events
                self.disabled_modes = []
                if self.distance_left > 0.0:
                    self.roll_random_event(selected_opt)
                self.turn += 1
                break
            else:
                print(f"Invalid input. Please enter a number between 1 and {len(options)}.")

    def check_outcome(self) -> Optional[str]:
        """Checks for win, burnout, or stranded states."""
        if self.distance_left <= 0.0:
            return "WIN"
        if self.player.energy <= 0:
            return "BURNOUT"

        # Check if player has no affordable transit and insufficient energy to walk
        walk_opt = DEFAULT_TRANSIT_OPTIONS["walk"]
        walk_legs = math.ceil(self.distance_left / walk_opt.distance_km)
        walk_drain_rate = walk_opt.energy_drain
        if self.player.pwd_penalty and walk_opt.key in ["walk", "jeep"]:
            walk_drain_rate += 8
        walk_drain_rate = int(walk_drain_rate * self.weather["drain_mult"])

        walk_drain_needed = (walk_legs - 1) * walk_drain_rate

        min_fare = min(
            opt.calculate_cost(1.0, self.player.discount_eligible)
            for opt in self.get_available_options() if opt.key != "walk"
        )

        if self.player.money < min_fare and self.player.energy <= walk_drain_needed:
            return "STRANDED"

        return None

    def display_outcome(self, outcome: str):
        """Displays simple, generic outcome message."""
        # self.clear()
        print("=========================================")
        if outcome == "WIN":
            print("           DESTINATION REACHED           ")
            print("=========================================\n")
            print("You have reached your destination.")
            print(f"Remaining Money: ₱{self.player.money:.2f}")
            print(f"Remaining Energy: {self.player.energy}/{self.player.max_energy}")
            print(f"Total Segments: {self.turn - 1}\n")
        elif outcome == "BURNOUT":
            print("               BURNOUT                 ")
            print("=========================================\n")
            print("Energy depleted (0 energy). You are too tired.")
            print(f"Distance remaining: {self.distance_left:.1f} km\n")
        elif outcome == "STRANDED":
            print("               STRANDED                 ")
            print("=========================================\n")
            print("Not enough energy and money to reach the destination.")
            print(f"Remaining Money: ₱{self.player.money:.2f}")
            print(f"Remaining Energy: {self.player.energy}/{self.player.max_energy}")
            print(f"Distance remaining: {self.distance_left:.1f} km\n")

        if sys.stdin.isatty():
            input("Press Enter to continue...")

    def start(self):
        """Main game loop."""
        while True:
            self.player = self.select_character()
            self.distance_left = self.total_distance
            self.weather = random.choice(DEFAULT_WEATHER_CONDITIONS)
            self.turn = 1
            self.last_event_msg = ""
            self.usage_counts = {k: 0 for k in DEFAULT_TRANSIT_OPTIONS}
            self.disabled_modes = []

            while True:
                outcome = self.check_outcome()
                if outcome:
                    self.display_outcome(outcome)
                    break
                self.execute_turn()

            again = input("Play again? (y/n): ").strip().lower()
            if again != 'y':
                print("Exiting game.")
                break
