import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Award, BookOpen, Shield, GraduationCap, Briefcase, Sparkles, Languages, CheckCircle } from 'lucide-react';

interface TeacherProfileProps {
  params: Promise<{ locale: string; slug: string }>;
}

const teachersData: Record<string, Record<string, any>> = {
  'ahmed-yahya-zakaria': {
    ar: {
      name: 'الشيخ أحمد يحيى زكريا',
      title: 'معلم القرآن الكريم واللغة العربية لغير الناطقين بها',
      education: 'ليسانس أصول الدين من جامعة الأزهر الشريف',
      specialty: 'تعليم القرآن، أحكام التجويد، واللغة العربية الفصحى',
      languages: 'العربية (اللغة الأم)، الإنجليزية (جيد جداً)، الفرنسية (جيد)، التركية (جيد)',
      bio: 'معلم قرآن كريم ولغة عربية لغير الناطقين بها، يسعى إلى تقديم تعليم متميز يجمع بين الأصالة والوسائل التعليمية الحديثة. يمتلك خبرة واسعة في التدريس والتعليم عبر الإنترنت، ويعمل بشغف لتطوير مهارات الطلاب ومساعدتهم على تحقيق أهدافهم اللغوية والدينية في بيئة تعليمية تفاعلية وممتعة.',
      ijazas: [
        'إجازة برواية حفص عن عاصم بالسند المتصل من فضيلة الشيخ نبيل محمد علي.',
        'إجازة قرآنية معتمدة من فضيلة الشيخ سيد بعبولة.'
      ],
      qualifications: [
        'ليسانس من كلية أصول الدين - جامعة الأزهر الشريف بالقاهرة.',
        'دورات متخصصة في طرق تعليم اللغة العربية لغير الناطقين بها.',
        'دورات تدريبية متقدمة في مجالات التعليم الإلكتروني وإدارة الصفوف الافتراضية.'
      ],
      experiences: [
        'خبرة عملية تزيد عن خمس سنوات في تدريس اللغة العربية والقرآن الكريم والدراسات الإسلامية عبر الإنترنت.',
        'تدريب وتوجيه الطلاب من مختلف الأعمار والجنسيات والخلفيات الثقافية.',
        'إعداد وتطوير مناهج مخصصة للطلاب الناطقين بغير العربية لتسهيل الفهم والتحصيل.',
        'تبسيط أحكام التجويد للطلاب وتطبيقها العملي أثناء التلاوة بأساليب شيقة.'
      ],
      skills: [
        'تصميم الخطط والبرامج التعليمية الفردية',
        'إدارة الفصول الافتراضية بمهارة عبر Zoom وGoogle Meet',
        'استخدام برامج Microsoft Office والوسائط التفاعلية في التعليم',
        'التواصل التربوي الفعال مع الطلاب وأولياء الأمور'
      ]
    },
    en: {
      name: 'Sheikh Ahmed Yahya Zakaria',
      title: 'Instructor of Quranic Recitation & Arabic for Non-Native Speakers',
      education: 'Bachelor in Usul al-Din, Al-Azhar University',
      specialty: 'Quranic Recitation, Tajweed Rules, & Classical Arabic',
      languages: 'Arabic (Native), English (Very Good), French (Good), Turkish (Good)',
      bio: 'A dedicated educator specializing in Quranic studies and classical Arabic for non-Arabic speakers. He blends traditional methodology with modern interactive tools to foster deep comprehension. Ahmed holds multiple Ijazas and aims to guide students toward their linguistic and spiritual goals in an engaging, supportive environment.',
      ijazas: [
        'Verified Quranic Recitation Ijaza (Hafs \'an \'Asim) with connected Isnad from Sheikh Nabil Muhammad Ali.',
        'Quranic Recitation Ijaza from Sheikh Sayyid Babola.'
      ],
      qualifications: [
        'Bachelor\'s Degree in Usul al-Din (Fundamentals of Religion) from Al-Azhar University, Cairo.',
        'Specialized qualifications in Arabic as a Second Language (ASL) instruction.',
        'Certified online education and virtual learning environments management trainer.'
      ],
      experiences: [
        'Over 5 years of online teaching experience in Arabic, Quranic sciences, and Islamic studies.',
        'Mentored students of various age groups and nationalities, crafting customized lesson plans.',
        'Developed tailored curricula for non-Arabic speakers to facilitate smooth language acquisition.',
        'Taught Tajweed rules through interactive, practical, and highly simplified methodologies.'
      ],
      skills: [
        'Custom Curriculum Engineering & Progress Tracking',
        'Interactive Classroom Management (Zoom, Google Meet)',
        'Educational Content Design & Microsoft Office Applications',
        'Effective Parent-Student Pedagogical Communication'
      ]
    },
    fr: {
      name: 'Cheikh Ahmed Yahya Zakaria',
      title: 'Enseignant du Saint Coran et de la Langue Arabe pour les Non-Arabophones',
      education: 'Licence en Oussoul al-Din, Université d\'Al-Azhar',
      specialty: 'Récitation du Coran, Règles de Tajwid & Arabe Classique',
      languages: 'Arabe (Maternelle), Anglais (Très bon niveau), Français (Bien), Turc (Bien)',
      bio: 'Enseignant dévoué du Coran et de la langue arabe pour les non-arabophones, Ahmed s\'efforce d\'offrir un enseignement d\'excellence alliant authenticité traditionnelle et outils modernes. Il met à profit son expertise pédagogique pour aider les étudiants à atteindre leurs objectifs linguistiques et spirituels dans un cadre interactif et stimulant.',
      ijazas: [
        'Ijaza de récitation coranique (Hafs \'an \'Asim) avec Isnad connecté du Cheikh Nabil Muhammad Ali.',
        'Ijaza coranique validée par le Cheikh Sayyid Babola.'
      ],
      qualifications: [
        'Licence de la Faculté d\'Oussoul al-Din (Fondements de la Religion), Université d\'Al-Azhar, Le Caire.',
        'Formations spécialisées dans les méthodes d\'enseignement de l\'arabe langue étrangère.',
        'Certifications en administration de classes virtuelles et pédagogie interactive en ligne.'
      ],
      experiences: [
        'Plus de 5 ans d\'enseignement en ligne de l\'arabe classique, du Coran et des sciences de la Shariah.',
        'Accompagnement d\'élèves de divers âges et nationalités avec des programmes personnalisés.',
        'Développement de supports pédagogiques simplifiés pour les apprenants non-arabophones.',
        'Enseignement des règles de Tajwid par des méthodes actives et interactives.'
      ],
      skills: [
        'Conception de programmes académiques personnalisés',
        'Maîtrise des classes numériques (Zoom, Google Meet)',
        'Création de supports éducatifs multimédias',
        'Communication interculturelle efficace avec les élèves et parents'
      ]
    }
  },
  'mohamed-badr-maliki': {
    ar: {
      name: 'الشيخ محمد بدر عبد المرضي حسين',
      title: 'واعظ بالأزهر الشريف ومدرس العلوم الشرعية واللغوية',
      education: 'ماجستير التفسير وعلوم القرآن، كلية أصول الدين بجامعة الأزهر',
      specialty: 'تفسير القرآن الكريم، الفقه المالكي، العقيدة الأشعرية، واللغة العربية',
      languages: 'العربية (اللغة الأم)، الإنجليزية (أساسي)',
      bio: 'واعظ وباحث أزهري متخصص في التفسير وعلوم القرآن والفقه المالكي. يجمع في تدريسه بين أصالة المنهج الأزهري القائم على حفظ المتون وضبط الشروح، وبين أساليب التقديم الحديثة عبر الإعلام والمواقع الرقمية. يسعى لنشر الفكر الديني الوسطي المعتدل وخدمة طلاب العلم في مشارق الأرض ومغاربها.',
      ijazas: [
        'إجازة بالقرآن الكريم بالقراءات المتواترة (ورش عن نافع، حفص عن عاصم، وشعبة عن عاصم) بالسند المتصل إلى رسول الله ﷺ.',
        'إجازات علمية مسندة في تدريس وقراءة متون النحو والصرف والبلاغة والمنطق والفقه المالكي والعقيدة الأشعرية.'
      ],
      qualifications: [
        'ماجستير في التفسير وعلوم القرآن - كلية أصول الدين بالقاهرة (عنوان الرسالة: "علم المناسبات وأثره في تفسير المنار للشيخ محمد رشيد رضا - دراسة تطبيقية مقارنة").',
        'ليسانس أصول الدين من جامعة الأزهر الشريف.'
      ],
      experiences: [
        'مدرس للغة العربية والفقه المالكي والمنطق بالجامع الأزهر الشريف وأروقته العلمية.',
        'واعظ رسمي بالأزهر الشريف ووزارة الأوقاف لنشر الوعي الديني والمنهج الوسطي المعتدل.',
        'لقاءات تلفزيونية متعددة (منها برنامج "جوهر الإسلام" على قناة الناس).',
        'تأسيس وإدارة قناة يوتيوب "محمد بدر المالكي" لتدريس أمهات الكتب والشروحات العلمية لطلاب العلم عالمياً.'
      ],
      skills: [
        'تحفيظ القرآن الكريم وتجويده بالقراءات المتواترة بالرواية والسند',
        'تدريس الفقه المالكي وأصوله للطلاب المبتدئين والمتقدمين',
        'تدريس النحو والصرف والبلاغة القديمة والمنطق والعقيدة',
        'إعداد وتقديم المحتوى الإعلامي والدعوي المرئي الهادف'
      ],
      scholarlyTextTitle: 'أبرز المتون والكتب التي يدرسها الشيخ',
      scholarlyTexts: [
        'علوم العربية: الآجرومية، الأزهرية، تنقيح الأزهرية، قطر الندى، شذور الذهب، ألفية ابن مالك، لامية الأفعال، شذا العرف، اللؤلؤ المكنون في البلاغة.',
        'الفقه المالكي: متن الأخضري، العشماوية، العزية، نظم ابن عاشر، الرسالة لابن أبي زيد القيرواني، أقرب المسالك، أسهل المسالك.',
        'العقيدة والمنطق: عقيدة العوام، السنوسية، جوهرة التوحيد، الخريدة البهية، السلم المنورق في المنطق، إيساغوجي.'
      ]
    },
    en: {
      name: 'Sheikh Mohamed Badr Al-Maliki',
      title: 'Al-Azhar Emissary & Instructor of Islamic Sciences & Arabic',
      education: 'MA in Tafsir, Faculty of Usul al-Din, Al-Azhar University',
      specialty: 'Tafsir (Exegesis), Maliki Fiqh, Ash\'ari Theology, & Arabic Sciences',
      languages: 'Arabic (Native), English (Basic)',
      bio: 'A scholarly Al-Azhar preacher and researcher specializing in Quranic exegesis and Maliki jurisprudence. Sheikh Mohamed combines the rigor of the traditional Azhari method—focused on memorization of classical texts and precise textual commentary—with modern media outreach, advocating for moderate Islamic teachings globally.',
      ijazas: [
        'Connected chain (Isnad) to the Prophet ﷺ in multiple Qira\'at (Warsh \'an Nafi\', Hafs \'an \'Asim, Shu\'bah \'an \'Asim).',
        'Verified scholarly Ijazat to transmit and teach major classical texts in Arabic grammar, rhetoric, logic, theology, and law.'
      ],
      qualifications: [
        'Master’s Degree (MA) in Tafsir & Quranic Sciences, Faculty of Usul al-Din, Al-Azhar University, Cairo (Thesis: "The Science of Occasions & Its Impact on Al-Manar Tafsir").',
        'Bachelor\'s Degree in Usul al-Din from Al-Azhar University.'
      ],
      experiences: [
        'Instructor of Arabic grammar, Maliki jurisprudence, and logic at the Grand Al-Azhar Mosque circles.',
        'Official Al-Azhar preacher promoting moderate and balanced Islamic guidance.',
        'Featured guest on national television programs (Al-Nas TV) discussing contemporary Islamic affairs.',
        'Founder of "Mohamed Badr Al-Maliki" YouTube channel, delivering free classical video lectures globally.'
      ],
      skills: [
        'Teaching Quranic memorization and Tajweed in canonical Qira\'at',
        'Traditional instruction of Maliki jurisprudence from primary to advanced texts',
        'Teaching classical Arabic linguistics, logic (Mantiq), and theology (Aqidah)',
        'Content production and broadcasting for television and digital media'
      ],
      scholarlyTextTitle: 'Key Classical Manuals & Treatises Taught',
      scholarlyTexts: [
        'Arabic Grammar & Linguistics: Al-Ajrumiyyah, Al-Azhariyyah, Qatr al-Nada, Alfiyyah Ibn Malik, Lamiyat al-Af\'al, Shadha al-\'Arf.',
        'Maliki Fiqh (Law): Al-Akhdari, Al-Ashmawiya, Al-\'Iziyyah, Matn Ibn Ashir, Al-Risalah of Ibn Abi Zayd, Aqrab al-Masalik.',
        'Theology & Logic: Aqidat al-\'Awwam, Al-Sanusiyyah, Jawharat al-Tawhid, Al-Sullam al-Munawraq in Logic, Isagoge.'
      ]
    },
    fr: {
      name: 'Cheikh Mohamed Badr Al-Maliki',
      title: 'Prédicateur d\'Al-Azhar & Enseignant des Sciences Islamiques et de l\'Arabe',
      education: 'Master en Tafsir, Université d\'Al-Azhar, Le Caire',
      specialty: 'Tafsir (Exégèse), Fiqh Malékite, Théologie Ash\'arite & Logique',
      languages: 'Arabe (Maternelle), Anglais (Basique)',
      bio: 'Prédicateur et chercheur d\'Al-Azhar, spécialisé dans l\'exégèse coranique et le droit malékite. Le Cheikh Mohamed allie la rigueur de la méthode traditionnelle d\'Al-Azhar—basée sur l\'apprentissage par cœur des textes de référence et leur explication minutieuse—à une pédagogie active pour transmettre un savoir religieux authentique et modéré.',
      ijazas: [
        'Chaîne de transmission (Isnad) remontant au Prophète ﷺ dans les lectures de Warsh, Hafs et Shu\'bah.',
        'Ijazas d\'enseignement dans les traités majeurs de grammaire arabe, rhétorique, logique, jurisprudence malékite et Aqida.'
      ],
      qualifications: [
        'Master en Tafsir et Sciences du Coran, Université d\'Al-Azhar, Le Caire (Mémoire sur "L\'impact de la science des occasions dans le Tafsir Al-Manar").',
        'Licence en Oussoul al-Din de l\'Université d\'Al-Azhar.'
      ],
      experiences: [
        'Enseignant de grammaire arabe, droit malékite et logique dans les cercles d\'études de la Mosquée d\'Al-Azhar.',
        'Prédicateur officiel d\'Al-Azhar pour la diffusion d\'un discours religieux équilibré.',
        'Intervenant télévisé sur des chaînes éducatives (notamment la chaîne Al-Nas).',
        'Fondateur de la chaîne YouTube académique "Mohamed Badr Al-Maliki" pour l\'enseignement du patrimoine islamique.'
      ],
      skills: [
        'Récitation coranique et enseignement du Tajwid selon plusieurs Qira\'at',
        'Enseignement progressif du droit malékite, du niveau débutant à avancé',
        'Explication des traités arabes classiques, de logique et de théologie',
        'Production de contenus éducatifs audiovisuels pour les médias'
      ],
      scholarlyTextTitle: 'Principaux Traités Classiques Enseignés',
      scholarlyTexts: [
        'Grammaire et Linguistique: Al-Ajroumiyyah, Qatr al-Nada, Alfiyyah Ibn Malik, Lamiyat al-Af\'al, Shadha al-\'Arf.',
        'Droit Malékite: Matn Al-Akhdari, Al-Ashmawiya, Al-Risalah d\'Ibn Abi Zayd, Aqrab al-Masalik.',
        'Théologie & Logique: Aqidat al-\'Awwam, Al-Sanusiyyah, Jawharat al-Tawhid, Al-Sullam al-Munawraq, Isagoge.'
      ]
    }
  },
  'hamada-attia-nady': {
    ar: {
      name: 'د. حمادة عطية نادي',
      title: 'باحث دكتوراه في المناهج وطرق التدريس ومطور الخط العربي',
      education: 'باحث دكتوراه في المناهج وطرق التدريس بجامعة الأزهر',
      specialty: 'المناهج وطرق التدريس، العلوم الشرعية، والخط العربي الكلاسيكي',
      languages: 'العربية (اللغة الأم)، الإنجليزية (جيد)',
      bio: 'باحث دكتوراه ومطور مناهج تعليمية يجمع بين العلوم الشرعية وعلم المناهج التربوية الحديثة. يتميز بخبرته العميقة في تحقيق المخطوطات والتراث العربي الإسلامي، وتصميم النماذج التعليمية التي تيسر دراسة العلوم الإسلامية واللغة العربية، بالإضافة إلى شغفه بتعليم وتحسين الخط العربي كجزء من الهوية الإسلامية.',
      ijazas: [
        'دورة وتأهيل متقدم في تحقيق التراث العربي بمعهد المخطوطات العربية التابع لجامعة الدول العربية والجامع الأزهر.',
        'شهادة إعداد معلمي اللغة العربية للناطقين بغيرها من الجامع الأزهر الشريف.'
      ],
      qualifications: [
        'باحث دكتوراه في المناهج وطرق التدريس بجامعة الأزهر الشريف.',
        'ماجستير المناهج وطرق التدريس.',
        'الدبلوم الخاص (تمهيدي ماجستير) في الإدارة والتخطيط والمناهج التربوية من معهد البحوث والدراسات العربية.',
        'دبلوم الدراسات العليا في التربية من جامعة الأزهر.',
        'ليسانس أصول الدين (تخصص عقيدة وفلسفة) من جامعة الأزهر الشريف.',
        'دبلوم الخط العربي والزخرفة الإسلامية.'
      ],
      experiences: [
        'تحقيق التراث العربي والإشراف العلمي على طبع المخطوطات بعدة دور نشر معتمدة.',
        'مدرس المواد الشرعية واللغة العربية وقواعد الخط العربي.',
        'تطوير وتصميم ونمذجة المناهج والخطط الأكاديمية بمؤسسات شرعية تعليمية رائدة.',
        'باحث شرعي متخصص في إعداد المحتوى الأكاديمي وصياغة المعايير التربوية.'
      ],
      skills: [
        'تطوير وتصميم ونمذجة المناهج الدراسية الشرعية واللغوية',
        'تحقيق المخطوطات الإسلامية وضبط النصوص التراثية',
        'تعليم الخط العربي بكافة أنواعه (النسخ، الرقعة، الديواني، الثلث)',
        'تطبيق نظريات التربية ومناهج التدريس الحديثة'
      ],
      specialSectionTitle: 'نشاط تحقيق التراث والخط العربي',
      specialSectionText: 'يقوم الدكتور حمادة بدمج الفن الإسلامي بالبحث الأكاديمي، حيث يُدرس جماليات الخط العربي كأحد أركان الهوية الإسلامية واللغوية، بجانب عمله الدقيق في إحياء التراث المخطوط وتحقيقه علمياً لإخراجه لطلاب العلم بأعلى درجات الضبط والتحقيق.'
    },
    en: {
      name: 'Dr. Hamada Attia Nady',
      title: 'PhD Researcher in Curriculum & Instruction & Calligrapher',
      education: 'PhD Candidate in Curriculum & Instruction, Al-Azhar University',
      specialty: 'Curriculum & Instruction, Shariah Sciences, and Arabic Calligraphy',
      languages: 'Arabic (Native), English (Good)',
      bio: 'A doctoral researcher and educational designer who bridges Islamic theology with contemporary curriculum development. Specializing in ethical philosophy, pedagogy, and manuscript editing, he is dedicated to building structured learning paths. Hamada is also an accomplished calligrapher, teaching the classical script as an essential pillar of Islamic art and identity.',
      ijazas: [
        'Manuscript Editing & Heritage Preservation credentials from the Institute of Arabic Manuscripts and Al-Azhar Grand Mosque.',
        'Professional Training Certificate in Teaching Arabic to Non-Native Speakers, Al-Azhar Mosque.'
      ],
      qualifications: [
        'PhD Candidate in Curriculum & Instruction, Al-Azhar University, Cairo.',
        'Master’s Degree (MA) in Curriculum and Instruction Methods.',
        'Postgraduate Special Diploma in Educational Administration & Planning, Arab League University.',
        'Postgraduate General Diploma in Education, Al-Azhar University.',
        'Bachelor\'s Degree in Usul al-Din (Creed & Philosophy), Al-Azhar University.',
        'Diploma in Arabic Calligraphy & Islamic Ornamentation.'
      ],
      experiences: [
        'Active manuscript editor and scholarly reviewer for several Islamic publishing houses.',
        'Instructor of Islamic law, Arabic linguistics, and classical Arabic calligraphy.',
        'Senior curriculum developer, designing educational frameworks and modeling systems for modern Islamic schools.',
        'Academic researcher in Shariah education standards and pedagogy.'
      ],
      skills: [
        'Pedagogical Design & Modern Curriculum Modeling',
        'Scholarly Manuscript Editing (Tahqiq) & Heritage Analysis',
        'Classical Arabic Calligraphy Instruction (Naskh, Ruq\'ah, Thuluth, Diwani)',
        'Implementation of Educational Theories & Interactive Learning Methods'
      ],
      specialSectionTitle: 'Heritage Editing & Calligraphy Practice',
      specialSectionText: 'Dr. Hamada integrates Islamic art with academic research. He teaches classical Arabic calligraphy as a vital component of Islamic cultural identity and works on reviving classical manuscripts, ensuring they are edited with the highest academic standards before publication.'
    },
    fr: {
      name: 'Dr. Hamada Attia Nady',
      title: 'Chercheur Doctorant en Didactique & Calligraphe',
      education: 'Doctorant en Didactique et Méthodologies de l\'Enseignement, Université d\'Al-Azhar',
      specialty: 'Didactique, Sciences Islamiques et Calligraphie Arabe',
      languages: 'Arabe (Maternelle), Anglais (Bien)',
      bio: 'Chercheur et concepteur de programmes, Hamada relie la théologie islamique traditionnelle aux théories modernes de l\'éducation. Spécialisé en philosophie morale et didactique, il élabore des structures d\'apprentissage claires. Il également passionné par la calligraphie arabe, qu\'il enseigne comme un art spirituel et un pilier de l\'identité islamique.',
      ijazas: [
        'Certifications en Édition de Manuscrits délivrées par l\'Institut des Manuscrits Arabes et la Grande Mosquée d\'Al-Azhar.',
        'Certificat d\'aptitude à l\'enseignement de l\'arabe langue étrangère de la Mosquée d\'Al-Azhar.'
      ],
      qualifications: [
        'Doctorant en Didactique et Méthodes d\'Enseignement, Université d\'Al-Azhar, Le Caire.',
        'Master en Didactique et Méthodes d\'Enseignement.',
        'Diplôme Spécialisé en Administration Éducative de la Ligue Arabe.',
        'Diplôme Général en Éducation, Université d\'Al-Azhar.',
        'Licence en Oussoul al-Din (Théologie & Philosophie), Université d\'Al-Azhar.',
        'Diplôme d\'État de Calligraphie Arabe et d\'Ornementation Islamique.'
      ],
      experiences: [
        'Éditeur de manuscrits et chercheur auprès de maisons d\'édition arabes réputées.',
        'Enseignant de théologie islamique, de langue arabe et de calligraphie d\'art.',
        'Concepteur de programmes scolaires et modélisateur de parcours d\'apprentissage pour les écoles islamiques.',
        'Chercheur académique en théologie appliquée et éducation morale.'
      ],
      skills: [
        'Ingénierie pédagogique et élaboration de programmes éducatifs',
        'Édition critique de manuscrits islamiques (Tahqiq) et recherche scientifique',
        'Enseignement de la calligraphie classique (Naskh, Ruq\'ah, Diwani, Thuluth)',
        'Application des théories contemporaines de l\'éducation'
      ],
      specialSectionTitle: 'Édition du Patrimoine & Calligraphie Artistique',
      specialSectionText: 'Le Dr Hamada associe la recherche académique à l\'expression artistique. Il enseigne la calligraphie comme un art sacré et une manifestation de l\'identité linguistique, tout en consacrant ses travaux à la préservation et à l\'édition de manuscrits anciens.'
    }
  }
};

export function generateStaticParams() {
  const slugs = ['ahmed-yahya-zakaria', 'mohamed-badr-maliki', 'hamada-attia-nady'];
  const locales = ['en', 'fr', 'ar'];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

export default async function TeacherDetailPage({ params }: TeacherProfileProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const teacher = teachersData[slug]?.[locale];

  if (!teacher) {
    notFound();
  }

  const isRtl = locale === 'ar';

  const teacherImage = slug === 'ahmed-yahya-zakaria'
    ? '/images/teacher_ahmed_yahya.png'
    : slug === 'mohamed-badr-maliki'
      ? '/images/teacher_mohamed_badr.png'
      : '/images/teacher_hamada_attia.png';

  return (
    <section className="bg-navy-sapphire min-h-screen pt-32 pb-24 relative overflow-x-clip">
      {/* Repeating 8-star pattern background for premium texture */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.03] pointer-events-none" />

      {/* Decorative glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gold-hi/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-muted/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10 text-start">
          <Link
            href={`/${locale}/teachers`}
            className={`inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-gold-hi transition-colors duration-200 group ${
              isRtl ? 'flex-row-reverse' : ''
            }`}
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">
              {isRtl ? '← العودة لقائمة العلماء' : '← Back to Faculty'}
            </span>
          </Link>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-start">
          
          {/* Left Sticky Column (Identity Card) */}
          <div>
            <div 
              className="lg:sticky lg:top-24 bg-ivory border border-gold-muted/20 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(139,115,85,0.08)] relative overflow-hidden group lg:h-[85vh] flex flex-col justify-between overflow-y-auto no-scrollbar"
            >
              <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/30 via-gold-hi to-gold-muted/30 opacity-80 z-20" />
              
              <div className="flex flex-col">
                {/* Full Framed Portrait Container (Edge-to-Edge, Smaller Height) */}
                <div className="relative h-64 w-[calc(100%+4rem)] mx-[-2rem] mt-[-2rem] rounded-t-[2.5rem] overflow-hidden mb-6 border-b border-gold-muted/25 shadow-sm group-hover:border-gold/45 transition-colors duration-300">
                  <Image
                    src={teacherImage}
                    alt={teacher.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 300px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    priority
                  />
                  {/* Elegant overlay to give depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Title & Affiliation */}
                <div className="text-center border-b border-gold-muted/10 pb-6 mb-6">
                  <h1 className={`text-2xl font-bold text-midnight mb-2 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                    {teacher.name}
                  </h1>
                  <span className={`text-[11px] text-gold-hi uppercase tracking-widest font-semibold block leading-relaxed max-w-[240px] mx-auto ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {teacher.title}
                  </span>
                </div>

                {/* Detailed Metadata Fields */}
                <div className={`space-y-4 text-xs ${isRtl ? 'font-noto' : 'font-lora'}`}>
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-gold-hi/[0.015] border border-gold-muted/10 hover:border-gold/25 transition-all duration-300">
                    <GraduationCap className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone/60 block mb-0.5">{isRtl ? 'المؤهل والدراسة' : 'Education'}</span>
                      <span className="text-midnight font-bold leading-normal">{teacher.education}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-gold-hi/[0.015] border border-gold-muted/10 hover:border-gold/25 transition-all duration-300">
                    <Award className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone/60 block mb-0.5">{isRtl ? 'التخصص الدقيق' : 'Specialization'}</span>
                      <span className="text-midnight font-bold leading-normal">{teacher.specialty}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-gold-hi/[0.015] border border-gold-muted/10 hover:border-gold/25 transition-all duration-300">
                    <Languages className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone/60 block mb-0.5">{isRtl ? 'لغات التدريس والتدريب' : 'Instruction Languages'}</span>
                      <span className="text-midnight font-bold leading-normal">{teacher.languages}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Booking Button */}
              <div className="mt-8 z-10">
                <Link
                  href={`/${locale}/book`}
                  className="btn-gold text-center py-4 rounded-full text-xs uppercase tracking-wider font-semibold block w-full relative transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  {isRtl ? 'طلب حصة تجريبية مع المعلم' : 'Book Assessment Session'}
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (CV details: Bio, Qualifications, Ijazas, Experiences, Skills) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Academic Biography Card */}
            <div className="bg-ivory border border-gold-muted/20 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(139,115,85,0.08)] relative overflow-hidden">
              <div className="flex items-center gap-3 border-b border-gold-muted/10 pb-4 mb-6">
                <BookOpen size={18} className="text-gold" />
                <h2 className={`text-base font-bold text-midnight uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {isRtl ? 'السيرة الأكاديمية والمهنية' : 'Academic Biography'}
                </h2>
              </div>
              <p className={`text-sm text-stone leading-relaxed font-normal description-justify ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {teacher.bio}
              </p>
            </div>

            {/* Qualifications Card */}
            {teacher.qualifications && (
              <div className="bg-ivory border border-gold-muted/20 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(139,115,85,0.08)] relative overflow-hidden">
                <div className="flex items-center gap-3 border-b border-gold-muted/10 pb-4 mb-6">
                  <GraduationCap size={18} className="text-gold" />
                  <h2 className={`text-base font-bold text-midnight uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {isRtl ? 'المؤهلات العلمية والدراسة' : 'Academic Qualifications'}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {teacher.qualifications.map((qual: string, i: number) => (
                    <li key={i} className="flex items-start gap-3.5 text-xs text-stone">
                      <CheckCircle size={14} className="text-gold shrink-0 mt-0.5" />
                      <span className={`font-medium leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Certifications & Ijazat (Traditional Chains) */}
            <div className="bg-ivory border border-gold-muted/20 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(139,115,85,0.08)] relative overflow-hidden">
              <div className="flex items-center gap-3 border-b border-gold-muted/10 pb-4 mb-6">
                <Award size={18} className="text-gold" />
                <h2 className={`text-base font-bold text-midnight uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {isRtl ? 'الإجازات والأسانيد المعتمدة' : 'Certifications & Ijazat'}
                </h2>
              </div>
              
              <ul className="space-y-4">
                {teacher.ijazas.map((ijaza: string, i: number) => (
                  <li key={i} className="flex items-start gap-3.5 text-xs text-stone">
                    <Shield size={14} className="text-gold shrink-0 mt-0.5" />
                    <span className={`font-medium leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>{ijaza}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Working Experience Card */}
            {teacher.experiences && (
              <div className="bg-ivory border border-gold-muted/20 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(139,115,85,0.08)] relative overflow-hidden">
                <div className="flex items-center gap-3 border-b border-gold-muted/10 pb-4 mb-6">
                  <Briefcase size={18} className="text-gold" />
                  <h2 className={`text-base font-bold text-midnight uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {isRtl ? 'الخبرات العلمية والعملية' : 'Professional Experience'}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {teacher.experiences.map((exp: string, i: number) => (
                    <li key={i} className="flex items-start gap-3.5 text-xs text-stone">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/70 mt-1.5 shrink-0" />
                      <span className={`font-medium leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Custom Scholarly Textbooks list (Only for Mohamed Badr) */}
            {teacher.scholarlyTexts && (
              <div className="bg-ivory border border-gold-muted/20 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(139,115,85,0.08)] relative overflow-hidden">
                <div className="flex items-center gap-3 border-b border-gold-muted/10 pb-4 mb-6">
                  <Sparkles size={18} className="text-gold" />
                  <h2 className={`text-base font-bold text-midnight uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {teacher.scholarlyTextTitle}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {teacher.scholarlyTexts.map((text: string, i: number) => (
                    <li key={i} className="flex items-start gap-3.5 text-xs text-stone border-b border-gold-muted/10 pb-4 last:border-b-0 last:pb-0">
                      <span className="text-gold font-bold text-sm leading-none mt-0.5">✦</span>
                      <span className={`font-medium leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Custom Heritage Section (Only for Hamada Attia) */}
            {teacher.specialSectionText && (
              <div className="bg-ivory border border-gold-muted/20 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(139,115,85,0.08)] relative overflow-hidden">
                <div className="flex items-center gap-3 border-b border-gold-muted/10 pb-4 mb-6">
                  <Sparkles size={18} className="text-gold" />
                  <h2 className={`text-base font-bold text-midnight uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {teacher.specialSectionTitle}
                  </h2>
                </div>
                <p className={`text-sm text-stone leading-relaxed font-normal description-justify ${isRtl ? 'font-noto' : 'font-lora'}`}>
                  {teacher.specialSectionText}
                </p>
              </div>
            )}

            {/* Skills & Competencies Card */}
            {teacher.skills && (
              <div className="bg-ivory border border-gold-muted/20 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(139,115,85,0.08)] relative overflow-hidden">
                <div className="flex items-center gap-3 border-b border-gold-muted/10 pb-4 mb-6">
                  <Sparkles size={18} className="text-gold" />
                  <h2 className={`text-base font-bold text-midnight uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {isRtl ? 'المهارات والقدرات التربوية' : 'Core Pedagogical Skills'}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {teacher.skills.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className={`text-xs bg-gold/[0.04] text-midnight border border-gold-muted/25 py-2 px-4 rounded-full font-medium shadow-sm hover:bg-gold/[0.08] hover:border-gold-hi transition-all duration-300 ${
                        isRtl ? 'font-noto' : 'font-lora'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
