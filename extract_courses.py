import re
import json

with open("app/[locale]/programs/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Let's write a quick parser to extract the `courses` block inside `ar:`, `en:`, and `fr:`
# We can find where `courses:` is defined and read up to the end of the array `]`
matches = re.finditer(r"courses:\s*\[", content)

for idx, match in enumerate(matches):
    start = match.end()
    # Count braces/brackets to find matching `]`
    bracket_count = 1
    i = start
    while i < len(content) and bracket_count > 0:
        if content[i] == '[':
            bracket_count += 1
        elif content[i] == ']':
            bracket_count -= 1
        i += 1
    array_content = content[start:i-1]
    
    # Extract titles inside this array
    titles = re.findall(r"title:\s*['\"]([^'\"]+)['\"]", array_content)
    print(f"Match {idx} at position {match.start()} has titles:")
    for t in titles:
        print(f"  - {t}")
