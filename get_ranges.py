def find_lines(filename, search_str):
    with open(filename, "r", encoding="utf-8") as f:
        lines = f.readlines()
    for idx, line in enumerate(lines):
        if search_str in line:
            print(f"File {filename}: line {idx+1}: {line.strip()}")

print("FeaturedCourses.tsx targets:")
find_lines("components/sections/FeaturedCourses.tsx", "btnBook:")
find_lines("components/sections/FeaturedCourses.tsx", "image: '/images/course_quran.png'")
find_lines("components/sections/FeaturedCourses.tsx", "href={`/${locale}/book`}")

print("\nprograms/page.tsx targets:")
find_lines("app/[locale]/programs/page.tsx", "href={`/${locale}/book?topic=${selectedTrack}&course=${encodeURIComponent(course.title)}`}")
find_lines("app/[locale]/programs/page.tsx", "btnBook:")
