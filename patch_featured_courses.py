with open("components/sections/FeaturedCourses.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update translations
content = content.replace("btnBook: 'احجز حصة تجريبية مجانية',", "btnBook: 'عرض تفاصيل المقرر',")
content = content.replace("btnBook: 'Book a Free Trial Session',", "btnBook: 'View Course Details',")
content = content.replace("btnBook: 'Réserver un cours d\\'essai gratuit',", "btnBook: 'Voir les détails',")

# 2. Update courses array to inject slugs
old_courses = """  const courses = [
    {
      image: '/images/course_quran.png',
      icon: <Award className="w-5 h-5 text-gold-hi" />,
      title: activeContent.quranTitle,
      tagline: activeContent.quranTag,
      desc: activeContent.quranDesc,
      path: activeContent.quranPath,
      stats: [
        { label: activeContent.statDuration, value: activeContent.quranDuration },
        { label: activeContent.statText, value: activeContent.quranText },
        { label: activeContent.statLevel, value: activeContent.quranLevel }
      ]
    },
    {
      image: '/images/course_fiqh.png',
      icon: <Scale className="w-5 h-5 text-gold-hi" />,
      title: activeContent.fiqhTitle,
      tagline: activeContent.fiqhTag,
      desc: activeContent.fiqhDesc,
      path: activeContent.fiqhPath,
      stats: [
        { label: activeContent.statDuration, value: activeContent.fiqhDuration },
        { label: activeContent.statText, value: activeContent.fiqhText },
        { label: activeContent.statLevel, value: activeContent.fiqhLevel }
      ]
    },
    {
      image: '/images/course_arabic.png',
      icon: <Languages className="w-5 h-5 text-gold-hi" />,
      title: activeContent.arabicTitle,
      tagline: activeContent.arabicTag,
      desc: activeContent.arabicDesc,
      path: activeContent.arabicPath,
      stats: [
        { label: activeContent.statDuration, value: activeContent.arabicDuration },
        { label: activeContent.statText, value: activeContent.arabicText },
        { label: activeContent.statLevel, value: activeContent.arabicLevel }
      ]
    },
    {
      image: '/images/course_aqidah.png',
      icon: <Shield className="w-5 h-5 text-gold-hi" />,
      title: activeContent.aqidahTitle,
      tagline: activeContent.aqidahTag,
      desc: activeContent.aqidahDesc,
      path: activeContent.aqidahPath,
      stats: [
        { label: activeContent.statDuration, value: activeContent.aqidahDuration },
        { label: activeContent.statText, value: activeContent.aqidahText },
        { label: activeContent.statLevel, value: activeContent.aqidahLevel }
      ]
    },
    {
      image: '/images/course_logic.png',
      icon: <Compass className="w-5 h-5 text-gold-hi" />,
      title: activeContent.logicTitle,
      tagline: activeContent.logicTag,
      desc: activeContent.logicDesc,
      path: activeContent.logicPath,
      stats: [
        { label: activeContent.statDuration, value: activeContent.logicDuration },
        { label: activeContent.statText, value: activeContent.logicText },
        { label: activeContent.statLevel, value: activeContent.logicLevel }
      ]
    },
    {
      image: '/images/course_literature.png',
      icon: <Feather className="w-5 h-5 text-gold-hi" />,
      title: activeContent.litTitle,
      tagline: activeContent.litTag,
      desc: activeContent.litDesc,
      path: activeContent.litPath,
      stats: [
        { label: activeContent.statDuration, value: activeContent.litDuration },
        { label: activeContent.statText, value: activeContent.litText },
        { label: activeContent.statLevel, value: activeContent.litLevel }
      ]
    },
  ];"""

new_courses = """  const courses = [
    {
      image: '/images/course_quran.png',
      icon: <Award className="w-5 h-5 text-gold-hi" />,
      title: activeContent.quranTitle,
      tagline: activeContent.quranTag,
      desc: activeContent.quranDesc,
      path: activeContent.quranPath,
      slug: 'quran-tajweed',
      stats: [
        { label: activeContent.statDuration, value: activeContent.quranDuration },
        { label: activeContent.statText, value: activeContent.quranText },
        { label: activeContent.statLevel, value: activeContent.quranLevel }
      ]
    },
    {
      image: '/images/course_fiqh.png',
      icon: <Scale className="w-5 h-5 text-gold-hi" />,
      title: activeContent.fiqhTitle,
      tagline: activeContent.fiqhTag,
      desc: activeContent.fiqhDesc,
      path: activeContent.fiqhPath,
      slug: 'maliki-fiqh',
      stats: [
        { label: activeContent.statDuration, value: activeContent.fiqhDuration },
        { label: activeContent.statText, value: activeContent.fiqhText },
        { label: activeContent.statLevel, value: activeContent.fiqhLevel }
      ]
    },
    {
      image: '/images/course_arabic.png',
      icon: <Languages className="w-5 h-5 text-gold-hi" />,
      title: activeContent.arabicTitle,
      tagline: activeContent.arabicTag,
      desc: activeContent.arabicDesc,
      path: activeContent.arabicPath,
      slug: 'arabic-grammar',
      stats: [
        { label: activeContent.statDuration, value: activeContent.arabicDuration },
        { label: activeContent.statText, value: activeContent.arabicText },
        { label: activeContent.statLevel, value: activeContent.arabicLevel }
      ]
    },
    {
      image: '/images/course_aqidah.png',
      icon: <Shield className="w-5 h-5 text-gold-hi" />,
      title: activeContent.aqidahTitle,
      tagline: activeContent.aqidahTag,
      desc: activeContent.aqidahDesc,
      path: activeContent.aqidahPath,
      slug: 'islamic-creed',
      stats: [
        { label: activeContent.statDuration, value: activeContent.aqidahDuration },
        { label: activeContent.statText, value: activeContent.aqidahText },
        { label: activeContent.statLevel, value: activeContent.aqidahLevel }
      ]
    },
    {
      image: '/images/course_logic.png',
      icon: <Compass className="w-5 h-5 text-gold-hi" />,
      title: activeContent.logicTitle,
      tagline: activeContent.logicTag,
      desc: activeContent.logicDesc,
      path: activeContent.logicPath,
      slug: 'islamic-logic',
      stats: [
        { label: activeContent.statDuration, value: activeContent.logicDuration },
        { label: activeContent.statText, value: activeContent.logicText },
        { label: activeContent.statLevel, value: activeContent.logicLevel }
      ]
    },
    {
      image: '/images/course_literature.png',
      icon: <Feather className="w-5 h-5 text-gold-hi" />,
      title: activeContent.litTitle,
      tagline: activeContent.litTag,
      desc: activeContent.litDesc,
      path: activeContent.litPath,
      slug: 'arabic-literature',
      stats: [
        { label: activeContent.statDuration, value: activeContent.litDuration },
        { label: activeContent.statText, value: activeContent.litText },
        { label: activeContent.statLevel, value: activeContent.litLevel }
      ]
    },
  ];"""

# Replace courses array
# Normalizing line endings for safety
normalized_content = content.replace("\r\n", "\n")
normalized_old = old_courses.replace("\r\n", "\n")
normalized_new = new_courses.replace("\r\n", "\n")

if normalized_old in normalized_content:
    normalized_content = normalized_content.replace(normalized_old, normalized_new)
    print("Courses array replaced successfully.")
else:
    # Try with raw check just in case
    if old_courses in content:
        content = content.replace(old_courses, new_courses)
        print("Courses array replaced successfully using raw matches.")
        normalized_content = content.replace("\r\n", "\n")
    else:
        print("WARNING: Courses array old string not found exactly!")

# 3. Update the Link href inside Card
old_link = "href={`/${locale}/book`}"
new_link = "href={`/${locale}/programs/${course.slug}`}"

if old_link in normalized_content:
    normalized_content = normalized_content.replace(old_link, new_link)
    print("Link href replaced successfully.")
else:
    print("WARNING: Link href old string not found exactly!")

# Write it back using CRLF or LF as originally set
with open("components/sections/FeaturedCourses.tsx", "w", encoding="utf-8") as f:
    f.write(normalized_content)
print("FeaturedCourses.tsx patched.")
