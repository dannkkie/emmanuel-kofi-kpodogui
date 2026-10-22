export interface Tribute {
  id: string;
  category: "widow" | "children" | "grandchildren" | "military" | "church" | "family";
  author: string;
  relation: string;
  image?: string;
  excerpt: string;
  content: string[];
}

export interface ProgrammeItem {
  time?: string;
  title: string;
  description?: string;
  leader?: string;
  hymnNumber?: string;
}

export interface ProgrammePart {
  id: string;
  name: string;
  subtitle: string;
  items: ProgrammeItem[];
}

export interface Hymn {
  number: string;
  title: string;
  book: "MHB" | "PH";
  verses: string[][];
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: "military" | "family" | "traditional" | "golden";
  year?: string;
}

export const FUNERAL_DATA = {
  deceased: {
    fullName: "Emmanuel Kofi Kpodogui",
    rank: "Ex-WO1 (Warrant Officer Class 1)",
    alias: "A. K. A “AGO DIE”",
    birthYear: 1954,
    deathYear: 2026,
    age: 72,
    serviceBranch: "Ghana Armed Forces (GAF)",
    coverImage: "/images/cover/memorial.webp",
    coverImageFallback: "/images/memorial.jpg",
    qrCodeImage: "/images/cover/memorial.webp",
  },
  service: {
    dateFormatted: "Saturday, 24th October, 2026",
    isoDate: "2026-10-24",
    venue: "Garrison Methodist and Presbyterian Church (GMPC)",
    location: "Burma Camp, Accra, Ghana",
    preBurialTime: "07:00 AM – 08:15 AM",
    burialServiceTime: "08:30 AM",
    gravesideVenue: "Military Cemetery, Burma Camp",
    thanksgivingDate: "Sunday, 25th October, 2026 (09:00 AM)",
    thanksgivingVenue: "Garrison Methodist and Presbyterian Church, Burma Camp",
    attire: {
      saturday: "Black & White / Military Regalia",
      sunday: "All White (Thanksgiving)",
    },
    googleMapsUrl: "https://maps.google.com/?q=Garrison+Methodist+and+Presbyterian+Church+Burma+Camp+Accra",
  },
  programmeParts: [
    {
      id: "part-1",
      name: "Part I: Pre-Burial",
      subtitle: "Filing Past & Tributes of Solace (07:00 AM – 08:15 AM)",
      items: [
        {
          title: "Opening Prayer & Sentences",
          leader: "Officiating Minister",
          description: "Invocation of peace and comforting grace upon the gathering.",
        },
        {
          title: "Filing Past by Dignitaries, Comrades & General Public",
          hymnNumber: "MHB 651",
          description: "Solemn hymns sung during the final viewing.",
        },
        {
          title: "Filing Past by the Kpodogui Family & Children",
          description: "Final viewing and paying of respects by the immediate family.",
        },
        {
          title: "Closing of the Casket",
          leader: "Military Bearer Party & Officiants",
          description: "Casket formally sealed under full military decorum.",
        },
      ],
    },
    {
      id: "part-2",
      name: "Part II: Burial Service",
      subtitle: "Main Church Service at GMPC Burma Camp (08:30 AM)",
      items: [
        {
          title: "Processional Hymn",
          hymnNumber: "MHB 615",
          leader: "Congregation & Choir",
          description: "Guide Me, O Thou Great Jehovah",
        },
        {
          title: "Call to Worship & Opening Sentences",
          leader: "Very Rev. Minister-in-Charge",
        },
        {
          title: "Hymn of Praise & Confidence",
          hymnNumber: "MHB 110",
          leader: "Congregation",
          description: "O God, Our Help in Ages Past",
        },
        {
          title: "Prayers of Penitence & Thanksgiving for Ex-WO1 Kpodogui",
          leader: "Presbyterian Chaplain",
        },
        {
          title: "First Scripture Reading",
          description: "Psalm 23 (The Lord is My Shepherd)",
          leader: "Grandchild",
        },
        {
          title: "Choir Anthem of Hope",
          leader: "Garrison Church Choir",
        },
        {
          title: "Second Scripture Reading",
          description: "1 Thessalonians 4:13–18 (The Hope of Resurrection)",
          leader: "Son / Daughter",
        },
        {
          title: "Biography of Ex-WO1 Emmanuel Kofi Kpodogui",
          description: "A recounting of his 72 fruitful years: soldier, leader, father.",
          leader: "Family Representative",
        },
        {
          title: "Reading of Tributes",
          description: "Tributes by Widow, Children, Ghana Armed Forces Veterans, and Church.",
        },
        {
          title: "Hymn of Reflection",
          hymnNumber: "MHB 528",
          leader: "Congregation",
          description: "A Charge to Keep I Have",
        },
        {
          title: "Sermon / Word of Exhortation",
          leader: "Director of Religious Affairs, GAF",
        },
        {
          title: "Offertory for the Bereaved Family & Thanksgiving",
          description: "Accompanied by solemn military band anthems.",
        },
        {
          title: "Commendation & Closing Benediction",
          leader: "Officiating Clergy",
        },
        {
          title: "Recessional & Military Farewell Hymn",
          hymnNumber: "MHB 948",
          description: "Abide With Me; Fast Falls the Eventide (Slow March)",
        },
      ],
    },
    {
      id: "part-3",
      name: "Part III: Graveside",
      subtitle: "Military Honours & Committal at the Cemetery",
      items: [
        {
          title: "Procession to the Graveside",
          leader: "Military Brass Band & Armed Forces Bearer Party",
        },
        {
          title: "Sentences of Committal",
          leader: "Military Chaplain",
        },
        {
          title: "Committal of the Mortal Remains",
          description: "“Earth to earth, ashes to ashes, dust to dust...”",
        },
        {
          title: "Sounding of the 'Last Post'",
          leader: "Bugler, Ghana Armed Forces",
          description: "The traditional bugle call signaling the soldier’s final rest.",
        },
        {
          title: "Two Minutes of Silence",
          description: "In memory of a fallen patriot and disciplined soldier.",
        },
        {
          title: "Sounding of the 'Reveille'",
          leader: "Bugler, Ghana Armed Forces",
          description: "Symbolizing awakening to eternal glory.",
        },
        {
          title: "Laying of Wreaths",
          description: "Widow & Children, Ghana Armed Forces, Church, and Agorkpo/Kpodogui Clan.",
        },
        {
          title: "Vote of Thanks & Final Benediction",
          leader: "Head of Family",
        },
      ],
    },
    {
      id: "part-4",
      name: "Part IV: Thanksgiving",
      subtitle: "Sunday Memorial & Thanksgiving Service (09:00 AM)",
      items: [
        {
          title: "Thanksgiving Procession",
          description: "Family enters the church clothed in festive white garments.",
        },
        {
          title: "Special Family Thanksgiving Prayers",
          leader: "Resident Minister, GMPC",
        },
        {
          title: "Praises & Thanksgiving Offerings",
          description: "Expressing heartfelt gratitude to Almighty God for 72 years of blessing.",
        },
        {
          title: "Reception & Refreshments",
          description: "Held at the Burma Camp Mess / Family Residence immediately following service.",
        },
      ],
    },
  ] as ProgrammePart[],

  biographyChapters: [
    {
      title: "Dawn & Early Years (1954 – 1974)",
      subtitle: "The Foundation of Discipline and Character",
      content: [
        "Ex-WO1 Emmanuel Kofi Kpodogui was born into the loving Kpodogui family in 1954. From his earliest days, he displayed the quintessential qualities that would define his entire lifespan: unwavering integrity, self-discipline, and an innate sense of responsibility toward his family and community.",
        "Growing up in an era that prized hard work and mutual respect, Emmanuel was grounded in the timeless values of duty and honor. He pursued his early education with diligence, demonstrating a sharp mind, an athletic posture, and a natural leadership ability that garnered deep respect among his peers and elders alike.",
      ],
    },
    {
      title: "The Soldier’s Journey — Ghana Armed Forces",
      subtitle: "Rising to the Rank of Warrant Officer Class 1 (Ex-WO1)",
      content: [
        "In his youth, answering the noble patriotic call of national service, Emmanuel enlisted in the prestigious Ghana Armed Forces (GAF). Thus began an illustrious military career marked by loyalty, unshakeable courage, and distinction.",
        "Through relentless dedication, field excellence, and leadership training, he climbed progressively through the non-commissioned officer ranks, culminating in the esteemed rank of Warrant Officer Class 1 (WO1).",
        "Among his comrades and subordinates, he earned the iconic moniker “AGO DIE”. It was a badge of respect born of his zero-tolerance for indiscipline, his infectious sense of humor, his booming command voice, and his insistence that every duty be performed with military perfection.",
        "Throughout his postings across different units and regiments stationed around Burma Camp and across the country, Ex-WO1 Kpodogui served as a trusted advisor to senior officers and an inspiring father-figure to young soldiers. His service to the Republic of Ghana remains an eternal testament to valor and patriotism.",
      ],
    },
    {
      title: "Christian Devotion & Church Life",
      subtitle: "Walking in Faith and Humility",
      content: [
        "Parallel to his military discipline was his vibrant spiritual life. A faithful and dedicated Christian, he made the Garrison Methodist and Presbyterian Church (GMPC) at Burma Camp his spiritual home for decades.",
        "He believed firmly that without the grace of Almighty God, no soldier can stand. He was regular in his attendance, supported church development projects generously, and nurtured his household in the reverent fear and love of God.",
        "His favorite hymns and scriptures were sources of daily strength, which he memorized and recited with passionate conviction until his transition to glory.",
      ],
    },
    {
      title: "Family, Mentorship & The Golden Years",
      subtitle: "A Loving Patriarch & Community Pillar",
      content: [
        "Beyond the uniform, medals, and the salute of comrades, Emmanuel was at heart a gentle, devoted family man. As a husband, he was steadfast, supportive, and kind. As a father, he balanced military precision with deep affection—teaching his children that character, humility, and education are the greatest inheritances in life.",
        "In his retirement, the moniker “Ago Die” echoed warmly among grandchildren and young relatives who flocked around him to listen to his wartime stories, laughter, and wise counsel. His home in Burma Camp was always open to all.",
        "Ex-WO1 Emmanuel Kofi Kpodogui lived a full, impactful 72 years, leaving an indelible imprint on his nation, his comrades-in-arms, and generations of his family. He has fought the good fight, finished the race, and kept the faith.",
      ],
    },
  ],

  tributes: [
    {
      id: "tribute-widow",
      category: "widow",
      author: "Mrs. Kpodogui",
      relation: "Loving Widow",
      image: "/images/tributes/widow.jpg",
      excerpt: "“My soldier, my protector, and the love of my youth. You were my pillar of strength for decades...”",
      content: [
        "How do I begin to put into words what your presence meant in my life? You were not just my husband; you were my faithful friend, my counselor, my shield, and my greatest cheerleader.",
        "I watched you leave home in your impeccably starched military uniform, standing tall with pride, and I saw you return to gently hold my hand and share the simple joys of our household. You gave me peace. You gave our home security.",
        "Even when sickness knocked on our door, your spirit remained undefeated. You never lost your dignity. Emmanuel, 'Ago Die', you have answered the Commander-in-Chief’s call to eternal rest. Rest peacefully in the bosom of Abraham until we meet again."
      ],
    },
    {
      id: "tribute-children",
      category: "children",
      author: "The Children",
      relation: "Beloved Sons & Daughters",
      image: "/images/tributes/children.jpg",
      excerpt: "“Daddy taught us that a good name is better than silver and gold. His 'Ago Die' spirit will live in us forever.”",
      content: [
        "To the military world, you were Ex-WO1 Kpodogui, a soldier of discipline and steel. But to us, you were simply 'Daddy'—the man who would inspect our homework with a smile, teach us how to iron our uniforms with razor-sharp creases, and pray over our heads each morning before school.",
        "Whenever we felt discouraged, you would look at us with that confident glint in your eyes and shout your favorite refrain, reminding us that no mountain is insurmountable for a determined heart.",
        "You sacrificed comfort and luxury so that every one of us could attain high education and stand proud in society. We owe everything we are today to your sacrifices. Rest well, Daddy. Your legacy is safe in our hands."
      ],
    },
    {
      id: "tribute-grandchildren",
      category: "grandchildren",
      author: "The Grandchildren",
      relation: "Loving Grandchildren",
      image: "/images/tributes/grandchildren.jpg",
      excerpt: "“Grandpa was our superhero. He told the best stories and always had treats hidden in his pockets!”",
      content: [
        "Grandpa was the coolest person in the room! Whenever we visited Burma Camp, he would greet us with a mock military salute, and we would salute back and burst into laughter.",
        "He loved to hear about our school achievements and always reminded us to be the best in whatever we do. We will miss his warm hugs, his joyful stories, and the special treats he saved just for us.",
        "Sleep well, Grandpa. We love you so much and we know you are watching over us from heaven!"
      ],
    },
    {
      id: "tribute-military",
      category: "military",
      author: "Comrades-in-Arms & GAF Veterans",
      relation: "Ghana Armed Forces Fraternity",
      image: "/images/tributes/military.jpg",
      excerpt: "“A soldier’s soldier. Ex-WO1 Kpodogui was the epitome of military discipline, loyalty, and regimental pride.”",
      content: [
        "The non-commissioned officers and veterans of the Ghana Armed Forces salute the memory of our departed comrade, Ex-WO1 Emmanuel Kofi Kpodogui.",
        "In the ranks, WO1 Kpodogui was revered as a bedrock of military bearing. His popular alias “Ago Die” was synonymous with resilience—he was the sergeant-major who led by personal example, who ensured troops under his charge were well-trained, well-cared for, and ready for deployment.",
        "His service in peacekeeping operations brought honour not only to his unit, but to the Republic of Ghana. Soldier, your vigil is over. The bugle has sounded. Stand easy, comrade. Rest in perfect peace."
      ],
    },
    {
      id: "tribute-church",
      category: "church",
      author: "Garrison Methodist & Presbyterian Church",
      relation: "Church Family, Burma Camp",
      image: "/images/tributes/church.jpg",
      excerpt: "“A faithful steward who worshipped the Lord with reverence and supported the vineyard diligently.”",
      content: [
        "The clergy, session, and congregation of the Garrison Methodist and Presbyterian Church (GMPC), Burma Camp, celebrate the life of our dear brother, Ex-WO1 Emmanuel Kofi Kpodogui.",
        "Bro. Emmanuel was a familiar and dignified presence in our worship services. He revered the sanctuary of God, sang the hymns with great heart, and contributed meaningfully to the spiritual and infrastructural life of our church.",
        "We take solace in the scripture in 2 Timothy 4:7-8: 'I have fought the good fight, I have finished the race, I have kept the faith.' May the Lord grant him a peaceful resting place in His eternal kingdom."
      ],
    },
    {
      id: "tribute-family",
      category: "family",
      author: "The Kpodogui & Agorkpo Families",
      relation: "Extended Clan & Elders",
      image: "/images/tributes/family.jpg",
      excerpt: "“A noble son of the soil who brought pride and unity to our ancestral home.”",
      content: [
        "Our son and brother Emmanuel was a beacon of light in the family. Whenever family matters arose, his wisdom, calmness, and impartiality brought peaceful consensus.",
        "He never forgot his roots. Even during the height of his military commitments, he remained closely connected to family gatherings, funerals, and festive celebrations.",
        "A mighty tree has fallen in the forest of our lineage, but the fruits of his upright life will nourish generations to come. Dzudzor le nutifafa me, Kofi."
      ],
    },
  ] as Tribute[],

  hymns: [
    {
      number: "MHB 110",
      title: "O God, Our Help in Ages Past",
      book: "MHB",
      verses: [
        [
          "O God, our help in ages past,",
          "Our hope for years to come,",
          "Our shelter from the stormy blast,",
          "And our eternal home!"
        ],
        [
          "Under the shadow of Thy throne",
          "Thy saints have dwelt secure;",
          "Sufficient is Thine arm alone,",
          "And our defence is sure."
        ],
        [
          "Before the hills in order stood,",
          "Or earth received her frame,",
          "From everlasting Thou art God,",
          "To endless years the same."
        ],
        [
          "A thousand ages in Thy sight",
          "Are like an evening gone;",
          "Short as the watch that ends the night",
          "Before the rising sun."
        ],
        [
          "O God, our help in ages past,",
          "Our hope for years to come,",
          "Be Thou our guard while troubles last,",
          "And our eternal home!"
        ]
      ],
    },
    {
      number: "MHB 615",
      title: "Guide Me, O Thou Great Jehovah",
      book: "MHB",
      verses: [
        [
          "Guide me, O Thou great Jehovah,",
          "Pilgrim through this barren land;",
          "I am weak, but Thou art mighty;",
          "Hold me with Thy powerful hand:",
          "Bread of heaven, Bread of heaven,",
          "Feed me till I want no more."
        ],
        [
          "Open now the crystal fountain,",
          "Whence the healing stream doth flow;",
          "Let the fiery, cloudy pillar",
          "Lead me all my journey through:",
          "Strong Deliverer, strong Deliverer,",
          "Be Thou still my strength and shield."
        ],
        [
          "When I tread the verge of Jordan,",
          "Bid my anxious fears subside;",
          "Death of death, and hell’s destruction,",
          "Land me safe on Canaan’s side:",
          "Songs of praises, songs of praises",
          "I will ever give to Thee."
        ]
      ],
    },
    {
      number: "MHB 948",
      title: "Abide With Me; Fast Falls the Eventide",
      book: "MHB",
      verses: [
        [
          "Abide with me: fast falls the eventide;",
          "The darkness deepens; Lord, with me abide:",
          "When other helpers fail, and comforts flee,",
          "Help of the helpless, O abide with me."
        ],
        [
          "Swift to its close ebbs out life’s little day;",
          "Earth’s joys grow dim, its glories pass away;",
          "Change and decay in all around I see:",
          "O Thou who changest not, abide with me."
        ],
        [
          "I need Thy presence every passing hour;",
          "What but Thy grace can foil the tempter’s power?",
          "Who like Thyself my guide and stay can be?",
          "Through cloud and sunshine, Lord, abide with me."
        ],
        [
          "Hold Thou Thy cross before my closing eyes;",
          "Shine through the gloom, and point me to the skies:",
          "Heaven’s morning breaks, and earth’s vain shadows flee:",
          "In life, in death, O Lord, abide with me."
        ]
      ],
    },
    {
      number: "MHB 528",
      title: "A Charge to Keep I Have",
      book: "MHB",
      verses: [
        [
          "A charge to keep I have,",
          "A God to glorify;",
          "A never-dying soul to save,",
          "And fit it for the sky:"
        ],
        [
          "To serve the present age,",
          "My calling to fulfill;",
          "O may it all my powers engage",
          "To do my Master’s will!"
        ],
        [
          "Arm me with jealous care,",
          "As in Thy sight to live;",
          "And O! Thy servant, Lord, prepare",
          "A strict account to give!"
        ],
        [
          "Help me to watch and pray,",
          "And on Thyself rely;",
          "Assured, if I my trust betray,",
          "I shall for ever die."
        ]
      ],
    },
  ] as Hymn[],

  galleryPhotos: [
    {
      id: "photo-1",
      src: "/images/cover/memorial.webp",
      alt: "Memorial portrait of Ex-WO1 Emmanuel Kofi Kpodogui",
      title: "Memorial Official Portrait",
      category: "traditional",
      year: "2026",
    },
    {
      id: "photo-2",
      src: "/images/gallery/photo-2.jpg",
      alt: "Ex-WO1 Kpodogui in military regalia",
      title: "Regimental Service at Burma Camp",
      category: "military",
      year: "1988",
    },
    {
      id: "photo-3",
      src: "/images/gallery/photo-3.jpg",
      alt: "Comrades salute and peace mission",
      title: "UN Peacekeeping Mission Deployment",
      category: "military",
      year: "1994",
    },
    {
      id: "photo-4",
      src: "/images/gallery/photo-4.jpg",
      alt: "Family celebration with Mrs. Kpodogui and children",
      title: "Family Celebration & Milestones",
      category: "family",
      year: "2005",
    },
    {
      id: "photo-5",
      src: "/images/gallery/photo-5.jpg",
      alt: "Warrant Officer Class 1 Promotion ceremony",
      title: "Elevation to Ex-WO1 Rank",
      category: "military",
      year: "1998",
    },
    {
      id: "photo-6",
      src: "/images/gallery/photo-6.jpg",
      alt: "Grandchildren gathering around Grandpa",
      title: "Golden Years with Grandchildren",
      category: "golden",
      year: "2022",
    },
  ] as GalleryPhoto[],

  faqs: [
    {
      question: "What is the dress code for the service?",
      answer: "Saturday 24th October: Black & White attire or formal Military blues. Sunday 25th October: All White attire for the Thanksgiving service.",
    },
    {
      question: "Where is the Garrison Church located inside Burma Camp?",
      answer: "The Garrison Methodist and Presbyterian Church (GMPC) is located centrally within Burma Camp, Accra, accessible via the main Burma Camp entrance or 37 Military Hospital corridor.",
    },
    {
      question: "Are civilian guests permitted entry into Burma Camp?",
      answer: "Yes, attendees arriving for the funeral service of Ex-WO1 Emmanuel Kofi Kpodogui will be facilitated at the military gates. Please have an ID ready if requested by military police sentries.",
    },
  ],
};
