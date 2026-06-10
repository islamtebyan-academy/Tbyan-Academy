with open("app/[locale]/programs/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Define the slug mapping dictionary in TypeScript code format
slug_map_code = """
const COURSE_SLUG_MAP: Record<string, string> = {
  // Quran Arabic
  'القرآن الكريم والتجويد بالسند': 'quran-tajweed',
  'علم القراءات العشر المتواترة': '10-qiraat',
  'متن الشاطبية والدرة في القراءات': 'shatibiyyah-durrah',
  'رسم المصحف العثماني وضبطه': 'mushaf-script',
  'علوم القرآن وأصول التفسير': 'quranic-sciences-tafsir',
  'علم الوقف والابتداء في التلاوة': 'waqf-ibtida',
  
  // Quran French
  'Coran & Tajwid sous Isnad': 'quran-tajweed',
  'Les Dix Lectures Mutawatir': '10-qiraat',
  'Matn al-Shatibiyyah & al-Durrah': 'shatibiyyah-durrah',
  'Orthographe Coranique (Rasm Uthmani)': 'mushaf-script',
  "Sciences du Coran & Principes d'Exégèse": 'quranic-sciences-tafsir',
  "L'art du Waqf & Ibtida (Pauses et Reprises)": 'waqf-ibtida',

  // Quran English
  'Quran & Tajweed under Isnad': 'quran-tajweed',
  "Ten Mutawatir Recitations (Qira'at)": '10-qiraat',
  'Matn al-Shatibiyyah & al-Durrah': 'shatibiyyah-durrah',
  'Quranic Orthography & Writing Rules': 'mushaf-script',
  'Quranic Sciences & Tafsir Principles': 'quranic-sciences-tafsir',
  'The Science of Waqf & Ibtida (Pauses)': 'waqf-ibtida',

  // Arabic Arabic
  'النحو والصرف العربي': 'arabic-grammar',
  'الأدب والبلاغة والبيان': 'arabic-literature',
  'متن ألفية ابن مالك في النحو والصرّف': 'alfiya-ibn-malik',
  'فقه اللغة وأسرار العربية': 'arabic-grammar',
  'علم العروض والقوافي وموسيقى الشعر': 'arabic-literature',
  'الإنشاء والخطابة والكتابة الأدبية': 'arabic-literature',

  // Arabic French
  'Syntaxe & Morphologie Arabes': 'arabic-grammar',
  'Littérature, Rhétorique & Éloquence': 'arabic-literature',
  "L'Alfiya d'Ibn Malik en Syntaxe & Conjugaison": 'alfiya-ibn-malik',
  'Philologie Arabe & Sémantique': 'arabic-grammar',
  'Métrique (Arud) & Poésie Classique': 'arabic-literature',
  'Rédaction Littéraire & Art Oratoire': 'arabic-literature',

  // Arabic English
  'Arabic Grammar & Morphology': 'arabic-grammar',
  'Literature, Rhetoric & Eloquence': 'arabic-literature',
  "Ibn Malik's Alfiya (Advanced Grammar)": 'alfiya-ibn-malik',
  'Arabic Philology & Semantics': 'arabic-grammar',
  'Arabic Metrics (Arud) & Poetics': 'arabic-literature',
  'Eloquent Prose & Creative Writing': 'arabic-literature',

  // Shariah Arabic
  'الفقه المالكي وتأصيل الأحكام': 'maliki-fiqh',
  'العقيدة الإسلامية والتوحيد': 'islamic-creed',
  'أصول الفقه وقواعد الاستنباط الفقهي': 'principles-of-fiqh',
  'مصطلح الحديث وعلوم الأثر الشريف': 'principles-of-fiqh',
  'السيرة النبوية والشمائل المحمدية المطهرة': 'islamic-creed',
  'علم المنطق السني وعلم الكلام الأزهري': 'islamic-logic',

  // Shariah French
  'Jurisprudence Malikite (Fiqh)': 'maliki-fiqh',
  'Dogme Sunnite & Théologie': 'islamic-creed',
  'Principes de Jurisprudence (Usul al-Fiqh)': 'principles-of-fiqh',
  'Sciences & Terminologie du Hadith': 'principles-of-fiqh',
  'Vie du Prophète & Nobles Caractères': 'islamic-creed',
  'Théologie & Logique Sunnite': 'islamic-logic',

  // Shariah English
  'Maliki Jurisprudence (Fiqh)': 'maliki-fiqh',
  'Islamic Creed (Aqidah)': 'islamic-creed',
  'Principles of Jurisprudence (Usul al-Fiqh)': 'principles-of-fiqh',
  'Hadith Sciences & Terminology': 'principles-of-fiqh',
  'Seerah & Prophetic Noble Qualities': 'islamic-creed',
  'Sunni Logic (Mantiq) & Theology': 'islamic-logic',

  // Youth Arabic
  'القاعدة النورانية وتأسيس اللسان': 'quran-tajweed',
  'مأموريات التجويد وحفظ القرآن للنشء': 'quran-tajweed',
  'ميكانيكا العبادات والآداب الإسلامية': 'maliki-fiqh',
  'قصص الأنبياء والتاريخ الإسلامي المبسط': 'quranic-sciences-tafsir',
  'حفظ الأذكار النبوية والأدعية اليومية للطفل': 'quran-tajweed',
  'التربية الأخلاقية والآداب الإسلامية العامة': 'islamic-creed',

  // Youth French
  'Qaida Nuraniyyah & Éveil à la Lecture': 'quran-tajweed',
  'Mémorisation du Juz Amma pour Jeunes': 'quran-tajweed',
  'Ablutions, Prière & Adab Pratique': 'maliki-fiqh',
  'Histoires des Prophètes & Histoires du Coran': 'quranic-sciences-tafsir',
  'Invocations & Adhkar pour le Quotidien': 'quran-tajweed',
  'Éducation Morale & Nobles Vertus': 'islamic-creed',

  // Youth English
  'Qaida Nuraniyyah & Reading Basics': 'quran-tajweed',
  'Juz Amma Memorization & Tajweed': 'quran-tajweed',
  'Salah, Wudu & Practical Daily Adab': 'maliki-fiqh',
  "Stories of the Prophets & Qur'an Stories": 'quranic-sciences-tafsir',
  "Daily Adhkar & Prophet's Prayers": 'quran-tajweed',
  'Islamic Ethics & Noble Character': 'islamic-creed'
};
"""

# 1. Insert the slug mapping dictionary at the top (under imports)
import_marker = "import"
last_import_index = content.rfind("import ")
end_of_import_line = content.find("\n", last_import_index)

# Insert after the last import line
content = content[:end_of_import_line + 1] + slug_map_code + content[end_of_import_line + 1:]

# 2. Update translation labels in page.tsx
content = content.replace("btnBook: 'احجز حصتك التجريبية الآن',", "btnBook: 'عرض تفاصيل المقرر',")
content = content.replace("btnBook: 'Réserver Mon Cours d\\'Essai',", "btnBook: 'Voir les détails',")
content = content.replace("btnBook: 'Schedule Free Trial Session',", "btnBook: 'View Course Details',")

# 3. Update the Link href inside the courses loop
old_link_href = "href={`/${locale}/book?topic=${selectedTrack}&course=${encodeURIComponent(course.title)}`}"
new_link_href = "href={`/${locale}/programs/${COURSE_SLUG_MAP[course.title] || 'quran-tajweed'}`}"

content = content.replace(old_link_href, new_link_href)

# Write back to file
with open("app/[locale]/programs/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Programs page successfully patched.")
