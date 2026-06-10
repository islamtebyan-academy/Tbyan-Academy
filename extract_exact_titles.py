import re

with open("app/[locale]/programs/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Let's find all title definitions using regex that accounts for escaped quotes.
# e.g., title: '...' where single quotes can be escaped as \'
title_patterns = [
    r"title:\s*'((?:[^'\\]|\\.)*)'",
    r'title:\s*"((?:[^"\\]|\\.)*)"'
]

titles_found = []
for pattern in title_patterns:
    for m in re.finditer(pattern, content):
        val = m.group(1)
        # Unescape the string
        val_unescaped = val.replace("\\'", "'").replace('\\"', '"')
        titles_found.append(val_unescaped)

# Only print titles that look like course titles (e.g. not track titles or books)
print("Unique unescaped title values found:")
for t in sorted(list(set(titles_found))):
    if len(t) > 5:
        print(f"  - {t}")
