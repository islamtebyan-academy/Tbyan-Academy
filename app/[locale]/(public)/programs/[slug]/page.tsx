import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { 
  BookOpen, Award, CheckCircle2, ChevronRight, ChevronLeft,
  ArrowRight, ArrowLeft, Users, Calendar, Clock, Star,
  Compass, Scale, Shield, Feather, Sparkles, Check, ShieldCheck
} from 'lucide-react';

interface CourseDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

interface OutcomeItem {
  title: string;
  desc: string;
}

interface StudyPlanItem {
  title: string;
  desc: string;
}

interface CourseDbItem {
  title: string;
  tagline: string;
  path: string;
  image: string;
  duration: string;
  level: string;
  syllabus: string;
  importance: string;
  whatYouLearn: string[];
  outcomes: OutcomeItem[];
  relatedSlugs: string[];
  studyPlan: StudyPlanItem[];
}

const COURSES_DATABASE: Record<string, Record<string, CourseDbItem>> = {
  ar: {
    'quran-tajweed': {
      title: "القرآن الكريم والتجويد بالسند",
      tagline: "تلاوة صحيحة وحفظ متقن متصل السند",
      path: "مسار القرآن الكريم",
      image: "/images/course_quran.png",
      duration: "40 ساعة دراسية",
      level: "تأسيسي / تأصيلي",
      syllabus: "تحفة الأطفال والجزرية",
      importance: "تعتبر قراءة القرآن الكريم بالطريقة الصحيحة المجودة فرض عين على كل مسلم ومسلمة، وبوابة الفهم الدقيق لآيات الله تبارك وتعالى. هذا المسار يؤسس للنطق الفصيح للقرآن وحمايته من اللحن.",
      whatYouLearn: [
        "مخارج الحروف العربية وصفاتها ومقارنتها بالأصوات المجاورة.",
        "أحكام التجويد الأساسية: النون الساكنة والتنوين والميم الساكنة والمدود.",
        "الوقف والابتداء وتطبيق قواعد التلاوة عملياً أثناء الحصة.",
        "حفظ وتثبيت جزء عمّ أو أجزاء مخصصة حسب طاقة الطالب."
      ],
      outcomes: [
        { title: "تلاوة صحيحة", desc: "القدرة على قراءة أي موضع في المصحف الشريف بطلاقة وخلو كامل من اللحن." },
        { title: "حفظ منهجي", desc: "حفظ وتثبيت المقدار المحدد مع ضبطه ومراجعته بألواح المراجعة المنهجية." },
        { title: "دراسة المتون", desc: "حفظ وفهم شرح متن تحفة الأطفال أو المقدمة الجزرية للطلاب المتقدمين." }
      ],
      relatedSlugs: ["10-qiraat", "waqf-ibtida", "quranic-sciences-tafsir"],
      studyPlan: [
        { title: "المخارج والصفات وتأسيس النطق الفصيح", desc: "التركيز على مخارج الحروف الـ 17 وصفاتها الذاتية والعارضة لتصحيح اللحن الجلي." },
        { title: "أحكام التجويد العملية والنظرية", desc: "شرح وتطبيق أحكام النون الساكنة والتنوين والميم الساكنة والمدود وأحكام التفخيم والترقيق." },
        { title: "الوقف والابتداء وحفظ المتون", desc: "دراسة الوقف والابتداء وتطبيقه العملي، مع حفظ متن تحفة الأطفال للجمزوري لترسيخ القواعد." },
        { title: "الختم والتلقي للحصول على السند", desc: "مجالس ختم القرآن الكريم كاملاً غيباً أو نظراً مع التجويد والضبط للحصول على إجازة الإسناد." }
      ]
    },
    '10-qiraat': {
      title: "علم القراءات العشر المتواترة",
      tagline: "تلقي الروايات وضبط الأداء بالقراءات السبع والعشر",
      path: "مسار القرآن الكريم",
      image: "/images/article_qiraat.png",
      duration: "60 ساعة دراسية",
      level: "متقدم جداً",
      syllabus: "متن الشاطبية والدرة",
      importance: "الوقوف على أوجه القراءات المتواترة وسيلة لحفظ النص القرآني كما أنزل، وفهم معانيه المتعددة دلالاته اللغوية الواسعة. هذا المسار مخصص لطلاب الإجازة والأسانيد المتصلة.",
      whatYouLearn: [
        "أصول روايات القراء السبعة من طريق الشاطبية (نافع، عاصم، حمزة، الكسائي...).",
        "أصول قراءات القراء الثلاثة المتممين للعشرة من طريق الدرة.",
        "قواعد جمع القراءات بمجالس التلاوة (الجمع بالآية والجمع بالوقف).",
        "شروط الأداء والتلقي وسلاسل السند المتصلة إلى النبي ﷺ."
      ],
      outcomes: [
        { title: "إجازة بالسند", desc: "الحصول على إجازة بسند متصل برواية أو قراءة معينة بعد ختم المصحف كاملاً." },
        { title: "أصول الروايات", desc: "التمييز الدقيق بين أصول الفرش والأصول العامة لكل قارئ من القراء العشرة." },
        { title: "دراسة مقارنة", desc: "فهم دلالات اختلاف القراءات وتأثيرها على النحو والتفسير والأحكام الفقهية." }
      ],
      relatedSlugs: ["quran-tajweed", "shatibiyyah-durrah", "mushaf-script"],
      studyPlan: [
        { title: "أصول القراء السبعة من طريق الشاطبية", desc: "دراسة المقدمة وأصول القراء ومقارنة الأوجه النحوية واللغوية وتطبيقاتها." },
        { title: "أصول القراء الثلاثة المتممين للعشرة", desc: "شرح أصول الدرة المضية للإمام ابن الجزري وضبط مخارج الروايات المتممة." },
        { title: "منهجية وطرق جمع القراءات بمجالس التلاوة", desc: "التطبيق العملي على الجمع بالآية والجمع بالوقف وإتقان الانتقال بين الروايات." },
        { title: "مجالس الختم والإقراء والإجازة المسندة", desc: "مجلس القراءة الكاملة وختم الكتاب العزيز والحصول على السند المتصل." }
      ]
    },
    'shatibiyyah-durrah': {
      title: "منظومة الشاطبية والدرة في القراءات",
      tagline: "ضوابط القراءات السبع والعشر المتواترة",
      path: "مسار القرآن الكريم",
      image: "/images/course_shatibiyyah.png",
      duration: "50 ساعة دراسية",
      level: "متقدم",
      syllabus: "الشاطبية والدرة",
      importance: "دراسة المنظومة اللامية الشهيرة للشاطبي والمنظومة الثلاثية للجزري تعتبر المفتاح لحفظ أصول القراءات وضبط أوجه الخلاف دون تشتت، وهي العمدة لكل متصدر لعلم الإقراء.",
      whatYouLearn: [
        "أبيات متن الشاطبية في القراءات السبع وشرح رموزها الدقيقة.",
        "الدرة المضية للإمام ابن الجزري في القراءات الثلاث المتممة للعشر.",
        "تحريرات القراءات وضوابط الأوجه الراجحة والمعمول بها.",
        "التطبيق العملي لأبيات الفرش والأصول أثناء تلاوة الآيات."
      ],
      outcomes: [
        { title: "حفظ المتون", desc: "حفظ واستظهار الأبيات التأسيسية التي تيسر استحضار أحكام القراءات." },
        { title: "تحرير الأوجه", desc: "معرفة أوجه القراءة الصحيحة والتحريرات المعتمدة للامتناعات." },
        { title: "تأصيل علمي", desc: "بناء ملكة علمية متينة تؤهل الطالب لدراسة طيبة النشر والقراءات الكبرى." }
      ],
      relatedSlugs: ["10-qiraat", "mushaf-script", "waqf-ibtida"],
      studyPlan: [
        { title: "رموز الشاطبية وااصطلاحات الناظم", desc: "شرح الرموز الحرفية الفردية والجمعية والرموز بالضد لفك مغاليق المنظومة اللامية." },
        { title: "دراسة وحفظ أبواب الأصول والفرش", desc: "المرور المنهجي على الأبواب التمهيدية وحفظ أبيات فرش الحروف في جميع السور." },
        { title: "شرح متن الدرة المضية وأبياتها", desc: "شرح المنظومة الثلاثية لابن الجزري وبيان وجوه الاتفاق والاختلاف مع الشاطبية." },
        { title: "تحريرات الأوجه والامتناعات الأدائية", desc: "تحرير الخلافات والوجه المقدم أداءً وصون القراءة من الخلط التركيبي." }
      ]
    },
    'mushaf-script': {
      title: "رسم المصحف العثماني وضبطه",
      tagline: "قواعد كتابة المصحف وتاريخ تدوينه",
      path: "مسار القرآن الكريم",
      image: "/images/pillar-manuscript.png",
      duration: "30 ساعة دراسية",
      level: "تأصيلي",
      syllabus: "متن العقيلة وأصول الرسم",
      importance: "رسم المصحف العثماني توقيفي وله ضوابط تحميه وتوضح القراءات المقبولة وتمنع التحريف. هذا الكورس يدرس طريقة تدوين النص وحمايته عبر العصور والتاريخ الإملائي.",
      whatYouLearn: [
        "تاريخ كتابة القرآن الكريم منذ عهد النبي ﷺ والجمعين البكري والعثماني.",
        "قواعد الرسم العثماني الستة (الحذف، الزيادة، الهمز، البدل، الوصل والفصل، ما فيه قراءتان).",
        "قواعد الضبط القرآني وتطوره من النقط والتشكيل إلى الشكل المعاصر.",
        "دراسة مقارنة بين رسم المصحف والرسم الإملائي المعاصر."
      ],
      outcomes: [
        { title: "فهم تاريخ النص", desc: "إدراك متين لكيفية وصول النص القرآني كتابةً وضبطاً عبر الأجيال." },
        { title: "إتقان قواعد الرسم", desc: "كتابة الكلمات على الرسم العثماني الصحيح وفهم أسراره البيانية." },
        { title: "دراسة المتون", desc: "التعرف على منظومة عقيلة أتراب القصائد للإمام الشاطبي في الرسم." }
      ],
      relatedSlugs: ["quran-tajweed", "quranic-sciences-tafsir", "shatibiyyah-durrah"],
      studyPlan: [
        { title: "مراحل الكتابة والجمع والتدوين التاريخي", desc: "دراسة كتابة الوحي بين يدي النبي ﷺ، وجمع أبي بكر، ونسخ المصاحف العثمانية وإرسالها للأمصار." },
        { title: "القواعد الست لرسم المصاحف العثمانية", desc: "التحصيل التفصيلي لقواعد الحذف، الزيادة، الهمز، البدل، الفصل والوصل، ورسم الكلمات متواترة القراءة." },
        { title: "تطور علم الضبط والنقط والرموز المستحدثة", desc: "دراسة تاريخ نقط الإعراب لنصر بن عاصم ويحيى بن يعمر، ونقط الإعجام، وتعديل الخليل بن أحمد." },
        { title: "تحليل المتون الأثرية وتوجيه الرسم قياساً", desc: "دراسة منظومة عقيلة أتراب القصائد للشاطبي وتوجيه الفروق بين الكتابة واللفظ." }
      ]
    },
    'quranic-sciences-tafsir': {
      title: "علوم القرآن وأصول التفسير",
      tagline: "مناهج المفسرين وقواعد استنباط المعاني",
      path: "مسار القرآن الكريم",
      image: "/images/pillar-study.png",
      duration: "40 ساعة دراسية",
      level: "تأصيلي",
      syllabus: "مناهج التفسير وعلوم القرآن",
      importance: "الهدف من إنزال القرآن هو التدبر والعمل، ولا يتأتى ذلك إلا بفهم أصول التفسير ومناهج العلماء الأعلام، ودراسة مباحث التنزيل وأسباب النزول والنسخ.",
      whatYouLearn: [
        "مباحث علوم القرآن: المكي والمدني، أسباب النزول، الناسخ والمنسوخ، المحكم والمتشابه.",
        "أصول التفسير وقواعده والفرق بين التفسير بالرأي والتفسير بالماثور.",
        "تراجم المفسرين الأعلام ودراسة مناهجهم (ابن جرير، القرطبي، ابن كثير...).",
        "تطبيقات عملية على تدبر وفهم آيات الأحكام والعقيدة."
      ],
      outcomes: [
        { title: "تدبر منهجي", desc: "فهم معاني الآيات بناءً على قواعد اللغة العربية والماثور الشرعي بعيداً عن الرأي المذموم." },
        { title: "أدوات الاستنباط", desc: "معرفة كيفية تعامل المفسرين والفقهاء مع النص واستنباط الدلالات." },
        { title: "أمان معرفي", desc: "بناء حصانة ضد التفاسير المعاصرة الشاذة والتأويلات الباطلة." }
      ],
      relatedSlugs: ["quran-tajweed", "mushaf-script", "islamic-creed"],
      studyPlan: [
        { title: "مباحث الوحي والتنزيل والجمع القرآني", desc: "دراسة كيف نزل القرآن، والمكي والمدني، والفرق بينهما، وتاريخ جمع النص الشريف." },
        { title: "أسباب النزول والنسخ والمحكم والمتشابه", desc: "تحديد دلالات أسباب النزول، وضوابط النسخ في الأحكام، ودراسة المحكم والمتشابه والرد على الشبهات." },
        { title: "قواعد وأصول التفسير ومناهج العلماء", desc: "دراسة طرق التفسير المقبولة وقواعد استنباط المعاني، وتصنيف مناهج المفسرين الأعلام." },
        { title: "التطبيقات العملية والتدبر المنهجي للآيات", desc: "دراسة تطبيقية على سور مخصصة لاستنباط الأحكام اللغوية والعقائدية والفقهية." }
      ]
    },
    'waqf-ibtida': {
      title: "علم الوقف والابتداء في التلاوة",
      tagline: "حفظ المعنى وصون الأداء القرآني",
      path: "مسار القرآن الكريم",
      image: "/images/course_quran.png",
      duration: "24 ساعة دراسية",
      level: "متقدم / تخصصي",
      syllabus: "أحكام الوقف والابتداء",
      importance: "الوقف والابتداء علم شريف يرتبط بالنحو والتفسير، قال علي رضي الله عنه: \"التجويد هو حروف مخارجها ومعرفة الوقوف\". الوقف الخاطئ قد يفسد المعنى تماماً ويشوش السامع.",
      whatYouLearn: [
        "أنواع الوقف الأربعة: الاضطراري، الاختباري، الانتظاري، والاختياري.",
        "أقسام الوقف الاختياري المعتمدة: التام، الكافي، الحسن، والقبيح.",
        "قواعد الابتداء الصحيح بعد الوقف وعلاقة الوقف بالإعراب اللغوي.",
        "تطبيقات عملية مكثفة على مواضع الوقف في طوال السور."
      ],
      outcomes: [
        { title: "حماية المعنى", desc: "الوقوف في مواضع تامة أو كافية تبرز روعة النظم والمعاني القرآنية." },
        { title: "معرفة إعرابية", desc: "تطبيق الإعراب والقواعد النحوية على تحديد نهايات وبدايات الجمل." },
        { title: "ثقة الأداء", desc: "القراءة في المحافل والمجالس بثقة وبنية وقفية سليمة دون انقطاع نفس عشوائي." }
      ],
      relatedSlugs: ["quran-tajweed", "shatibiyyah-durrah", "arabic-grammar"],
      studyPlan: [
        { title: "مفهوم الوقف وأهميته وأقسامه العامة", desc: "دراسة تعريف الوقف لغة واصطلاحاً، والفرق بين الوقف والقطع والسكت، وعلاقة ذلك بالمعاني." },
        { title: "الوقف الاختياري بأقسامه الأربعة المعتمدة", desc: "دراسة الوقف التام، الوقف الكافي، الوقف الحسن، وتحديد مواضع الوقف القبيح وعللها التفسيرية." },
        { title: "قواعد الابتداء الصحيح بعد الوقوف المختلفة", desc: "بيان كيفية الابتداء بالكلمات بعد الوقف التام والكافي والحسن، وأحكام همزات الوصل." },
        { title: "التطبيقات العملية المكثفة وسور المحاكاة", desc: "قراءة الطالب في السور الكبرى وتصويب الشيوخ لمواضع وقوفه وابتدائه لترسيخ الملكة الأدائية." }
      ]
    },
    'arabic-grammar': {
      title: "النحو والصرف العربي",
      tagline: "مفتاح فهم الوحيين واللسان العربي الأصيل",
      path: "مسار اللغة العربية",
      image: "/images/course_arabic.png",
      duration: "50 ساعة دراسية",
      level: "تأسيسي / تمكيني",
      syllabus: "الآجرومية وقطر الندى",
      importance: "قواعد النحو والصرف هي حجر الأساس لصون اللسان العربي وفهم نصوص القرآن والسنة بدقة. بدون النحو لا يمكن فهم المعاني الصحيحة ولا إعراب الكلام، وهو أول ما يدرس لطلاب التراث.",
      whatYouLearn: [
        "أقسام الكلام، وعلامات الأسماء والأفعال والحروف، وحقيقة الإعراب والبناء.",
        "دراسة تفصيلية للمرفوعات والمنصوبات والمجرورات من الأسماء.",
        "علم الصرف: أوزان الكلمات، الميزان الصرفي، تصريف الأفعال وتوليد المشتقات.",
        "التدريب العملي المكثف على الإعراب التطبيقي للآيات والشواهد الشعرية."
      ],
      outcomes: [
        { title: "إعراب صحيح", desc: "القدرة على إعراب الجمل العربية بدقة وفهم الحركات الإعرابية وموجباتها." },
        { title: "صون اللسان", desc: "القراءة والكلام بلغة عربية فصحى صحيحة دون لحن إعرابي." },
        { title: "فهم البنية", desc: "معرفة كيفية صياغة وتصريف الأفعال وبناء التراكيب الصرفية المعقدة." }
      ],
      relatedSlugs: ["arabic-literature", "alfiya-ibn-malik", "waqf-ibtida"],
      studyPlan: [
        { title: "مقدمات النحو وعلامات الكلم وباب الإعراب", desc: "دراسة أقسام الكلام وعلامات الاسم والفعل والحرف، ومعرفة علامات الإعراب الأصلية والنائبة." },
        { title: "مرفوعات الأسماء ومنصوباتها بالتفصيل", desc: "دراسة الفاعل، المبتدأ والخبر، نواسخ الابتداء، المفاعيل الخمسة، الحال، التمييز، والمنادى." },
        { title: "مجرورات الأسماء وعلم التوابع والإضافة", desc: "تفصيل المجرور بالحرف وبالإضافة، ودراسة النعت، العطف، التوكيد، والبدل." },
        { title: "علم الصرف والميزان واشتقاق المشتقات", desc: "دراسة بنية الكلمة العربية وأوزانها الصرفية، وتصريف الأفعال والاشتقاق وتوليد الأسماء والمشتقات." }
      ]
    },
    'arabic-literature': {
      title: "الأدب والبلاغة والبيان",
      tagline: "جماليات اللسان وتذوق بلاغة النظم",
      path: "مسار اللغة العربية",
      image: "/images/course_literature.png",
      duration: "45 ساعة دراسية",
      level: "تأصيلي / تذوقي",
      syllabus: "روائع البلاغة والمعلقات",
      importance: "البلاغة هي روح اللغة العربية وموطن إعجاز القرآن. دراسة البلاغة تمنح الطالب تذوق النظم القرآني الرفيع وفهم أسرار الفصاحة والأدب الكلاسيكي والشعر العربي القديم.",
      whatYouLearn: [
        "علم المعاني: أحوال الإسناد الخبري، الإنشاء والطلب، التقديم والتأخير، الإيجاز والإطناب.",
        "علم البيان: التشبيه، المجاز المرسل، الاستعارة، والكناية وتطبيقاتها.",
        "علم البديع: المحسنات اللفظية والمعنوية كالسجع والجناس والطباق.",
        "دراسة وتحليل عيون الشعر الجاهلي والإسلامي (المعلقات وروائع البلاغة)."
      ],
      outcomes: [
        { title: "تذوق بلاغي", desc: "إدراك وجوه الإعجاز البلاغي والبياني في القرآن الكريم والحديث الشريف." },
        { title: "أسلوب راقٍ", desc: "تنمية الملكة الأدبية وبناء أسلوب كتابي وتعبيري بليغ ورفيع." },
        { title: "نقد أدبي", desc: "القدرة على نقد وتحليل النصوص الأدبية والقصائد وفهم أبعادها معنوية." }
      ],
      relatedSlugs: ["arabic-grammar", "alfiya-ibn-malik", "islamic-logic"],
      studyPlan: [
        { title: "علم المعاني وأحوال النظم والتراكيب الجملية", desc: "دراسة الخبر والإنشاء وأغراضهما، وأحوال المسند والمسند إليه، والإيجاز والإطناب والمساواة." },
        { title: "علم البيان والتصوير الفني والمجازات الأدبية", desc: "شرح التشبيه بأقسامه، والمجاز المرسل والعقلي، والاستعارة المكنية والتصريحية، والكناية." },
        { title: "علم البديع والمحسنات البديعية اللفظية والمعنوية", desc: "دراسة السجع، الجناس، الاقتباس، الجناس التام والناقص، الطباق والمقابلة وحسن التعليل." },
        { title: "التحليل الأدبي للقصائد وروائع المعلقات والخطب", desc: "دراسة نقدية تطبيقية لأشعار قديمة ونصوص نثرية تراثية لتنمية الملكة وتذوق بلاغة القرآن." }
      ]
    },
    'alfiya-ibn-malik': {
      title: "ألفية ابن مالك في النحو والصرف",
      tagline: "التاج العلمي والنحوي لمتخصصي لغة الضاد",
      path: "مسار اللغة العربية",
      image: "/images/article_grammar.png",
      duration: "80 ساعة دراسية",
      level: "متقدم جداً",
      syllabus: "ألفية ابن مالك بشرح ابن عقيل",
      importance: "الألفية هي عمدة النحاة والتاج الذهبي لدراسة اللغة العربية. حفظ الألفية وفهمها يفرع المسائل ويبني ملكة لغوية متكاملة تؤهل الطالب للفتوى والاستنباط الشرعي بتمكن تام.",
      whatYouLearn: [
        "ألف بيت في النحو والصرف للإمام محمد بن مالك واستظهارها المنهجي.",
        "الشرح الوافي لأبيات الألفية والمقارنة بين مدرستي البصرة والكوفة.",
        "تفصيل شواهد النحو الشعرية ومناقشة العلل النحوية واللغوية المعقدة.",
        "التمكين الإعرابي للنصوص والمنظومات التراثية على اختلاف مستوياتها."
      ],
      outcomes: [
        { title: "حفظ المتون", desc: "حفظ واستظهار الأبيات التأسيسية التي تيسر استحضار أحكام القراءات." },
        { title: "تحرير الأوجه", desc: "معرفة أوجه القراءة الصحيحة والتحريرات المعتمدة للامتناعات." },
        { title: "تأصيل علمي", desc: "بناء ملكة علمية متينة تؤهل الطالب لدراسة طيبة النشر والقراءات الكبرى." }
      ],
      relatedSlugs: ["arabic-grammar", "arabic-literature", "principles-of-fiqh"],
      studyPlan: [
        { title: "شرح وتأصيل المائتين الأولى من متن الألفية", desc: "دراسة المقدمات، والمعرب والمبني، والنواسخ الثلاثة لـ كان وأخواتها وإن وأخواتها ولا النافية للجنس." },
        { title: "شرح المرفوعات والمنصوبات والأفعال المتعدية", desc: "دراسة الفاعل، والنائب، وظن وأخواتها، والمفاعيل، الاستثناء، والحال، والتمييز بشرح ابن عقيل." },
        { title: "دراسة حروف الجر والإضافة والتوابع وموانع الصرف", desc: "دراسة حروف الجر، والإضافة، وإعمال المصدر والأسماء المشتقة، والتوابع الأربعة، والمنع من الصرف." },
        { title: "الأبواب الصرفية الدقيقة والإعلال والإبدال والنسب", desc: "الوقوف على الأبواب الصرفية الكبرى كالتصغير، النسب، الإعلال بالنقل والقلب، والإبدال والوقف." }
      ]
    },
    'islamic-fiqh': {
      title: "الفقه الإسلامي الأكاديمي",
      tagline: "التفقه في الدين وتأصيل العبادات والمعاملات",
      path: "مسار العلوم الشرعية",
      image: "/images/course_fiqh.png",
      duration: "48 ساعة دراسية",
      level: "تأسيسي / تأصيلي",
      syllabus: "المتون الفقهية المعتمدة",
      importance: "التفقه في الدين ومعرفة الأحكام العملية للعبادات والمعاملات من أوجب الواجبات، لتكون العبادة قائمة على علم صحيح وموافقة للسنة المطهّرة كما نقلها أصحاب المذاهب المعتمدة.",
      whatYouLearn: [
        "أحكام الطهارة والصلاة وشروطها وسننها ونواقضها ومكروهاتها بالتفصيل.",
        "أحكام الزكاة، الصوم وأسراره، والحج ومناسكه وآدابه.",
        "مبادئ فقه المعاملات والبيوع والأحوال الشخصية والأنكحة وفق المذاهب المعتمدة.",
        "تأصيل الفروع الفقهية بالربط بين المتون الكلاسيكية وأدلتها من السنة المطهّرة."
      ],
      outcomes: [
        { title: "عبادة صحيحة", desc: "أداء العبادات وفق أحكام شرعية دقيقة وصحيحة خالية من الشوائب والشكوك." },
        { title: "تفقه منهجي", desc: "معرفة تسلسل الأحكام الفقهية وتأصيل المسائل من المتون المعتمدة وفق مذهب الطالب." },
        { title: "وعي بالمعاملات", desc: "تطبيق الأحكام الشرعية على البيوع اليومية وتجنب المعاملات الربوية والمحظورة." }
      ],
      relatedSlugs: ["principles-of-fiqh", "islamic-creed", "quranic-sciences-tafsir"],
      studyPlan: [
        { title: "فقه الطهارة والصلاة وأحكامهما التفصيلية", desc: "أحكام المياه، الوضوء، الغسل، التيمم، وأركان الصلاة وشروطها وسننها وسجود السهو وفق المتون المعتمدة." },
        { title: "فقه الصيام والزكاة ومناسك الحج والعمرة", desc: "شروط الصوم ومبطلاته، نصاب الزكاة ومصارفها، وأركان الحج وسننه ومحظورات الإحرام بالتفصيل." },
        { title: "فقه المعاملات والبيوع والأحكام المالية", desc: "دراسة البيوع المنهي عنها، الربا والصرف، الشراكات، الإجارة والرهن والتبرعات وفق المتون المعتمدة." },
        { title: "فقه النكاح والفرائض والأنكحة المذهبية", desc: "أحكام النكاح وشروطه، والطلاق والعدة، وقواعد توزيع التركات والمواريث الفرضية." }
      ]
    },
    'islamic-creed': {
      title: "العقيدة الإسلامية والتوحيد",
      tagline: "أصول الدين ورسوخ اليقين على منهج أهل السنة",
      path: "مسار العلوم الشرعية",
      image: "/images/course_aqidah.png",
      duration: "36 ساعة دراسية",
      level: "تأصيلي / عقدي",
      syllabus: "الجوهرة والسنوسية",
      importance: "صحة العقيدة هي أساس قبول الأعمال وركيزة الاستقرار النفسي والفكري. يهدف الكورس إلى بناء يقين راسخ وتأصيل مسائل التوحيد، مع الرد العلمي الرصين على الشبهات والأفكار الإلحادية المعاصرة.",
      whatYouLearn: [
        "مباحث الإلهيات: صفات الجلال والكمال الواجبة والمستحيلة والجائزة في حق الله.",
        "مباحث النبوات: صفات الرسل الكرام، العصمة، المعجزات، وحقوق النبي ﷺ.",
        "مباحث السمعيات: الغيبيات، البرزخ، الحساب، اليوم الآخر، والجنة والنار.",
        "تأصيل منهج أهل السنة والجماعة والرد على الإشكالات والشبهات الفلسفية."
      ],
      outcomes: [
        { title: "يقين راسخ", desc: "بناء عقيدة واضحة متينة قائمة على الأدلة النقلية والبرهنة العقلية السليمة." },
        { title: "حصانة فكرية", desc: "الحصانة التامة ضد الشبهات العصرية وموجات التشكيك والإلحاد الحديث." },
        { title: "فهم التراث", desc: "قراءة وفهم شروح المتون العقدية الشهيرة مثل جوهرة التوحيد للإمام اللقاني." }
      ],
      relatedSlugs: ["islamic-logic", "quranic-sciences-tafsir", "islamic-fiqh"],
      studyPlan: [
        { title: "الإلهيات: ما يجب وما يستحيل وما يجوز في حق الله", desc: "دراسة الصفات العشرين الواجبة لله (الصفة النفسية، السلبية، المعاني، المعنوية) وبرهانها العقلي." },
        { title: "النبوات: أحكام الرسل الكرام والرسالة الإلهية والعصمة", desc: "ما يجب في حق الأنبياء من الصدق والأمانة والتبليغ والفطانة، وما يستحيل عليهم وعصمتهم من الصغائر والكبائر." },
        { title: "السمعيات: الغيبيات واليوم الآخر وعوالم الغيب", desc: "الإيمان بسؤال القبر وعذابه، الحشر، النشر، الحوض، الصراط، الميزان، والجنة والنار ونية الرؤية." },
        { title: "دراسة المذاهب والردود العلمية على الشبهات", desc: "أصول منهج أهل السنة والجماعة وتاريخ المذاهب الكلامية، والرد على الفلسفات الإلحادية والمادية المعاصرة." }
      ]
    },
    'islamic-logic': {
      title: "علم المنطق وقواعد التفكير",
      tagline: "آلة العلوم العقيلة وضوابط الاستدلال الذهني",
      path: "مسار العلوم الشرعية",
      image: "/images/course_logic.png",
      duration: "30 ساعة دراسية",
      level: "تأصيلي / عقلي",
      syllabus: "السلم المنورق للإمام الأخضري",
      importance: "يسمى علم المنطق \"خادم العلوم\" أو \"معيار العلم\" لأنه يضبط التفكير العقلي ويمنع الذهن من الوقوع في الخطأ، ويفيد طالب العلم في تحرير المصطلحات، وتدقيق الاستدلال والبحث والمناظرة.",
      whatYouLearn: [
        "مقدمات علم المنطق ومباحث الألفاظ والدلالات والمفاهيم.",
        "التعريفات والكليات الخمسة وقواعد صياغة التعاريف العلمية المنضبطة.",
        "مباحث التصديقات والقضايا وأنواعها وأحكام التناقض والعكس.",
        "القياس المنطقي وأشكاله وشروطه وقواعد البرهنة والرد على المغالطات."
      ],
      outcomes: [
        { title: "تفكير سليم", desc: "تنظيم الأفكار العقلية وضبط الاستدلال وبناء براهين متماسكة وخالية من الخلل." },
        { title: "تحرير المصطلحات", desc: "فهم التعاريف الدقيقة والتقسيمات الواردة في شروح كتب التراث وأصول الفقه." },
        { title: "كشف المغالطات", desc: "القدرة الفائقة على تمييز المغالطات الفكرية والرد عليها بأسلوب عقلي مقنع." }
      ],
      relatedSlugs: ["islamic-creed", "principles-of-fiqh", "arabic-literature"],
      studyPlan: [
        { title: "تعريف المنطق والدلالات اللفظية وأحكام الألفاظ", desc: "دراسة مبادئ المنطق، والدلالات اللفظية الوضعية (المطابقة، التضمن، الالتزام) وعلاقة الألفاظ بالمعاني." },
        { title: "الكليات الخمس والمفاهيم وباب التعريفات والحدود", desc: "دراسة الجنس، الفصل، النوع، الخاصة، العرض العام، وقواعد صياغة التعاريف بالحد والرسم." },
        { title: "القضايا الحملية والشرطية وأحكام التناقض والعكس", desc: "بناء القضايا المنطقية والفرق بين الحملية والشرطية، وتطبيق قوانين التناقض وعكس القضايا المنهجي." },
        { title: "الأقيسة المنطقية والبرهان والمغالطات الذهنية", desc: "صياغة الأقيسة الاستدلالية بالأشكال الأربعة، وشروط الإنتاج، والتعرف على المغالطات الفكرية وتفكيكها." }
      ]
    },
    'principles-of-fiqh': {
      title: "أصول الفقه وقواعد الاستنباط",
      tagline: "منهجية الفهم الشرعي واستخراج الأحكام من الأدلة",
      path: "مسار العلوم الشرعية",
      image: "/images/pillar-study.png",
      duration: "40 ساعة دراسية",
      level: "تأصيلي / متقدم",
      syllabus: "الورقات ومرتقى الوصول",
      importance: "أصول الفقه هو الدستور المنهجي الذي وضعه الأئمة لبيان كيفية استخراج الفروع الفقهية من أدلتها التفصيلية. دراسته تمنح الطالب فهم شمولية الشريعة وعقلية الفقيه المجتهد.",
      whatYouLearn: [
        "تعريف أصول الفقه والأحكام التكليكفية والوضعية وشروط التكليف.",
        "الأدلة المتفق عليها (القرآن، السنة، الإجماع، القياس) والأدلة المختلف فيها.",
        "دلالات الألفاظ: الأمر والنهي، العام والخاص، المطلق والمقيد، المجمل والمبين.",
        "الاجتهاد والتقليد والإفتاء ومباحث تعارض الأدلة والترجيح."
      ],
      outcomes: [
        { title: "عقلية أصولية", desc: "فهم كيفية صناعة الحكم الفقهي وكيف تعامل الأئمة مع نصوص الوحي." },
        { title: "تأصيل رصين", desc: "معرفة ضوابط ومقاصد الشريعة الإسلامية لحماية الفتاوى من التعنت أو التميع." },
        { title: "دراسة المتون", desc: "التعرف على متن الورقات لإمام الحرمين الجويني وتطبيقاته الأصولية." }
      ],
      relatedSlugs: ["islamic-fiqh", "islamic-logic", "alfiya-ibn-malik"],
      studyPlan: [
        { title: "مقدمات أصول الفقه وباب الأحكام الشرعية", desc: "تعريف أصول الفقه، وتفصيل الأحكام التكليفية السبعة والأحكام الوضعية وشروط التكليف الشرعي." },
        { title: "دلالات الألفاظ والأمر والنهي والعموم والخصوص", desc: "دراسة صيغ الأمر والنهي ومقتضياتهما، وألفاظ العموم والخصوص المطلق والمقيد والمجمل والمبين." },
        { title: "الأدلة الشرعية المتفق عليها والمختلف فيها أصولياً", desc: "حجية القرآن والسنة وشروطهما، والإجماع، والقياس وأركانه وعلله، والمصالح المرسلة والاستصحاب." },
        { title: "الاجتهاد وشروطه وأحكام التقليد والإفتاء والتنازع", desc: "شروط مرتبة الاجتهاد، وأحكام المقلد والمجتهد، وآداب الفتوى وحل تعارض الأدلة والترجيح." }
      ]
    }
  },
  en: {
    'quran-tajweed': {
      title: "Quranic Recitation & Tajweed with Isnad",
      tagline: "Perfect Pronunciation & Connected Chain of Transmission",
      path: "Quranic Sciences Path",
      image: "/images/course_quran.png",
      duration: "40 Study Hours",
      level: "Foundational / Core",
      syllabus: "Tuhfat al-Atfal & Al-Jazariyyah",
      importance: "Reciting the Holy Quran correctly is an individual obligation upon every Muslim. This course establishes flawless pronunciation, protecting the tongue from mistakes while reciting.",
      whatYouLearn: [
        "Accurate articulation points of Arabic letters and their intrinsic attributes.",
        "Core Tajweed rules: Noon and Meem Sakinah, Mudood (elongation), and rules of stopping/starting.",
        "Direct practical correction and evaluation of recitation in real-time.",
        "Guided memorization of portions of the Quran matching student pace."
      ],
      outcomes: [
        { title: "Flawless Recitation", desc: "Read any page in the Quran confidently without phonetic or grammatical errors." },
        { title: "Structured Memorization", desc: "Memorize sections with strict retrieval standards and scheduled revisions." },
        { title: "Textual Studies", desc: "Study classical treatises (Tuhfat al-Atfal, Al-Jazariyyah) for advanced seekers." }
      ],
      relatedSlugs: ["10-qiraat", "waqf-ibtida", "quranic-sciences-tafsir"],
      studyPlan: [
        { title: "Articulation & Intrinsic Attributes", desc: "Correction of raw Arabic phonetics, study of the 17 articulation points (Makharij)." },
        { title: "Tajweed Rules & Foundations", desc: "Studying specific rules governing Noon/Meem Sakinah, Mudood (elongations), and phonetics." },
        { title: "Syllabus Treatise & Stopping Rules", desc: "Studying Tuhfat al-Atfal poem, understanding rules of starting and pausing (Waqf)." },
        { title: "Oral Recitation & Sanad Matching", desc: "Full reading or memorization check under the instructor to achieve scholarly graduation." }
      ]
    },
    '10-qiraat': {
      title: "The 10 Mutawatir Quranic Recitations",
      tagline: "Mastering Textual Variants and connected Isnad",
      path: "Quranic Sciences Path",
      image: "/images/article_qiraat.png",
      duration: "60 Study Hours",
      level: "Very Advanced",
      syllabus: "Shatibiyyah & Durrah manuals",
      importance: "Understanding the mutawatir recitations protects the Quranic text from alteration and displays its lexical richness. This path is dedicated to students pursuing direct academic Ijaza.",
      whatYouLearn: [
        "Core rules of the 7 recitations from the Shatibiyyah pathway (Nafi', Asim, Hamzah...).",
        "Core rules of the 3 complementary recitations from the Durrah pathway.",
        "Traditional combining methods (Jam') during recitation sessions.",
        "Ijaza requirements and validation chains back to the Prophet ﷺ."
      ],
      outcomes: [
        { title: "Sanad Certification", desc: "Obtain a connected chain of transmission (Isnad) to the Prophet ﷺ upon full completion." },
        { title: "Recitation Variants", desc: "Distinguish between the unique grammatical and lexical rules of each reciter." },
        { title: "Comparative Analysis", desc: "Analyze the impact of different recitations on Tafsir and Islamic law." }
      ],
      relatedSlugs: ["quran-tajweed", "shatibiyyah-durrah", "mushaf-script"],
      studyPlan: [
        { title: "Principles of Seven Reciters (Shatibiyyah)", desc: "Study basic rules, parsing variants, and specific rules of the seven canonical paths." },
        { title: "Principles of Three Reciters (Durrah)", desc: "Mastering variants of Abu Jaafar, Yaqub, and Khalaf from the Durrah poem." },
        { title: "Combining Methods in Recitation", desc: "Practical training on variant combining methods (Jam') in single oral sessions." },
        { title: "Sanad Certification & Graduation", desc: "Completion of the full Quran recitation to claim the traditional linked chain (Isnad)." }
      ]
    },
    'shatibiyyah-durrah': {
      title: "Shatibiyyah & Durrah Treatises",
      tagline: "Codifying the Seven and Ten Recitations",
      path: "Quranic Sciences Path",
      image: "/images/course_shatibiyyah.png",
      duration: "50 Study Hours",
      level: "Advanced",
      syllabus: "Matn al-Shatibiyyah & al-Durrah",
      importance: "Explicit rules of the famous didactic poems of Imam al-Shatibi and Imam Ibn al-Jazari is the key to memorizing variant rules. This is a primary requirement for anyone aspiring to teach recitation.",
      whatYouLearn: [
        "Deciphering the symbolic language and structure of the Shatibiyyah poem.",
        "Exploring the rules of the three complementary recitations via Al-Durrah al-Mudiyyah.",
        "Understanding variant verification and resolving contradictory combinations.",
        "Practical application of poetry rulings during oral recitation."
      ],
      outcomes: [
        { title: "Text Memorization", desc: "Memorize critical verses that summarize variant rules for quick recall." },
        { title: "Rule Resolution", desc: "Determine valid variants and resolve conflicting options during recitation." },
        { title: "Academic Foundation", desc: "Establish a solid foundation to pursue the major ten recitations (Tayyibat al-Nashr)." }
      ],
      relatedSlugs: ["10-qiraat", "mushaf-script", "waqf-ibtida"],
      studyPlan: [
        { title: "Shatibiyyah Symbols & Glossary", desc: "Mastering the letter/word symbolism designed by Imam al-Shatibi to navigate rules." },
        { title: "Studying Core Chapters (Usul)", desc: "Systematic check of phonetic chapters: vocalic elongation, assimilation, and exceptions." },
        { title: "Al-Durrah al-Mudiyyah Additions", desc: "Explaining Ibn al-Jazari's supplementary rules to finalize the ten variant paths." },
        { title: "Text verification & Combining Rules", desc: "Applying poetry analysis to identify legal boundaries of combined oral variants." }
      ]
    },
    'mushaf-script': {
      title: "Quranic Orthography & Writing Rules",
      tagline: "Preserving the Uthmanic Manuscript Heritage",
      path: "Quranic Sciences Path",
      image: "/images/pillar-manuscript.png",
      duration: "30 Study Hours",
      level: "Core / Academic",
      syllabus: "Uthmanic script rules & primers",
      importance: "The writing script of the Quran is a revelation-guided standard (Tawqifi). This course teaches the rules of how the text was codified under Caliph Uthman and preserved across generations.",
      whatYouLearn: [
        "Historical phases of Quran compilation in the Prophetic and companion eras.",
        "The six rules of Uthmanic spelling (deletion, addition, hamza, substitution, conjunction/disjunction).",
        "The evolution of Arabic vowels, dots, and formatting symbols in early Mushafs.",
        "Comparative study between standard modern spelling and scriptural rules."
      ],
      outcomes: [
        { title: "Manuscript History", desc: "Acquire deep understanding of how the Quranic text reached us unchanged in written format." },
        { title: "Writing Integrity", desc: "Learn to spell and write Quranic words according to traditional scriptural protocols." },
        { title: "Treatise Study", desc: "Familiarization with classical textbooks (Aqilah atrab al-qasa'id) on spelling." }
      ],
      relatedSlugs: ["quran-tajweed", "quranic-sciences-tafsir", "shatibiyyah-durrah"],
      studyPlan: [
        { title: "Scribal History of the Holy Text", desc: "Study of revelation recorders, compilation under Abu Bakr, and copy distribution under Uthman." },
        { title: "The Six Essential Rules of Orthography", desc: "Mastering exceptions in spelling: deleted vowels, added consonants, substitute symbols, and spacing." },
        { title: "Vowel Notation and Script Enhancements", desc: "From early dot indicators of Abu al-Aswad to the modern system finalized by Al-Khalil." },
        { title: "Comparative Structural Analysis", desc: "Comparing standard spelling systems with scriptural rules and understanding theological benefits." }
      ]
    },
    'quranic-sciences-tafsir': {
      title: "Quranic Sciences & Tafsir Principles",
      tagline: "Methodology of Commetary and Translation Keys",
      path: "Quranic Sciences Path",
      image: "/images/pillar-study.png",
      duration: "40 Study Hours",
      level: "Core / Academic",
      syllabus: "Tafsir methodology texts",
      importance: "The ultimate target of Quranic revelation is contemplation and actions. This course builds the academic tools to understand the meanings and historical contexts of the holy text.",
      whatYouLearn: [
        "Core subjects: Makki vs Madani, contexts of revelation (Asbab al-Nuzul), abrogation (Naskh).",
        "Rules of commentary (Tafsir): distinguishing sound interpretations from speculative claims.",
        "Biographies of major classical commentators and their unique methodologies.",
        "Practical application on selected chapters to extract legal and ethical benefits."
      ],
      outcomes: [
        { title: "Sound Tafsir", desc: "Understand verses according to Arabic rules and sound transmitted prophetic reports." },
        { title: "Extracting Laws", desc: "Deduce legal rules, theology guidelines, and spiritual guidance directly from text." },
        { title: "Intellectual Security", desc: "Build academic defenses against modern erratic interpretations and text changes." }
      ],
      relatedSlugs: ["quran-tajweed", "mushaf-script", "islamic-creed"],
      studyPlan: [
        { title: "Introduction to Revelation & Compilation", desc: "Study of how Gabriel brought verses, distinctions of place, and compilation procedures." },
        { title: "Contextual Indicators & Abrogation", desc: "Investigating why specific verses were revealed and how legal abrogation works." },
        { title: "Methodologies of Classical Commentators", desc: "Analyzing works of Al-Tabari, Al-Qurtubi, Ibn Kathir and modern exegetical approaches." },
        { title: "Practical Exegesis & Theological Analysis", desc: "Applying methodology tools to selected surahs to practice text interpretation." }
      ]
    },
    'waqf-ibtida': {
      title: "The Science of Waqf & Ibtida (Pauses)",
      tagline: "Grammar & Meaning in Quranic Recitation",
      path: "Quranic Sciences Path",
      image: "/images/course_quran.png",
      duration: "24 Study Hours",
      level: "Advanced / Specialized",
      syllabus: "Waqf & Ibtida rules",
      importance: "The points at which a reciter pauses and starts dictate the meaning of the verse. This science utilizes Arabic syntax and theology to protect readers from introducing incorrect meanings.",
      whatYouLearn: [
        "The four categories of pause: forced, test, wait, and chosen pauses.",
        "The subcategories of chosen pause: complete (Tamm), sufficient (Kafi), good (Hasan), and bad (Qabih).",
        "Rules of beginning recitation after a pause and how it interacts with grammar.",
        "Practical oral drills on long complex verses in the Quran."
      ],
      outcomes: [
        { title: "Preserve Meanings", desc: "Learn where to stop and start to maintain theological correctness in public reading." },
        { title: "Grammar Integration", desc: "Apply knowledge of Arabic grammar and syntax to pause boundaries dynamically." },
        { title: "Recitation Endurance", desc: "Manage breath and oral delivery professionally without sudden abrupt stops." }
      ],
      relatedSlugs: ["quran-tajweed", "shatibiyyah-durrah", "arabic-grammar"],
      studyPlan: [
        { title: "Scope, Definitions, and General Rules", desc: "Introduction to the science, differences between pausing, stopping, and breath pauses." },
        { title: "Subclasses of Chosen Pauses", desc: "Detailed analysis of complete, sufficient, and good stops, and identifying prohibited stops." },
        { title: "Starting Protocols & Syntax Bridges", desc: "How to resume recitation after pauses depending on local noun and verb connections." },
        { title: "Practical Recitation Drills", desc: "Personal checks by teachers to verify pauses during long assemblies and complex chapters." }
      ]
    },
    'arabic-grammar': {
      title: "Arabic Grammar & Morphology",
      tagline: "Keys to Classical Eloquence and Text Interpretation",
      path: "Classical Arabic Path",
      image: "/images/course_arabic.png",
      duration: "50 Study Hours",
      level: "Foundational / Core",
      syllabus: "Al-Ajurrumiyyah & Qatr al-Nada",
      importance: "Grammar (Nahw) and morphology (Sarf) are the absolute keys to understanding Arabic. This course protects your tongue from errors and allows correct reading of classical texts.",
      whatYouLearn: [
        "Parts of speech, declension (I'rab) markers, and indeclinability (Bina').",
        "Detailed study of nominative, accusative, and genitive nouns.",
        "Morphology: root scales, word weights, verb scales, and derived structures.",
        "Practical parsing (I'rab) exercises of Quranic verses and classical poetry."
      ],
      outcomes: [
        { title: "Accurate Parsing", desc: "Deduce declension markers of any sentence structure in classical texts." },
        { title: "Protect Speech", desc: "Speak and read classical Arabic fluently without grammatical errors." },
        { title: "Word Construction", desc: "Conjugate verbs and derive nouns correctly using morphologic formulas." }
      ],
      relatedSlugs: ["arabic-literature", "alfiya-ibn-malik", "waqf-ibtida"],
      studyPlan: [
        { title: "Foundations of Speech & Declensions", desc: "Identifying nouns, verbs, particles, and learning the four primary indicators of I'rab." },
        { title: "Nominative & Accusative Cases", desc: "Detailed study of subject/predicate (Mubtada/Khabar), helpers, objects, and descriptors." },
        { title: "Genitive Cases & Syntactic Modifiers", desc: "Prepositional modifiers, possessives (Idhafah), and rules of grammatical dependencies." },
        { title: "Morphology Scales & Conjugation Rules", desc: "Deriving nouns, matching root weights, and conjugating verbs across different categories." }
      ]
    },
    'arabic-literature': {
      title: "Literature, Rhetoric & Eloquence",
      tagline: "Appreciating the Artistry of Arabic Prose & Poetry",
      path: "Classical Arabic Path",
      image: "/images/course_literature.png",
      duration: "45 Study Hours",
      level: "Core / Esthetics",
      syllabus: "Balaghah & Classical Anthologies",
      importance: "Rhetoric (Balaghah) is the soul of Arabic, representing the core of Quranic inimitability. This course allows students to appreciate the literary beauty of Islamic heritage.",
      whatYouLearn: [
        "Ma'ani: word ordering, statements vs inquiries, emphasis, brevity vs elaboration.",
        "Bayan: figurative language, comparisons (Tashbih), metaphors (Isti'arah), metonymy.",
        "Badi': semantic embellishments, puns, alliterations, and contrast markers.",
        "Analyzing classical pre-Islamic poems (Mu'allaqat) and Prophetic eloquence."
      ],
      outcomes: [
        { title: "Literary Taste", desc: "Appreciate the rhetorical nuances and artistic structures in the Quran and Sunnah." },
        { title: "Eloquent Expression", desc: "Refine personal writing and speech using traditional classical methods." },
        { title: "Text Analysis", desc: "Critically analyze and review Arabic poetry and historical prose structures." }
      ],
      relatedSlugs: ["arabic-grammar", "alfiya-ibn-malik", "islamic-logic"],
      studyPlan: [
        { title: "Meanings & Context Fit (Ma'ani)", desc: "Understanding how sentences match target audiences, statement types, and formatting choice." },
        { title: "Imagery & Figurative Speech (Bayan)", desc: "Mastering metaphors, symbols, similes, and implicit descriptions in sacred texts." },
        { title: "Rhetorical Embellishments (Badi')", desc: "Identifying artistic styles: internal rhymes, contrasts, synonyms, and balances." },
        { title: "Poetic Commentary & Literary History", desc: "Applying all three areas to pre-Islamic poetry and classical essays to cultivate skills." }
      ]
    },
    'alfiya-ibn-malik': {
      title: "Ibn Malik's Alfiya (Advanced Grammar)",
      tagline: "The Pinnacle of Arabic Grammar Mastery",
      path: "Classical Arabic Path",
      image: "/images/article_grammar.png",
      duration: "80 Study Hours",
      level: "Very Advanced",
      syllabus: "Alfiya poem with Ibn Aqil's explanation",
      importance: "The Alfiya is the legendary 1,000-verse poem summarizing Arabic syntax and morphology. Mastery of this text represents scholarly completion of language sciences.",
      whatYouLearn: [
        "Memorizing and reciting the 1,000 grammatical verses of Imam Ibn Malik.",
        "In-depth analysis of disputes between Basran and Kufan schools of grammar.",
        "Parsing complex, rare, and delicate structures in Arabic literature.",
        "Deriving grammatical reasoning for jurisprudence and Tafsir applications."
      ],
      outcomes: [
        { title: "Rule Mastery", desc: "Recall any grammatical rule instantly by citing its corresponding poetic verse." },
        { title: "Scholarly Authority", desc: "Gain advanced skills necessary to teach grammar and extract rulings." },
        { title: "Text Interpretation", desc: "Address complex linguistic questions in classical commentary books." }
      ],
      relatedSlugs: ["arabic-grammar", "arabic-literature", "principles-of-fiqh"],
      studyPlan: [
        { title: "Syllable analysis of the first 250 verses", desc: "Noun classifications, declension variables, and subject-predicate auxiliary verbs." },
        { title: "Syllable analysis of verses 250 to 500", desc: "Direct objects, modifiers, exceptions, conditions, and relative clauses." },
        { title: "Syllable analysis of verses 500 to 750", desc: "Genitives, noun agents, dependencies, numerals, and morphologic variables." },
        { title: "Advanced Morphology & Poetry completion", desc: "Advanced morphologic conversions, contractions, spelling standards, and poetry review." }
      ]
    },
    'islamic-fiqh': {
      title: "Islamic Jurisprudence (Fiqh)",
      tagline: "Systematic Worship & Transaction Rulings",
      path: "Shariah Path",
      image: "/images/course_fiqh.png",
      duration: "48 Study Hours",
      level: "Foundational / Core",
      syllabus: "Accredited Manuals",
      importance: "Islamic jurisprudence teaches how to perform daily worship and contract transactions in accordance with Shariah. This course studies jurisprudence according to the major recognized schools.",
      whatYouLearn: [
        "Purification, prayer, dry ablutions, and rules of congregational worship.",
        "Zakah calculations, fast details, and pilgrimage (Hajj) rites.",
        "Transactions: sales, partnerships, hire contracts, and family law.",
        "Linking legal rulings to their primary evidences in Hadith and Quran."
      ],
      outcomes: [
        { title: "Correct Worship", desc: "Perform daily duties confidently, free from doubt and incorrect assumptions." },
        { title: "Traditional Study", desc: "Understand Shariah terms and methods from accredited manual works." },
        { title: "Safe Contracts", desc: "Avoid interest-bearing and forbidden transactions in business deals." }
      ],
      relatedSlugs: ["principles-of-fiqh", "islamic-creed", "quranic-sciences-tafsir"],
      studyPlan: [
        { title: "Rulings of Purification & Daily Prayer", desc: "Studying water categories, wudu, ghusl, prayer rules, and correction of mistakes." },
        { title: "Fasting, Zakah, and Rites of Hajj", desc: "Zakah thresholds, fasting rules, and a detailed look at pilgrimage rites." },
        { title: "Commerce, Business & Daily Transactions", desc: "Exploring permitted sales, avoiding usury (Ribba), lease rules, and partnerships." },
        { title: "Family Law & Inheritance Rules", desc: "Marriage, divorce, child custody, and basics of estate division under Shariah." }
      ]
    },
    'islamic-creed': {
      title: "Islamic Creed (Aqidah)",
      tagline: "Sunni Theology & Intellectual Foundations",
      path: "Shariah Path",
      image: "/images/course_aqidah.png",
      duration: "36 Study Hours",
      level: "Core / Academic",
      syllabus: "Jawharat al-Tawhid & Al-Sanusiyyah",
      importance: "Sound belief is the foundation of acceptance. This course provides a rational and scriptural defense of Sunni theology, protecting minds from modern doubts.",
      whatYouLearn: [
        "Ilahiyyat: necessary, impossible, and possible attributes of Allah.",
        "Nubuwwat: attributes of prophets, infallibility, and prophetic duties.",
        "Sam'iyyat: unseen matters, death, grave, resurrection, paradise, and hell.",
        "Sunni methodology vs theological sects, and addressing philosophical doubts."
      ],
      outcomes: [
        { title: "Firm Conviction", desc: "Establish sound, doubt-free belief backed by both scriptural and rational proofs." },
        { title: "Intellectual Shield", desc: "Build intellectual protection against modern atheistic philosophies and doubts." },
        { title: "Traditional Roots", desc: "Understand classical books like Jawharat al-Tawhid and its commentaries." }
      ],
      relatedSlugs: ["islamic-logic", "quranic-sciences-tafsir", "islamic-fiqh"],
      studyPlan: [
        { title: "Divinity Attributes & Rational Proofs (Ilahiyyat)", desc: "Understanding the 20 necessary attributes of Allah and checking rational arguments." },
        { title: "Prophecies & Prophet Attributes (Nubuwwat)", desc: "Analyzing miracles, infallibility of prophets, and answering historical queries." },
        { title: "The Unseen Realities & Eschatology (Sam'iyyat)", desc: "Creed concerning the grave, resurrection, scales, path, intercession, and eternity." },
        { title: "Comparative Sects & Answering Modern Doubts", desc: "Sunni methodology history, foundations of orthodox creed, and handling doubts." }
      ]
    },
    'islamic-logic': {
      title: "Sunni Logic (Mantiq) & Theology",
      tagline: "Rules of Thinking & Scholarly Argumentation",
      path: "Shariah Path",
      image: "/images/course_logic.png",
      duration: "30 Study Hours",
      level: "Core / Academic",
      syllabus: "Al-Sullam al-Munawraq",
      importance: "Logic is the tool of the mind, protecting thinkers from errors in reasoning. This course studies traditional Aristotelian-Sunni logic used in Islamic texts.",
      whatYouLearn: [
        "Scope of logic, word indications, concept definition, and conceptualization.",
        "The five categoricals, definitions, and rules of forming logical statements.",
        "Propositions, contradictions, conditional clauses, and conversions.",
        "Syllogisms: structures, figures, validation criteria, and fallacy checks."
      ],
      outcomes: [
        { title: "Clear Logic", desc: "Build valid, well-structured arguments while identifying cognitive fallacies." },
        { title: "Understand Terms", desc: "Decode complex definitions and divisions used in advanced Islamic texts." },
        { title: "Intellectual Rigor", desc: "Examine contemporary ideas and critique them using sound parameters." }
      ],
      relatedSlugs: ["islamic-creed", "principles-of-fiqh", "arabic-literature"],
      studyPlan: [
        { title: "Introduction to Logic & Words (Dalat)", desc: "Sullam study: how logic assists theology, how words point to concepts." },
        { title: "The Five Universals & Rules of Definition", desc: "Mastering genus, species, difference, property, and formatting definitions." },
        { title: "Propositions & Opposition Square (Qadaya)", desc: "Learning categorical and hypothetical statements, opposition, and conversions." },
        { title: "The Syllogism (Qiyas) & Logical Fallacies", desc: "Forming the four figures of syllogism, validation, and identifying fallacies." }
      ]
    },
    'principles-of-fiqh': {
      title: "Principles of Jurisprudence (Usul al-Fiqh)",
      tagline: "Methodology of Shariah Law Formulation",
      path: "Shariah Path",
      image: "/images/pillar-study.png",
      duration: "40 Study Hours",
      level: "Core / Advanced",
      syllabus: "Al-Waraqat & Murtaqa al-Wusul",
      importance: "Usul al-Fiqh is the methodology created by great Imams to extract rulings from primary sources. It displays the beautiful logic and comprehensiveness of Islamic law.",
      whatYouLearn: [
        "Defining Usul al-Fiqh, legal rulings (Taklifi & Wad'i), and conditions of accountability.",
        "Agreed-upon sources (Quran, Sunnah, Ijma', Qiyas) and disputed sources.",
        "Linguistic indications: commands and prohibitions, general and specific, clear and obscure.",
        "Ijtihad, imitation (Taqlid), fatwa rules, and resolving conflicting evidences."
      ],
      outcomes: [
        { title: "Legal Logic", desc: "Understand how legal rulings are formulated from revelation text." },
        { title: "Methodology", desc: "Observe the objectives of Shariah (Maqasid) and how rulings adapt." },
        { title: "Textual Studies", desc: "Read and analyze Imam al-Juwayni's Al-Waraqat in legal theory." }
      ],
      relatedSlugs: ["islamic-fiqh", "islamic-logic", "alfiya-ibn-malik"],
      studyPlan: [
        { title: "Legal Rules & Text Interpretations", desc: "Study of Shariah rulings (Taklifi & Wad'i), capability (Taklif), and Al-Waraqat." },
        { title: "Linguistic Delineations of Commands/Prohibitions", desc: "Analyzing commands, prohibitions, public/private terms, and absolute/qualified words." },
        { title: "Agreed & Disputed Sources of Shariah", desc: "Analysing the Quran, Sunnah, consensus (Ijma'), legal analogy (Qiyas), and secondary proofs." },
        { title: "Ijtihad, Scholar Criteria & Fatwas", desc: "Reaching scholar independence (Ijtihad), rule following (Taqlid), and resolving contradictions." }
      ]
    }
  }
};

export async function generateStaticParams() {
  const staticSlugs = [
    'quran-tajweed',
    '10-qiraat',
    'shatibiyyah-durrah',
    'mushaf-script',
    'quranic-sciences-tafsir',
    'waqf-ibtida',
    'arabic-grammar',
    'arabic-literature',
    'alfiya-ibn-malik',
    'islamic-fiqh',
    'islamic-creed',
    'islamic-logic',
    'principles-of-fiqh'
  ];

  try {
    const supabase = await createClient();
    const { data: courses } = await supabase
      .from('courses')
      .select('slug');
    
    const dbSlugs = courses?.map(c => c.slug) || [];
    const allSlugs = Array.from(new Set([...staticSlugs, ...dbSlugs]));
    const locales = ['en', 'fr', 'ar'];
    const params: { locale: string; slug: string }[] = [];

    locales.forEach((locale) => {
      allSlugs.forEach((slug) => {
        params.push({ locale, slug });
      });
    });

    return params;
  } catch (error) {
    console.error('Error generating dynamic static params:', error);
    const locales = ['en', 'fr', 'ar'];
    const params: { locale: string; slug: string }[] = [];
    locales.forEach((locale) => {
      staticSlugs.forEach((slug) => {
        params.push({ locale, slug });
      });
    });
    return params;
  }
}

const getCourseIcon = (path: string) => {
  const p = path.toLowerCase();
  if (p.includes('قرآن') || p.includes('quran')) {
    return <Award className="w-5 h-5 text-gold-hi" />;
  } else if (p.includes('عرب') || p.includes('arabic') || p.includes('لغة') || p.includes('لسان') || p.includes('أدب') || p.includes('نحو') || p.includes('صرف') || p.includes('gramm') || p.includes('liter')) {
    return <Feather className="w-5 h-5 text-gold-hi" />;
  } else {
    return <Compass className="w-5 h-5 text-gold-hi" />;
  }
};

const getTrackFromSlug = (slug: string): string => {
  if (['quran-tajweed', '10-qiraat', 'shatibiyyah-durrah', 'mushaf-script', 'quranic-sciences-tafsir', 'waqf-ibtida'].includes(slug)) {
    return 'quran';
  }
  if (['arabic-grammar', 'arabic-literature', 'alfiya-ibn-malik', 'arabic-philology', 'arabic-metrics', 'creative-writing'].includes(slug)) {
    return 'arabic';
  }
  if (['islamic-fiqh', 'islamic-creed', 'principles-of-fiqh', 'hadith-sciences', 'seerah', 'islamic-logic'].includes(slug)) {
    return 'islamic';
  }
  return 'kids';
};

const getTrackTitle = (track: string, locale: string): string => {
  if (locale === 'ar') {
    if (track === 'quran') return 'مسار القرآن الكريم';
    if (track === 'arabic') return 'مسار اللغة العربية';
    if (track === 'islamic') return 'مسار العلوم الشرعية';
    return 'مسار النشء والشباب';
  } else if (locale === 'fr') {
    if (track === 'quran') return 'Parcours Coran';
    if (track === 'arabic') return 'Langue Arabe';
    if (track === 'islamic') return 'Sciences Islamiques';
    return 'Parcours Jeunesse';
  } else {
    if (track === 'quran') return 'Quranic Sciences Path';
    if (track === 'arabic') return 'Classical Arabic Path';
    if (track === 'islamic') return 'Shariah Path';
    return 'Youth Path';
  }
};

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // 1. Fetch course from Supabase
  const supabase = await createClient();
  const { data: dbCourse } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single();

  // 2. Fetch static fallback course
  const staticCourse = COURSES_DATABASE[locale]?.[slug] || COURSES_DATABASE.en?.[slug];

  let course: CourseDbItem | null = null;

  if (staticCourse) {
    course = {
      ...staticCourse,
      title: dbCourse ? (dbCourse.title?.[locale] || dbCourse.title?.en || staticCourse.title) : staticCourse.title,
      tagline: dbCourse ? (dbCourse.short_description?.[locale] || dbCourse.short_description?.en || staticCourse.tagline) : staticCourse.tagline,
      image: dbCourse ? (dbCourse.image_url || staticCourse.image) : staticCourse.image,
      duration: dbCourse ? (dbCourse.duration?.[locale] || dbCourse.duration?.en || staticCourse.duration) : staticCourse.duration,
      importance: dbCourse ? (dbCourse.full_description?.[locale] || dbCourse.full_description?.en || staticCourse.importance) : staticCourse.importance,
      syllabus: dbCourse ? (dbCourse.instructor?.[locale] || dbCourse.instructor?.en || staticCourse.syllabus) : staticCourse.syllabus,
    };
  } else if (dbCourse) {
    const track = getTrackFromSlug(dbCourse.slug);
    course = {
      title: dbCourse.title?.[locale] || dbCourse.title?.en || '',
      tagline: dbCourse.short_description?.[locale] || dbCourse.short_description?.en || '',
      path: getTrackTitle(track, locale),
      image: dbCourse.image_url || '/images/course_default.png',
      duration: dbCourse.duration?.[locale] || dbCourse.duration?.en || '',
      level: locale === 'ar' ? 'تأصيلي' : (locale === 'fr' ? 'Fondations' : 'Core'),
      syllabus: dbCourse.instructor?.[locale] || dbCourse.instructor?.en || '',
      importance: dbCourse.full_description?.[locale] || dbCourse.full_description?.en || '',
      whatYouLearn: [],
      outcomes: [],
      relatedSlugs: [],
      studyPlan: []
    };
  }

  if (!course) {
    notFound();
  }

  const isRtl = locale === 'ar';

  const labelsByLocale: Record<string, any> = {
    ar: {
      back: '← العودة لجميع البرامج الدراسية',
      duration: 'مدة المقرر',
      level: 'المستوى الأكاديمي',
      syllabus: 'الكتاب المنهجي',
      delivery: 'نظام التعليم',
      deliveryVal: 'تعليم فردي مباشر 1-on-1',
      importance: 'أهمية هذا المقرر وأبعاده العلمية',
      learnTitle: 'ماذا سيتعلم طالب العلم في هذا المسار؟',
      outcomesTitle: 'مخرجات التعلم والملكات المكتسبة',
      howItWorks: 'منهجية التلقي ونظام الدراسة بالأكاديمية',
      ctaTitle: 'ابدأ تحصيلك العلمي بجلسة تقييم مجانية بالكامل',
      ctaDesc: 'سجل الآن للقاء أحد شيوخنا ومنسقينا الأكاديميين لتحديد مستواك الحالي وتصميم خطتك الدراسية المخصصة وتنسيق مواعيد حصصك الأسبوعية.',
      ctaBtn: 'احجز جلسة التقييم المجانية الآن',
      contactBtn: 'تواصل مع الدعم الأكاديمي',
      relatedTitle: 'مقررات تراثية متممة ذات صلة',
      relatedDesc: 'علوم ومتون شقيقة تدعم حصيلتك وتوسع آفاق الفهم الأصولي واللغوي لديك.',
      relatedBtn: 'تفاصيل المقرر',
      studyPlanTitle: 'المنهج الدراسي والترقي العلمي للمقرر',
      studyPlanDesc: 'تفصيل مراحل التحصيل والمسائل المقررة في هذا المسار الدراسي لتأصيل الفهم المتكامل.',
      milestone: 'المرحلة',
      certificateTitle: 'الإجازة الأكاديمية والشهادة المعتمدة',
      certificateDesc: 'بعد إتمام دراسة المقرر واجتياز الاختبار الشفهي النهائي بنجاح، يمنح الطالب سنداً متصلاً أو شهادة تخرج معتمدة من شيوخنا الأزهريين.',
      certificationBadge: 'إسناد متصل وإجازة شرعية معتمدة'
    },
    en: {
      back: '← Back to Academic Programs',
      duration: 'Course Duration',
      level: 'Academic Level',
      syllabus: 'Core Manual',
      delivery: 'Delivery Method',
      deliveryVal: '1-on-1 Private Live Tuition',
      importance: 'Scholarly Importance of this Course',
      learnTitle: 'Core Curriculum Breakdown',
      outcomesTitle: 'Key Learning Outcomes',
      howItWorks: 'Our Pedagogy & Traditional Recitation',
      ctaTitle: 'Begin Your Scholarly Journey with a Free Assessment',
      ctaDesc: 'Meet with one of our academic coordinators to evaluate your current level, custom-tailor your syllabus, and fix your weekly classes.',
      ctaBtn: 'Schedule Your Free Assessment Now',
      contactBtn: 'Contact Academic Office',
      relatedTitle: 'Complementary Scholarly Courses',
      relatedDesc: 'Sciences and treatises that support your core curriculum and expand your traditional horizons.',
      relatedBtn: 'Course Details',
      studyPlanTitle: 'Academic Curriculum Roadmap',
      studyPlanDesc: 'A detailed breakdown of the modules and stages required to complete this syllabus.',
      milestone: 'Module',
      certificateTitle: 'Academic Certification & Isnad',
      certificateDesc: 'Upon completing the text and passing the final oral examination, the student receives a traditional Ijaza with a connected chain of transmission (Isnad) or a verified graduation certificate.',
      certificationBadge: 'Traditional Verified Ijaza'
    },
    fr: {
      back: "← Retour aux Programmes Académiques",
      duration: "Durée du Cours",
      level: "Niveau Académique",
      syllabus: "Manuel d'Étude",
      delivery: "Format du Cours",
      deliveryVal: "Cours Particulier Direct 1-à-1",
      importance: "Importance Académique de ce Cours",
      learnTitle: "Ce Que Vous Allez Maîtriser",
      outcomesTitle: "Compétences & Objectifs Atteints",
      howItWorks: "Notre Méthodologie & Transmission Traditionnelle",
      ctaTitle: "Commencez par une Évaluation Gratuite",
      ctaDesc: "Rencontrez l'un de nos coordinateurs académiques pour évaluer votre niveau, personnaliser votre programme et fixer vos horaires.",
      ctaBtn: "Réserver Votre Évaluation Gratuite",
      contactBtn: "Contacter le Bureau Académique",
      relatedTitle: "Cours Académiques Complémentaires",
      relatedDesc: "Sciences et traités classiques pour élargir vos horizons théologiques et linguistiques.",
      relatedBtn: "Détails du Cours",
      studyPlanTitle: "Plan d'Études & Progression",
      studyPlanDesc: "Détails des étapes de progression et critères d'évaluation pour terminer ce programme.",
      milestone: "Étape",
      certificateTitle: "Certification Académique & Isnad",
      certificateDesc: "Après avoir terminé le texte et réussi l'examen oral final, l'étudiant reçoit une Ijaza traditionnelle avec Isnad ou un certificat de réussite validé.",
      certificationBadge: "Ijaza Académique Vérifiée"
    }
  };

  const labels = labelsByLocale[locale] || labelsByLocale.en;

  const steps = [
    {
      num: '01',
      title: isRtl ? 'جلسة تقييم مجانية' : (locale === 'fr' ? 'Évaluation Gratuite' : 'Free Assessment'),
      desc: isRtl ? 'جلسة تعارف وتقييم مستوى مدتها 30 دقيقة عبر زووم لتحديد منطلق الدراسة.' : (locale === 'fr' ? 'Une séance Zoom de 30 minutes pour évaluer votre niveau et planifier vos objectifs.' : 'A 30-minute Zoom session to evaluate your current level and custom map your targets.')
    },
    {
      num: '02',
      title: isRtl ? 'اختيار المعلم والجدول' : (locale === 'fr' ? 'Tuteur & Horaires' : 'Tutor & Schedule Match'),
      desc: isRtl ? 'تنسيق كامل للمواعيد واختيار المعلم الأزهري المجاز الأنسب لأهدافك ولغتك.' : (locale === 'fr' ? 'Choisissez vos horaires hebdomadaires et soyez mis en relation avec le tuteur certifié le plus adapté.' : 'Choose your optimal weekly hours and match with the certified scholar best suited for you.')
    },
    {
      num: '03',
      title: isRtl ? 'حصص فردية مباشرة' : (locale === 'fr' ? 'Classes Privées en Direct' : 'Private Live Classes'),
      desc: isRtl ? 'تلقٍ مباشر وصيانة للسند عبر غرف زووم خاصة، مع مرونة تامة في التعديل والتعويض.' : (locale === 'fr' ? 'Transmission directe et interactive via Zoom avec une flexibilité totale de planification.' : 'Direct traditional transmission in private online sessions with full scheduling flexibility.')
    },
    {
      num: '04',
      title: isRtl ? 'متابعة واختبارات' : (locale === 'fr' ? 'Suivi & Évaluation' : 'Tracking & Evaluation'),
      desc: isRtl ? 'تقارير أداء دورية واختبارات فقهية أو قرآنية للحصول على الإجازة المعتمدة.' : (locale === 'fr' ? 'Rapports périodiques et examens finaux menant à une certification ou Ijaza reconnue.' : 'Periodic reports, oral reviews, and traditional exams culminating in verified Ijazat.')
    }
  ];

  const relatedCourses = (course.relatedSlugs || [])
    .map(relSlug => ({
      slug: relSlug,
      data: COURSES_DATABASE[locale]?.[relSlug] || COURSES_DATABASE.en?.[relSlug]
    }))
    .filter(item => item.data !== undefined);

  return (
    <article className="relative min-h-screen bg-[#FDFCF9] text-midnight overflow-x-hidden selection:bg-gold-hi/30">
      
      {/* Background elegant pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:110px_110px] opacity-[0.015] pointer-events-none" />

      {/* ── SECTION 1: PRESTIGIOUS MANUSCRIPT HERO (DARK BLUE) ── */}
      <section className="relative pt-44 pb-32 bg-[#22314b] text-white border-b border-gold/20 overflow-hidden">
        
        {/* Subtle geometric star grid */}
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:55px_55px] opacity-[0.03] pointer-events-none" />
        
        {/* Ambient glows */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-gold-hi/5 rounded-full filter blur-[100px] pointer-events-none animate-pulse-slow" />
        <div className="absolute right-10 -bottom-20 w-96 h-96 bg-gold/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        {/* Thin top gold line */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold-hi/40 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-start">
          
          {/* Back button */}
          <div className="mb-12">
            <Link
              href={`/${locale}/programs`}
              className={`inline-flex items-center gap-3 text-xs font-bold text-gold-champagne hover:text-gold transition-colors duration-200 group ${
                isRtl ? 'flex-row-reverse' : ''
              }`}
            >
              <span className="p-1.5 rounded-full border border-gold-muted/30 bg-white/5 transition-transform group-hover:scale-110">
                {isRtl ? <ChevronRight size={14} className="text-gold-hi" /> : <ChevronLeft size={14} className="text-gold-hi" />}
              </span>
              <span className={`tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>{labels.back}</span>
            </Link>
          </div>

          {/* Golden Arched Layout Frame Container */}
          <div className="border border-gold-hi/15 rounded-[2.5rem] bg-white/[0.01] backdrop-blur-sm p-8 md:p-12 relative overflow-hidden shadow-2xl">
            
            {/* Fine ornamental corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold-hi/30" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold-hi/30" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold-hi/30" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold-hi/30" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Title and Details */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Pathway Tag */}
                <span className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-extrabold px-4 py-2 rounded-full border border-gold-hi/30 bg-gold-hi/10 text-gold-hi ${
                  isRtl ? 'font-cairo' : 'font-dm'
                }`}>
                  <Sparkles size={11} className="animate-pulse" />
                  <span>{course.path}</span>
                </span>

                {/* Course Main Title */}
                <h1 className={`text-hero leading-tight bg-gradient-to-r from-white via-gold-champagne to-[#FFE0B2] bg-clip-text text-transparent font-bold tracking-tight ${
                  isRtl ? 'font-amiri text-5xl md:text-6xl font-bold' : 'font-cormorant text-4xl md:text-5xl font-bold'
                }`}>
                  {course.title}
                </h1>

                {/* Subtitle / Tagline */}
                <p className={`text-stone/90 text-sm md:text-base max-w-xl font-normal leading-relaxed ${
                  isRtl ? 'font-noto' : 'font-lora italic'
                }`}>
                  {course.tagline}
                </p>

                {/* stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-2xl">
                  
                  <div className="p-4 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-1 group hover:border-gold-hi/25 hover:bg-white/[0.04] transition-all duration-300">
                    <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                      {labels.duration}
                    </span>
                    <span className={`block text-xs text-gold-champagne font-extrabold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {course.duration}
                    </span>
                  </div>

                  <div className="p-4 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-1 group hover:border-gold-hi/25 hover:bg-white/[0.04] transition-all duration-300">
                    <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                      {labels.level}
                    </span>
                    <span className={`block text-xs text-white font-extrabold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {course.level}
                    </span>
                  </div>

                  <div className="p-4 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-1 group hover:border-gold-hi/25 hover:bg-white/[0.04] transition-all duration-300">
                    <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                      {labels.syllabus}
                    </span>
                    <span className={`block text-xs text-white font-extrabold truncate ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {course.syllabus}
                    </span>
                  </div>

                  <div className="p-4 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-1 group hover:border-gold-hi/25 hover:bg-white/[0.04] transition-all duration-300">
                    <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                      {labels.delivery}
                    </span>
                    <span className={`block text-xs text-gold-hi font-extrabold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {labels.deliveryVal}
                    </span>
                  </div>

                </div>

              </div>

              {/* Right Column: Hero Image Frame */}
              <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm aspect-[4/5] rounded-[2.5rem] p-3 bg-gradient-to-br from-gold-hi/20 via-white/5 to-transparent border border-white/[0.08] shadow-[0_30px_70px_rgba(0,0,0,0.6)] group">
                  
                  {/* Decorative golden window outline */}
                  <div className="absolute inset-1.5 border border-gold-hi/20 rounded-[2.3rem] pointer-events-none z-10 transition-colors duration-300 group-hover:border-gold-hi/40" />

                  {/* Main image */}
                  <div className="relative w-full h-full rounded-[2.1rem] overflow-hidden bg-navy-deep">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                    />
                    
                    {/* Dark bottom gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#22314b] via-transparent to-transparent pointer-events-none" />
                    
                    {/* Logo watermark */}
                    <div className="absolute right-4 bottom-4 w-12 h-12 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat opacity-[0.12] filter invert pointer-events-none" />
                  </div>

                  {/* Ambient backdrop glow */}
                  <div className="absolute -inset-2 bg-gold-hi/5 rounded-[2.8rem] filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 2: PATHWAY EDITORIAL DETAILS (PARCHMENT / LIGHT) ── */}
      <section className="py-24 bg-[#FDFAF3] border-b border-gold-muted/12 relative z-10 text-start">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Scholarly Importance Description */}
            <div className="lg:col-span-7 space-y-12">
              
              <div className="p-8 md:p-10 bg-white border border-gold-muted/15 rounded-[2rem] shadow-[0_15px_45px_rgba(139,115,85,0.03)] space-y-6 relative overflow-hidden">
                {/* Background art details */}
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-[url('/images/pattern-8star.svg')] bg-contain bg-no-repeat opacity-[0.01] pointer-events-none" />
                
                <div className="flex items-center gap-3.5 pb-4 border-b border-gold-muted/10">
                  <Compass className="w-5 h-5 text-gold-hi shrink-0" />
                  <h2 className={`text-sm font-bold uppercase tracking-wider text-midnight ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {labels.importance}
                  </h2>
                </div>

                {/* Dropped cap styling for premium scholarly manuscript look */}
                <p className={`text-sm md:text-base text-[#3E3831] leading-relaxed text-justify ${
                  isRtl 
                    ? 'font-noto first-letter:text-4xl first-letter:font-bold first-letter:text-gold-hi first-letter:float-right first-letter:ml-3' 
                    : 'font-lora first-letter:text-4xl first-letter:font-bold first-letter:text-gold-hi first-letter:float-left first-letter:mr-3'
                }`}>
                  {course.importance}
                </p>
              </div>

              {/* Curriculum Grid: What you learn */}
              {course.whatYouLearn && course.whatYouLearn.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3.5 pb-3 border-b border-gold-muted/10">
                    <BookOpen className="w-5 h-5 text-gold-hi shrink-0" />
                    <h2 className={`text-sm font-bold uppercase tracking-wider text-midnight ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {labels.learnTitle}
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.whatYouLearn.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gold-muted/10 hover:border-gold/30 hover:bg-white/80 transition-all duration-300 group shadow-sm"
                      >
                        <span className="w-7 h-7 rounded-full bg-gold/5 border border-gold-muted/20 flex items-center justify-center text-[10px] text-gold-hi font-extrabold shrink-0 mt-0.5 select-none transition-all duration-300 group-hover:bg-[#0B132B] group-hover:text-gold-champagne group-hover:border-gold-hi">
                          {idx + 1}
                        </span>
                        <span className={`text-xs text-[#3E3831] leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar outcomes panel and certificate */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Outcomes Panel */}
              {course.outcomes && course.outcomes.length > 0 && (
                <div className="bg-gradient-to-br from-white to-[#FDFAF3] border border-gold-muted/15 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 pb-3 border-b border-gold-muted/10 mb-6">
                    <Award className="w-5 h-5 text-gold-hi shrink-0" />
                    <h2 className={`text-sm font-bold uppercase tracking-wider text-midnight ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {labels.outcomesTitle}
                    </h2>
                  </div>
                  
                  <ul className="space-y-6">
                    {course.outcomes.map((out, idx) => (
                      <li key={idx} className="space-y-1.5 group text-start">
                        <div className="flex items-center gap-2.5">
                          <span className="p-1 rounded-full bg-gold/10 border border-gold/25 text-gold-hi transition-transform duration-300 group-hover:scale-110">
                            <Check size={11} className="stroke-[3]" />
                          </span>
                          <span className={`text-xs font-bold text-midnight ${isRtl ? 'font-cairo' : 'font-dm'}`}>{out.title}</span>
                        </div>
                        <p className={`text-[11px] text-[#554E45] leading-relaxed pl-7 rtl:pl-0 rtl:pr-7 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                          {out.desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prestigious Certification Mock-up (Traditional Arched Border) */}
              <div className="bg-[#22314b] text-white border border-gold/25 rounded-3xl p-7 relative overflow-hidden shadow-xl group">
                <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:40px_40px] opacity-[0.02] pointer-events-none" />
                
                {/* Certification Badge */}
                <span className={`absolute top-4 right-4 text-[8px] uppercase tracking-widest font-extrabold text-gold-hi border border-gold-hi/30 bg-gold-hi/10 px-2.5 py-1 rounded-full ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {labels.certificationBadge}
                </span>
                
                <h3 className={`text-sm font-bold text-gold-champagne mb-3 mt-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {labels.certificateTitle}
                </h3>
                <p className={`text-[11px] text-[#A6ADB8] leading-relaxed mb-6 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                  {labels.certificateDesc}
                </p>

                {/* Ornamental border representation */}
                <div className="border border-gold-hi/20 rounded-2xl p-4 bg-white/[0.02] relative overflow-hidden">
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-hi/30" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-hi/30" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-hi/30" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-hi/30" />
                  
                  <div className="text-center py-2 space-y-2">
                    <span className="block text-[8px] uppercase tracking-[0.2em] text-gold-hi/60 font-bold font-dm">
                      ACADEMY SANAD LICENSE
                    </span>
                    <span className="block text-xs font-amiri text-gold-champagne font-bold">
                      شَهَادَةُ إِجَازَةٍ بِالسَّنَدِ الْمُتَّصِلِ
                    </span>
                    <span className="block text-[7px] text-stone/50 font-dm">
                      AZHARI SCHOLARLY SUPERVISION
                    </span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-muted/30 to-transparent my-4" />
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center text-gold-hi transition-transform duration-500 group-hover:rotate-12">
                    <Award size={14} />
                  </div>
                  <span className={`text-[10px] text-stone/80 font-bold uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {isRtl ? 'مستند بالتلقي الشفهي المباشر' : 'Verified via Oral Recitation'}
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: VISUAL TIMELINE ROADMAP (PREMIUM DARK BLOCK) ── */}
      {course.studyPlan && course.studyPlan.length > 0 && (
        <section className="py-24 bg-[#22314b] text-white relative z-10 border-t border-b border-gold/20 overflow-hidden text-start">
          <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:65px_65px] opacity-[0.025] pointer-events-none" />
          <div className="absolute -right-40 -top-40 w-96 h-96 bg-gold-hi/5 rounded-full filter blur-[100px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            {/* Header */}
            <div className="text-center mb-20 space-y-3">
              <span className={`text-xs uppercase tracking-[0.2em] text-gold font-bold block ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                {labels.milestone}
              </span>
              <h2 className={`text-title text-gold-champagne font-bold ${isRtl ? 'font-amiri text-4xl' : 'font-cormorant text-4xl'}`}>
                {labels.studyPlanTitle}
              </h2>
              <p className={`text-xs text-stone/60 max-w-xl mx-auto leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {labels.studyPlanDesc}
              </p>
            </div>

            {/* Connected Vertical Timeline Layout */}
            <div className="relative max-w-4xl mx-auto">
              
              {/* central alignment line */}
              <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[1.5px] bg-gradient-to-b from-gold-hi/10 via-gold/40 to-gold-hi/10 -translate-x-1/2" />

              <div className="space-y-12">
                {course.studyPlan.map((step, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div key={idx} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0`}>
                      
                      {/* timeline node badge */}
                      <div className="absolute top-6 left-6 md:left-1/2 w-9 h-9 rounded-full bg-[#22314b] border border-gold-hi text-gold-hi flex items-center justify-center -translate-x-1/2 z-20 font-bold font-dm shadow-[0_0_12px_rgba(212,168,67,0.25)] transition-all duration-300 group-hover:scale-110">
                        <span className="text-xs">0{idx + 1}</span>
                      </div>

                      {/* Timeline card container */}
                      <div className={`w-full md:w-[45%] ${isEven ? 'md:pl-8' : 'md:pr-8'} pl-12 md:pl-0`}>
                        <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-gold-hi/45 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 group hover:shadow-[0_15px_40px_rgba(212,168,67,0.08)]">
                          
                          {/* Shimmer top line */}
                          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold-hi to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                          
                          {/* Large fading watermark step number */}
                          <div className={`absolute -right-4 -bottom-6 text-[80px] font-bold text-gold-hi/[0.01] group-hover:text-gold-hi/[0.035] transition-colors duration-300 pointer-events-none select-none leading-none ${isRtl ? 'font-cairo' : 'font-cormorant'}`}>
                            0{idx + 1}
                          </div>

                          <span className={`inline-block text-[9px] uppercase tracking-wider text-gold-hi/80 font-bold mb-2 font-dm`}>
                            {labels.milestone} 0{idx + 1}
                          </span>
                          
                          <h3 className={`text-sm font-bold text-white mb-2 group-hover:text-gold-champagne transition-colors duration-200 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                            {step.title}
                          </h3>
                          
                          <p className={`text-[11px] text-[#A6ADB8] leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                            {step.desc}
                          </p>
                        </div>
                      </div>

                      {/* empty spacer for alignment */}
                      <div className="hidden md:block w-[45%]" />

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ── SECTION 4: HOW THE ACADEMY WORKS (TRADITIONAL PEDAGOGY) ── */}
      <section className="py-24 bg-[#FDFAF3] relative z-10 border-b border-gold-muted/12 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <span className={`text-xs uppercase tracking-widest text-gold font-bold mb-3 block ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {isRtl ? 'نظام ومنهجية التلقي' : 'OUR PEDAGOGY'}
          </span>
          <h2 className={`text-title text-midnight font-bold mb-16 ${isRtl ? 'font-amiri text-4xl' : 'font-cormorant text-4xl'}`}>
            {labels.howItWorks}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
            {steps.map((st, idx) => (
              <div 
                key={idx}
                className="bg-white border border-gold-muted/12 rounded-3xl p-7 relative overflow-hidden flex flex-col justify-between group hover:border-gold hover:-translate-y-1.5 transition-all duration-500 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gold/5 border border-gold-muted/20 text-gold-hi flex items-center justify-center font-bold text-sm mb-6 transition-all duration-300 group-hover:bg-[#0B132B] group-hover:text-gold-champagne">
                    <span className="font-dm">{st.num}</span>
                  </div>
                  <h3 className={`text-sm font-bold text-midnight mb-2 group-hover:text-gold-hi transition-colors duration-300 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {st.title}
                  </h3>
                  <p className={`text-[11px] text-[#554E45] leading-relaxed group-hover:text-midnight transition-colors duration-300 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: RELATED COURSES (ACADEMIC SHELF) ── */}
      {relatedCourses.length > 0 && (
        <section className="py-24 bg-[#FAF6EC] border-b border-gold-muted/12 relative z-10 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <span className={`text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3 block ${isRtl ? 'font-cairo' : 'font-dm'}`}>
              {isRtl ? 'سلسلة الترقي المعرفي' : 'COMPLEMENTARY PATHS'}
            </span>
            <h2 className={`text-title text-midnight font-bold mb-4 ${isRtl ? 'font-amiri text-4xl' : 'font-cormorant text-4xl'}`}>
              {labels.relatedTitle}
            </h2>
            <p className={`text-xs text-stone max-w-xl mx-auto mb-16 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
              {labels.relatedDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
              {relatedCourses.map((rel, idx) => {
                if (!rel.data) return null;
                const relCourseIcon = getCourseIcon(rel.data.path);
                return (
                  <div 
                    key={idx}
                    className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 rounded-3xl p-0 shadow-[0_8px_30px_rgba(139,115,85,0.1)] hover:border-gold hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(139,115,85,0.18)] transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
                  >
                    {/* Top Accent Gold Bar */}
                    <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                    {/* Watermark in background */}
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[url('/images/pattern-8star.svg')] bg-contain bg-no-repeat opacity-[0.015] group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none filter sepia hue-rotate-15 brightness-95" />

                    <div>
                      {/* Course Header Image Frame */}
                      <div className="relative h-48 w-full overflow-hidden rounded-t-[1.4rem]">
                        <Image
                          src={rel.data.image}
                          alt={rel.data.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/20 to-transparent pointer-events-none" />
                        
                        {/* Badge Overlay */}
                        <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border border-gold-muted/30 bg-midnight/80 backdrop-blur-sm text-gold-hi font-dm z-10">
                          {rel.data.path}
                        </span>
                      </div>

                      {/* Card Content wrapper */}
                      <div className="p-6 md:p-8">
                        {/* Icon & Title row */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className={`text-[1.2rem] text-midnight font-bold leading-snug group-hover:text-gold-hi transition-colors duration-300 ${
                            isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                          }`}>
                            {rel.data.title}
                          </h3>
                          <div className="p-2 bg-gold-muted/10 rounded-xl border border-gold/15 text-gold-hi transition-colors duration-300">
                            {relCourseIcon}
                          </div>
                        </div>

                        {/* Tagline */}
                        <span className={`block text-[11px] text-gold/80 font-semibold mb-4 uppercase tracking-wider ${
                          isRtl ? 'font-cairo' : 'font-dm'
                        }`}>
                          {rel.data.tagline}
                        </span>

                        {/* Description */}
                        <p className={`text-xs text-[#554E45] leading-relaxed mb-6 line-clamp-3 ${
                          isRtl ? 'font-noto' : 'font-lora'
                        }`}>
                          {rel.data.importance}
                        </p>

                        {/* Syllabus Stats Metadata Section */}
                        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gold-muted/15 text-center bg-[#FDFAF3]/30 rounded-xl">
                          <div className="space-y-1">
                            <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                              {labels.duration}
                            </span>
                            <span className={`block text-[10px] text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                              {rel.data.duration}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                              {labels.syllabus}
                            </span>
                            <span className={`block text-[10px] text-gold font-bold leading-none truncate px-1 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                              {rel.data.syllabus}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                              {labels.level}
                            </span>
                            <span className={`block text-[10px] text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                              {rel.data.level}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Bottom Action Center inside Card */}
                    <div className="px-6 md:px-8 pb-8 flex items-center justify-between">
                      <Link
                        href={`/${locale}/programs/${rel.slug}`}
                        className={`text-[11px] uppercase tracking-widest font-bold text-stone hover:text-gold transition-colors duration-300 inline-flex items-center gap-1.5 ${
                          isRtl ? 'font-cairo' : 'font-dm'
                        }`}
                      >
                        <span>{labels.relatedBtn}</span>
                        {isRtl ? (
                          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </Link>

                      {/* Small branding logo opposite the button */}
                      <div className="w-12 h-12 flex items-center justify-center select-none pointer-events-none">
                        <img
                          src="/logo-new.webp"
                          alt="Academy Seal"
                          className="w-12 h-12 object-contain opacity-80 group-hover:opacity-100 transition-all duration-500"
                        />
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 6: HIGH-FIDELITY CTA CARD (DARK MODE) ── */}
      <section className="py-24 bg-[#FDFAF3] relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#22314b] text-white border border-gold/25 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
            
            {/* Watermarks */}
            <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:45px_45px] opacity-[0.015] pointer-events-none" />
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat opacity-[0.03] filter invert pointer-events-none" />

            {/* Decorative gold frames in the corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold/30" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gold/30" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gold/30" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold/30" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              
              {/* Emblem icon */}
              <div className="w-12 h-12 bg-gold/15 border border-gold-hi/40 rounded-full flex items-center justify-center text-gold-hi mx-auto shadow-inner">
                <Sparkles size={20} className="animate-pulse" />
              </div>

              <div className="space-y-4">
                <h2 className={`text-2xl md:text-3xl text-gold-champagne font-bold ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
                  {labels.ctaTitle}
                </h2>
                <p className={`text-xs md:text-sm text-[#A6ADB8] leading-relaxed max-w-xl mx-auto ${isRtl ? 'font-noto' : 'font-lora'}`}>
                  {labels.ctaDesc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                
                <Link
                  href={`/${locale}/book?course=${encodeURIComponent(course.title)}`}
                  className={`btn-gold px-8 py-4 rounded-full text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-gold/10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  {labels.ctaBtn}
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className={`px-8 py-4 border border-white/10 hover:border-gold-hi hover:bg-gold-hi/5 rounded-full text-xs font-bold transition-all duration-300 text-white hover:text-gold-champagne ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  {labels.contactBtn}
                </Link>

              </div>

            </div>
          </div>
        </div>
      </section>

    </article>
  );
}
