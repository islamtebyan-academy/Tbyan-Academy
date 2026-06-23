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

const newSettings = [
  // --- HERO ---
  {
    key: 'about_hero_tag',
    value: {
      ar: 'أكاديمية تبيان — الأثر والأصالة الأكاديمية',
      en: 'Tebyan Academy — Legacy & Academic Authority',
      fr: 'Académie Tebyan — Autorité Académique et Tradition'
    }
  },
  {
    key: 'about_hero_title',
    value: {
      ar: 'عن الأكاديمية',
      en: 'About the Academy',
      fr: 'À Propos de Nous'
    }
  },
  {
    key: 'about_hero_subtitle',
    value: {
      ar: 'صرح تعليمي عالمي يربط أصالة الإسناد ووقار التلقي بأحدث مناهج التخصيص والتمكين الفردي',
      en: 'A world-class scholarly institution preserving direct oral transmission (Talaqqi) alongside modern academic personalization.',
      fr: 'Une institution scientifique préservant la transmission orale directe (Talaqqi) alliée à une personnalisation pédagogique d\'élite.'
    }
  },
  {
    key: 'about_hero_verse',
    value: {
      ar: '﴿وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِكُلِّ شَيْءٍ﴾',
      en: '﴿وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِكُلِّ شَيْءٍ﴾',
      fr: '﴿وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِكُلِّ شَيْءٍ﴾'
    }
  },
  {
    key: 'about_hero_verse_source',
    value: {
      ar: 'سورة النحل — الآية 89',
      en: 'Surah An-Nahl — Verse 89',
      fr: 'Sourate An-Nahl — Verse 89'
    }
  },

  // --- PHILOSOPHY & STORY ---
  {
    key: 'about_philosophy_title',
    value: {
      ar: 'فلسفتنا التعليمية والتربوية',
      en: 'Our Educational Philosophy',
      fr: 'Notre Philosophie Pédagogique'
    }
  },
  {
    key: 'about_philosophy_subtitle',
    value: {
      ar: 'المشافهة والسماع كأساس لرسوخ المعرفة وضبط الفهم',
      en: 'Oral reception as the foundation for sound comprehension',
      fr: 'La transmission orale comme fondement de la compréhension'
    }
  },
  {
    key: 'about_philosophy_text',
    value: {
      ar: 'نؤمن في أكاديمية تبيان بأن العلوم الشرعية واللغة العربية والقرآن الكريم إرث مبارك يؤخذ بالتلقي المباشر مشافهة وسماعاً عن أهل العلم المتخصصين الموثوقين، ولا يكتفى فيه بالدراسات النظرية الجافة أو التسجيلات العشوائية. من هنا تنطلق رسالتنا لإعادة إحياء منهجية السند المتصل، بالجمع بين الإتقان المنهجي والمرونة التقنية المعاصرة.',
      en: 'We believe that traditional Islamic sciences, classical Arabic, and the Quran cannot be truly mastered through static textbooks or pre-recorded videos. Knowledge is a living light passed directly from the chests of verified scholars to the hearts of students. Islam Tebyan was established to preserve this golden chain of transmission (Isnad), blending rigorous scholarly methodology with the accessibility of modern technology.',
      fr: 'Nous croyons que les sciences islamiques traditionnelles, l\'arabe classique et le Coran ne peuvent être assimilés par de ses simples lectures ou vidéos préenregistrées. La connaissance est une lumière transmise directement de la poitrine de savants certifiés vers le cœur des étudiants. Islam Tebyan a été fondée pour préserver cette chaîne d\'or (Isnad), alliant la rigueur traditionnelle aux technologies modernes.'
    }
  },
  {
    key: 'about_philosophy_logo_subtitle',
    value: {
      ar: 'منهج الأزهر الشريف الوسطي',
      en: 'Moderate Al-Azhar Scholastic Path',
      fr: 'Le juste milieu de la tradition d\'Al-Azhar'
    }
  },
  {
    key: 'about_story_title',
    value: {
      ar: 'قصتنا ونشأتنا',
      en: 'Our Story & Foundations',
      fr: 'Notre Histoire et Origines'
    }
  },
  {
    key: 'about_story_tag',
    value: {
      ar: 'مسيرتنا العلمية',
      en: 'OUR JOURNEY',
      fr: 'NOTRE PARCOURS'
    }
  },
  {
    key: 'about_story_text1',
    value: {
      ar: 'تأسست أكاديمية تبيان لتكون الجسر المعرفي الأصيل والآمن الواصل بين حواضر العلم الإسلامي العريقة والمسلمين في شتى بقاع الأرض، لا سيما العائلات والمغتربين والناطقين بلغات متعددة. بدأت فكرتنا من استشعار الحاجة لتعليم فردي رصين يحاكي مجالس العلماء التقليدية في مساجد القاهرة وحواضر الشام، ولكن بأسلوب تفاعلي يواكب متطلبات العصر الرقمي.',
      en: 'Islam Tebyan Academy was founded to bridge the gap between traditional centers of Islamic scholarship and Muslim families globally. Our journey began with a simple observation: while automated apps and pre-recorded videos offered convenience, they lacked the personal feedback, spiritual guidance, and phonetic correction that define classical Islamic pedagogy.',
      fr: 'L\'Académie Islam Tebyan a été fondée pour relier les centres historiques du savoir islamique traditionnel aux familles musulmanes à travers le monde. Notre parcours a commencé par un constat simple : bien que les applications automatisées offrent de la commodité, elles manquent de la correction phonétique et du mentorat spirituel qui définissent la pédagogie islamique classique.'
    }
  },
  {
    key: 'about_story_text2',
    value: {
      ar: 'منذ انطلاقنا، ركزنا على التلقي المباشر مشافهة وسماعاً كخيار لا بديل عنه. وتطورت الأكاديمية لتخدم اليوم طلاباً من أكثر من 32 دولة، يجمعهم السعي لتحصيل العلم النافع والقرآن الكريم بسند متصل على يد نخبة من علماء الأزهر الشريف المعتمدين.',
      en: 'We set out to recreate the classical circles of knowledge (Halaqat) in a virtual environment. Today, Tebyan serves dedicated students across 32 countries, helping them memorize the Quran with verified chains of transmission (Isnad) and study classical sciences directly under vetted Al-Azhar graduates.',
      fr: 'Nous avons recréé les cercles classiques de savoir (Halaqat) dans un environnement virtuel. Aujourd\'hui, Tebyan accompagne des étudiants dans plus de 32 pays, les aidant à mémoriser le Coran avec des chaînes de transmission certifiées (Isnad) sous la tutelle de diplômés d\'Al-Azhar.'
    }
  },

  // --- MISSION ---
  {
    key: 'about_mission_title',
    value: {
      ar: 'رسالتنا وأهدافنا الأكاديمية',
      en: 'Our Mission & Mandate',
      fr: 'Notre Mission & Engagement'
    }
  },
  {
    key: 'about_mission_tag',
    value: {
      ar: 'رسالتنا العلمية',
      en: 'OUR MISSION',
      fr: 'NOTRE MISSION'
    }
  },
  {
    key: 'about_mission_intro',
    value: {
      ar: 'نسعى في تبيان لتوفير تعليم إسلامي ولغوي متميز للمسلمين في مختلف أنحاء العالم، يجمع بين الرصانة العلمية العتيقة والتعليم الشخصي الدقيق، لبناء جيل يفهم دينه ولغته فهماً عميقاً قائماً على التلقي الصحيح والأصيل.',
      en: 'Our mission is to deliver rigorous, personalized, and text-grounded Islamic and Arabic education to global seekers, preserving the sacred chain of oral transmission while utilizing interactive digital spaces to foster deep comprehension.',
      fr: 'Notre mission is de dispenser un enseignement rigoureux et personnalisé du Coran et des sciences islamiques, en préservant la transmission orale directe tout en tirant parti du numérique pour assurer une assimilation profonde.'
    }
  },
  {
    key: 'about_mission_point1_title',
    value: {
      ar: 'إحياء منهجية التلقي والأثر',
      en: 'Reviving Oral Transmission (Talaqqi)',
      fr: 'Préserver la Transmission Directe'
    }
  },
  {
    key: 'about_mission_point1_desc',
    value: {
      ar: 'ربط الطالب بالسند المتصل لرسول الله ﷺ وتنمية ملكته العلمية بدراسة المتون وشروحها المعتمدة.',
      en: 'Connecting students directly to verified chains of transmission (Isnad) back to the Prophet ﷺ.',
      fr: 'Relier directement l\'étudiant aux chaînes de transmission (Isnad) remontant au Prophète ﷺ.'
    }
  },
  {
    key: 'about_mission_point2_title',
    value: {
      ar: 'تيسير العلم للناطقين بغير العربية',
      en: 'Accessible Global Scholarship',
      fr: 'Rendre le Savoir Accessible'
    }
  },
  {
    key: 'about_mission_point2_desc',
    value: {
      ar: 'تقديم الشروحات الدقيقة باللغات الإنجليزية والفرنسية لتبسيط الفهم وإزالة الحواجز اللغوية.',
      en: 'Explaining classical concepts in fluent English and French to eliminate language barriers.',
      fr: 'Expliquer les notions complexes en français et en anglais pour lever tout obstacle de langue.'
    }
  },
  {
    key: 'about_mission_point3_title',
    value: {
      ar: 'بناء الشخصية الإسلامية الوسطية',
      en: 'Cultivating Scholarly Balance',
      fr: 'Promouvoir le Juste Milieu'
    }
  },
  {
    key: 'about_mission_point3_desc',
    value: {
      ar: 'ترسيخ قيم الاعتدال والوسطية المستمدة من منهج الأزهر الشريف، بعيداً عن الغلو والتقصير.',
      en: 'Instilling the balanced, moderate creed of Al-Azhar to build well-rounded Muslim identities.',
      fr: 'Transmettre la vision modérée d\'Al-Azhar pour former des citoyens musulmans équilibrés.'
    }
  },

  // --- PILLARS ---
  {
    key: 'about_pillars_tag',
    value: {
      ar: 'ركائز المنهج والتلقي',
      en: 'METHODOLOGY PILLARS',
      fr: 'PILIER DE LA MÉTHODOLOGIE'
    }
  },
  {
    key: 'about_pillars_title',
    value: {
      ar: 'أركان التميز والريادة العلمية',
      en: 'Pillars of Scholarly Distinction',
      fr: 'Piliers de Distinction Académique'
    }
  },
  {
    key: 'about_pillars_subtitle',
    value: {
      ar: 'تقوم الأكاديمية على أربعة أركان أساسية تضمن الحفاظ على أصالة المحتوى وجودة المخرج التعليمي.',
      en: 'Our academy is built on four core standards that protect the integrity and quality of the educational output.',
      fr: 'Notre académie repose sur quatre normes fondamentales qui protègent l\'intégrité et la qualité de l\'enseignement.'
    }
  },
  {
    key: 'about_pillar1_title',
    value: {
      ar: 'إسناد متصل بالسند الشريف',
      en: 'Authentic Chains (Isnad)',
      fr: 'Chaîne de Transmission (Isnad)'
    }
  },
  {
    key: 'about_pillar1_desc',
    value: {
      ar: 'تلقّي القرآن الكريم والعلوم اللغوية والشرعية بسلاسل إسناد متصلة إلى النبي ﷺ والمصنفين الأوائل، تحت إشراف علماء مجازين.',
      en: 'Study Quran recitation and classical texts with verified chains of transmission (Isnad) tracing back to the Prophet ﷺ and classical compilers.',
      fr: 'Étudiez le Coran et les textes classiques avec des chaînes de transmission certifiées remontant jusqu\'au Prophète ﷺ.'
    }
  },
  {
    key: 'about_pillar2_title',
    value: {
      ar: 'التعليم الفردي المباشر',
      en: 'Private 1-on-1 Reception',
      fr: 'Cours Individuels Directs'
    }
  },
  {
    key: 'about_pillar2_desc',
    value: {
      ar: 'تخصيص كامل لوقت الحصة ومتابعة مباشرة دقيقة تناسب وتيرة الطالب ومستواه التعليمي لتحقيق أقصى استيعاب وضبط.',
      en: 'Dedicated private sessions where the scholar adapts the pace, provides immediate feedback, and prioritizes your learning goals.',
      fr: 'Des sessions privées où l\'enseignant s\'adapte à votre rythme, corrige chaque détail et personnalise le cursus.'
    }
  },
  {
    key: 'about_pillar3_title',
    value: {
      ar: 'هيئة تدريس أزهرية معتمدة',
      en: 'Azhari Scholarly Faculty',
      fr: 'Faculté d\'Élite d\'Al-Azhar'
    }
  },
  {
    key: 'about_pillar3_desc',
    value: {
      ar: 'أكاديميون وعلماء خريجو جامعة الأزهر والمؤسسات العريقة، تم اختيارهم بعناية فائقة لضمان الكفاءة العلمية والمهارة التربوية.',
      en: 'Learn from certified graduates of Al-Azhar University, rigorously screened for scientific depth, pedagogical talent, and character.',
      fr: 'Apprenez auprès de savants diplômés de l\'Université d\'Al-Azhar, rigoureusement sélectionnés pour leur intégrité et pédagogie.'
    }
  },
  {
    key: 'about_pillar4_title',
    value: {
      ar: 'التواصل اللغوي التفاعلي',
      en: 'Academic Multilingualism',
      fr: 'Bilinguisme Académique'
    }
  },
  {
    key: 'about_pillar4_desc',
    value: {
      ar: 'علماء متمكنون يتحدثون العربية والإنجليزية والفرنسية بطلاقة، مما يسهل نقل المفاهيم الدقيقة بوضوح تام دون عوائق لغوية.',
      en: 'Instructors fluent in English, French, and Arabic, allowing nuanced jurisprudential and theological terms to be parsed naturally.',
      fr: 'Des enseignants maîtrisant le français, l\'anglais et l\'arabe pour expliquer les concepts théologiques sans obstacle linguistique.'
    }
  },

  // --- VETTING ---
  {
    key: 'about_vetting_tag',
    value: {
      ar: 'معايير الجودة والاعتماد',
      en: 'QUALITY VETTING STANDARDS',
      fr: 'NORMES DE SÉLECTION'
    }
  },
  {
    key: 'about_vetting_title',
    value: {
      ar: 'منهجية الفرز والاعتماد الأكاديمي لمعلمينا',
      en: 'Rigorous Faculty Selection Roadmap',
      fr: 'Protocole de Recrutement de la Faculté'
    }
  },
  {
    key: 'about_vetting_subtitle',
    value: {
      ar: 'لحماية العملية التعليمية وضمان موثوقية التحصيل، يمر المتقدم للتدريس في تبيان بأربع مراحل تدقيق صارمة:',
      en: 'To protect the integrity of your education, we screen our prospective scholars through a four-phase evaluation process:',
      fr: 'Afin de garantir l\'authenticité de l\'enseignement, nous appliquons un protocole rigoureux de recrutement en 4 étapes :'
    }
  },
  {
    key: 'about_vetting_step1_title',
    value: {
      ar: 'التحقق الأكاديمي والشهادات',
      en: 'Academic Verification',
      fr: 'Vérification Académique'
    }
  },
  {
    key: 'about_vetting_step1_desc',
    value: {
      ar: 'مراجعة الشهامات العلمية للمتقدم والتأكد من تخرجه من كليات الأزهر الشريف (الشريعة، اللغة العربية، أصول الدين، القراءات).',
      en: 'We verify the authenticity of the scholar’s degrees from accredited Islamic faculties (Shariah, Arabic Language, Theology, Qira’at).',
      fr: 'Validation rigoureuse des diplômes universitaires délivrés par Al-Azhar (Charia, Langue Arabe, Théologie, Qira\'at).'
    }
  },
  {
    key: 'about_vetting_step2_title',
    value: {
      ar: 'اختبار الإجازات والرواية',
      en: 'Isnad & Recitation Audits',
      fr: 'Audit de l\'Isnad et Récitation'
    }
  },
  {
    key: 'about_vetting_step2_desc',
    value: {
      ar: 'تقوم لجنة علمية متخصصة باختبار سند المدرس في الحفظ والتجويد وجودة القراءة، للتأكد من صحة التلقي والإجازات الحاصل عليها.',
      en: 'Senior reciters audit the candidate’s chain of transmission, phonetic accuracy, and adherence to tajweed standards.',
      fr: 'Un jury de savants auditionne le candidat sur sa récitation, la précision du Tajwid et la validité de ses Ijazat.'
    }
  },
  {
    key: 'about_vetting_step3_title',
    value: {
      ar: 'التدقيق اللغوي والثقافي',
      en: 'Linguistic & Cultural Screening',
      fr: 'Évaluation Linguistique et Culturelle'
    }
  },
  {
    key: 'about_vetting_step3_desc',
    value: {
      ar: 'فحص مهارات التواصل باللغة الإنجليزية أو الفرنسية، للتأكد من قدرته على تبسيط المفاهيم المعقدة للمسلمين المغتربين والناطقين بغير العربية.',
      en: 'We assess secondary language proficiency (English or French) and evaluate capability to address Western cultural contexts.',
      fr: 'Examen de la maîtrise du français ou de l\'anglais et aptitude à transmettre les sciences islamiques aux publics francophones.'
    }
  },
  {
    key: 'about_vetting_step4_title',
    value: {
      ar: 'الاختبار العملي والتدريب التربوي',
      en: 'Simulated Teaching & Pedagogy',
      fr: 'Cours de Simulation Pratique'
    }
  },
  {
    key: 'about_vetting_step4_desc',
    value: {
      ar: 'إجراء حصص محاكاة عملية لتقييم المهارات التدريسية والتأكد من توافق أسلوب المعلم مع المنهج التربوي الوسطي للأكاديمية.',
      en: 'The tutor conducts mock classes under scientific board monitoring to verify instruction quality and adherence to moderate paths.',
      fr: 'Mise en situation réelle de classe pour évaluer la pédagogie et l\'alignement avec la charte éthique et le juste milieu.'
    }
  },

  // --- QUOTE ---
  {
    key: 'about_quote_text',
    value: {
      ar: '«إنَّ هَذَا العِلْمَ دِينٌ، فَانْظُرُوا عَمَّنْ تَأْخُذُونَ دِينَكُمْ»',
      en: '“Indeed, this knowledge is your religion, so look to whom you take your religion from.”',
      fr: '« Certes, cette science est une religion, regardez donc de qui vous prenez votre religion. »'
    }
  },
  {
    key: 'about_quote_author',
    value: {
      ar: 'الإمام التابعي محمد بن سيرين — رحمه الله',
      en: 'Imam Muhammad ibn Sirin (Mercy of Allah upon him)',
      fr: 'L\'Imam Muhammad ibn Sirin (Qu\'Allah lui fasse miséricorde)'
    }
  }
];

async function seedAboutSettings() {
  console.log('Seeding "About Us" settings in Supabase...');

  for (const s of newSettings) {
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

  console.log('Seeding completed successfully!');
}

seedAboutSettings();
