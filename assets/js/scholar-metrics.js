async function refreshScholarMetrics() {
  const panel = document.querySelector("[data-scholar-feed]");
  if (!panel || !panel.dataset.scholarFeed || window.location.origin !== panel.dataset.scholarOrigin) {
    return;
  }

  const displayedMetrics = Array.from(panel.querySelectorAll("[data-metric]"));
  const format = new Intl.NumberFormat(document.documentElement.lang);

  try {
    const response = await fetch(panel.dataset.scholarFeed, { credentials: "omit", cache: "no-cache" });
    if (!response.ok) return;

    const snapshot = await response.json();
    const isValidMetric = (element) => {
      const value = snapshot[element.dataset.metric];
      return Number.isSafeInteger(value) && value >= 0;
    };
    if (
      snapshot.author_id !== panel.dataset.scholarAuthor ||
      !/^\d{4}-\d{2}-\d{2}$/.test(snapshot.checked_on) ||
      snapshot.checked_on < panel.dataset.scholarCheckedOn ||
      !displayedMetrics.every(isValidMetric)
    ) return;

    for (const element of displayedMetrics) {
      element.textContent = format.format(snapshot[element.dataset.metric]);
    }
    panel.dataset.scholarCheckedOn = snapshot.checked_on;
  } catch {
    // Keep the dated snapshot embedded in the page when the feed is unavailable.
  }
}

refreshScholarMetrics();
