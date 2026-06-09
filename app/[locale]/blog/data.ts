export interface ArticleSection {
  subtitle: string;
  body: string;
  quote?: string;
}

export interface ArticleTranslation {
  category: string;
  title: string;
  excerpt: string;
  ctaMessage: string;
  bookingTopic: string;
  content: {
    intro: string;
    sections: ArticleSection[];
    conclusion: string;
    references: string[];
  };
}

export interface Article {
  slug: string;
  categoryKey: string;
  image: string;
  date: string;
  readTime: number;
  translation: ArticleTranslation;
}

export const ARTICLES_DATA: Record<string, Record<string, ArticleTranslation>> = {
  ar: {
    'history-of-quranic-recitations': {
      category: 'علوم القرآن',
      title: 'تاريخ القراءات القرآنية ونشأتها الأكاديمية',
      excerpt: 'دراسة علمية متخصصة في تواتر القراءات السبع والعشر، والفرق بين الأحرف السبعة والقراءات، مع استعراض مناهج الأئمة القراء وأسانيدهم المتصلة بالنبي ﷺ.',
      ctaMessage: 'هل أثار اهتمامك علم القراءات والتجويد؟ ابدأ رحلة ضبط تلاوتك الآن بالسند المتصل على يد شيوخ الأزهر الشريف.',
      bookingTopic: 'quran',
      content: {
        intro: 'إن القرآن الكريم نزل بلسان عربي مبين، وتلقته الأمة بالقبول والتواتر جيلًا بعد جيل. ولم يكن علم القراءات مجرد تنوع في اللفظ، بل هو صرح أكاديمي راسخ يعكس دقة الضبط وقوة النقل عند علماء المسلمين، وتوثيق الرواية بأسلوب لم تعرفه أي حضارة أخرى.',
        sections: [
          {
            subtitle: 'الأحرف السبعة والقراءات العشر: إزالة اللبس',
            body: 'يكثر الخلط بين مفهوم "الأحرف السبعة" و"القراءات العشر". الأحرف السبعة هي التيسير الإلهي الذي نزل به القرآن ليتلاءم مع لهجات العرب الفصحى وقت التنزيل. أما القراءات العشر فهي المذاهب الأدائية المتواترة التي اختارها الأئمة القراء ورواتها، وضبطوها وفق شروط ثلاثة: موافقة العربية ولو بوجه، وموافقة الرسم العثماني، وصحة السند وتواتره.',
            quote: '«إن هذا العلم دين، فانظروا عمن تأخذون دينكم» — الإمام ابن سيرين'
          },
          {
            subtitle: 'شروط قبول القراءة المتواترة',
            body: 'وضع علماء القراءات ميزانًا دقيقًا لقبول الرواية القرآنيّة؛ فكل قراءة وافقت وجهًا من وجوه النحو، ووافقت المصاحف العثمانية إجماعًا، وصح سندها بالنقل المستفيض والتواتر، فهي القراءة الصحيحة التي لا يجوز ردها. وبخلاف ذلك، تصنف القراءة على أنها شاذة ولا تصح القراءة بها في الصلاة.'
          },
          {
            subtitle: 'مناهج الأئمة القراء ورواد النقل',
            body: 'انبرى لضبط الأحرف أئمة أعلام قضوا حياتهم في ضبط الحروف ونقل الأسانيد، بدءًا من الأئمة السبعة الذين دون الإمام الشاطبي مناهجهم في "حرز الأماني"، وتلاه الإمام ابن الجزري ليوثق القراءات الثلاث المتممة للعشر الشريفة. كالإمام عاصم بروايتي حفص وشعبة، والإمام نافع بروايتي قالون وورش.'
          }
        ],
        conclusion: 'يبقى علم القراءات شاهدًا حيًّا على الحفظ الرباني لكتابه العزيز، مجسدًا في أسانيد شيوخ الإقراء المتصلة جيلًا بعد جيل بالرسول الأكرم ﷺ.',
        references: [
          'ابن الجزري، النشر في القراءات العشر.',
          'الذهبي، معرفة القراء الكبار على الطبقات والأعصار.',
          'السيوطي، الإتقان في علوم القرآن.'
        ]
      }
    },
    'practice-of-madinah-maliki-fiqh': {
      category: 'أصول الفقه',
      title: 'عمل أهل المدينة كأصل تشريعي في المذهب المالكي',
      excerpt: 'استقصاء أصولي لمنهج الإمام مالك في الاحتجاج بعمل أهل المدينة، وتقديمه على خبر الواحد في الاستنباط الفقهي، مع تحليل الفروق بين العمل النقلي والاجتهادي.',
      ctaMessage: 'هل تود التفقه في الفقه المالكي وأصوله المنهجية؟ احجز جلستك التجريبية مع فقهائنا الأزهريين لدراسة المتون المعتمدة.',
      bookingTopic: 'fiqh',
      content: {
        intro: 'يتميز المذهب المالكي بأصوله التشريعية المتينة والمرنة في آن واحد. ويأتي "عمل أهل المدينة" في مقدمة الأصول المذهبية التي تفرد بها الإمام مالك بن أنس، معتبرًا إياه نقلًا متواترًا للممارسة النبوية المستمرة، ومقدمًا إياه على أحاديث الآحاد في مواطن التعارض.',
        sections: [
          {
            subtitle: 'حجية عمل أهل المدينة ومفهومه الأصولي',
            body: 'يعتبر الإمام مالك أن المدينة المنورة هي مهبط الوحي ومستقر الصحابة الكرام الذين شهدوا التنزيل وتلقوا السنن مباشرة من النبي ﷺ. وبناءً على ذلك، فإن ما توارثه أهل المدينة وطبقوه كأمر مستقر وشائع لا بد أن يكون مستندًا إلى سنة نبوية فعلية أو إقرار كريم، مما يمنحه قوة النقل العملي المتواتر.',
            quote: '«عمل أهل المدينة أقوى من خبر الواحد، لأن العمل نقل كافّة عن كافّة، وهو يفيد اليقين.» — الإمام مالك بن أنس'
          },
          {
            subtitle: 'الفرق بين العمل النقلي والعمل الاجتهادي',
            body: 'يقسم علماء المالكية عمل أهل المدينة إلى قسمين رئيسيين: العمل النقلي (الذي طريقه النقل والصفة، كالأوزان والمكاييل والأذان) وهو حجة باتفاق المالكية وجمهور العلماء، والعمل الاجتهادي (الذي استنبطه علماء المدينة باجتهادهم بعد عصر الصحابة) وهو موضع تفصيل واختلاف أصولي دقيق.'
          },
          {
            subtitle: 'أثر التقديم على خبر الواحد عند التعارض',
            body: 'عند تعارض حديث صحيح من رواية الآحاد مع عمل مستمر لأهل المدينة، يقدم مالك العمل؛ لأن الحديث قد يتطرق إليه السهو أو النسخ أو الخصوصية، بينما العمل العام المتوارث يمثل السنة الظاهرة المأمونة من عوارض النسيان والانتقاع الفردي.'
          }
        ],
        conclusion: 'يمثل الاحتجاج بعمل أهل المدينة قمة الواقعية الأصولية التي تحافظ على روح التشريع وحيوية المجتمع وموثوقية التطبيق العملي للسنن النبوية.',
        references: [
          'مالك بن أنس، الموطأ.',
          'القاضي عياض، ترتيب المدارك وتقريب المسالك.',
          'ابن رشد الجد، المقدمات الممهدات.'
        ]
      }
    },
    'basra-kufa-grammatical-schools': {
      category: 'اللسانيات العربية',
      title: 'المدارس النحوية: التناظر العلمي بين البصرة والكوفة',
      excerpt: 'تحليل أصول الخلاف النحوي بين مدرستي البصرة بقيادة سيبويه والكوفة بقيادة الكسائي، وأثر هذا التناظر في تقعيد اللغة العربية وتأصيل قواعد النحو والصرف.',
      ctaMessage: 'هل ترغب في إتقان النحو العربي وفك مغاليق لغة القرآن؟ ابدأ دراسة الآجرومية ومتون النحو مع أساتذتنا المتخصصين.',
      bookingTopic: 'arabic',
      content: {
        intro: 'لم يكن علم النحو العربي مجرد قواعد جافة، بل كان علمًا حيًّا قام على التناظر والمساجلات الفكرية الكبرى. وقد مثلت المدرستان البصرية والكوفية جناحين طار بهما الفكر اللغوي العربي، حيث صاغت البصرة بأصولها القياسية الصارمة وصاغت الكوفة بمرونتها الرائعة القواعد التشريعية للغتنا الفصحى.',
        sections: [
          {
            subtitle: 'مدرسة البصرة: القياس والشدة المنهجية',
            body: 'تأسست مدرسة البصرة على يد الخليل بن أحمد وسيبويه، وتميزت بالمنهج القياسي الصارم. فكان النحاة البصريون لا يقبلون في تقعيد القواعد إلا ما شاع واستفاض من لغة قبائل عربية معينة ثبتت فصاحتها، ويرفضون القياس على الشاذ أو النادر من الشواهد الشعرية حفاظًا على اطراد القاعدة ولحمة اللسان.',
            quote: '«القرآن واللغة لا يقاس عليهما إلا بما كثر واستفاض في كلام العرب الفصحاء.» — سيبويه'
          },
          {
            subtitle: 'مدرسة الكوفة: المرونة ورواية الشواهد النادرة',
            body: 'على الجانب الآخر، قاد الكسائي والفراء مدرسة الكوفة، وتميزت بالمرونة والاتساع. فكان الكوفيون يقيسون على الشاهد الواحد المروي، ويسعون لتسويغ التراكيب اللغوية الواردة في التراث العربي الفصيح حتى وإن لم تكن مطردة، مما أثرى الدرس اللغوي بروايات وشواهد إضافية مكنت الأدباء من التوسع في وجوه القول.'
          },
          {
            subtitle: 'ثمرة التناظر اللغوي وأثره في تفسير النص الشريف',
            body: 'لم يكن الخلاف بين المدرستين خلاف خصومة، بل كان إثراءً علميًا عظيمًا. وقد تجلى أثر هذا الخلاف في كتب التفسير وإعراب القرآن، حيث وجد المفسرون في قواعد المدرستين مخارج نحوية دقيقة لتوجيه القراءات المتعددة وفهم أسرار النظم الإلهي الحكيم.'
          }
        ],
        conclusion: 'إن التناظر النحوي بين البصرة والكوفة يظل النموذج الأبرز للتعددية العلمية البناءة التي أسست للحفاظ على اللسان العربي وبيان إعجاز التنزيل.',
        references: [
          'الأنباري، الإنصاف في مسائل الخلاف بين النحويين البصريين والكوفيين.',
          'سيبويه، الكتاب.',
          'شوقي ضيف، المدارس النحوية.'
        ]
      }
    },
    'ashari-maturidi-theology-methodology': {
      category: 'العقيدة الإسلامية',
      title: 'منهج الأشاعرة والماتريدية في تقرير العقائد الإسلامية',
      excerpt: 'قراءة منهجية في التوفيق بين العقل والنقل عند أهل السنة والجماعة، ودور المدرسة الأشعرية والماتريدية في رد الشبهات العقلية وتثبيت العقيدة الصحيحة.',
      ctaMessage: 'هل تبحث عن دراسة علم العقيدة والتوحيد بمنهجية أزهرية متزنة؟ انضم لحلقاتنا التخصصية بإشراف نخبة من علماء العقيدة بالأزهر.',
      bookingTopic: 'aqidah',
      content: {
        intro: 'يمثل المذهب الأشعري والماتريدي المنهج الكلامي السائد لجمهور أهل السنة والجماعة عبر القرون. وقد صاغت هاتان المدرستان إطارًا معرفيًا دقيقًا يوفق بين صريح النقل وصحيح العقل، مما مكن الأمة من مواجهة التحديات الفلسفية الوافدة رد الشبهات الكلامية بمنهجية رصينة.',
        sections: [
          {
            subtitle: 'أبو الحسن الأشعري وأبو منصور الماتريدي: حارسا العقيدة',
            body: 'ظهر الإمام الأشعري في العراق والإمام الماتريدي في ما وراء النهر في القرن الرابع الهجري. وكان عملهما متمحورًا حول صياغة منهج وسطي يقف بين النزعة العقلية المتطرفة للمعتزلة والنزعة الحرفية الجامدة لبعض الطوائف، مستخدمين الأدوات المنطقية لإثبات ما ورد في القرآن والسنة من صفات وأصول عقائدية.',
            quote: '«المنهج القويم هو إثبات ما أثبته النقل وتأييده ببراهين العقل، فالنقل أصل والعقل عاضد وشاهد.» — الإمام أبو الحسن الأشعري'
          },
          {
            subtitle: 'قاعدة التوفيق بين العقل والنقل',
            body: 'تعتمد المدرسة السنية الكلامية على مبدأ أساسي: العقل والنقل لا يتعارضان تعارضًا حقيقيًا. فالعقل هو الذي يثبت صدق الرسالة وصحة الوحي بالمعجزة، والنقل هو المصدر الذي يخبرنا بالغيبيات والشرائع التي لا يستقل العقل بمعرفتها تفصيلًا، مما يجعل العلاقة علاقة تكامل وانسجام.'
          },
          {
            subtitle: 'الدور التاريخي في حماية الهوية العقدية للأمة',
            body: 'من خلال تقعيد وتصنيف العقائد السنية، استطاع علماء الأشاعرة والماتريدية صياغة مناهج تعليمية موحدة تبنتها المدارس والمعاهد الكبرى كالأزهر الشريف، والزيتونة، والقرويين، مما حافظ على وحدة الصف وحماية الهوية العقدية للأمة ضد الانحرافات المعرفية.'
          }
        ],
        conclusion: 'يظل منهج الأشاعرة والماتريدية الركيزة الأساسية للاعتدال والوسطية الإسلامية التي تجمع القلوب وتحصن العقول.',
        references: [
          'أبو الحسن الأشعري، مقالات الإسلاميين واختلاف المصلين.',
          'الباجوري، حاشية جوهرة التوحيد.',
          'الغزالي، الاقتصاد في الاعتقاد.'
        ]
      }
    },
    'al-ghazali-integration-of-logic-usul': {
      category: 'علم المنطق',
      title: 'تقنين المنطق في أصول الفقه عند الإمام الغزالي',
      excerpt: 'استعراض تاريخي وفلسفي لكتاب المستصفى للإمام الغزالي، وكيف جعل علم المنطق مقدمة لا غنى عنها لكل العلوم الشرعية، ممهداً لقبوله في الأوساط العلمية.',
      ctaMessage: 'هل تسعى لتطوير تفكيرك النقدي وفهم مناهج الاستدلال الفقهي والمنطقي؟ ابدأ دراسة علم المنطق مع أساتذة الفكر الأزهريين.',
      bookingTopic: 'logic',
      content: {
        intro: 'كان الفكر الإسلامي يقف موقف الحذر والريبة من علوم المنطق اليوناني والفلسفة الوافدة. ولكن مع ظهور الإمام حجة الإسلام أبي حامد الغزالي، حدثت نقطة تحول كبرى، حيث قام بتنقية المنطق من شوائب الفلسفة الوثنية ودمجه كأداة عقلية لا غنى عنها في بنية العلوم الإسلامية، وبخاصة علم أصول الفقه.',
        sections: [
          {
            subtitle: 'مقدمة المستصفى: المنطق معيار العلوم',
            body: 'في مقدمة كتابه الأصولي الشهير "المستصفى من علم الأصول"، وضع الإمام الغزالي مقدمة منطقية تزيد على مئة صفحة، مصرحًا بأن هذه مقدمة ليست من صلب علم الأصول ولكنها ضرورية لكل باحث شرعي. وقد أعلن فيها عبارته الشهيرة التي غيرت مسار التعليم الإسلامي واعتمدت المنطق كشرط للضبط الفكري.',
            quote: '«من لا يحيط بالمنطق علمًا، فلا ثقة بعلومه أصلاً.» — الإمام أبو حامد الغزالي'
          },
          {
            subtitle: 'تنقية الأداة المنطقية وإلباسها الثوب الإسلامي',
            body: 'لم يكتف الغزالي بنقل المنطق الأرسطي، بل صاغه بلغة إسلامية أصولية. فاستبدل المصطلحات اليونانية الجافة بأخرى فقهية قريبة للفقهاء (مثل القياس، والحد، والبرهان)، واستشهد على القوانين العقلية بآيات قرآنيّة ومسائل فقهية تطبيقية، مما جعل المنطق مقبولًا ومستساغًا في الحلقات العلمية.'
          },
          {
            subtitle: 'أثر دمج المنطق في ضبط الاستدلال الفقهي',
            body: 'من خلال هذا الدمج، اكتسب علم أصول الفقه وعلم الكلام دقة متناهية في صياغة الحدود والتعريفات، وتقسيم القياس، وبناء الحجج والرد على المعارضين. وأصبح الفقيه يمتلك آلة عقلية صارمة تحميه من الوقوع في التناقض أو قبول المقدمات الفاسدة.'
          }
        ],
        conclusion: 'يمثل عمل الغزالي أرقى درجات التفاعل الحضاري الذي يستفيد من تراث الإنسانية ويوظفه لخدمة علوم الوحي وضبط مسار المعرفة الإسلامية.',
        references: [
          'الغزالي، المستصفى من علم الأصول.',
          'الغزالي، معيار العلم في فن المنطق.',
          'ابن تيمية، الرد على المنطقيين (للمقارنة والنقد).'
        ]
      }
    },
    'al-jurjani-theory-of-structure-nazhm': {
      category: 'البلاغة والأدب',
      title: 'نظرية النظم عند عبد القاهر الجرجاني وإعجاز القرآن',
      excerpt: 'دراسة تحليلية لنظرية النظم في كتاب "دلائل الإعجاز"، وكيف أسس الجرجاني لفهم إعجاز القرآن البياني من خلال الترابط النحوي والدلالي بين الكلمات.',
      ctaMessage: 'هل تبهرك بلاغة القرآن وإعجازه البياني؟ تذوق جمال اللغة وتراكيبها البديعة من خلال حلقات البلاغة والآداب معنا.',
      bookingTopic: 'literature',
      content: {
        intro: 'على مدى قرون، تطلع علماء المسلمين للكشف عن سر إعجاز القرآن الكريم اللغوي. ومع ظهور الإمام عبد القاهر الجرجاني في القرن الخامس الهجري، تأسست مدرسة النقد البلاغي العلمي عبر صياغته "نظرية النظم" في كتابه الخالد "دلائل الإعجاز"، مقدماً إجابة منهجية متكاملة لسر البيان القرآني الفريد.',
        sections: [
          {
            subtitle: 'ماهية نظرية النظم والترابط الدلالي',
            body: 'قرر الجرجاني أن الإعجاز ليس في الكلمات المفردة ولا في الحروف أو النغمات الصوتية، وإنما يكمن في طريقة ترتيب وتنسيق هذه الكلمات داخل الجملة وفقًا لقوانين النحو ومعاني النحو. فالكلمة لا قيمة بلاغية لها بمفردها، بل تكتسب شرفها وجمالها من موقعها وعلاقتها بالكلمات المجاورة لها في سياق النظم التعبيري المترابط.',
            quote: '«الألفاظ لا تتفاضل من حيث هي ألفاظ مفردة، وإنما يتفاضل النظم إذا جاء متطابقًا مع مقتضيات معاني النحو والبيان.» — الإمام عبد القاهر الجرجاني'
          },
          {
            subtitle: 'النحو كركيزة أساسية لعلم البلاغة',
            body: 'أحدث الجرجاني ثورة بربطه الوثيق بين النحو والبلاغة. فالبلاغة عنده ليست محسنات لفظية تضاف لاحقًا، بل هي التطبيق الدقيق والعميق لخصائص التراكيب النحوية (كالتقديم والتأخير، والذكر والحذف، والتعريف والتنكير) للتعبير عن أدق خلجات المعنى ومراعاة أحوال السامعين ومقتضيات المقامات المختلفة.'
          },
          {
            subtitle: 'تفسير إعجاز النظم البياني في القرآن الشريف',
            body: 'بناءً على هذا التأصيل، فسر الجرجاني تفوق النظم القرآني بأن كل حرف وكلمة فيه قد وضعت في مكانها الدقيق الذي لا يسد غيره مسده، بحيث لو حذفت كلمة أو أخرت لتأثر المعنى بكامله وفقد التعبير توهجه، وهو ما يعجز طوق البشر البلاغي عن مجاراته أو الإتيان بمثله.'
          }
        ],
        conclusion: 'تظل نظرية النظم التأسيس البلاغي الأعمق الذي كشف عن أسرار العربية، وجعل إعجاز القرآن البياني حقيقة تدرك بالذوق العلمي والدراسة النقدية الرصينة.',
        references: [
          'عبد القاهر الجرجاني، دلائل الإعجاز.',
          'عبد القاهر الجرجاني، أسرار البلاغة.',
          'محمود محمد شاكر، مدخل إلى دلائل الإعجاز.'
        ]
      }
    },
    'al-tabari-methodology-historiography': {
      category: 'التاريخ الإسلامي',
      title: 'منهج الإمام الطبري في التوثيق التاريخي ونقد الروايات',
      excerpt: 'تحليل أصولي لمنهج ابن جرير الطبري في تدوين التاريخ الإسلامي، والاعتماد على الإسناد كأداة للتحقق من المرويات التاريخية في كتابه "تاريخ الرسل والملوك".',
      ctaMessage: 'هل يثير شغفك فهم التاريخ الإسلامي واستيعاب حقيقة الوقائع التاريخية؟ تدارس كتب التاريخ وحقق المرويات مع مؤرخينا بالأزهر الشريف.',
      bookingTopic: 'history',
      content: {
        intro: 'يعتبر الإمام أبو جعفر محمد بن جرير الطبري شيخ المؤرخين والمفسرين على الإطلاق. ويمثل كتابه "تاريخ الرسل والملوك" أضخم موسوعة تاريخية في تاريخ الإسلام، حيث وضع منهجاً علمياً رائداً يعتمد على الإسناد ونقل الأخبار بكل أمانة علمية وترك الخيار للمحققين لنقد المتون.',
        sections: [
          {
            subtitle: 'الاعتماد على الإسناد كمنهج علمي للتوثيق',
            body: 'طبق الطبري منهج المحدثين في نقل المرويات التاريخية، فلم ينقل حادثة إلا وأسندها إلى رواتها. واعتبر أن مهمته الأساسية كمؤرخ هي الحفظ والنقل بأمانة، وليس الحكم الشخصي على القضايا إلا في حالات نادرة، مما حفظ للأمة ثروة من الروايات المختلفة التي ربما فنيت لولا صنيعه.',
            quote: '«فما يكن في كتابي هذا من خبر ذكرناه عن بعض الماضين مما يستنكره قارئه، فليعلم أنه لم يؤت في ذلك من قبلنا، وإنما أتي من قبل ناقله إلينا» — الإمام الطبري'
          },
          {
            subtitle: 'التأريخ الحولي: ترتيب الزمن بدقة',
            body: 'ابتكر الطبري أسلوب التأريخ الحولي (سنة بسنة)، مما جعل رصد الحوادث التاريخية وتطورها السياسي والاجتماعي أكثر دقة، وسهل الربط بين الأحداث في مختلف بقاع الدولة الإسلامية المعاصرة وتتبع سلاسل السببية التاريخية.'
          },
          {
            subtitle: 'الطبري فقيهاً ومفسراً وأثر ذلك في تاريخه',
            body: 'لم يكن الطبري مؤرخاً مجرداً، بل كان إماماً مجتهداً له مذهب فقهي مستقل (المذهب الجريري) وإماماً في التفسير. هذا البعد المعرفي الشامل انعكس على كتابته للتاريخ بوعي عميق بمقاصد الشريعة ودوافع الفاعلين السياسيين والاجتماعيين.'
          }
        ],
        conclusion: 'يبقى تاريخ الطبري العمدة الأساسية لكل باحث في التاريخ الإسلامي، شاهداً على دقة التوثيق والموسوعية العلمية في حضارتنا.',
        references: [
          'ابن جرير الطبري، تاريخ الرسل والملوك.',
          'ابن جرير الطبري، جامع البيان عن تأويل آي القرآن.',
          'أبو شهبة، التاريخ والمؤرخون في الإسلام.'
        ]
      }
    },
    'islamic-parenting-modern-challenges': {
      category: 'تربية الأطفال',
      title: 'منهج التربية الإسلامية للأطفال ومواجهة التحديات المعاصرة',
      excerpt: 'دراسة تربوية متكاملة تستلهم المنهج النبوي والتربية النفسية السليمة لبناء جيل يعتز بهويته الإسلامية ويتعامل بمرونة مع متغيرات العالم الرقمي.',
      ctaMessage: 'هل تبحث عن توجيه عملي لتربية أبنائك على أسس إسلامية ونفسية قويمة؟ احجز استشارة تربوية مع خبرائنا المتخصصين.',
      bookingTopic: 'parenting',
      content: {
        intro: 'تواجه الأسرة المسلمة في العصر الحديث تحديات غير مسبوقة بسبب الانفتاح الرقمي والهيمنة المعرفية للعولمة. ويعود تأصيل التربية الإسلامية للأطفال ليمثل طوق النجاة، حيث يجمع بين التوجيهات النبوية والأسس النفسية السليمة لبناء شخصية متكاملة قادرة على التمييز والاعتزاز بهويتها.',
        sections: [
          {
            subtitle: 'منهج النبي ﷺ في التربية بالحب والقدوة',
            body: 'ارتكز المنهج النبوي في توجيه الصغار على الحب، والرحمة، والتحفيز الإيجابي. فلم يكن النبي ﷺ يعنف الأطفال أو يزجرهم، بل كان يبني فيهم القيم من خلال القدوة العملية والكلمة الطيبة والملاطفة التي تملأ وجدان الطفل أماناً وثقة.',
            quote: '«إن من خياركم أحسنكم أخلاقاً، وكان رسول الله ﷺ لا يعنف أحداً ولا ينفر الصغار.» — مقتبس من السيرة النبوية'
          },
          {
            subtitle: 'بناء الوعي العقدي وحماية الهوية الرقمية',
            body: 'تتطلب التربية الحديثة ترسيخ العقيدة في نفوس الأطفال كحصانة داخلية بدلاً من فرض الأوامر الخارجية. وعبر تدريب الطفل على التفكير النقدي وفهم غايات الأحكام، يطور الطفل مناعة ذاتية تمكنه من فرز المحتوى الرقمي والتمسك بقيمه الأخلاقية في غياب الرقابة الأبوية المباشرة.'
          },
          {
            subtitle: 'تكامل دور الأسرة والمجتمع التعليمي',
            body: 'التربية ليست مسؤولية فردية، بل هي تكامل وتنسيق بين البيت والمؤسسة التعليمية والبيئة المحيطة. ويقع على عاتق الأبوين تصميم بيئة منزلية دافئة تفضل الحوار البناء والمشاركة الأسرية على الشاشات الافتراضية.'
          }
        ],
        conclusion: 'إن تربية جيل مسلم واعد يبدأ من وعي المربي وتطبيقه للرفق النبوي بالتوازي مع فهم مستجدات العصر الحاضر ونفسية الطفل.',
        references: [
          'عبد الله ناصح علوان، تربية الأولاد في الإسلام.',
          'مصطفى السباعي، السنة ومكانتها في التشريع الإسلامي (قسم التربية).',
          'القمصي، علم نفس النمو والطفولة في المنظور الإسلامي.'
        ]
      }
    }
  },
  en: {
    'history-of-quranic-recitations': {
      category: 'Quranic Sciences',
      title: 'The History of Quranic Recitations and Qira\'at',
      excerpt: 'A detailed scholarly study on the transmission of the Seven and Ten Qira\'at, the distinction between the Ahruf and recitations, and the chains of narration back to the Prophet ﷺ.',
      ctaMessage: 'Intrigued by Quranic Recitations and Tajweed? Begin your journey of perfect recitation under Al-Azhar scholars with connected chains of narration.',
      bookingTopic: 'quran',
      content: {
        intro: 'The Holy Quran was revealed in a clear Arabic tongue and has been preserved by the Muslim community through continuous oral transmission (Tawatur) generation after generation. The science of Qira\'at (recitations) is not a mere variation of words, but a rigorous academic framework representing the absolute precision of narration and preservation unmatched by any other civilization.',
        sections: [
          {
            subtitle: 'The Seven Ahruf and the Ten Qira\'at: Clarifying the Confusion',
            body: 'Confusion often arises between the concepts of the "Seven Ahruf" and the "Ten Qira\'at". The Seven Ahruf represent the divine facilitation revealed to accommodate the classical dialects of the Arabs at the time of revelation. The Ten Qira\'at, however, are the specific methodological recitations selected by the master reciters based on three absolute conditions: grammatical validity, conformity with the Uthmanic codex, and an uninterrupted, continuously transmitted chain of narration (Isnad).',
            quote: '"Verily, this knowledge is religion, so look to whom you take your religion from." — Imam Ibn Sirin'
          },
          {
            subtitle: 'Conditions for Accepting a Recitation',
            body: 'Scholars of Quranic sciences established a strict criteria for validating any recitation. Any reading that matches Arabic grammar, conforms to the written Uthmanic codex, and possesses an authentic, unbroken chain of transmission is accepted. If any of these three pillars is missing, the recitation is classified as anomalous (Shadhdh) and cannot be recited in ritual prayers.',
          },
          {
            subtitle: 'Methodologies of the Master Reciters',
            body: 'Master scholars dedicated their lives to codifying these rules and transmitting the chains of narration. Imam Al-Shatibi documented the methodologies of the Seven Reciters in his famous poem "Harz al-Amani", followed by Imam Ibn al-Jazari who authenticated the remaining three to complete the Ten Recitations. Famous pairs of narrators emerged, such as Hafs and Shu\'bah from Imam Asim, and Qalun and Warsh from Imam Nafi\'.'
          }
        ],
        conclusion: 'The science of Qira\'at remains a living testimony to the divine preservation of the Quran, embodied in the continuous chains of transmission linking modern students directly to the Prophet Muhammad ﷺ.',
        references: [
          'Ibn al-Jazari, Al-Nashr fi al-Qira\'at al-\'Ashr.',
          'Al-Dhahabi, Ma\'rifat al-Qurra\' al-Kibar.',
          'Al-Suyuti, Al-Itqan fi \'Ulum al-Qur\'an.'
        ]
      }
    },
    'practice-of-madinah-maliki-fiqh': {
      category: 'Islamic Jurisprudence',
      title: 'The Practice of Madinah as a Source of Law in Maliki Fiqh',
      excerpt: 'An academic inquiry into Imam Malik\'s methodology in utilizing the Practice of Madinah as a primary legal source, detailing its authority over isolated Hadiths.',
      ctaMessage: 'Would you like to study Maliki Fiqh and its structural methodology? Book your trial session with our Al-Azhar jurists to study classical texts.',
      bookingTopic: 'fiqh',
      content: {
        intro: 'The Maliki school of thought is renowned for its structured yet flexible legal foundations. The "Practice of the People of Madinah" (Amal Ahl al-Madinah) is among the most unique sources of law championed by Imam Malik ibn Anas, who regarded it as a continuous, practical transmission of the Prophetic legacy, prioritizing it over isolated reports (Khabar al-Wahid) in cases of conflict.',
        sections: [
          {
            subtitle: 'The Legal Authority of the Practice of Madinah',
            body: 'Imam Malik reasoned that Madinah was the home of revelation and the sanctuary of the Companions, who witnessed the context of revelation and received the Sunnah directly from the Prophet ﷺ. Therefore, the common, inherited practice of the community of Madinah must be based on a direct Prophetic action or approval, giving it the strength of practical, continuous transmission.',
            quote: '"The practice of the people of Madinah is stronger than isolated narrations, for the practice is a transmission of a community from a community, which yields certainty." — Imam Malik ibn Anas'
          },
          {
            subtitle: 'Transmitted Practice vs. Legal Deduction',
            body: 'Scholars of the Maliki school divide the Practice of Madinah into two main categories: Transmitted Practice (practices involving weights, measures, and the call to prayer), which is universally accepted as binding by Malikis and the majority of scholars, and Deductive Practice (legal rulings deduced by the scholars of Madinah after the era of the Companions), which is subject to detailed, scholastic debate.',
          },
          {
            subtitle: 'Resolution of Conflicts with Isolated Reports',
            body: 'When a valid isolated narration (Hadith Ahad) conflicts with the continuous practice of the people of Madinah, Imam Malik preferred the practice. He argued that individual reports are susceptible to errors, abrogations, or context limitations, whereas community practice represents the open, manifest Sunnah safeguarded from collective omission.'
          }
        ],
        conclusion: 'Utilizing the Practice of Madinah represents a pragmatic legal realism that preserves the spirit of the law, community continuity, and the practical implementation of the Prophetic model.',
        references: [
          'Malik ibn Anas, Al-Muwatta.',
          'Qadi Ayyad, Tartib al-Madarik.',
          'Ibn Rushd (the Elder), Al-Muqaddimat al-Mumahhidat.'
        ]
      }
    },
    'basra-kufa-grammatical-schools': {
      category: 'Arabic Linguistics',
      title: 'Grammatical Schools: The Duel Between Basra and Kufa',
      excerpt: 'Analysing the core grammatical disputes between the school of Basra (led by Sibawayh) and Kufa (led by Al-Kisa\'i), and its profound impact on standardizing the language.',
      ctaMessage: 'Do you want to master Arabic grammar and unlock the linguistic secrets of the Quran? Begin studying classical grammar with our expert scholars.',
      bookingTopic: 'arabic',
      content: {
        intro: 'Arabic grammar was not built on dry regulations, but rather through dynamic, historical scholarly debates. The schools of Basra and Kufa represented the two wings of Arabic linguistic thought: Basra formulating a strict, analogical foundation, and Kufa offering a flexible model. Together, they established the rules of classical Arabic.',
        sections: [
          {
            subtitle: 'The School of Basra: Analogy and Systematic Rigor',
            body: 'Founded by pioneers like Al-Khalil ibn Ahmad and Sibawayh, the school of Basra was characterized by strict adherence to systematic analogy (Qiyas). Basran grammarians only accepted linguistic evidence that was widespread and common among specific classical Bedouin tribes, rejecting rare poetic anomalies to maintain the consistency of the language.',
            quote: '"The Quran and the language cannot be measured except against what is common and widespread in the speech of classical Arabs." — Sibawayh'
          },
          {
            subtitle: 'The School of Kufa: Flexibility and Acceptance of Anomalies',
            body: 'On the other hand, Al-Kisa\'i and Al-Farra\' led the school of Kufa, which was defined by its flexibility. Kufan grammarians accepted isolated poetic lines as valid precedents for grammatical rules, accommodating variations in Arabic expression. This enriched the language, providing writers with a wider range of stylistic choices.',
          },
          {
            subtitle: 'Linguistic Debates and Quranic Exegesis',
            body: 'The disputes between the two schools were constructive. This debate directly influenced Quranic exegesis (Tafsir), as commentators utilized the differing rules of both schools to explain various recitations and highlight the subtle semantic shades of the divine text.'
          }
        ],
        conclusion: 'The grammatical duel between Basra and Kufa remains a premier model of scholarly pluralism, preserving the purity of Arabic and illustrating the eloquence of the Quran.',
        references: [
          'Al-Anbari, Al-Insaaf fi Masa\'il al-Khilaaf.',
          'Sibawayh, Al-Kitab.',
          'Shawqi Dayf, Al-Madaris al-Nahwiyyah.'
        ]
      }
    },
    'ashari-maturidi-theology-methodology': {
      category: 'Islamic Creed',
      title: 'The Ash\'ari and Maturidi Methodology in Sunni Theology',
      excerpt: 'A systematic reading on reconciling intellect (Aql) and tradition (Naql) in Sunni theology, exploring how these schools defended orthodox beliefs.',
      ctaMessage: 'Looking to study Islamic theology with a balanced, traditional methodology? Join our specialized courses taught by Al-Azhar creed scholars.',
      bookingTopic: 'aqidah',
      content: {
        intro: 'The Ash\'ari and Maturidi schools represent the primary theological framework of orthodox Sunni Islam across centuries. These schools formulated a precise cognitive framework reconciling sacred texts (Naql) and logical reasoning (Aql), enabling the Muslim community to address philosophical challenges and defend orthodox beliefs systematically.',
        sections: [
          {
            subtitle: 'Defenders of Orthodoxy: Al-Ash\'ari and Al-Maturidi',
            body: 'Imam Abu al-Hasan al-Ash\'ari in Iraq and Imam Abu Mansur al-Maturidi in Transoxiana emerged in the fourth Hijri century. They worked to formulate a middle way between the extreme rationalism of the Mu\'tazilites and the literalism of other groups, using logical argumentation to defend the attributes of God and the core tenets of faith.',
            quote: '"The correct path is to affirm what transmission has brought and support it with rational proofs; text is the foundation, and intellect is its support." — Imam Abu al-Hasan al-Ash\'ari'
          },
          {
            subtitle: 'Reconciling Reason and Revelation',
            body: 'The Sunni theological methodology rests on a fundamental principle: sound intellect and authentic transmission never contradict. Intellect establishes the truth of revelation through miracles, while revelation provides knowledge of the unseen and sacred laws that intellect cannot deduce independently.',
          },
          {
            subtitle: 'Preserving the Theological Identity of the Ummah',
            body: 'By codifying Sunni beliefs, Ash\'ari and Maturidi scholars developed unified educational curriculums adopted by major seats of learning like Al-Azhar, Ez-Zitouna, and Al-Qarawiyyin, safeguarding the theological identity of the community against ideological deviations.'
          }
        ],
        conclusion: 'The Ash\'ari and Maturidi methodology remains the cornerstone of Islamic moderation, protecting minds and preserving traditional orthodoxy.',
        references: [
          'Abu al-Hasan al-Ash\'ari, Maqalat al-Islamiyyin.',
          'Al-Bajuri, Hashiyat Jawharat al-Tawhid.',
          'Al-Ghazali, Al-Iqtisad fi al-I\'tiqad.'
        ]
      }
    },
    'al-ghazali-integration-of-logic-usul': {
      category: 'Islamic Logic',
      title: 'Al-Ghazali and the Integration of Logic in Usul al-Fiqh',
      excerpt: 'A historical and philosophical review of Imam Al-Ghazali\'s "Al-Mustasfa", exploring how he integrated Aristotelian logic into jurisprudence as an essential tool.',
      ctaMessage: 'Seeking to develop critical thinking and understand the methods of legal reasoning? Begin studying Islamic logic with our traditional instructors.',
      bookingTopic: 'logic',
      content: {
        intro: 'Early Islamic scholars viewed Greek logic and philosophy with suspicion. The arrival of Imam Abu Hamid al-Ghazali marked a major turning point; he refined logic from foreign theological assumptions and integrated it as a neutral cognitive tool essential for the study of Islamic jurisprudence (Usul al-Fiqh).',
        sections: [
          {
            subtitle: 'Al-Mustasfa: Logic as the Scale of Knowledge',
            body: 'In the introduction of his masterpiece "Al-Mustasfa min \'Ilm al-Usul", Imam al-Ghazali included a logical primer exceeding one hundred pages, stating that while logic is not a direct branch of legal theory, it is a prerequisite for all sciences. He made a famous declaration that transformed Islamic education.',
            quote: '"The knowledge of one who does not encompass logic cannot be trusted." — Imam Abu Hamid al-Ghazali'
          },
          {
            subtitle: 'Refining Logic into Islamic Terminology',
            body: 'Al-Ghazali did not merely copy Aristotelian logic; he translated it into legal terminology familiar to jurists, replacing Greek terms with terms like Qiyas (analogy), Hadd (definition), and Burhan (proof). He illustrated logical rules using Quranic verses and practical legal issues.',
          },
          {
            subtitle: 'Precision in Legal Reasoning',
            body: 'Through this integration, the sciences of legal theory and scholastic theology acquired high precision in defining terms and building arguments. The jurist gained a rigorous tool to prevent self-contradiction and identify logical fallacies in reasoning.'
          }
        ],
        conclusion: 'Al-Ghazali\'s work represents a sophisticated civilizational synthesis, adapting human intellectual heritage to serve sacred sciences.',
        references: [
          'Al-Ghazali, Al-Mustasfa min \'Ilm al-Usul.',
          'Al-Ghazali, Mi\'yar al-\'Ilm.',
          'Ibn Taymiyyah, Al-Radd \'ala al-Mantiqiyyin (for comparison).'
        ]
      }
    },
    'al-jurjani-theory-of-structure-nazhm': {
      category: 'Literature & Rhetoric',
      title: 'Al-Jurjani\'s Theory of Structure (Nazhm) & Quranic Inimitability',
      excerpt: 'An analytical study on the Theory of Structure in Al-Jurjani\'s "Dala\'il al-I\'jaz", exploring how grammar and semantics combine to form the literary miracle of the Quran.',
      ctaMessage: 'Fascinated by the eloquence and literary miracle of the Quran? Explore classical rhetoric and Arabic literature in our specialized classes.',
      bookingTopic: 'literature',
      content: {
        intro: 'For centuries, Muslim scholars sought to understand the source of the Quran\'s linguistic inimitability (I\'jaz). With the arrival of Imam Abd al-Qahir al-Jurjani in the fifth Hijri century, rhetoric was established as a scientific discipline through his formulation of the "Theory of Structure" (Nazhm) in "Dala\'il al-I\'jaz".',
        sections: [
          {
            subtitle: 'The Essence of the Theory of Structure',
            body: 'Al-Jurjani argued that the miracle of the Quran does not lie in individual words or sound patterns, but in how words are arranged syntactically and semantically. A word has no rhetorical value in isolation; its beauty is derived from its position and relation to adjacent words in a structured context.',
            quote: '"Words do not excel on account of being isolated terms; rather, structure excels when it conforms to the requirements of syntax and meaning." — Imam Abd al-Qahir al-Jurjani'
          },
          {
            subtitle: 'Syntax as the Foundation of Rhetoric',
            body: 'Al-Jurjani pioneered the connection between grammar (Nahw) and rhetoric (Balaghah). Rhetoric was not an ornament added to speech; it was the precise application of syntactic variations (like word order, omission, and definite markers) to convey precise shades of meaning.',
          },
          {
            subtitle: 'Explaining Quranic Inimitability',
            body: 'Based on this, Al-Jurjani explained that the Quranic text is inimitable because every single letter and word is placed in a precise syntactic position. Removing or replacing any word alters the meaning and disrupts the coherence, surpassing human literary capabilities.'
          }
        ],
        conclusion: 'The Theory of Structure remains the deep rhetorical foundation that illuminated the secrets of Arabic and established Quranic eloquence on systematic grounds.',
        references: [
          'Abd al-Qahir al-Jurjani, Dala\'il al-I\'jaz.',
          'Abd al-Qahir al-Jurjani, Asrar al-Balaghah.',
          'Mahmud Muhammad Shakir, Introduction to Dala\'il al-I\'jaz.'
        ]
      }
    },
    'al-tabari-methodology-historiography': {
      category: 'Islamic History',
      title: 'Al-Tabari\'s Methodology in Historical Documentation',
      excerpt: 'A critical analysis of Imam Al-Tabari\'s approach to documenting Islamic history, relying on Isnad (chains of transmission) to verify narratives in his Tarikh.',
      ctaMessage: 'Fascinated by Islamic history and verifying historical narratives? Study classical works under our Al-Azhar historians.',
      bookingTopic: 'history',
      content: {
        intro: 'Imam Abu Ja\'far Muhammad ibn Jarir al-Tabari is widely regarded as the father of Islamic history and exegesis. His monumental work "Tarikh al-Rusul wa al-Muluk" (History of the Messengers and Kings) represents the most comprehensive historical encyclopedia in early Islam, establishing a pioneering scientific methodology based on chain of narrations.',
        sections: [
          {
            subtitle: 'The Role of Isnad in Historiography',
            body: 'Al-Tabari applied the strict methodology of Hadith scholars to historical reports, ensuring every event was traced back to its original narrators through a chain of transmission (Isnad). He believed that a historian\'s primary duty was to preserve and convey narratives transparently, leaving the final analysis of authenticity to the reader.',
            quote: '"If there is in this book of mine any report that is disliked by the reader, let him know that it did not originate from me, but from the one who transmitted it to us." — Imam Al-Tabari'
          },
          {
            subtitle: 'Annalistic Historiography: Precise Chronology',
            body: 'Al-Tabari popularized the annalistic method (arranging history year-by-year). This chronological precision made tracing the development of political and social events across different regions of the Islamic world systematic and highly accurate.',
          },
          {
            subtitle: 'The Jurist as a Historian',
            body: 'Al-Tabari was not just a chronicler; he was an independent mujtahid jurist (founder of the Jariri school) and a master of exegesis. His deep legal and theological knowledge allowed him to contextualize historical events with a profound understanding of Islamic jurisprudence and social motivations.'
          }
        ],
        conclusion: 'Al-Tabari\'s Tarikh remains the primary authority for any researcher in early Islamic history, standing as a testament to the precision of classical Muslim scholarship.',
        references: [
          'Al-Tabari, Tarikh al-Rusul wa al-Muluk.',
          'Al-Tabari, Jami al-Bayan an Ta\'wil Ay al-Qur\'an.',
          'Abu Shahbah, Al-Tarikh wa al-Mu\'arrikhun fi al-Islam.'
        ]
      }
    },
    'islamic-parenting-modern-challenges': {
      category: 'Islamic Parenting',
      title: 'Foundations of Islamic Child Upbringing in the Modern Era',
      excerpt: 'An integrated educational study drawing on the Prophetic method and child psychology to build a generation confident in its Islamic identity.',
      ctaMessage: 'Looking for practical guidance to raise your children on Islamic and psychological foundations? Book a consultation class with our educators.',
      bookingTopic: 'parenting',
      content: {
        intro: 'In the modern era, Muslim families face unprecedented challenges due to digital exposure and globalization. Establishing Islamic parenting foundations represents a lifeline, combining Prophetic guidance with developmental psychology to build balanced children proud of their identity.',
        sections: [
          {
            subtitle: 'The Prophetic Model of Love and Role Modeling',
            body: 'The Prophetic methodology in raising children centered on love, mercy, and positive reinforcement. The Prophet ﷺ never scolded children; instead, he cultivated virtues through practical examples, gentle encouragement, and physical affection, filling their hearts with security.',
            quote: '"Treat your children with dignity and perfect their manners." — Hadith of the Prophet ﷺ'
          },
          {
            subtitle: 'Cultivating Theological Resilience in a Digital Age',
            body: 'Modern parenting requires instilling faith (Aqidah) as an internal compass rather than enforcing external obedience. By teaching children critical thinking and explaining the wisdom behind rulings, they develop cognitive resilience to navigate media content independently.',
          },
          {
            subtitle: 'Integrating Family Life and Educational Environments',
            body: 'Parenting is a collaborative effort between the home, educational spaces, and the surrounding environment. Parents must design a warm home environment prioritizing dialogue, mutual respect, and active family time over virtual screens.'
          }
        ],
        conclusion: 'Raising a promising Muslim generation starts with the parents\' commitment to Prophetic kindness coupled with an understanding of modern challenges.',
        references: [
          'Abdullah Nasih Ulwan, Child Education in Islam.',
          'Mustafa Al-Siba\'i, The Sunnah and its Role in Islamic Legislation.',
          'Al-Qumsi, Developmental Psychology in the Islamic Perspective.'
        ]
      }
    }
  },
  fr: {
    'history-of-quranic-recitations': {
      category: 'Sciences du Coran',
      title: 'L\'Histoire des Récitations Coraniques et des Qira\'at',
      excerpt: 'Une étude scientifique sur la transmission des sept et dix Qira\'at, la distinction entre les sept Ahruf et les récitations, et les chaînes de transmission remontant au Prophète ﷺ.',
      ctaMessage: 'Intrigué par les récitations coraniques et le Tajwid ? Commencez votre apprentissage de la récitation sous l\'égide de savants d\'Al-Azhar avec des chaînes de transmission certifiées.',
      bookingTopic: 'quran',
      content: {
        intro: 'Le Saint Coran a été révélé dans une langue arabe claire et a été préservé par la communauté musulmane grâce à une transmission orale continue (Tawatur) de génération en génération. La science des Qira\'at (récitations) n\'est pas une simple variation de mots, mais un cadre académique rigoureux représentant l\'extrême précision de la transmission.',
        sections: [
          {
            subtitle: 'Les Sept Ahruf et les Dix Qira\'at : Clarification',
            body: 'Une confusion surgit souvent entre les concepts des "Sept Ahruf" et des "Dix Qira\'at". Les Sept Ahruf représentent la facilitation divine révélée pour s\'adapter aux dialectes classiques des Arabes lors de la révélation. Les Dix Qira\'at, quant à elles, sont les récitations méthodologiques spécifiques sélectionnées par les maîtres récitateurs selon trois conditions absolues : validité grammaticale, conformité au codex d\'Othman, et chaîne de transmission ininterrompue.',
            quote: '"Certes, cette science est une religion, alors regardez bien de qui vous apprenez votre religion." — Imam Ibn Sirin'
          },
          {
            subtitle: 'Conditions d\'acceptation d\'une récitation',
            body: 'Les savants ont établi des critères stricts pour valider toute récitation. Toute lecture qui correspond à la grammaire arabe, est conforme au codex écrit d\'Othman, et possède une chaîne de transmission authentique et ininterrompue est acceptée. Si l\'un de ces trois piliers fait défaut, la récitation est classée comme anormale (Shadhdh).',
          },
          {
            subtitle: 'Méthodologies des Maîtres Récitateurs',
            body: 'Les maîtres ont consacré leur vie à codifier ces règles. L\'Imam Al-Shatibi a documenté les méthodes des Sept Récitateurs dans son célèbre poème "Harz al-Amani", suivi de l\'Imam Ibn al-Jazari qui a authentifié les trois restants pour compléter les Dix Récitations. Des paires célèbres de narrateurs ont émergé, comme Hafs et Shu\'bah d\'Imam Asim.'
          }
        ],
        conclusion: 'La science des Qira\'at reste un témoignage vivant de la préservation divine du Coran, incarnée dans les chaînes de transmission continues reliant les étudiants modernes directement au Prophète Muhammad ﷺ.',
        references: [
          'Ibn al-Jazari, Al-Nashr fi al-Qira\'at al-\'Ashr.',
          'Al-Dhahabi, Ma\'rifat al-Qurra\' al-Kibar.',
          'Al-Suyuti, Al-Itqan fi \'Ulum al-Qur\'an.'
        ]
      }
    },
    'practice-of-madinah-maliki-fiqh': {
      category: 'Jurisprudence Islamique',
      title: 'La Pratique de Médine comme Source de Loi en Fiqh Malikite',
      excerpt: 'Une enquête académique sur la méthodologie de l\'Imam Malik utilisant la Pratique des Gens de Médine comme source juridique principale, face aux Hadiths isolés.',
      ctaMessage: 'Souhaitez-vous étudier le Fiqh Malikite et sa méthodologie ? Réservez votre séance d\'essai avec nos juristes d\'Al-Azhar pour étudier les textes classiques.',
      bookingTopic: 'fiqh',
      content: {
        intro: 'L\'école malikite est réputée pour ses fondations juridiques structurées mais flexibles. La "Pratique des Gens de Médine" (Amal Ahl al-Madinah) figure parmi les sources de droit les plus uniques défendues par l\'Imam Malik ibn Anas, qui la considérait comme une transmission pratique et continue de l\'héritage prophétique.',
        sections: [
          {
            subtitle: 'L\'Autorité Juridique de la Pratique de Médine',
            body: 'L\'Imam Malik a soutenu que Médine était le lieu de la révélation et le refuge des Compagnons, qui ont été témoins du contexte de la révélation et ont reçu la Sunnah directement du Prophète ﷺ. Par conséquent, la pratique commune héritée de Médine doit reposer sur une action prophétique directe.',
            quote: '"La pratique des habitants de Médine est plus forte que les récits isolés, car la pratique est la transmission d\'une communauté à une communauté, ce qui engendre la certitude." — Imam Malik ibn Anas'
          },
          {
            subtitle: 'Pratique Transmise vs. Déduction Juridique',
            body: 'Les savants de l\'école malikite divisent la Pratique de Médine en deux catégories principales : la Pratique Transmise (portant sur les poids, les mesures, et l\'appel à la prière), universellement acceptée comme contraignante, et la Pratique Déductive (règles juridiques déduites par les savants de Médine après l\'era des Compagnons).',
          },
          {
            subtitle: 'Résolution des conflits avec les récits isolés',
            body: 'Lorsqu\'une narration isolée (Hadith Ahad) entre en conflit avec la pratique continue de Médine, l\'Imam Malik préférait la pratique. Il soutenait que les récits individuels sont susceptibles d\'erreurs ou d\'abrogations, tandis que la pratique communautaire représente la Sunnah manifeste.'
          }
        ],
        conclusion: 'L\'utilisation de la Pratique de Médine représente un réalisme juridique pragmatique qui préserve l\'esprit de la loi et la mise en œuvre pratique du modèle prophétique.',
        references: [
          'Malik ibn Anas, Al-Muwatta.',
          'Qadi Ayyad, Tartib al-Madarik.',
          'Ibn Rushd (l\'Aîné), Al-Muqaddimat al-Mumahhidat.'
        ]
      }
    },
    'basra-kufa-grammatical-schools': {
      category: 'Linguistique Arabe',
      title: 'Écoles de Grammaire : Le Duel Intellectuel entre Bassora et Koufa',
      excerpt: 'Analyse des disputes grammaticales fondamentales entre l\'école de Bassora (menée par Sibawayh) et celle de Koufa (menée par Al-Kisa\'i), et son impact sur la langue.',
      ctaMessage: 'Voulez-vous maîtriser la grammaire arabe et débloquer les secrets linguistiques du Coran ? Commencez à étudier la grammaire classique avec nos savants.',
      bookingTopic: 'arabic',
      content: {
        intro: 'La grammaire arabe ne s\'est pas construite sur des règles sèches, mais plutôt à travers des débats historiques dynamiques. Les écoles de Bassora et de Koufa représentaient les deux ailes de la pensée linguistique arabe : Bassora formulant une base analogique stricte, et Koufa offrant un modèle flexible.',
        sections: [
          {
            subtitle: 'L\'École de Bassora : Analogie et Rigueur Systématique',
            body: 'Fondée par des pionniers comme Al-Khalil ibn Ahmad et Sibawayh, l\'école de Bassora se caractérisait par un respect strict de l\'analogie systématique (Qiyas). Les grammairiens de Bassora n\'acceptaient que les preuves linguistiques répandues au sein de tribus bédouines classiques spécifiques.',
            quote: '"Le Coran et la langue ne peuvent être mesurés que par ce qui est commun et répandu dans le discours des Arabes classiques." — Sibawayh'
          },
          {
            subtitle: 'L\'École de Koufa : Flexibilité et Acceptation des Anomalies',
            body: 'D\'un autre côté, Al-Kisa\'i et Al-Farra\' dirigeaient l\'école de Koufa, définie par sa flexibilité. Les grammairiens de Koufa acceptaient des vers poétiques isolés comme précédents valables pour les règles grammaticales, enrichissant la langue de choix stylistiques variés.',
          },
          {
            subtitle: 'Débats Linguistiques et Exégèse Coranique',
            body: 'Les disputes entre les deux écoles étaient constructives. Ce débat a directement influencé l\'exégèse coranique (Tafsir), car les commentateurs ont utilisé les règles des deux écoles pour expliquer les différentes récitations.'
          }
        ],
        conclusion: 'Le duel grammatical entre Bassora et Koufa reste un modèle de pluralisme savant, préservant la pureté de l\'arabe et illustrant l\'éloquence du Coran.',
        references: [
          'Al-Anbari, Al-Insaaf fi Masa\'il al-Khilaaf.',
          'Sibawayh, Al-Kitab.',
          'Shawqi Dayf, Al-Madaris al-Nahwiyyah.'
        ]
      }
    },
    'ashari-maturidi-theology-methodology': {
      category: 'Dogme Islamique',
      title: 'La Méthodologie Ash\'arite et Maturidite dans la Théologie Sunnite',
      excerpt: 'Une lecture systématique sur la réconciliation entre intellect (Aql) et tradition (Naql) dans la théologie sunnite face aux défis philosophiques.',
      ctaMessage: 'Vous souhaitez étudier la théologie islamique avec une méthodologie traditionnelle et équilibrée ? Rejoignez nos cours dispensés par des savants d\'Al-Azhar.',
      bookingTopic: 'aqidah',
      content: {
        intro: 'Les écoles ash\'arite et maturidite représentent le principal cadre théologique de l\'islam sunnite orthodoxe à travers les siècles. Ces écoles ont formulé un cadre cognitif précis réconciliant les textes sacrés (Naql) et le raisonnement logique (Aql).',
        sections: [
          {
            subtitle: 'Défenseurs de l\'Orthodoxie : Al-Ash\'ari et Al-Maturidi',
            body: 'L\'Imam Abu al-Hasan al-Ash\'ari en Irak et l\'Imam Abu Mansur al-Maturidi en Transoxiane ont émergé au quatrième siècle de l\'Hégire. Ils ont travaillé à formuler une voie médiane entre le rationalisme extrême des Mu\'tazilites et le littéralisme d\'autres groupes.',
            quote: '"La voie correcte consiste à affirmer ce que la transmission a apporté et à le soutenir par des preuves rationnelles." — Imam Abu al-Hasan al-Ash\'ari'
          },
          {
            subtitle: 'Réconcilier la Raison et la Révélation',
            body: 'La méthodologie théologique sunnite repose sur un principe fondamental : l\'intellect sain et la transmission authentique ne se contredisent jamais. L\'intellect établit la vérité de la révélation à travers les miracles, tandis que la révélation fournit la connaissance de l\'invisible.',
          },
          {
            subtitle: 'Préserver l\'Identité Théologique de la Communauté',
            body: 'En codifiant les croyances sunnites, les savants ont élaboré des programmes éducatifs unifiés adoptés par de grands centres d\'enseignement comme Al-Azhar, Ez-Zitouna et Al-Qarawiyyin.'
          }
        ],
        conclusion: 'La méthodologie ash\'arite et maturidite reste la pierre angulaire de la modération islamique, protégeant les esprits et préservant l\'orthodoxie traditionnelle.',
        references: [
          'Abu al-Hasan al-Ash\'ari, Maqalat al-Islamiyyin.',
          'Al-Bajuri, Hashiyat Jawharat al-Tawhid.',
          'Al-Ghazali, Al-Iqtisad fi al-I\'tiqad.'
        ]
      }
    },
    'al-ghazali-integration-of-logic-usul': {
      category: 'Logique Islamique',
      title: 'Al-Ghazali et la Codification de la Logique en Usul al-Fiqh',
      excerpt: 'Une revue historique du travail juridique de l\'Imam Al-Ghazali "Al-Mustasfa", explorant l\'intégration de la logique aristotélicienne comme outil indispensable.',
      ctaMessage: 'Vous cherchez à développer votre esprit critique et à comprendre les méthodes de raisonnement juridique ? Étudiez la logique islamique avec nos instructeurs.',
      bookingTopic: 'logic',
      content: {
        intro: 'Les premiers savants islamiques considéraient la logique et la philosophie grecques avec méfiance. L\'arrivée de l\'Imam Abu Hamid al-Ghazali a marqué un tournant majeur ; il a épuré la logique des hypothèses théologiques étrangères et l\'a intégrée comme outil neutre.',
        sections: [
          {
            subtitle: 'Al-Mustasfa : La Logique comme Balance du Savoir',
            body: 'Dans l\'introduction de son chef-d\'œuvre "Al-Mustasfa min \'Ilm al-Usul", l\'Imam al-Ghazali a inclus une introduction logique de plus de cent pages, affirmant que bien que la logique ne soit pas une branche directe de la théorie juridique, elle est un prérequis pour toutes les sciences.',
            quote: '"La science de celui qui ne maîtrise pas la logique n\'est pas fiable." — Imam Abu Hamid al-Ghazali'
          },
          {
            subtitle: 'Adapter la Logique à la Terminologie Islamique',
            body: 'Al-Ghazali ne s\'est pas contenté de copier la logique d\'Aristote ; il l\'a formulée dans une terminologie familière aux juristes, remplaçant les termes grecs par des termes comme Qiyas (analogie), Hadd (définition) et Burhan (preuve).',
          },
          {
            subtitle: 'Précision dans le Raisonnement Juridique',
            body: 'Grâce à cette intégration, les sciences de la théorie juridique et de la théologie scolastique ont acquis une grande précision. Le juriste a ainsi obtenu un outil rigoureux pour éviter les contradictions.'
          }
        ],
        conclusion: 'L\'œuvre d\'Al-Ghazali représente une synthèse civilisationnelle sophistiquée, adaptant l\'héritage intellectuel humain au service des sciences sacrées.',
        references: [
          'Al-Ghazali, Al-Mustasfa min \'Ilm al-Usul.',
          'Al-Ghazali, Mi\'yar al-\'Ilm.',
          'Ibn Taymiyyah, Al-Radd \'ala al-Mantiqiyyin (pour comparaison).'
        ]
      }
    },
    'al-jurjani-theory-of-structure-nazhm': {
      category: 'Littérature & Rhétorique',
      title: 'La Théorie de la Structure (Nazhm) d\'Al-Jurjani et l\'Inimitabilité',
      excerpt: 'Une étude analytique sur la théorie de la structure d\'Al-Jurjani, explorant comment la grammaire et la sémantique s\'unissent pour former le miracle du Coran.',
      ctaMessage: 'Fasciné par l\'éloquence et le miracle littéraire du Coran ? Explorez la rhétorique classique et la littérature arabe dans nos classes spécialisées.',
      bookingTopic: 'literature',
      content: {
        intro: 'Pendant des siècles, les savants musulmans ont cherché à comprendre la source de l\'inimitabilité linguistique du Coran (I\'jaz). Avec l\'arrivée de l\'Imam Abd al-Qahir al-Jurjani au cinquième siècle de l\'Hégire, la rhétorique a été établie comme discipline scientifique.',
        sections: [
          {
            subtitle: 'L\'Essence de la Théorie de la Structure',
            body: 'Al-Jurjani a soutenu que le miracle du Coran ne réside pas dans les mots isolés ou les schémas sonores, mais dans la façon dont les mots sont agencés syntaxiquement et sémantiquement. Un mot n\'a pas de valeur rhétorique en soi ; sa beauté dépend de sa relation avec les mots adjacents.',
            quote: '"Les mots ne l\'emportent pas en tant que termes isolés ; la structure excelle lorsqu\'elle se conforme aux exigences de la syntaxe et du sens." — Imam Abd al-Qahir al-Jurjani'
          },
          {
            subtitle: 'La Syntaxe comme Base de la Rhétorique',
            body: 'Al-Jurjani a été le pionnier de la connexion entre grammaire (Nahw) et rhétorique (Balaghah). Rhétorique n\'était pas un simple ornement, mais l\'application précise des variations syntaxiques pour transmettre des nuances de sens.',
          },
          {
            subtitle: 'Expliquer l\'Inimitabilité Coranique',
            body: 'Sur cette base, Al-Jurjani a expliqué que le texte coranique est inimitable parce que chaque lettre et chaque mot est placé dans une position syntaxique précise. Retirer ou remplacer un mot modifie le sens et perturbe la cohérence.'
          }
        ],
        conclusion: 'La Théorie de la Structure reste le fondement rhétorique profond qui a éclairé les secrets de l\'arabe et établi l\'éloquence coranique sur des bases systématiques.',
        references: [
          'Abd al-Qahir al-Jurjani, Dala\'il al-I\'jaz.',
          'Abd al-Qahir al-Jurjani, Asrar al-Balaghah.',
          'Mahmud Muhammad Shakir, Introduction aux Dala\'il al-I\'jaz.'
        ]
      }
    },
    'al-tabari-methodology-historiography': {
      category: 'Histoire Islamique',
      title: 'La Méthodologie d\'Al-Tabari dans la Documentation Historique',
      excerpt: 'Une analyse critique de la méthodologie de l\'Imam Al-Tabari dans la consignation de l\'histoire, s\'appuyant sur l\'Isnad pour vérifier les récits dans son célèbre Tarikh.',
      ctaMessage: 'Passionné par l\'histoire islamique et la vérification des récits historiques ? Étudiez l\'histoire avec nos historiens d\'Al-Azhar.',
      bookingTopic: 'history',
      content: {
        intro: 'L\'Imam Abu Ja\'far Muhammad ibn Jarir al-Tabari est considéré comme le père de l\'histoire islamique et de l\'exégèse coranique. Son chef-d\'œuvre "Tarikh al-Rusul wa al-Muluk" représente la plus vaste encyclopédie historique des débuts de l\'Islam.',
        sections: [
          {
            subtitle: 'L\'Importance de l\'Isnad dans la Consignation de l\'Histoire',
            body: 'Al-Tabari a appliqué la méthodologie rigoureuse des savants du Hadith à l\'histoire, reliant chaque événement à ses narrateurs d\'origine par une chaîne de transmission (Isnad). Il estimait que son devoir était de préserver les récits avec fidélité, laissant au lecteur le soin de juger.',
            quote: '"Si mon livre contient des récits sur le passé que le lecteur trouve inacceptables, qu\'il sache qu\'ils ne proviennent pas de nous, mais de ceux qui nous les ont transmis." — Imam Al-Tabari'
          },
          {
            subtitle: 'L\'Histoire Annales par Annales : Une Chronologie Précise',
            body: 'Al-Tabari a popularisé la méthode annalistique (classant l\'histoire année par année). Cette précision chronologique a rendu l\'étude des événements politiques et sociaux à travers le monde islamique extrêmement rigoureuse.',
          },
          {
            subtitle: 'Le Juriste-Historien et son Influence',
            body: 'Al-Tabari n\'était pas un simple chroniqueur, mais un grand juriste indépendant (fondateur de l\'école Jariri) et un exégète éminent. Sa compréhension théologique a enrichi son écriture historique en lui donnant une profondeur unique.'
          }
        ],
        conclusion: 'Le Tarikh d\'Al-Tabari demeure la référence incontournable de tout chercheur en histoire islamique, témoignant de la précision de la recherche classique.',
        references: [
          'Al-Tabari, Tarikh al-Rusul wa al-Muluk.',
          'Al-Tabari, Jami al-Bayan an Ta\'wil Ay al-Qur\'an.',
          'Abu Shahbah, Al-Tarikh wa al-Mu\'arrikhun fi al-Islam.'
        ]
      }
    },
    'islamic-parenting-modern-challenges': {
      category: 'Éducation des Enfants',
      title: 'Les Fondements de l\'Éducation des Enfants à l\'Ère Moderne',
      excerpt: 'Une étude éducative s\'inspirant de la méthode prophétique et de la psychologie de l\'enfant pour relever les défis de l\'ère numérique.',
      ctaMessage: 'Besoin d\'un accompagnement pratique pour élever vos enfants selon les principes islamiques ? Réservez une séance d\'essai.',
      bookingTopic: 'parenting',
      content: {
        intro: 'À notre époque, les familles musulmanes font face à des défis sans précédent dus à l\'exposition numérique et à la mondialisation. L\'éducation islamique des enfants allie les conseils prophétiques et la psychologie du développement pour forger une personnalité équilibrée.',
        sections: [
          {
            subtitle: 'Le Modèle Prophétique Fondé sur l\'Amour et l\'Exemple',
            body: 'La méthodologie prophétique pour élever les enfants reposait sur l\'amour, la miséricorde et le renforcement positif. Le Prophète ﷺ ne réprimandait jamais les enfants ; il cultivait les valeurs par l\'exemple pratique et l\'affection.',
            quote: '"Honorez vos enfants et parfaites leur éducation." — Hadith du Prophète ﷺ'
          },
          {
            subtitle: 'Développer une Immunité Interne à l\'Ère Numérique',
            body: 'L\'éducation moderne exige d\'inculquer la foi (Aqidah) comme une boussole interne. En enseignant aux enfants l\'esprit critique et en expliquant la sagesse des lois, on développe chez eux une rérésilience face au contenu numérique.',
          },
          {
            subtitle: 'Complémentarité entre Foyer et Environnement Éducatif',
            body: 'L\'éducation est un effort partagé. Les parents doivent concevoir un environnement familial chaleureux qui favorise le dialogue constructif et le partage d\'activités réelles plutôt que virtuelles.'
          }
        ],
        conclusion: 'Élever une génération musulmane épanouie commence par la bienveillance prophétique alliée à une compréhension des besoins modernes de l\'enfant.',
        references: [
          'Abdullah Nasih Ulwan, L\'Éducation des enfants en Islam.',
          'Mustafa Al-Siba\'i, La Sunnah et sa place dans la législation.',
          'Al-Qumsi, Psychologie du développement dans la perspective islamique.'
        ]
      }
    }
  }
};

export const BASE_ARTICLES: Omit<Article, 'translation'>[] = [
  { slug: 'history-of-quranic-recitations', categoryKey: 'quran', image: '/images/article_qiraat.png', date: '28 May 2026', readTime: 8 },
  { slug: 'practice-of-madinah-maliki-fiqh', categoryKey: 'fiqh', image: '/images/article_madinah.png', date: '15 May 2026', readTime: 12 },
  { slug: 'basra-kufa-grammatical-schools', categoryKey: 'arabic', image: '/images/article_grammar.png', date: '02 May 2026', readTime: 10 },
  { slug: 'ashari-maturidi-theology-methodology', categoryKey: 'aqidah', image: '/images/article_theology.png', date: '20 Apr 2026', readTime: 11 },
  { slug: 'al-ghazali-integration-of-logic-usul', categoryKey: 'logic', image: '/images/article_logic.png', date: '08 Apr 2026', readTime: 9 },
  { slug: 'al-jurjani-theory-of-structure-nazhm', categoryKey: 'literature', image: '/images/article_rhetoric.png', date: '25 Mar 2026', readTime: 14 },
  { slug: 'al-tabari-methodology-historiography', categoryKey: 'history', image: '/images/article_history.png', date: '12 Mar 2026', readTime: 11 },
  { slug: 'islamic-parenting-modern-challenges', categoryKey: 'kids', image: '/images/article_kids.png', date: '05 Mar 2026', readTime: 9 }
];
