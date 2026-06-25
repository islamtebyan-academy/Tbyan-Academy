export interface CourseDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export interface OutcomeItem {
  title: string;
  desc: string;
}

export interface StudyPlanItem {
  title: string;
  desc: string;
}

export interface CourseDbItem {
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

export const getStaticSlug = (slug: string): string => {
  const mapping: Record<string, string> = {
    // Arabic track mappings
    'arabic-philology': 'arabic-grammar',
    'arabic-metrics': 'arabic-literature',
    'creative-writing': 'arabic-literature',

    // Shariah track mappings
    'hadith-sciences': 'principles-of-fiqh',
    'seerah': 'islamic-creed',

    // Kids/Youth track mappings
    'qaida-nuraniyyah': 'quran-tajweed',
    'juz-amma': 'quran-tajweed',
    'kids-salah': 'islamic-fiqh',
    'prophet-stories': 'quranic-sciences-tafsir',
    'kids-adhkar': 'quran-tajweed',
    'kids-ethics': 'islamic-creed',
  };
  return mapping[slug] || slug;
};

export const COURSES_DATABASE: Record<string, Record<string, CourseDbItem>> = {
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