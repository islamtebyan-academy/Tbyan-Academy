import re

with open("app/[locale]/programs/[slug]/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Let's extract the COURSES_DATABASE content and print it
db_match = re.search(r"const COURSES_DATABASE: Record<string, Record<string, CourseDbItem>> = (\{.*?\n\};)", content, re.DOTALL)
if db_match:
    db_text = db_match.group(1)
    # Let's parse the keys by looking for slugs and their titles under 'ar' and 'en'
    # We can write a script to evaluate or do simple regex
    ar_block = re.search(r"ar:\s*\{(.*?)\},\s*en:", db_text, re.DOTALL)
    en_block = re.search(r"en:\s*\{(.*?)\}\s*\}", db_text, re.DOTALL)
    
    if ar_block:
        print("ARABIC SLUGS AND TITLES:")
        slug_matches = re.finditer(r"['\"]([^'\"]+)['\"]:\s*\{", ar_block.group(1))
        for m in slug_matches:
            slug = m.group(1)
            # Find the title for this slug
            slug_content_start = m.end()
            title_match = re.search(r"title:\s*['\"]([^'\"]+)['\"]", ar_block.group(1)[slug_content_start:])
            if title_match:
                print(f"  - {slug}: {title_match.group(1)}")

    if en_block:
        print("\nENGLISH SLUGS AND TITLES:")
        slug_matches = re.finditer(r"['\"]([^'\"]+)['\"]:\s*\{", en_block.group(1))
        for m in slug_matches:
            slug = m.group(1)
            # Find the title for this slug
            slug_content_start = m.end()
            title_match = re.search(r"title:\s*['\"]([^'\"]+)['\"]", en_block.group(1)[slug_content_start:])
            if title_match:
                print(f"  - {slug}: {title_match.group(1)}")
else:
    print("Could not find COURSES_DATABASE in the file")
