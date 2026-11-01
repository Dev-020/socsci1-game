"""
Data models and default configuration values for the transit prototype.
All values are based on the masterlist and wireframe values.
Descriptions and text are kept as default placeholders.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional


@dataclass
class Character:
    name: str
    money: float
    max_energy: int
    energy: int
    discount_eligible: bool  # True for Student / PWD (20% discount)
    pwd_penalty: bool = False  # Extra energy deduction for mobility barriers


@dataclass
class TransitOption:
    key: str
    name: str
    distance_km: float
    energy_drain: int
    base_cost_student: float
    base_cost_regular: float
    is_formula_cost: bool = False
    formula_type: Optional[str] = None
    max_uses: Optional[int] = None  # Maximum times this option can be chosen in a run (None = unlimited)

    def calculate_cost(self, distance_needed: float, is_discount: bool) -> float:
        """Calculates transit fare based on distance and commuter discount eligibility."""
        act_dist = min(self.distance_km, distance_needed)
        
        if self.key == "walk":
            return 0.0
        elif self.key == "jeep":
            return self.base_cost_student if is_discount else self.base_cost_regular
        elif self.key == "train":
            return self.base_cost_student if is_discount else self.base_cost_regular
        elif self.key == "motor":
            # Masterlist formula: 50 for 1st km, +10/km up to 10th km, +20/km beyond 10th km
            if act_dist <= 1.0:
                return 50.0
            elif act_dist <= 10.0:
                return 50.0 + (act_dist - 1.0) * 10.0
            else:
                return 50.0 + 9.0 * 10.0 + (act_dist - 10.0) * 20.0
        elif self.key == "car":
            # Masterlist formula: 60 for 1st km, +15/km succeeding
            if act_dist <= 1.0:
                return 60.0
            else:
                return 60.0 + (act_dist - 1.0) * 15.0
        elif self.key == "tricycle":
            return self.base_cost_student if is_discount else self.base_cost_regular
        elif self.key == "bus":
            return self.base_cost_student if is_discount else self.base_cost_regular
        
        return self.base_cost_regular


@dataclass
class RandomEvent:
    name: str
    description: str
    energy_mod: int = 0
    money_mod: float = 0.0
    distance_mod: float = 0.0
    applicable_modes: List[str] = field(default_factory=list)
    disabled_modes: List[str] = field(default_factory=list)  # Modes temporarily disabled for the next leg


# --- CONFIGURATION SETTINGS ---

# Probability of a random event triggering after selecting a transit mode (0.35 = 35%)
EVENT_PROBABILITY: float = 0.35


# --- DEFAULT DATASETS (Replace or modify values as needed) ---

DEFAULT_CHARACTERS: Dict[str, Character] = {
    "1": Character(
        name="Student",
        money=200.0,
        max_energy=100,
        energy=100,
        discount_eligible=True,
        pwd_penalty=False
    ),
    "2": Character(
        name="Worker",
        money=400.0,
        max_energy=50,
        energy=50,
        discount_eligible=False,
        pwd_penalty=False
    ),
    "3": Character(
        name="PWD",
        money=200.0,
        max_energy=50,
        energy=50,
        discount_eligible=True,
        pwd_penalty=True
    ),
}

DEFAULT_TRANSIT_OPTIONS: Dict[str, TransitOption] = {
    "jeep": TransitOption(
        key="jeep",
        name="Jeepney",
        distance_km=4.0,
        energy_drain=15,
        base_cost_student=12.0,
        base_cost_regular=14.0,
        max_uses=3
    ),
    "train": TransitOption(
        key="train",
        name="Train (LRT/MRT)",
        distance_km=6.0,
        energy_drain=10,
        base_cost_student=9.0,
        base_cost_regular=19.0,
        max_uses=2
    ),
    "motor": TransitOption(
        key="motor",
        name="Motorcycle",
        distance_km=float("inf"),
        energy_drain=5,
        base_cost_student=140.0,
        base_cost_regular=140.0,
        is_formula_cost=True,
        formula_type="motor",
        max_uses=None  # Unlimited
    ),
    "car": TransitOption(
        key="car",
        name="Private Car / Ride-Hail",
        distance_km=float("inf"),
        energy_drain=3,
        base_cost_student=120.0,
        base_cost_regular=120.0,
        is_formula_cost=True,
        formula_type="car",
        max_uses=None  # Unlimited
    ),
    "walk": TransitOption(
        key="walk",
        name="Walk",
        distance_km=2.0,
        energy_drain=25,
        base_cost_student=0.0,
        base_cost_regular=0.0,
        max_uses=None  # Unlimited
    ),
    "tricycle": TransitOption(
        key="tricycle",
        name="Tricycle",
        distance_km=2.0,
        energy_drain=10,
        base_cost_student=16.0,
        base_cost_regular=20.0,
        max_uses=2
    ),
    "bus": TransitOption(
        key="bus",
        name="Bus",
        distance_km=6.0,
        energy_drain=12,
        base_cost_student=15.0,
        base_cost_regular=18.0,
        max_uses=2
    ),
}

DEFAULT_WEATHER_CONDITIONS = [
    {"name": "Normal", "drain_mult": 1.0},
    {"name": "Rainy", "drain_mult": 1.3},
    {"name": "Sunny", "drain_mult": 1.1},
]

DEFAULT_RANDOM_EVENTS = [
    RandomEvent(
        name="Traffic Congestion",
        description="Heavy traffic on the road caused additional delay and fatigue.",
        energy_mod=-5,
        distance_mod=-1.0,
        applicable_modes=["jeep", "car", "bus"]
    ),
    RandomEvent(
        name="Station Queue",
        description="Long queue at the station ticketing/turnstile.",
        energy_mod=-6,
        applicable_modes=["train"]
    ),
    RandomEvent(
        name="Road Obstruction / Flood",
        description="Water or road obstruction slowed down transit. Jeepney and walking routes disrupted.",
        energy_mod=-8,
        distance_mod=-1.0,
        applicable_modes=["walk", "jeep"],
        disabled_modes=["jeep"]  # Disables jeep for the next leg
    ),
    RandomEvent(
        name="Track Fault / Station Power Outage",
        description="Technical issue on the rail line. Train transit temporarily halted.",
        energy_mod=-5,
        applicable_modes=["train"],
        disabled_modes=["train"]  # Disables train for the next leg
    ),
    RandomEvent(
        name="Clear Traffic Flow",
        description="Unusually clear traffic along this segment.",
        energy_mod=+3,
        distance_mod=+1.0,
        applicable_modes=["motor", "car", "bus"]
    ),
    RandomEvent(
        name="Fare Surcharge",
        description="Temporary surge or additional fare adjustment.",
        money_mod=-10.0,
        applicable_modes=["car", "motor"]
    ),
]
