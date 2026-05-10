const profilePath = "data/profile.json";

const text = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value) element.textContent = value;
};

const anchor = (item, className = "") => {
  const link = document.createElement("a");
  link.href = item.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = item.label;
  if (className) link.className = className;
  return link;
};

const renderMetrics = (metrics) => {
  const root = document.querySelector("#profile-metrics");
  root.replaceChildren();

  metrics.forEach((metric) => {
    const wrapper = document.createElement("div");
    wrapper.className = "metric";

    const label = document.createElement("dt");
    label.textContent = metric.label;

    const value = document.createElement("dd");
    value.textContent = metric.value;

    wrapper.append(label, value);
    root.append(wrapper);
  });
};

const renderHeroLinks = (links) => {
  const root = document.querySelector("#hero-links");
  root.replaceChildren();

  links.slice(0, 2).forEach((item, index) => {
    const link = anchor(item, index === 0 ? "button" : "button secondary");
    root.append(link);
  });
};

const renderHighlights = (highlights) => {
  const root = document.querySelector("#profile-highlights");
  root.replaceChildren();

  highlights.forEach((highlight, index) => {
    const item = document.createElement("div");
    item.className = "highlight-item";

    const number = document.createElement("span");
    number.className = "highlight-index";
    number.textContent = String(index + 1).padStart(2, "0");

    const copy = document.createElement("p");
    copy.textContent = highlight;

    item.append(number, copy);
    root.append(item);
  });
};

const renderInterests = (interests) => {
  const root = document.querySelector("#research-interests");
  root.replaceChildren();

  interests.forEach((interest) => {
    const item = document.createElement("li");
    item.textContent = interest;
    root.append(item);
  });
};

const renderPublications = (publications) => {
  const root = document.querySelector("#publication-list");
  root.replaceChildren();

  publications.forEach((publication) => {
    const card = document.createElement("article");
    card.className = "publication-card";

    const meta = document.createElement("div");
    meta.className = "publication-meta";
    meta.textContent = [publication.venue, publication.year].filter(Boolean).join(" · ");

    const title = document.createElement("h3");
    title.textContent = publication.title;

    const authors = document.createElement("p");
    authors.className = "publication-meta";
    authors.textContent = publication.authors;

    const note = document.createElement("p");
    note.className = "publication-note";
    note.textContent = publication.note;

    card.append(meta, title, authors, note);
    root.append(card);
  });
};

const renderResourceLinks = (links) => {
  const root = document.querySelector("#resource-links");
  root.replaceChildren();

  links.forEach((item) => {
    const link = anchor(item, "resource-card");
    const label = document.createElement("strong");
    label.textContent = item.label;

    const url = document.createElement("span");
    url.textContent = new URL(item.url).hostname.replace(/^www\./, "");

    link.replaceChildren(label, url);
    root.append(link);
  });
};

const renderContact = (profile) => {
  const root = document.querySelector("#contact-details");
  root.replaceChildren();

  const rows = [
    ["Affiliation", profile.affiliation],
    ["Location", profile.location],
    ["Verified email", profile.verifiedEmailDomain ? `@${profile.verifiedEmailDomain}` : ""],
    ["Email", profile.contact?.email],
    ["Office", profile.contact?.office],
    ["Department", profile.contact?.department]
  ].filter(([, value]) => value);

  rows.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "contact-row";

    const key = document.createElement("strong");
    key.textContent = label;

    const detail = document.createElement("span");
    detail.textContent = value;

    row.append(key, detail);
    root.append(row);
  });
};

fetch(profilePath)
  .then((response) => {
    if (!response.ok) throw new Error(`Could not load ${profilePath}`);
    return response.json();
  })
  .then((profile) => {
    document.title = `${profile.name} | Academic Profile`;
    document.querySelector("meta[name='description']").content = `${profile.name}, ${profile.affiliation}. ${profile.summary}`;

    text("#profile-name", profile.name);
    text("#profile-title", profile.title);
    text("#profile-affiliation", profile.affiliation);
    text("#profile-summary", profile.summary);
    text("#footer-name", profile.name);
    text("#footer-updated", `Updated ${profile.lastUpdated}`);

    const scholar = document.querySelector("#scholar-link");
    scholar.href = profile.scholarUrl;

    renderMetrics(profile.metrics);
    renderHeroLinks(profile.links);
    renderHighlights(profile.highlights);
    renderInterests(profile.researchInterests);
    renderPublications(profile.publications);
    renderResourceLinks(profile.links);
    renderContact(profile);
  })
  .catch((error) => {
    console.error(error);
  });
