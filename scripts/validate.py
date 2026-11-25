#!/usr/bin/env python3
"""Validate anthology documents and their local references."""

from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
IGNORED_SCHEMES = {"data", "http", "https", "mailto", "tel", "javascript"}


class ReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[tuple[str, str]] = []
        self.title_parts: list[str] = []
        self.in_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "title":
            self.in_title = True
        for name, value in attrs:
            if name in {"href", "src"} and value:
                self.references.append((name, value))

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)

    @property
    def title(self) -> str:
        return "".join(self.title_parts).strip()


def reference_target(document: Path, value: str) -> Path | None:
    parsed = urlsplit(value)
    if parsed.scheme.lower() in IGNORED_SCHEMES or value.startswith("#"):
        return None
    path = unquote(parsed.path)
    if not path:
        return None
    if path.startswith("/"):
        return ROOT / path.lstrip("/")
    return document.parent / path


def main() -> int:
    documents = sorted(ROOT.rglob("*.html"))
    failures: list[str] = []
    references_checked = 0

    if not documents:
        failures.append("no HTML documents found")

    for document in documents:
        source = document.read_text(encoding="utf-8")
        relative = document.relative_to(ROOT)
        if "file://" in source or "/mnt/c/Users/" in source:
            failures.append(f"{relative}: contains a local filesystem path")

        parser = ReferenceParser()
        parser.feed(source)
        if not parser.title:
            failures.append(f"{relative}: missing non-empty <title>")

        for attribute, value in parser.references:
            target = reference_target(document, value)
            if target is None:
                continue
            references_checked += 1
            candidate = target / "index.html" if target.is_dir() else target
            if not candidate.exists():
                failures.append(
                    f"{relative}: unresolved {attribute}={value!r} "
                    f"(expected {candidate.relative_to(ROOT) if candidate.is_relative_to(ROOT) else candidate})"
                )

    expected_entries = {
        "stories/kept/index.html",
        "stories/layer-14/index.html",
        "stories/sovereign/index.html",
        "stories/room-null/index.html",
        "stories/bite-the-sun/index.html",
        "stories/a-message-for-no-one-wired/index.html",
        "stories/a-message-for-no-one/index.html",
        "stories/the-button-is-lying/index.html",
    }
    actual_entries = {
        str(path.relative_to(ROOT))
        for path in documents
        if path.parent.parent == ROOT / "stories" and path.name == "index.html"
    }
    missing_entries = expected_entries - actual_entries
    extra_entries = actual_entries - expected_entries
    if missing_entries:
        failures.append(f"missing canonical story entries: {sorted(missing_entries)}")
    if extra_entries:
        failures.append(f"unexpected canonical story entries: {sorted(extra_entries)}")

    if failures:
        print("VALIDATION FAILED", file=sys.stderr)
        for failure in failures:
            print(f"- {failure}", file=sys.stderr)
        return 1

    print(
        f"PASS: {len(documents)} HTML documents, "
        f"{len(expected_entries)} canonical stories, "
        f"{references_checked} local references"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
