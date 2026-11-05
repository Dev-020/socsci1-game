// Changelog page: fetches CHANGELOG.md, parses Keep a Changelog markdown,
// and renders version cards and the Unreleased collapsible. Display only.
function el(tag, className = "", text) {
    const node = document.createElement(tag);
    if (className)
        node.className = className;
    if (text !== undefined)
        node.textContent = text;
    return node;
}
function renderRichText(parent, text) {
    const pattern = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parent.append(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        if (match[1] !== undefined) {
            const code = el("code", "code-inline", match[1]);
            parent.append(code);
        }
        else if (match[2] !== undefined && match[3] !== undefined) {
            const link = el("a", "item-link", match[2]);
            link.href = match[3];
            if (/^https?:\/\//i.test(match[3])) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
            parent.append(link);
        }
        lastIndex = pattern.lastIndex;
    }
    if (lastIndex < text.length) {
        parent.append(document.createTextNode(text.slice(lastIndex)));
    }
}
export function parseChangelog(markdown) {
    const lines = markdown.split(/\r?\n/);
    const allReleases = [];
    let currentRelease = null;
    let currentCategory = null;
    let currentItem = null;
    function flushItem() {
        if (currentItem !== null && currentCategory !== null) {
            currentCategory.items.push(currentItem.trim());
            currentItem = null;
        }
    }
    for (const rawLine of lines) {
        const line = rawLine.trim();
        // Version header: ## [0.8.0] - 2026-11-04 or ## [Unreleased]
        const versionMatch = line.match(/^##\s*\[([^\]]+)\](?:\s*-\s*(\d{4}-\d{2}-\d{2}))?/);
        if (versionMatch) {
            flushItem();
            const versionTag = versionMatch[1].trim();
            const isUnreleased = versionTag.toLowerCase() === "unreleased";
            const date = versionMatch[2] ? versionMatch[2].trim() : "";
            currentCategory = null;
            currentRelease = {
                version: versionTag,
                isUnreleased,
                date,
                categories: [],
            };
            allReleases.push(currentRelease);
            continue;
        }
        if (!currentRelease)
            continue;
        // Category header: ### Added
        const categoryMatch = line.match(/^###\s+(.+)$/);
        if (categoryMatch) {
            flushItem();
            const catName = categoryMatch[1].trim();
            currentCategory = { name: catName, items: [] };
            currentRelease.categories.push(currentCategory);
            continue;
        }
        // List item: - Some change
        const itemMatch = rawLine.match(/^\s*[-*]\s+(.*)$/);
        if (itemMatch && currentCategory) {
            flushItem();
            currentItem = itemMatch[1].trim();
            continue;
        }
        // Continuation lines for the current bullet
        if (currentItem !== null && line.length > 0 && !line.startsWith("#")) {
            currentItem += " " + line;
        }
    }
    flushItem();
    let unreleased = null;
    const releases = [];
    for (const rel of allReleases) {
        if (rel.isUnreleased) {
            const hasEntries = rel.categories.some((cat) => cat.items.length > 0);
            if (hasEntries) {
                unreleased = rel;
            }
        }
        else {
            releases.push(rel);
        }
    }
    const repoUrl = "https://github.com/Dev-020/socsci1-game";
    for (let i = 0; i < releases.length; i++) {
        const rel = releases[i];
        if (i < releases.length - 1) {
            const prev = releases[i + 1].version;
            rel.compareUrl = `${repoUrl}/compare/game@${prev}...game@${rel.version}`;
        }
        else {
            rel.compareUrl = `${repoUrl}/tree/game@${rel.version}`;
        }
    }
    if (unreleased && releases.length > 0) {
        const latest = releases[0].version;
        unreleased.compareUrl = `${repoUrl}/compare/game@${latest}...master`;
    }
    return { unreleased, releases };
}
function renderCard(rel) {
    const card = el("article", "version-card");
    card.id = `v-${rel.version.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const header = el("header", "card-header");
    const titleRow = el("div", "version-title-row");
    const title = el("h2", "version-number", `v${rel.version}`);
    titleRow.append(title);
    if (rel.date) {
        const time = el("time", "version-date", rel.date);
        time.dateTime = rel.date;
        titleRow.append(time);
    }
    header.append(titleRow);
    if (rel.compareUrl) {
        const compareLink = el("a", "compare-link", "view code changes");
        compareLink.href = rel.compareUrl;
        compareLink.target = "_blank";
        compareLink.rel = "noopener noreferrer";
        header.append(compareLink);
    }
    card.append(header);
    const content = el("div", "card-content");
    for (const cat of rel.categories) {
        if (cat.items.length === 0)
            continue;
        const catBlock = el("div", "category-block");
        const tag = el("span", `category-tag tag-${cat.name.toLowerCase()}`, cat.name);
        catBlock.append(tag);
        const list = el("ul", "item-list");
        for (const itemText of cat.items) {
            const li = el("li", "item");
            renderRichText(li, itemText);
            list.append(li);
        }
        catBlock.append(list);
        content.append(catBlock);
    }
    card.append(content);
    return card;
}
function renderUnreleased(rel) {
    const details = el("details", "version-card unreleased-card");
    const summary = el("summary", "unreleased-summary");
    const summaryTitle = el("div", "summary-title-group");
    const badge = el("span", "unreleased-badge", "Unreleased");
    const label = el("span", "unreleased-label", "In progress (not yet released)");
    summaryTitle.append(badge, label);
    summary.append(summaryTitle);
    details.append(summary);
    const content = el("div", "card-content");
    if (rel.compareUrl) {
        const meta = el("div", "unreleased-meta");
        const compareLink = el("a", "compare-link", "view code changes");
        compareLink.href = rel.compareUrl;
        compareLink.target = "_blank";
        compareLink.rel = "noopener noreferrer";
        meta.append(compareLink);
        content.append(meta);
    }
    for (const cat of rel.categories) {
        if (cat.items.length === 0)
            continue;
        const catBlock = el("div", "category-block");
        const tag = el("span", `category-tag tag-${cat.name.toLowerCase()}`, cat.name);
        catBlock.append(tag);
        const list = el("ul", "item-list");
        for (const itemText of cat.items) {
            const li = el("li", "item");
            renderRichText(li, itemText);
            list.append(li);
        }
        catBlock.append(list);
        content.append(catBlock);
    }
    details.append(content);
    return details;
}
async function init() {
    const container = document.getElementById("changelog-entries");
    if (!container)
        return;
    try {
        const res = await fetch("CHANGELOG.md");
        if (!res.ok)
            throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const markdown = await res.text();
        const { unreleased, releases } = parseChangelog(markdown);
        container.replaceChildren();
        if (unreleased) {
            container.append(renderUnreleased(unreleased));
        }
        for (const rel of releases) {
            container.append(renderCard(rel));
        }
    }
    catch (err) {
        container.replaceChildren();
        const errorCard = el("div", "error-card");
        const errorTitle = el("h2", "error-title", "Could not load CHANGELOG.md");
        const errorText = el("p", "error-text", "If you opened this page as a local file, your browser may block local requests. Run a local web server (such as python -m http.server) or open the game on GitHub Pages.");
        errorCard.append(errorTitle, errorText);
        container.append(errorCard);
    }
}
if (typeof document !== "undefined") {
    init();
}
