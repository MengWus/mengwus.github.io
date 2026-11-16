"""Fetch the three public, all-time Google Scholar metrics through SerpApi."""

import datetime
import json
import os
from pathlib import Path
import sys
from urllib.error import URLError
from urllib.parse import urlencode
from urllib.request import urlopen

METRICS = ("citations", "h_index", "i10_index")


def parse_metrics(payload, author_id):
    if (
        payload["search_metadata"]["status"] != "Success"
        or payload["search_parameters"]["author_id"] != author_id
    ):
        raise ValueError("Unexpected search metadata")

    table = payload["cited_by"]["table"]
    values = {name: row[name]["all"] for row in table for name in METRICS if name in row}
    if set(values) != set(METRICS) or any(type(value) is not int or value < 0 for value in values.values()):
        raise ValueError("Incomplete or invalid metrics")

    processed = payload["search_metadata"]["processed_at"]
    checked_on = datetime.datetime.strptime(processed, "%Y-%m-%d %H:%M:%S UTC").date()
    return {"author_id": author_id, "checked_on": checked_on.isoformat(), **values}


def main(destination):
    snapshot = json.loads(Path("_data/scholar_metrics.json").read_text(encoding="utf-8"))
    author_id = snapshot["author_id"]
    api_key = os.environ.get("SERPAPI_API_KEY")
    if not api_key:
        raise SystemExit("SERPAPI_API_KEY is missing.")

    query = urlencode({
        "engine": "google_scholar_author",
        "author_id": author_id,
        "hl": "en",
        "api_key": api_key,
    })
    try:
        with urlopen(f"https://serpapi.com/search.json?{query}", timeout=30) as response:
            latest = parse_metrics(json.load(response), author_id)
    except (URLError, TimeoutError, OSError, KeyError, TypeError, ValueError):
        raise SystemExit("Could not retrieve valid Google Scholar metrics from SerpApi.") from None

    destination.write_text(json.dumps(latest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
