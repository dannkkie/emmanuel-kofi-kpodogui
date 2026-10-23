export interface OfficiatingMinister {
  name: string;
  role?: string;
}

export interface ServiceItem {
  id: string;
  number?: number;
  title: string;
  actor: string;
  hymnRef?: string;
  notes?: string;
}

export interface Hymn {
  id: string;
  code: string;
  title: string;
  language: "English" | "Twi" | "Ewe";
  stanzas: string[];
  refrain?: string;
}

export interface Tribute {
  id: string;
  author: string;
  relation: "Wife" | "Children" | "Grandchildren" | "Family" | "In-Laws" | "Dzita Welfare" | "Colleagues";
  scripture?: string;
  paragraphs: string[];
  signOff?: string;
  image?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  category: "military" | "parents" | "children" | "grandchildren" | "siblings" | "inlaws";
  caption?: string;
}

export interface BrochurePageMeta {
  pageNumber: number;
  title: string;
  category: "Cover" | "Service" | "Biography" | "Tributes" | "Gallery" | "Hymns" | "Appreciation";
  image: string;
}

export const MEMORIAL_DATA = {
  honoree: {
    title: "Ex-WO1",
    fullName: "Emmanuel Kofi Kpodogui",
    surname: "KPODOGUI",
    givenNames: "Emmanuel Kofi",
    alias: "Ago Die",
    serviceNumber: "177288",
    branch: "Ghana Air Force (Engineering Wing)",
    lifespan: "1954 – 2026",
    birthDate: "September 7, 1954",
    deathDate: "August 1, 2026",
    age: 71,
    hometown: "Dzita, Anloga District, Volta Region",
    wife: "Mrs. Mary Ami Akpaglo",
    childrenCount: 6,
    grandchildrenCount: 15,
    siblingsCount: 5,
  },
  service: {
    dateFormatted: "Saturday 24th October, 2026",
    isoDate: "2026-10-24T07:00:00+00:00",
    venueName: "Garrison Methodist and Presbyterian Church",
    venueShort: "Burma Camp, Accra",
    venueFull: "Garrison Methodist and Presbyterian Church, Burma Camp, Accra, Ghana",
    cemetery: "Military Cemetery, Burma Camp",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Garrison+Methodist+Presbyterian+Church+Burma+Camp+Accra",
    googleCalendarUrl:
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Funeral+Service:+Ex-WO1+Emmanuel+Kofi+Kpodogui+(Ago+Die)&dates=20261024T070000Z/20261024T130000Z&details=Celebration+of+Life+and+Burial+Service+for+Ex-WO1+Emmanuel+Kofi+Kpodogui+at+Garrison+Methodist+and+Presbyterian+Church,+Burma+Camp.&location=Garrison+Methodist+and+Presbyterian+Church,+Burma+Camp,+Accra,+Ghana",
  },
  themeVerses: [
    {
      text: "I have fought the good fight, I have finished the race, I have kept the faith. Now there is in store for me the crown of righteousness...",
      reference: "2 Timothy 4:7–8",
    },
    {
      text: "The righteous man walks in his integrity; his children are blessed after him.",
      reference: "Proverbs 20:7",
    },
    {
      text: "He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away.",
      reference: "Revelation 21:4",
    },
    {
      text: "Good and godly people often pass away, and society fails to realize that God removes them to spare them from coming evil. Instead of a tragedy, their death is an entry into peace and rest for those who walked in integrity.",
      reference: "Isaiah 52:1-2",
    },
  ],
  officiatingClergy: [
    { name: "Very Rev Cdr David B Quayson", role: "Chaplain" },
    { name: "F/O Eugene Dovlo", role: "Clergy" },
    { name: "Cat WO1 Adjei-Takyi Rebecca", role: "Clergy" },
    { name: "Rev. Dickson Tuffuor Sarpong", role: "ICGC Jesus Temple Koforidua" },
  ],
  preBurialService: {
    time: "07:00 – 08:45 hrs",
    activity: "Filing Past (All other tributes)",
  },
  burialServiceOrder: [
    { id: "bs-1", number: 1, title: "Opening Sentences", actor: "Chaplain" },
    { id: "bs-2", number: 2, title: "Opening Hymn: MHB 99", actor: "Congregation", hymnRef: "MHB 99" },
    { id: "bs-3", number: 3, title: "Prayer", actor: "Chaplain" },
    { id: "bs-4", number: 4, title: "Hymn: PHB 557 (1-3)", actor: "Congregation", hymnRef: "PHB 557" },
    { id: "bs-5", number: 5, title: "Biography", actor: "Family Rep" },
    { id: "bs-6", number: 6, title: "Hymn: MHB 50 (1-3)", actor: "Congregation", hymnRef: "MHB 50" },
    { id: "bs-7", number: 7, title: "Tribute", actor: "Wife, Children" },
    { id: "bs-8", number: 8, title: "Hymn: MHB 615 (1-3)", actor: "Congregation", hymnRef: "MHB 615" },
    { id: "bs-9", number: 9, title: "Scripture Reading: Psalm 90:1–12", actor: "Reader" },
    { id: "bs-10", number: 10, title: "Hymn: PHB 791 (1-3)", actor: "Congregation", hymnRef: "PHB 791" },
    { id: "bs-11", number: 11, title: "Sermon", actor: "Chaplain" },
    { id: "bs-12", number: 12, title: "Offertory and Christian Charity", actor: "All" },
    { id: "bs-13", number: 13, title: "Prayer of Thanksgiving and for Family", actor: "Chaplain" },
    { id: "bs-14", number: 14, title: "Announcements", actor: "Session Clerk" },
    { id: "bs-15", number: 15, title: "Closing Hymn: MHB 831 (1-3)", actor: "Congregation", hymnRef: "MHB 831" },
    { id: "bs-16", number: 16, title: "Prayer / Benediction", actor: "Chaplain" },
    { id: "bs-17", number: 17, title: "Dead March in Saul", actor: "Organist" },
    { id: "bs-18", number: 18, title: "Recessional Hymn: MHB 612", actor: "Congregation", hymnRef: "MHB 612" },
  ],
  gravesideServiceOrder: [
    { id: "gs-1", number: 1, title: "Scripture Sentence / Exhortation", actor: "Chaplain" },
    { id: "gs-2", number: 2, title: "Hymn: MHB 975", actor: "All", hymnRef: "MHB 975" },
    { id: "gs-3", number: 3, title: "Committal and Prayer", actor: "Chaplain" },
    { id: "gs-4", number: 4, title: "Vote of Thanks", actor: "Family Rep" },
    { id: "gs-5", number: 5, title: "Hymn: PHB 810", actor: "All", hymnRef: "PHB 810" },
    { id: "gs-6", number: 6, title: "Prayer / Benediction", actor: "Chaplain" },
  ],
  biographyChapters: [
    {
      id: "early-life",
      title: "Early Life & Education",
      subtitle: "Roots in Dzita, Anloga District",
      image: "/biography/page_3_img_1.jpeg",
      paragraphs: [
        "Ex-WO1 Emmanuel Kofi Kpodogui was born on September 7, 1954, to the late Mr. Mawuli Kpodogui and the late Madam Abla Amedzinya (both deceased). He hailed from Dzita in the Anloga District of the Volta Region.",
        "He commenced his formal education in 1961 at Dzita (L.A.) Middle School, where his discipline and keen intellect were evident early on. In 1971, he completed Form Four and was awarded the Middle School Leaving Certificate (MSLC) by the West African Examinations Council (WAEC), excelling in English, Arithmetic, History, and Geography.",
        "Fascinated by mechanical systems and engines, he proceeded to Accra to attend the Baah Engineering Training School from 1973 to 1975, obtaining his Intermediate Certificate from the Institute of the Motor Industry (I.M.I). Driven by an unquenchable thirst for knowledge, he continually upgraded his professional credentials at Accra Polytechnic, successfully obtaining the City and Guilds of London Institute Motor Vehicle Technicians Part I certificate (1986–1987) and the Ghana Education Service Motor Vehicle Technicians Part II certificate (1989–1990).",
      ],
    },
    {
      id: "military-career",
      title: "Military Enlistment & The Engineering Wing",
      subtitle: "Service Number 177288 — The Legend of 'Ago Die'",
      image: "/biography/page_3_img_2.jpeg",
      paragraphs: [
        "In 1976, Emmanuel answered the call to national service and enlisted in the Ghana Air Force under Service Number 177288, joining the prestigious Engineering Wing. Over a distinguished 33-year military career, his primary postings took him through the Air Force Base in Tamale and the Air Force Base at Burma Camp, Accra.",
        "Across the flight lines and barracks, he was widely known by the popular moniker 'Ago Die.' Strict, resolute, and demanding of excellence, he commanded profound respect from superiors, peers, and subordinates alike.",
        "Through unwavering dedication, technical precision, and integrity, he rose steadily through the non-commissioned officer cadre to attain the highest non-commissioned rank in the Ghana Armed Forces: Warrant Officer Class 1 (WO1).",
      ],
    },
    {
      id: "technical-mastery",
      title: "Aeronautical Mastery & 'AYEEKOOO !!!!!'",
      subtitle: "Rolls-Royce, Air UK, and the Restoration of the Agusta Bell A109 (GH71)",
      image: "/biography/page_4_img_1.jpeg",
      paragraphs: [
        "His expertise spanned both fixed-wing aircraft (1978–1984) and rotary-wing aircraft (1991–2009). His specialized military technical education began with the No. 15 Engine Mechanics Course (1978) and the No. 14 Engine Technicians Course (1980) at the Ghana Air Force School of Trade Training in Accra.",
        "Recognized as a premier aircraft maintenance technician, Ex-WO1 Kpodogui was selected for advanced aeronautical training overseas:",
        "• Rolls-Royce Limited Aero-Engine School (East Kilbride, Scotland – October 1985): Specialized line maintenance on Rolls-Royce Dart engines.\n• Air UK Training School (United Kingdom – November 1985): Technical certification on Dowty Rotol 2-Stop Propellers and Rolls-Royce Dart 7a Series engines.\n• Gruppo Agusta (Milan, Italy – November 1995): Completed the comprehensive A109Am Airframe Maintenance Course.",
        "Ex-WO1 Kpodogui’s mechanical mastery solved complex challenges that grounded military operations. In 2004, he spearheaded a major engineering breakthrough by returning the Agusta Bell A109 (GH71) helicopter to active service ('on line'). The aircraft had sat grounded for five consecutive years since 1999. In appreciation of his exceptional perseverance, Air Force Base Accra awarded him a Certificate of Appreciation, hailing his achievement with the military citation 'AYEEKOOO !!!!!' on his certificate.",
      ],
    },
    {
      id: "peacekeeper",
      title: "United Nations Peacekeeper",
      subtitle: "Flying Ghana's Flag Across Conflict Zones",
      image: "/biography/page_5_img_1.jpeg",
      paragraphs: [
        "Beyond defending his homeland, Ex-WO1 Kpodogui flew Ghana’s flag high as a United Nations peacekeeper, bringing stability to conflict regions across the globe:",
        "• UNIFIL (Lebanon): Awarded the United Nations Medal at Naqoura Headquarters, Lebanon, on July 25, 2002.\n• UNAMSIL (Sierra Leone): Awarded the United Nations Mission in Sierra Leone Medal for peace and stabilization operations.\n• MONUC (Democratic Republic of Congo): Awarded the United Nations Medal on October 20, 2006.\n• UNOCI (Côte d'Ivoire): Awarded the United Nations Operation in Côte d'Ivoire Medal in Abidjan on October 19, 2007.",
      ],
    },
    {
      id: "scholar-patriarch",
      title: "Christian Faith, Scholar & Patriarch",
      subtitle: "Devoted Husband, Father of 6, Grandfather of 15",
      image: "/biography/page_7_img_1.jpeg",
      paragraphs: [
        "A Presbyterian, Emmanuel anchored his life, family, and duty in the Christian faith. He was a man of steadfast principle who believed deeply in the transformational power of education.",
        "Behind his firm military bearing was an avid scholar and chronicler. Even in his retirement, he could often be found quietly in his room reading widely, studying, and solving complex mathematics problems to keep his mind razor-sharp. He possessed a rare, methodical precision and maintained notebooks where he faithfully documented every daily event, milestone, and family occurrence.",
        "Physical fitness was a lifelong devotion. Emmanuel was a passionate fitness and exercise enthusiast, complementing his daily discipline with long walks, nurturing his garden, and staying engaged with current affairs through the radio.",
        "Emmanuel was a loving, dependable patriarch, husband, father, and brother. He was happily married to his devoted wife, Mary Ami Akpaglo, and their union was blessed with six children. He raised his household with the same bedrock principles of discipline, intellectual curiosity, diligence, and respect that defined his life. He was also a proud grandfather to 15 grandchildren and is survived by five siblings.",
      ],
    },
    {
      id: "departure",
      title: "The Final Salute",
      subtitle: "August 1, 2026 — 37 Military Hospital, Accra",
      image: "/biography/page_6_img_1.jpeg",
      paragraphs: [
        "On August 1, 2026, after a brief illness, Warrant Officer Class 1 Emmanuel Kofi Kpodogui answered the call of his Maker at the 37 Military Hospital in Accra, aged 71.",
        "A consummate engine technician, a gallant soldier, a dedicated peacemaker, and a beloved family patriarch, 'Ago Die' fought the good fight, finished his earthly course, and served his nation with distinction.",
        "May the Lord grant his gallant soul eternal rest in Abraham's bosom. Hede Nyuie! Damirifa Due!",
      ],
    },
  ],
  tributes: [
    {
      id: "wife",
      author: "Mrs. Mary Ami Akpaglo",
      relation: "Wife",
      scripture:
        "“He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away.” – Revelation 21:4",
      image: "/biography/page_7_img_1.jpeg",
      paragraphs: [
        "It is with a heavy heart, yet a soul filled with profound gratitude to Almighty God, that I stand to pay tribute to my beloved husband, companion, and life partner, Efo Emma. Trying to capture decades of shared love, quiet moments, joint trials, and family triumphs into words feels impossible, yet I honor him today with every beat of my grieving heart.",
        "Our journey together began in the vibrant backdrop of Burma Camp. In those early days, I earned my livelihood selling starch. Providence brought Efo Emma into my life as one of my regular and most cherished customers. Whether he came to purchase starch or bring his dresses for patchwork, his interactions were always marked by genuine courtesy, warmth, and gentleness. What started as simple, honest exchanges quickly blossomed into a deep mutual affection and a loving relationship.",
        "Recognizing the depth of our connection, we traveled to the village in 1971 to fulfill our customary marriage rites, sealing our commitment before our families and God. From that sacred milestone onward, we established a home built on devotion, mutual respect, and shared purpose.",
        "Efo Emma was the true pillar of our household. As a husband, he was steadfast, but as a father to our children, his devotion was truly extraordinary. He held their education and future in the highest esteem. Long before school reopened for any academic term, Efo Emma had already secured all required tuition fees, textbooks, uniforms, and learning materials. He spared no effort to ensure our children never knew lack or felt unprepared in their educational pursuits.",
        "Beyond his role as a provider, my husband understood that a child's greatest inheritance is character. He was relentless in guiding our children to walk in integrity, ensuring they grew up upright and anchored in rich African moral values. He taught them discipline, respect, humility, and hard work. Seeing the honorable, responsible adults our children have become today remains a living testament to his principled fatherhood and wise counsel.",
        "Efo Emma, you were my protector, my confidant, and my lifelong partner. You fought a noble fight, fulfilled your earthly calling with grace, and left behind an enduring legacy of integrity and love. Though my heart aches from your physical absence, I take comfort in the beautiful memory of our decades together and the legacy you leave behind in our family.",
      ],
      signOff: "Rest peacefully in the bosom of your Maker until we meet again to part no more. Hede Nyuie!, my dear Efo Emma. Rest in eternal peace.",
    },
    {
      id: "children",
      author: "The Children",
      relation: "Children",
      scripture: "“The righteous man walks in his integrity; his children are blessed after him.” — Proverbs 20:7",
      paragraphs: [
        "Writing a final farewell to our father, the pillar of our lives, our teacher, protector, and guide is the heaviest task we have ever faced. To the Ghana Air Force and Burma Camp, he was the firm, fearless Airman popularly hailed as 'Ago Die.' But to the six of us, he was simply Papa: the man whose uncompromising standards, sacrificial love, and methodical care gave us the foundation upon which we all stand today.",
        "Growing up under Papa’s roof was a masterclass in purpose, order, and discipline. Long before we could understand the military world he operated in, we felt its high standards right at home. Papa had no room for haphazard living or last-minute rushes. He was a master planner who organized life with military precision, thinking through and planning events, tasks, and family responsibilities days well ahead of time. In our home, there was a time and a place for everything.",
        "Above all things, Papa placed an absolute premium on our education and spiritual growth. He anchored our home in faith, daily guiding us in prayer and constantly reminding us of his cherished principle: 'He who ceases to pray, ceases to prosper.' For him, school was not an afterthought, it was our primary assignment. We will never forget our daily routine after school: no matter how inviting the outdoors seemed or how much we wanted to join our friends, no one stepped outside to play until Papa had taken us through our Mathematics and English textbooks. He sat with us patiently, drilling the fundamentals, explaining concepts, and ensuring the work was thoroughly done.",
        "Papa made conscious, deliberate sacrifices to ensure that no required textbook, notebook, or study material was ever lacking. Whatever book the school requested, Papa made sure we had it in our hands.",
        "His belief in our potential was matched only by the extraordinary lengths he went to support us. Papa was our archivist and greatest champion: he meticulously filed and preserved our entire educational journey, keeping every single exam sheet, test paper, and terminal school report from our primary school days right up to the present day. Opening his files was like walking through a living record of our childhood, a tangible testament to just how deeply he cared about our progress, our efforts, and our future.",
        "Papa practiced exactly what he preached. He was a lifelong learner who never let his mind grow idle. Even in his retirement and advancing years, the familiar sight in our home was Papa quietly seated in his room, immersed in books, solving mathematics problems for recreation, and diligently chronicling life’s occurrences, notes, and reflections on paper.",
        "He took equal care of his body, inspiring us with his passion for physical exercise, brisk daily walks, his well tended garden, and the constant hum of the radio keeping him connected to the wider world.",
        "Papa, you were strict because you wanted the very best for us. You held us to the highest standards because you believed in our capabilities. You shielded us, provided for us alongside our dear mother, Mary Ami Akpaglo, and taught us that integrity, hard work, and knowledge are the true measures of a person.",
      ],
      signOff: "Thank you, Papa, for being our teacher, our mentor, and our dependable shield. We promise to guard the values you instilled in us, remain united as a family, and carry your proud name with honor. Your duty on earth is honourably finished, and your shift is complete. Hede nyuie, Papa. Rest well, gallant soldier. Rest in perfect peace, Ago Die!",
    },
    {
      id: "grandchildren",
      author: "The Grandchildren",
      relation: "Grandchildren",
      scripture: "“There is an appointed time and season for every activity under heaven, including a time to be born, a time to die, a time to plant, and a time to uproot.” — Eccl. 3:1–2",
      paragraphs: [
        "Grandpa, you were a kind and loving person who always cared about everyone around you. Your kindness touched many lives, and you never hesitated to help or encourage others.",
        "You also taught us the importance of health awareness. You reminded us to take good care of ourselves, live responsibly, and pay attention to our health.",
        "Your discipline was another quality we admired. You believed in doing the right thing, being responsible, and treating others with respect. These values will remain with us and guide us throughout our lives.",
        "Grandpa, we are grateful for the lessons you taught us and the love you shared with us. Your kindness, wisdom, discipline, and concern for our well-being will never be forgotten.",
      ],
      signOff: "Rest peacefully, Grandpa. You will always remain in our hearts.",
    },
    {
      id: "family",
      author: "The Family & Siblings",
      relation: "Family",
      scripture: "“Good and godly people often pass away, and society fails to realize that God removes them to spare them from coming evil. Instead of a tragedy, their death is an entry into peace and rest for those who walked in integrity.” — Isaiah 52:1-2",
      paragraphs: [
        "Standing here today to say goodbye to our dear brother whom we affectionately called 'Ago Die', is the heaviest thing we have ever had to bear. The silence he leaves behind is deafening, but our heart is bursting with the warmth of a bond that death can never touch.",
        "To others, he was a distinguished Warrant Officer, strong and unyielding, but to us, he was simply our brother and our rock. He had a heart that knew no bounds. He was a giver in the truest sense of the word. He was someone who constantly poured himself into our lives, always ensuring that everyone around him was cared for before he even thought of himself. No sacrifice was ever too big for him when it came to his family.",
        "While our hearts ache to imagine our lives without you here, we find profound peace in knowing that you have departed to be with our loving Lord Jesus Christ. Your earthly battles are over, and you are resting safely in His eternal embrace. Though we weep today, we hold onto the glorious promise of our faith that one day, we will meet again to part no more.",
      ],
      signOff: "You gave us your all, and we will miss you more than words can ever express. Go well, our sweet brother. Rest peacefully in the arms of our Lord. Rest in perfect peace, 'Ago Die.'",
    },
    {
      id: "inlaws",
      author: "The Sons & Daughters-in-law",
      relation: "In-Laws",
      scripture: "“The righteous man walks in his integrity; his children are blessed after him.” — Proverbs 20:7",
      paragraphs: [
        "Ex. WO1 Emmanuel Kofi Kpodogui was a man of integrity - a true soldier of the Ghana Air Force. His word was his bond. He lived with discipline, order and honesty.",
        "A great tree has fallen, yet its shade remains. A soldier has rested, yet his courage lives on. A father has journeyed home, yet his love still surrounds us. Papa 'Ago Die,' you touched our lives with strength and tenderness. You taught us resilience, unity, and honor.",
        "We, your sons in law and daughters in law, stand today in deep gratitude for how you embraced us as your own children from the very moment we entered your home. You guided us with equal devotion, providing for us generously and correction without fear or favor when necessary, never treating us as outsiders.",
      ],
      signOff: "Your footsteps may be silent now, but your legacy echoes in every heart you shaped. Rest in glory, Daddy. Your light remains.",
    },
    {
      id: "dzita-welfare",
      author: "Dzita Welfare Association & Drumming Group",
      relation: "Dzita Welfare",
      paragraphs: [
        "If bravery had a calm face, it was yours.",
        "We, the members of the Dzita Welfare Association and our Drumming and Dancing Group, have lost more than a member. We have lost a pillar, a father, a friend, and our undisputed Agbadza dancer.",
        "You joined us, when serving your nation gallantly in the Ghana Air Force. You came with the discipline and courage of a soldier, but what kept you with us was your humility. You were brave, yet so calm. Firm, yet so gentle. You related to everyone, the old, the young, the rich, the poor - with the same respect and brotherly love.",
        "Then there was your dance. Ah! Ago die! When the Atsimevu called and the Sogo answered, you rose like a young warrior. Your feet spoke the language of our ancestors so fluently. You didn't just dance Agbadza, you lived it. You owned the circle, and in turn, you gave us joy, pride and unity.",
        "How do we drum without you? How do we dance without looking out for your elegant steps? Though you will be laid to rest today, 24th October, 2026 at the Military Cemetery, Burma Camp, your legacy will never be buried. Your body will rest, but your spirit will forever remain in our gathering, in our drums, in our dance.",
      ],
      signOff: "Rest well, our gallant Airman. Rest well, our Agbadza Legend. Rest well, Ago die. You have fought a good fight, you have finished your race. Dzudzor le nutifafa me. Amem!!",
    },
  ],
  hymns: [
    {
      id: "mhb-99",
      code: "MHB 99",
      title: "How Sweet the Name of Jesus Sounds",
      language: "English",
      stanzas: [
        "1 How sweet the name of Jesus sounds in a believer's ear!\nIt soothes our sorrows, heals our wounds, and drives away our fear.",
        "2 It makes the wounded spirit whole and calms the troubled breast;\n'tis manna to the hungry soul, and to the weary, rest.",
        "3 O Jesus, shepherd, guardian, friend, my Prophet, Priest, and King,\nmy Lord, my Life, my Way, my End, accept the praise I bring.",
        "4 How weak the effort of my heart, how cold my warmest thought;\nbut when I see you as you are, I'll praise you as I ought.",
        "5 Till then I would your love proclaim with every fleeting breath;\nand may the music of your name refresh my soul in death.",
      ],
    },
    {
      id: "phb-557",
      code: "PHB 557",
      title: "Yesu, me Gyefo ne wo",
      language: "Twi",
      stanzas: [
        "1 Yesu, me Gyefo ne wo,\nMereba wo nwini mu;\nƐpo asorɔkye rebɔ,\nNa asɔre wɔ me so.\nFa me sie, m'Agyenkwa,\nKosi sɛ agyae huru;\nHwɛ me so wɔ m'asetenam',\nNa sɛ ɛto twa a, gye me.",
        "2 Wo nko ne hintabea,\nMede me kra mɔ dwom wo;\nWo nko so na m'ani da,\nWo nko ne me boafo.\nNti mesrɛ wo, s'ɛngyae me nko,\nOh, kata m'adagya no so;\nGyegye me, kyerɛ me kwan,\nNa fa me sie, oh.",
      ],
    },
    {
      id: "mhb-50",
      code: "MHB 50",
      title: "The Lord's My Shepherd, I'll Not Want",
      language: "English",
      stanzas: [
        "1. The Lord’s my shepherd, I’ll not want.\nHe makes me down to lie\nIn pastures green: he leadeth me\nthe quiet waters by.",
        "2. My soul he doth restore again;\nand me to walk doth make\nWithin the paths of righteousness,\nev’n for his own name’s sake.",
        "3. Yea, though I walk in death’s dark vale,\nyet will I fear none ill:\nFor thou art with me; and thy rod\nand staff me comfort still.",
        "4. My table thou hast furnishèd\nIn presence of my foes;\nMy head thou dost with oil anoint,\nAnd my cup overflows.",
        "5. Goodness and mercy all my life\nShall surely follow me,\nAnd in God’s house forever more\nMy dwelling place shall be.",
      ],
    },
    {
      id: "mhb-615",
      code: "MHB 615",
      title: "Guide Me, O My Great Redeemer",
      language: "English",
      stanzas: [
        "1 Guide me, O my great Redeemer,\npilgrim through this barren land;\nI am weak, but you are mighty;\nhold me with your powerful hand.\nBread of heaven, bread of heaven,\nfeed me now and evermore,\nfeed me now and evermore.",
        "2 Open now the crystal fountain,\nwhere the healing waters flow.\nLet the fire and cloudy pillar\nlead me all my journey through.\nStrong Deliverer, strong Deliverer,\never be my strength and shield,\never be my strength and shield.",
        "3 When I tread the verge of Jordan,\nbid my anxious fears subside.\nDeath of death, and hell's Destruction,\nland me safe on Canaan's side.\nSongs of praises, songs of praises\nI will ever sing to you,\nI will ever sing to you.",
      ],
    },
    {
      id: "phb-791",
      code: "PHB 791",
      title: "Ɔhɔho ne mamfrani",
      language: "Twi",
      stanzas: [
        "1. Ɔhɔho ne mamfrani\nna meyɛ wɔ fam ha. M’asase mmɛn ha baabi,\nminni fi pa wɔ ha.\nƆhaw, ɔbrɛ, amane\nna yɛde tu ha kwan;\nn’ɔsoro hɔ na Nyame\nbɛma mahome sann.",
        "2. So mamfi me mmofraase manhyia haw ne\nbrɛ, ahoguan ne amane,\nɔko ne ɔpere?\nMannya nea me kɔn dɔ, m’ani anwie gye;\nenti mema m’anan so\nna mentena ha menkyɛ",
        "3. Ɛha amane kwan no, bebree adi so kan;\nOnyame adiyifo,\nne ne man mu mpanyin. Boasetɔ ne gyidi\nna wɔde tuu wɔn kwan;\nna wɔn akyi na medi\nwɔ nkwa ne wu nyinaam.",
      ],
    },
    {
      id: "mhb-831",
      code: "MHB 831",
      title: "Give Me the Wings of Faith to Rise",
      language: "English",
      stanzas: [
        "1. Give me the wings of faith to rise\nWithin the veil, and see\nThe saints above, how great their joys,\nHow bright their glories be.",
        "2. Once they were mourning here below\nAnd wet their cheeks with tears;\nThey wrestled hard, as we do now,\nWith sins, and doubts and fears.",
        "3. I ask them whence their vic'try came;\nThey, with united breath,\nAscribe their conquest to the Lamb,\nTheir triumph to his death.",
        "4. Our glorious Leader claims our praise\nFor his own pattern giv'n,\nWhile the long cloud of witnesses\nShow the same path to Heav'n.",
      ],
    },
    {
      id: "mhb-612",
      code: "MHB 612",
      title: "Lead, Kindly Light",
      language: "English",
      stanzas: [
        "1. Lead, kindly Light, amid th' encircling gloom;\nO lead me on!\nThe night is dark, and I am far from home;\nO lead me on!\nKeep firm my feet; I do not ask to see\nThe distant scene, one step enough for me.",
        "2. I was not ever thus, nor prayed that you\nShould lead me on.\nI loved to choose and see my path, but now,\nPlease lead me on!\nI loved the garish day, and spite of fears,\nPride ruled my will; remember not past years.",
        "3. So long your pow'r has blest me, sure it still\nWill lead me on,\nO'er moor and fen, o'er crag and torrent, till\nThe night is gone,\nAnd with the morn those angel faces smile,\nWhich I have loved long since, and lost awhile.",
      ],
    },
    {
      id: "mhb-975",
      code: "MHB 975",
      title: "When the Day of Toil Is Done",
      language: "English",
      stanzas: [
        "1 When the day of toil is done,\nWhen the race of life is run,\nFather, grant Thy wearied one\nRest for evermore.",
        "2 When the strife of sin is stilled,\nWhen the foe within is killed,\nBe Thy gracious word fulfilled,--\n'Peace for evermore.'",
        "3 When the darkness melts away\nAt the breaking of the day,\nBid us hail the cheering ray,--\nLight for evermore.",
        "4 When the heart by sorrow tried\nFeels at length its throbs subside,\nBring us, where all tears are dried,\nJoy for evermore.",
        "5 When for vanished days we yearn,\nDays that never can return,\nTeach us in Thy love to learn\nLove for evermore.",
        "6 When the breath of life is flown,\nWhen the grave must claim its own,\nLord of life, be ours Thy crown,--\nLife for evermore.",
      ],
    },
    {
      id: "phb-810",
      code: "PHB 810",
      title: "Now the Laborer's Task Is O'er",
      language: "English",
      refrain: "Father, in thy gracious keeping,\nLeave we now thy servant sleeping. A-men.",
      stanzas: [
        "1 Now the laborer's task is o'er;\nNow the battle day is past;\nNow upon the farther shore\nLands the voyager at last.",
        "2 There the tears of earth are dried,\nThere its hidden things are clear,\nThere the work of life is tried\nBy a juster judge than here.",
        "3 There the penitents, that turn\nTo the cross their dying eyes,\nAll the love of Jesus learn\nAt his feet in Paradise.",
        "4 'Earth to earth, and dust to dust,'\nCalmly now the words we say;\nLeaving him to sleep, in trust,\nTill the resurrection-day.",
        "5 'Till the sea gives up its dead,'\nCalmly now the words we say,\nLaid in ocean's quiet bed\nTill the resurrection-day:",
      ],
    },
  ],
  appreciation: {
    title: "APPRECIATION",
    subtitle: "The entire family of Ex-WO1 Emmanuel Kofi Kpodogui",
    message:
      "wish to express their profound gratitude for your words of encouragement, prayers, support and presence during this period of loss and grief.",
    blessing: "May God richly bless you.",
  },
  galleryCategories: [
    { id: "all", label: "All Photos" },
    { id: "military", label: "Military & Career" },
    { id: "parents", label: "Mom & Dad" },
    { id: "children", label: "Children" },
    { id: "grandchildren", label: "Grandchildren" },
    { id: "siblings", label: "Siblings" },
    { id: "inlaws", label: "In-Laws" },
  ],
  galleryPhotos: [
    { id: "mil-1", src: "/gallery/military_2.jpeg", alt: "Air Force Base Tamale flight line", category: "military", caption: "Ghana Air Force Engineering Unit field camp" },
    { id: "mil-2", src: "/gallery/military_3.jpeg", alt: "Air Force Officers Conference", category: "military", caption: "Senior NCO and Technical flight line debrief" },
    { id: "mil-3", src: "/gallery/military_6.jpeg", alt: "UN Peacekeeping contingent in Lebanon", category: "military", caption: "UNIFIL contingent Naqoura Headquarters, Lebanon" },
    { id: "mil-4", src: "/gallery/military_7.jpeg", alt: "Engineering colleagues at Burma Camp", category: "military", caption: "Ghana Air Force Technical Crew at Burma Camp" },
    { id: "mil-5", src: "/gallery/military_8.jpeg", alt: "Aircraft line maintenance inspection", category: "military", caption: "Aircraft technical inspection and engine diagnostics" },
    { id: "mil-6", src: "/gallery/military_11.jpeg", alt: "Field peacekeeping deployment", category: "military", caption: "UN Peacekeeping deployment in tactical blue helmet gear" },
    { id: "mil-7", src: "/gallery/military_14.jpeg", alt: "Technical training graduation", category: "military", caption: "Military certification ceremony and technical honors" },
    { id: "par-1", src: "/gallery/parents_2.jpeg", alt: "Efo Emma & Mary Ami Akpaglo banquet", category: "parents", caption: "Celebrating milestones together at Burma Camp" },
    { id: "par-2", src: "/gallery/parents_4.jpeg", alt: "Couple portrait in traditional attire", category: "parents", caption: "Decades of shared devotion and partnership" },
    { id: "par-3", src: "/gallery/parents_7.jpeg", alt: "Mary Ami Akpaglo celebration", category: "parents", caption: "Mrs. Mary Ami Akpaglo in vibrant ceremonial Kente" },
    { id: "par-4", src: "/gallery/parents_11.jpeg", alt: "Golden portrait of husband and wife", category: "parents", caption: "Efo Emma and Mary Ami Akpaglo in ceremonial cloth" },
    { id: "ch-1", src: "/gallery/children_2.jpeg", alt: "Son in formal suit", category: "children", caption: "Eldest son continuing the family legacy of discipline" },
    { id: "ch-2", src: "/gallery/children_3.jpeg", alt: "Daughter smiling warmly", category: "children", caption: "Daughter reflecting Papa's warmth and values" },
    { id: "ch-3", src: "/gallery/children_4.jpeg", alt: "Daughter at celebratory ceremony", category: "children", caption: "Daughter carrying the Kpodogui pride with elegance" },
    { id: "ch-4", src: "/gallery/children_5.jpeg", alt: "Daughter portrait", category: "children", caption: "A testament to principled upbringing" },
    { id: "ch-5", src: "/gallery/children_6.jpeg", alt: "Son professional headshot", category: "children", caption: "Son embodying diligence, integrity, and focus" },
    { id: "ch-6", src: "/gallery/children_7.jpeg", alt: "Son in city setting", category: "children", caption: "Son proud of Papa's enduring shield" },
    { id: "gc-1", src: "/gallery/grandchildren_2.jpeg", alt: "Grandson portrait", category: "grandchildren", caption: "Grandson walking in Grandpa's footsteps" },
    { id: "gc-2", src: "/gallery/grandchildren_4.jpeg", alt: "Grandson smiling", category: "grandchildren", caption: "Cherishing Grandpa's life lessons" },
    { id: "gc-3", src: "/gallery/grandchildren_6.jpeg", alt: "Grandson in royal blue blazer", category: "grandchildren", caption: "Smart and confident grandson" },
    { id: "gc-4", src: "/gallery/grandchildren_8.jpeg", alt: "Granddaughter in red dress", category: "grandchildren", caption: "Granddaughter remembering Grandpa's kind advice" },
    { id: "gc-5", src: "/gallery/grandchildren_13.jpeg", alt: "Little grandson in suit", category: "grandchildren", caption: "Youngest generations blessed after him" },
    { id: "sib-1", src: "/gallery/siblings_2.jpeg", alt: "Sister in traditional lace", category: "siblings", caption: "Sister celebrating family unity" },
    { id: "sib-2", src: "/gallery/siblings_3.jpeg", alt: "Sister vintage portrait", category: "siblings", caption: "Cherished sibling bonds from Dzita" },
    { id: "sib-3", src: "/gallery/siblings_4.jpeg", alt: "Brother sharing likeness", category: "siblings", caption: "Brother remembering our sweet brother 'Ago Die'" },
    { id: "sib-4", src: "/gallery/siblings_6.jpeg", alt: "Elder sister matriarch", category: "siblings", caption: "Family matriarch honoring her beloved brother" },
    { id: "inl-1", src: "/gallery/inlaws_2.jpeg", alt: "Daughter-in-law casual travel", category: "inlaws", caption: "Embraced as a true daughter" },
    { id: "inl-2", src: "/gallery/inlaws_3.jpeg", alt: "Son-in-law in Ghanaian smock", category: "inlaws", caption: "Son-in-law honored by Papa's fearless guidance" },
    { id: "inl-3", src: "/gallery/inlaws_5.jpeg", alt: "Son-in-law formal portrait", category: "inlaws", caption: "Guided with equal devotion and respect" },
    { id: "inl-4", src: "/gallery/inlaws_6.jpeg", alt: "Daughter-in-law in sunglasses and blazer", category: "inlaws", caption: "Echoing his legacy of honor and unity" },
  ] as GalleryPhoto[],
  brochurePages: Array.from({ length: 24 }, (_, i) => {
    const pageNum = i + 1;
    let title = `Page ${pageNum}`;
    let category: BrochurePageMeta["category"] = "Cover";

    if (pageNum === 1) {
      title = "Cover — In Loving Memory";
      category = "Cover";
    } else if (pageNum === 2) {
      title = "Order of Service & Officiating Clergy";
      category = "Service";
    } else if (pageNum >= 3 && pageNum <= 6) {
      title = `Biography: Part ${pageNum - 2}`;
      category = "Biography";
    } else if (pageNum >= 7 && pageNum <= 8) {
      title = `Tribute by Wife (Part ${pageNum - 6})`;
      category = "Tributes";
    } else if (pageNum >= 9 && pageNum <= 10) {
      title = `Tribute by Children (Part ${pageNum - 8})`;
      category = "Tributes";
    } else if (pageNum === 11) {
      title = "Tribute by Grandchildren";
      category = "Tributes";
    } else if (pageNum === 12) {
      title = "Tribute by Family & Siblings";
      category = "Tributes";
    } else if (pageNum === 13) {
      title = "Tribute by In-Laws";
      category = "Tributes";
    } else if (pageNum === 14) {
      title = "Tribute by Dzita Welfare Association";
      category = "Tributes";
    } else if (pageNum === 15) {
      title = "Gallery: Military & Career";
      category = "Gallery";
    } else if (pageNum === 16) {
      title = "Gallery: Mom and Dad";
      category = "Gallery";
    } else if (pageNum === 17) {
      title = "Gallery: Children";
      category = "Gallery";
    } else if (pageNum === 18) {
      title = "Gallery: Grandchildren";
      category = "Gallery";
    } else if (pageNum === 19) {
      title = "Gallery: Siblings";
      category = "Gallery";
    } else if (pageNum === 20) {
      title = "Gallery: In-Laws";
      category = "Gallery";
    } else if (pageNum >= 21 && pageNum <= 23) {
      title = `Hymns: Part ${pageNum - 20}`;
      category = "Hymns";
    } else if (pageNum === 24) {
      title = "Appreciation";
      category = "Appreciation";
    }

    return {
      pageNumber: pageNum,
      title,
      category,
      image: `/brochure/page-${pageNum}.webp`,
    };
  }) as BrochurePageMeta[],
};
