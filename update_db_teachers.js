const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.substring(1, value.length - 1);
        }
        process.env[key] = value.trim();
      }
    }
  }
}

loadEnv();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const teacherSettings = [
  // --- Teacher 1 (Ahmed Yahya Zakaria) Detailed CV Keys ---
  {
    key: 'teacher1_bio',
    value: {
      ar: 'معلم قرآن كريم ولغة عربية لغير الناطقين بها، يسعى إلى تقديم تعليم متميز يجمع بين الأصالة والوسائل التعليمية الحديثة. يمتلك خبرة واسعة في التدريس والتعليم عبر الإنترنت، ويعمل بشغف لتطوير مهارات الطلاب ومساعدتهم على تحقيق أهدافهم اللغوية والدينية في بيئة تعليمية تفاعلية وممتعة.',
      en: 'A dedicated educator specializing in Quranic studies and classical Arabic for non-Arabic speakers. He blends traditional methodology with modern interactive tools to foster deep comprehension. Ahmed holds multiple Ijazas and aims to guide students toward their linguistic and spiritual goals in an engaging, supportive environment.',
      fr: 'Enseignant dévoué du Coran et de la langue arabe pour les non-arabophones, Ahmed s\'efforce d\'offrir un enseignement d\'excellence alliant authenticité traditionnelle et outils modernes. Il met à profit son expertise pédagogique pour aider les étudiants à atteindre leurs objectifs linguistiques et spirituels dans un cadre interactif et stimulant.'
    }
  },
  {
    key: 'teacher1_ijazas',
    value: {
      ar: 'إجازة برواية حفص عن عاصم بالسند المتصل من فضيلة الشيخ نبيل محمد علي.\nإجازة قرآنية معتمدة من فضيلة الشيخ سيد بعبولة.',
      en: 'Verified Quranic Recitation Ijaza (Hafs \'an \'Asim) with connected Isnad from Sheikh Nabil Muhammad Ali.\nQuranic Recitation Ijaza from Sheikh Sayyid Babola.',
      fr: 'Ijaza de récitation coranique (Hafs \'an \'Asim) avec Isnad connecté du Cheikh Nabil Muhammad Ali.\nIjaza coranique validée par le Cheikh Sayyid Babola.'
    }
  },
  {
    key: 'teacher1_qualifications',
    value: {
      ar: 'ليسانس من كلية أصول الدين - جامعة الأزهر الشريف بالقاهرة.\nدورات متخصصة في طرق تعليم اللغة العربية لغير الناطقين بها.\nدورات تدريبية متقدمة في مجالات التعليم الإلكتروني وإدارة الصفوف الافتراضية.',
      en: 'Bachelor\'s Degree in Usul al-Din (Fundamentals of Religion) from Al-Azhar University, Cairo.\nSpecialized qualifications in Arabic as a Second Language (ASL) instruction.\nCertified online education and virtual learning environments management trainer.',
      fr: 'Licence de la Faculté d\'Oussoul al-Din (Fondements de la Religion), Université d\'Al-Azhar, Le Caire.\nFormations spécialisées dans les méthodes d\'enseignement de l\'arabe langue étrangère.\nCertifications en administration de classes virtuelles et pédagogie interactive en ligne.'
    }
  },
  {
    key: 'teacher1_experiences',
    value: {
      ar: 'خبرة عملية تزيد عن خمس سنوات في تدريس اللغة العربية والقرآن الكريم والدراسات الإسلامية عبر الإنترنت.\nتدريب وتوجيه الطلاب من مختلف الأعمار والجنسيات والخلفيات الثقافية.\nإعداد وتطوير مناهج مخصصة للطلاب الناطقين بغير العربية لتسهيل الفهم والتحصيل.\nتبسيط أحكام التجويد للطلاب وتطبيقها العملي أثناء التلاوة بأساليب شيقة.',
      en: 'Over 5 years of online teaching experience in Arabic, Quranic sciences, and Islamic studies.\nMentored students of various age groups and nationalities, crafting customized lesson plans.\nDeveloped tailored curricula for non-Arabic speakers to facilitate smooth language acquisition.\nTaught Tajweed rules through interactive, practical, and highly simplified methodologies.',
      fr: 'Plus de 5 ans d\'enseignement en ligne de l\'arabe classique, du Coran et des sciences de la Shariah.\nAccompagnement d\'élèves de divers âges et nationalités avec des programmes personnalisés.\nDéveloppement de supports pédagogiques simplifiés pour les apprenants non-arabophones.\nEnseignement des règles de Tajwid par des méthodes actives et interactives.'
    }
  },
  {
    key: 'teacher1_skills',
    value: {
      ar: 'تصميم الخطط والبرامج التعليمية الفردية\nإدارة الفصول الافتراضية بمهارة عبر Zoom وGoogle Meet\nاستخدام برامج Microsoft Office والوسائط التفاعلية في التعليم\nالتواصل التربوي الفعال مع الطلاب وأولياء الأمور',
      en: 'Custom Curriculum Engineering & Progress Tracking\nInteractive Classroom Management (Zoom, Google Meet)\nEducational Content Design & Microsoft Office Applications\nEffective Parent-Student Pedagogical Communication',
      fr: 'Conception de programmes académiques personnalisés\nMaîtrise des classes numériques (Zoom, Google Meet)\nCréation de supports éducatifs multimédias\nCommunication interculturelle efficace avec les élèves et parents'
    }
  },

  // --- Teacher 2 (Mohamed Badr) Detailed CV Keys ---
  {
    key: 'teacher2_bio',
    value: {
      ar: 'واعظ وباحث أزهري متخصص في التفسير وعلوم القرآن والفقه المالكي. يجمع في تدريسه بين أصالة المنهج الأزهري القائم على حفظ المتون وضبط الشروح، وبين أساليب التقديم الحديثة عبر الإعلام والمواقع الرقمية. يسعى لنشر الفكر الديني الوسطي المعتدل وخدمة طلاب العلم في مشارق الأرض ومغاربها.',
      en: 'A scholarly Al-Azhar preacher and researcher specializing in Quranic exegesis and Maliki jurisprudence. Sheikh Mohamed combines the rigor of the traditional Azhari method—focused on memorization of classical texts and precise textual commentary—with modern media outreach, advocating for moderate Islamic teachings globally.',
      fr: 'Prédicateur et chercheur d\'Al-Azhar, spécialisé dans l\'exégèse coranique et le droit malékite. Le Cheikh Mohamed allie la rigueur de la méthode traditionnelle d\'Al-Azhar—basée sur l\'apprentissage par cœur des textes de référence et leur explication minutieuse—à une pédagogie active pour transmettre un savoir religieux authentique et modéré.'
    }
  },
  {
    key: 'teacher2_ijazas',
    value: {
      ar: 'إجازة بالقرآن الكريم بالقراءات المتواترة (ورش عن نافع، حفص عن عاصم، وشعبة عن عاصم) بالسند المتصل إلى رسول الله ﷺ.\nإجازات علمية مسندة في تدريس وقراءة متون النحو والصرف والبلاغة والمنطق والفقه المالكي والعقيدة.',
      en: 'Connected chain (Isnad) to the Prophet ﷺ in multiple Qira\'at (Warsh \'an Nafi\', Hafs \'an \'Asim, Shu\'bah \'an \'Asim).\nVerified scholarly Ijazat to transmit and teach major classical texts in Arabic grammar, rhetoric, logic, theology, and law.',
      fr: 'Chaîne de transmission (Isnad) remontant au Prophète ﷺ dans les lectures de Warsh, Hafs et Shu\'bah.\nIjazas d\'enseignement dans les traités majeurs de grammaire arabe, rhétorique, logique, jurisprudence malékite et Aqida.'
    }
  },
  {
    key: 'teacher2_qualifications',
    value: {
      ar: 'ماجستير في التفسير وعلوم القرآن - كلية أصول الدين بالقاهرة (عنوان الرسالة: "علم المناسبات وأثره في تفسير المنار للشيخ محمد رشيد رضا - دراسة تطبيقية مقارنة").\nليسانس أصول الدين من جامعة الأزهر الشريف.',
      en: 'Master’s Degree (MA) in Tafsir & Quranic Sciences, Faculty of Usul al-Din, Al-Azhar University, Cairo (Thesis: "The Science of Occasions & Its Impact on Al-Manar Tafsir").\nBachelor\'s Degree in Usul al-Din from Al-Azhar University.',
      fr: 'Master en Tafsir et Sciences du Coran, Université d\'Al-Azhar, Le Caire (Mémoire sur "L\'impact de la science des occasions dans le Tafsir Al-Manar").\nLicence en Oussoul al-Din de l\'Université d\'Al-Azhar.'
    }
  },
  {
    key: 'teacher2_experiences',
    value: {
      ar: 'مدرس للغة العربية والفقه المالكي والمنطق بالجامع الأزهر الشريف وأروقته العلمية.\nواعظ رسمي بالأزهر الشريف ووزارة الأوقاف لنشر الوعي الديني والمنهج الوسطي المعتدل.\nلقاءات تلفزيونية متعددة (منها برنامج "جوهر الإسلام" على قناة الناس).\nتأسيس وإدارة قناة يوتيوب "محمد بدر المالكي" لتدريس أمهات الكتب والشروحات العلمية لطلاب العلم عالمياً.',
      en: 'Instructor of Arabic grammar, Maliki jurisprudence, and logic at the Grand Al-Azhar Mosque circles.\nOfficial Al-Azhar preacher promoting moderate and balanced Islamic guidance.\nFeatured guest on national television programs (Al-Nas TV) discussing contemporary Islamic affairs.\nFounder of "Mohamed Badr Al-Maliki" YouTube channel, delivering free classical video lectures globally.',
      fr: 'Enseignant de grammaire arabe, droit malékite et logique dans les cercles d\'études de la Mosquée d\'Al-Azhar.\nPrédicateur officiel d\'Al-Azhar pour la diffusion d\'un discours religieux équilibré.\nIntervenant télévisé sur des chaînes éducatives (notamment la chaîne Al-Nas).\nFondateur de la chaîne YouTube académique "Mohamed Badr Al-Maliki" pour l\'enseignement du patrimoine islamique.'
    }
  },
  {
    key: 'teacher2_skills',
    value: {
      ar: 'تحفيظ القرآن الكريم وتجويده بالقراءات المتواترة بالرواية والسند\nتدريس الفقه المالكي وأصوله للطلاب المبتدئين والمتقدمين\nتدريس النحو والصرف والبلاغة القديمة والمنطق والعقيدة\nإعداد وتقديم المحتوى الإعلامي والدعوي المرئي الهادف',
      en: 'Teaching Quranic memorization and Tajweed in canonical Qira\'at\nTraditional instruction of Maliki jurisprudence from primary to advanced texts\nTeaching classical Arabic linguistics, logic (Mantiq), and theology (Aqidah)\nContent production and broadcasting for television and digital media',
      fr: 'Récitation coranique et enseignement du Tajwid selon plusieurs Qira\'at\nEnseignement progressif du droit malékite, du niveau débutant à avancé\nExplication des traités arabes classiques, de logique et de théologie\nProduction de contenus éducatifs audiovisuels pour les médias'
    }
  },
  {
    key: 'teacher2_scholarlyTextTitle',
    value: {
      ar: 'أبرز المتون والكتب التي يدرسها الشيخ',
      en: 'Key Classical Manuals & Treatises Taught',
      fr: 'Principaux Traités Classiques Enseignés'
    }
  },
  {
    key: 'teacher2_scholarlyTexts',
    value: {
      ar: 'العلوم العربية: الآجرومية، الأزهرية، تنقيح الأزهرية، قطر الندى، شذور الذهب، ألفية ابن مالك، لامية الأفعال، شذا العرف، اللؤلؤ المكنون في البلاغة.\nالفقه المالكي: متن الأخضري، العشماوية، العزية، نظم ابن عاشر، الرسالة لابن أبي زيد القيرواني، أقرب المسالك، أسهل المسالك.\nالعقيدة والمنطق: عقيدة العوام، السنوسية، جوهرة التوحيد، الخريدة البهية، السلم المنورق في المنطق، إيساغوجي.',
      en: 'Arabic Grammar & Linguistics: Al-Ajrumiyyah, Al-Azhariyyah, Qatr al-Nada, Alfiyyah Ibn Malik, Lamiyat al-Af\'al, Shadha al-\'Arf.\nMaliki Fiqh (Law): Al-Akhdari, Al-Ashmawiya, Al-\'Iziyyah, Matn Ibn Ashir, Al-Risalah of Ibn Abi Zayd, Aqrab al-Masalik.\nTheology & Logic: Aqidat al-\'Awwam, Al-Sanusiyyah, Jawharat al-Tawhid, Al-Sullam al-Munawraq in Logic, Isagoge.',
      fr: 'Grammaire et Linguistique: Al-Ajroumiyyah, Qatr al-Nada, Alfiyyah Ibn Malik, Lamiyat al-Af\'al, Shadha al-\'Arf.\nDroit Malékite: Matn Al-Akhdari, Al-Ashmawiya, Al-Risalah d\'Ibn Abi Zayd, Aqrab al-Masalik.\nThéologie & Logique: Aqidat al-\'Awwam, Al-Sanusiyyah, Jawharat al-Tawhid, Al-Sullam al-Munawraq, Isagoge.'
    }
  },

  // --- Teacher 3 (Hamada Attia Nady) Detailed CV Keys ---
  {
    key: 'teacher3_bio',
    value: {
      ar: 'باحث دكتوراه ومطور مناهج تعليمية يجمع بين العلوم الشرعية وعلم المناهج التربوية الحديثة. يتميز بخبرته العميقة في تحقيق المخطوطات والتراث العربي الإسلامي، وتصميم النماذج التعليمية التي تيسر دراسة العلوم الإسلامية واللغة العربية، بالإضافة إلى شغفه بتعليم وتحسين الخط العربي كجزء من الهوية الإسلامية.',
      en: 'A doctoral researcher and educational designer who bridges Islamic theology with contemporary curriculum development. Specializing in ethical philosophy, pedagogy, and manuscript editing, he is dedicated to building structured learning paths. Hamada is also an accomplished calligrapher, teaching the classical script as an essential pillar of Islamic art and identity.',
      fr: 'Chercheur et concepteur de programmes, Hamada relie la théologie islamique traditionnelle aux théories modernes de l\'éducation. Spécialisé en philosophie morale et didactique, il élabore des structures d\'apprentissage claires. Il également passionné par la calligraphie arabe, qu\'il enseigne comme un art spirituel et un pilier de l\'identité islamique.'
    }
  },
  {
    key: 'teacher3_ijazas',
    value: {
      ar: 'دورة وتأهيل متقدم في تحقيق التراث العربي بمعهد المخطوطات العربية التابع لجامعة الدول العربية والجامع الأزهر.\nشهادة إعداد معلمي اللغة العربية للناطقين بغيرها من الجامع الأزهر الشريف.',
      en: 'Manuscript Editing & Heritage Preservation credentials from the Institute of Arabic Manuscripts and Al-Azhar Grand Mosque.\nProfessional Training Certificate in Teaching Arabic to Non-Native Speakers, Al-Azhar Mosque.',
      fr: 'Certifications en Édition de Manuscrits délivrées par l\'Institut des Manuscrits Arabes et la Grande Mosquée d\'Al-Azhar.\nCertificat d\'aptitude à l\'enseignement de l\'arabe langue étrangère de la Mosquée d\'Al-Azhar.'
    }
  },
  {
    key: 'teacher3_qualifications',
    value: {
      ar: 'باحث دكتوراه في المناهج وطرق التدريس بجامعة الأزهر الشريف.\nماجستير المناهج وطرق التدريس.\nالدبلوم الخاص (تمهيدي ماجستير) في الإدارة والتخطيط والمناهج التربوية من معهد البحوث والدراسات العربية.\nدبلوم الدراسات العليا في التربية من جامعة الأزهر.\nليسانس أصول الدين (تخصص عقيدة وفلسفة) من جامعة الأزهر الشريف.\nدبلوم الخط العربي والزخرفة الإسلامية.',
      en: 'PhD Candidate in Curriculum & Instruction, Al-Azhar University, Cairo.\nMaster’s Degree (MA) in Curriculum and Instruction Methods.\nPostgraduate Special Diploma in Educational Administration & Planning, Arab League University.\nPostgraduate General Diploma in Education, Al-Azhar University.\nBachelor\'s Degree in Usul al-Din (Creed & Philosophy), Al-Azhar University.\nDiploma in Arabic Calligraphy & Islamic Ornamentation.',
      fr: 'Doctorant en Didactique et Méthodes d\'Enseignement, Université d\'Al-Azhar, Le Caire.\nMaster en Didactique et Méthodes d\'Enseignement.\nDiplôme Spécialisé en Administration Éducative de la Ligue Arabe.\nDiplôme Général en Éducation, Université d\'Al-Azhar.\nLicence en Oussoul al-Din (Théologie & Philosophie), Université d\'Al-Azhar.\nDiplôme d\'État de Calligraphie Arabe et d\'Ornementation Islamique.'
    }
  },
  {
    key: 'teacher3_experiences',
    value: {
      ar: 'تحقيق التراث العربي والإشراف العلمي على طبع المخطوطات بعدة دور نشر معتمدة.\nمدرس المواد الشرعية واللغة العربية وقواعد الخط العربي.\nتطوير وتصميم ونمذجة المناهج والخطط الأكاديمية بمؤسسات شرعية تعليمية رائدة.\nباحث شرعي متخصص في إعداد المحتوى الأكاديمي وصياغة المعايير التربوية.',
      en: 'Active manuscript editor and scholarly reviewer for several Islamic publishing houses.\nInstructor of Islamic law, Arabic linguistics, and classical Arabic calligraphy.\nSenior curriculum developer, designing educational frameworks and modeling systems for modern Islamic schools.\nAcademic researcher in Shariah education standards and pedagogy.',
      fr: 'Éditeur de manuscrits et chercheur auprès de maisons d\'édition arabes réputées.\nEnseignant de théologie islamique, de langue arabe et de calligraphie d\'art.\nConcepteur de programmes scolaires et modélisateur de parcours d\'apprentissage pour les écoles islamiques.\nChercheur académique en théologie appliquée et éducation morale.'
    }
  },
  {
    key: 'teacher3_skills',
    value: {
      ar: 'تطوير وتصميم ونمذجة المناهج الدراسية الشرعية واللغوية\nتحقيق المخطوطات الإسلامية وضبط النصوص التراثية\nتعليم الخط العربي بكافة أنواعه (النسخ، الرقعة، الديواني، الثلث)\nتطبيق نظريات التربية ومناهج التدريس الحديثة',
      en: 'Pedagogical Design & Modern Curriculum Modeling\nScholarly Manuscript Editing (Tahqiq) & Heritage Analysis\nClassical Arabic Calligraphy Instruction (Naskh, Ruq\'ah, Thuluth, Diwani)\nImplementation of Educational Theories & Interactive Learning Methods',
      fr: 'Ingénierie pédagogique et élaboration de programmes éducatifs\nÉdition critique de manuscrits islamiques (Tahqiq) et recherche scientifique\nEnseignement de la calligraphie classique (Naskh, Ruq\'ah, Diwani, Thuluth)\nApplication des théories contemporaines de l\'éducation'
    }
  },
  {
    key: 'teacher3_specialSectionTitle',
    value: {
      ar: 'نشاط تحقيق التراث والخط العربي',
      en: 'Heritage Editing & Calligraphy Practice',
      fr: 'Édition du Patrimoine & Calligraphie Artistique'
    }
  },
  {
    key: 'teacher3_specialSectionText',
    value: {
      ar: 'يقوم الدكتور حمادة بدمج الفن الإسلامي بالبحث الأكاديمي، حيث يُدرس جماليات الخط العربي كأحد أركان الهوية الإسلامية واللغوية، بجانب عمله الدقيق في إحياء التراث المخطوط وتحقيقه علمياً لإخراجه لطلاب العلم بأعلى درجات الضبط والتحقيق.',
      en: 'Dr. Hamada integrates Islamic art with academic research. He teaches classical Arabic calligraphy as a vital component of Islamic cultural identity and works on reviving classical manuscripts, ensuring they are edited with the highest academic standards before publication.',
      fr: 'Le Dr Hamada associe la recherche académique à l\'expression artistique. Il enseigne la calligraphie comme un art sacré et une manifestation de l\'identité linguistique, tout en consacrant ses travaux à la préservation et à l\'édition de manuscrits anciens.'
    }
  }
];

async function seedTeachers() {
  console.log('Seeding detailed teacher profile settings in Supabase...');

  for (const s of teacherSettings) {
    const { data, error } = await supabase
      .from('settings')
      .upsert({
        key: s.key,
        value: s.value,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      });

    if (error) {
      console.error(`Error inserting key ${s.key}:`, error.message);
    } else {
      console.log(`Successfully seeded key: ${s.key}`);
    }
  }

  console.log('Detailed teacher profiles seeded successfully!');
}

seedTeachers();
