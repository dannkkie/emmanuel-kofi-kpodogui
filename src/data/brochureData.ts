export interface OfficiatingMinister {
  name: string;
  role: string;
  denomination?: string;
}

export interface Hymn {
  id: string;
  title: string;
  number?: string;
  tune?: string;
  stanzas: string[];
}

export interface ServiceEvent {
  time?: string;
  title: string;
  person?: string;
  description?: string;
  hymnId?: string;
  isMilitaryRite?: boolean;
}

export interface Tribute {
  id: string;
  author: string;
  relationship: "Widow & Children" | "Grandchildren" | "Ghana Armed Forces" | "Family" | "Church & Friends";
  roleTitle?: string;
  quote: string;
  content: string;
  date?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: "Memorial" | "Military" | "Tradition" | "Family";
}

export interface BrochureData {
  honoree: {
    rank: string;
    fullName: string;
    surname: string;
    forenames: string;
    alias: string;
    birthYear: number;
    deathYear: number;
    motto: string;
    subMotto: string;
    photoUrl: string;
    qrCodeUrl: string;
    pdfDownloadUrl: string;
  };
  service: {
    dateDisplay: string;
    dateIso: string;
    startTime: string;
    endTime: string;
    venueName: string;
    venueAddress: string;
    venueCity: string;
    venueCoordinates: { lat: number; lng: number };
    mapsUrl: string;
    directionsNote: string;
    calendarDetails: {
      title: string;
      description: string;
      googleCalendarUrl: string;
    };
  };
  officiatingClergy: OfficiatingMinister[];
  hymns: Record<string, Hymn>;
  orderOfService: {
    part1: {
      title: string;
      subtitle: string;
      events: ServiceEvent[];
    };
    part2: {
      title: string;
      subtitle: string;
      events: ServiceEvent[];
    };
    militaryRites: {
      title: string;
      events: ServiceEvent[];
    };
  };
  biography: {
    introduction: string;
    sections: {
      heading: string;
      body: string[];
    }[];
    militaryService: {
      rankAchieved: string;
      branch: string;
      serviceYears: string;
      headquarters: string;
      decorations: string[];
      values: string[];
    };
  };
  tributes: Tribute[];
  gallery: GalleryPhoto[];
}

export const brochureData: BrochureData = {
  honoree: {
    rank: "Ex-WO1",
    fullName: "Emmanuel Kofi Kpodogui",
    surname: "KPODOGUI",
    forenames: "Emmanuel Kofi",
    alias: "AGO DIE",
    birthYear: 1954,
    deathYear: 2026,
    motto: "FOREVER IN OUR HEARTS",
    subMotto: "IN LOVING MEMORY",
    photoUrl: "/images/brochure-cover-hq.webp",
    qrCodeUrl: "/images/qr-code.webp",
    pdfDownloadUrl: "/web-brochure.pdf",
  },
  service: {
    dateDisplay: "Saturday 24th October, 2026",
    dateIso: "2026-10-24",
    startTime: "08:00 AM",
    endTime: "01:00 PM",
    venueName: "Garrison Methodist and Presbyterian Church",
    venueAddress: "Burma Camp",
    venueCity: "Accra, Ghana",
    venueCoordinates: { lat: 5.5898, lng: -0.1611 },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Garrison+Methodist+and+Presbyterian+Church+Burma+Camp+Accra+Ghana",
    directionsNote:
      "Located inside Burma Camp, the central military headquarters in Accra. Please enter through Burma Camp main security gates. Protocol officers will be stationed to guide mourners and guests.",
    calendarDetails: {
      title: "Funeral & Burial Service: Ex-WO1 Emmanuel Kofi Kpodogui (Ago Die)",
      description:
        "Celebrating the life, military service, and eternal legacy of Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026). Garrison Methodist and Presbyterian Church, Burma Camp.",
      googleCalendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Funeral+Service+for+Ex-WO1+Emmanuel+Kofi+Kpodogui+(Ago+Die)&dates=20261024T080000Z/20261024T130000Z&details=In+Loving+Memory+of+Ex-WO1+Emmanuel+Kofi+Kpodogui+(1954-2026).+Garrison+Methodist+and+Presbyterian+Church,+Burma+Camp,+Accra.&location=Garrison+Methodist+and+Presbyterian+Church,+Burma+Camp,+Accra,+Ghana",
    },
  },
  officiatingClergy: [
    { name: "Rev. (Col.) D. O. Mensah", role: "Director of Religious Affairs, GAF", denomination: "Presbyterian" },
    { name: "Rev. (Lt. Col.) K. Asante", role: "Resident Chaplain (Methodist)", denomination: "Methodist" },
    { name: "Very Rev. E. K. Boateng", role: "Presiding Minister", denomination: "Presbyterian" },
    { name: "WO1 (Chaplain) S. K. Dogbe", role: "Military Chaplain / Protocol", denomination: "Armed Forces" },
  ],
  hymns: {
    "abide-with-me": {
      id: "abide-with-me",
      title: "Abide With Me",
      number: "MHB 948 / PH 792",
      tune: "Eventide",
      stanzas: [
        "Abide with me: fast falls the eventide;\nThe darkness deepens; Lord, with me abide.\nWhen other helpers fail and comforts flee,\nHelp of the helpless, O abide with me.",
        "Swift to its close ebbs out life’s little day;\nEarth’s joys grow dim, its glories pass away;\nChange and decay in all around I see—\nO Thou who changest not, abide with me.",
        "I need Thy presence every passing hour;\nWhat but Thy grace can foil the tempter’s power?\nWho like Thyself my guide and stay can be?\nThrough cloud and sunshine, Lord, abide with me.",
        "I fear no foe, with Thee at hand to bless;\nIlls have no weight, and tears no bitterness.\nWhere is death’s sting? Where, grave, thy victory?\nI triumph still, if Thou abide with me.",
        "Hold Thou Thy cross before my closing eyes;\nShine through the gloom and point me to the skies.\nHeaven’s morning breaks, and earth’s vain shadows flee;\nIn life, in death, O Lord, abide with me.",
      ],
    },
    "guide-me": {
      id: "guide-me",
      title: "Guide Me, O Thou Great Jehovah",
      number: "MHB 615 / PH 420",
      tune: "Cwm Rhondda",
      stanzas: [
        "Guide me, O Thou great Jehovah,\nPilgrim through this barren land;\nI am weak, but Thou art mighty;\nHold me with Thy powerful hand:\nBread of heaven, Bread of heaven,\nFeed me till I want no more.",
        "Open now the crystal fountain,\nWhence the healing stream doth flow;\nLet the fire and cloudy pillar\nLead me all my journey through:\nStrong Deliverer, strong Deliverer,\nBe Thou still my strength and shield.",
        "When I tread the verge of Jordan,\nBid my anxious fears subside;\nDeath of death, and hell’s Destruction,\nLand me safe on Canaan’s side:\nSongs of praises, songs of praises\nI will ever give to Thee.",
      ],
    },
    "through-all-the-changing": {
      id: "through-all-the-changing",
      title: "Through All the Changing Scenes of Life",
      number: "MHB 427 / PH 51",
      tune: "Wiltshire",
      stanzas: [
        "Through all the changing scenes of life,\nIn trouble and in joy,\nThe praises of my God shall still\nMy heart and tongue employ.",
        "Of His deliverance I will boast,\nTill all that are distressed\nFrom my example comfort take,\nAnd charm their griefs to rest.",
        "O magnify the Lord with me,\nWith me exalt His name;\nWhen in distress to Him I called,\nHe to my rescue came.",
        "Fear Him, ye saints, and you will then\nHave nothing else to fear;\nMake you His service your delight,\nYour wants shall be His care.",
      ],
    },
    "rock-of-ages": {
      id: "rock-of-ages",
      title: "Rock of Ages, Cleft for Me",
      number: "MHB 498 / PH 258",
      tune: "Redhead No. 76",
      stanzas: [
        "Rock of Ages, cleft for me,\nLet me hide myself in Thee;\nLet the water and the blood,\nFrom Thy riven side which flowed,\nBe of sin the double cure,\nCleanse me from its guilt and power.",
        "Not the labors of my hands\nCan fulfill Thy law’s demands;\nCould my zeal no respite know,\nCould my tears forever flow,\nAll for sin could not atone;\nThou must save, and Thou alone.",
        "Nothing in my hand I bring,\nSimply to the cross I cling;\nNaked, come to Thee for dress;\nHelpless, look to Thee for grace;\nFoul, I to the fountain fly;\nWash me, Saviour, or I die.",
        "While I draw this fleeting breath,\nWhen mine eyes shall close in death,\nWhen I soar to worlds unknown,\nSee Thee on Thy judgment throne,\nRock of Ages, cleft for me,\nLet me hide myself in Thee.",
      ],
    },
  },
  orderOfService: {
    part1: {
      title: "Pre-Service & Liturgical Programme",
      subtitle: "Garrison Methodist and Presbyterian Church, Burma Camp",
      events: [
        { time: "07:30 AM", title: "Arrival of Mourners, Sympathizers & GAF Representatives", description: "Filing past and paying of last respects" },
        { time: "08:15 AM", title: "Burial Rites & Final Viewing by Family", description: "Closing of the casket" },
        { time: "08:30 AM", title: "Processional Hymn", hymnId: "abide-with-me", description: "Clergy, Bearer Party & Family enter the sanctuary" },
        { time: "08:45 AM", title: "Opening Sentences & Prayers", person: "Resident Chaplain" },
        { time: "09:00 AM", title: "Hymn of Adoration", hymnId: "guide-me", description: "Congregational singing" },
        { time: "09:15 AM", title: "First Scripture Reading", description: "Psalm 23 (The Lord is My Shepherd)", person: "Grandchild" },
        { time: "09:25 AM", title: "Second Scripture Reading", description: "1 Corinthians 15:50-58", person: "Military Colleague" },
      ],
    },
    part2: {
      title: "Tributes, Exhortation & Commendation",
      subtitle: "Sanctuary Celebrations",
      events: [
        { time: "09:40 AM", title: "Reading of the Biography", description: "The Life & Service of Ex-WO1 Emmanuel Kofi Kpodogui" },
        { time: "09:55 AM", title: "Tribute by Widow & Children", description: "Reflections on a devoted husband and caring father" },
        { time: "10:15 AM", title: "Tribute by the Ghana Armed Forces", description: "Honouring the discipline and career of Ex-WO1 Kpodogui" },
        { time: "10:30 AM", title: "Offertory Hymn", hymnId: "through-all-the-changing" },
        { time: "10:45 AM", title: "Sermon / Exhortation", person: "Presiding Chaplain" },
        { time: "11:15 AM", title: "Prayer of Thanksgiving & Intercession", person: "Clergy" },
        { time: "11:30 AM", title: "Dead March in Saul & Recessional Hymn", hymnId: "rock-of-ages" },
      ],
    },
    militaryRites: {
      title: "Ghana Armed Forces Military Honours",
      events: [
        { title: "Escort & Bearer Party", description: "The casket is mounted on the gun carriage with senior Warrant Officers as pallbearers.", isMilitaryRite: true },
        { title: "Sounding of The Last Post", description: "Buglers sound 'The Last Post' signifying the soldier has completed his watch and duty on earth.", isMilitaryRite: true },
        { title: "One Minute of Silent Homage", description: "Solemn silence observed by troops, officers, veterans, and mourners.", isMilitaryRite: true },
        { title: "Sounding of The Reveille", description: "The morning bugle call sounding the soldier’s awakening into eternal life and glory.", isMilitaryRite: true },
        { title: "Folding & Presentation of the National Flag", description: "The Ghana National Flag and Regimental Headdress are presented to the widow and family with the nation's gratitude.", isMilitaryRite: true },
      ],
    },
  },
  biography: {
    introduction:
      "A life defined by unwavering duty, exemplary military discipline, boundless warmth, and devotion to family. Ex-WO1 Emmanuel Kofi Kpodogui walked through this world as a pillar of strength, fondly called 'Ago Die' by comrades, family, and lifelong companions.",
    sections: [
      {
        heading: "Early Life & Formative Years (1954)",
        body: [
          "Emmanuel Kofi Kpodogui was born in 1954 into a proud and respected family. From his youth, Kofi demonstrated profound maturity, sharp intelligence, and an innate sense of justice and leadership that set him apart among his peers.",
          "Growing up, his deep respect for community elders, strong Christian foundations, and athletic discipline shaped his trajectory toward serving his nation with courage and distinction.",
        ],
      },
      {
        heading: "Distinguished Career in the Ghana Armed Forces",
        body: [
          "Drawn to selfless national service, Emmanuel enlisted into the Ghana Armed Forces (GAF). Through tireless grit, professional competence, and remarkable integrity, he steadily rose through the ranks to the revered non-commissioned summit of Warrant Officer Class 1 (Ex-WO1).",
          "Stationed at Burma Camp and various vital operational commands, WO1 Kpodogui was known as a firm, compassionate disciplinarian. He mentored generations of young soldiers, instilling in them the tenets of honor, loyalty, and pride in the colors of the Republic of Ghana.",
          "His military records reflect exemplary conduct, unblemished leadership during national assignments, and the respect of both superior commissioned officers and subordinates alike.",
        ],
      },
      {
        heading: "The Man 'Ago Die' — Wit, Loyalty & Community Pillar",
        body: [
          "Beyond the military uniform and ceremonial drill grounds, Emmanuel was affectionately hailed as 'Ago Die'. The moniker encapsulated his charismatic presence—an elder whose arrival brought energy, laughter, and calm reassurance.",
          "He was an active member of the Garrison Methodist and Presbyterian fellowship at Burma Camp, serving faithfully in church activities and offering wise counsel in dispute settlements within his extended family and neighborhood.",
        ],
      },
      {
        heading: "A Devoted Family Patriarch",
        body: [
          "Emmanuel was a loving, protective husband and an exemplary father. He instilled high academic ambition, humility, and moral rectitude into his children and grandchildren.",
          "Even in retirement, his home remained a beacon of hospitality where no visitor left hungry or unencouraged. His laughter, firm handshake, and wise parables will echo in our hearts forever.",
        ],
      },
    ],
    militaryService: {
      rankAchieved: "Warrant Officer Class 1 (WO1 / Ex-WO1)",
      branch: "Ghana Armed Forces (GAF)",
      serviceYears: "Decades of Distinguished Meritorious Service",
      headquarters: "Burma Camp, Accra",
      decorations: ["Long Service and Good Conduct Medal", "Peacekeeping Service Medals", "Meritorious Service Awards"],
      values: ["Discipline", "Patriotism", "Honor", "Integrity", "Comradeship"],
    },
  },
  tributes: [
    {
      id: "widow",
      author: "Mrs. Kpodogui",
      relationship: "Widow & Children",
      roleTitle: "Beloved Wife",
      quote: "You were my rock, my protector, and the gentlest giant of my life.",
      content:
        "Emmanuel, life with you was a blessing of security, profound love, and shared laughter. You stood by me through every storm with the unyielding strength of a soldier and the tender heart of a soulmate. I thank God for every year He gave us together. Sleep peacefully, my dearest Kofi, until we meet in glory.",
      date: "October 2026",
    },
    {
      id: "children",
      author: "The Children",
      relationship: "Widow & Children",
      roleTitle: "Sons & Daughters",
      quote: "Daddy taught us that honor is not given—it is earned every day through honesty and hard work.",
      content:
        "Growing up under your roof was the greatest school of life. You balanced military precision with warm fatherly embrace. You sacrificed without complaint to ensure we went to the finest schools and walked with our heads held high. Thank you for leaving us an unblemished name. Rest well, Daddy 'Ago Die'!",
      date: "October 2026",
    },
    {
      id: "grandchildren",
      author: "The Grandchildren",
      relationship: "Grandchildren",
      roleTitle: "Grandkids",
      quote: "Grandpa’s smile lit up every room, and his stories took us around the world.",
      content:
        "Grandpa was our superhero. He always had a special treat tucked away for us and loved watching us play. We will miss your salute, your warm hugs, and hearing you call us with your cheerful voice. We promise to make you proud every single day in school and in life.",
      date: "October 2026",
    },
    {
      id: "gaf-colleagues",
      author: "Warrant Officers & GAF Veterans Association",
      relationship: "Ghana Armed Forces",
      roleTitle: "Comrades-in-Arms, Burma Camp",
      quote: "A soldier’s soldier. Ex-WO1 Kpodogui stood firm on the drill square and in life.",
      content:
        "WO1 Kpodogui exemplified the true spirit of the Ghana Armed Forces—steadfast loyalty, quiet dignity, and fatherly mentorship to young recruits. On foreign peacekeeping duties and at home inside Burma Camp, he was dependable to the last detail. The Warrant Officers' Mess has lost a true stalwart. Ex-WO1 Emmanuel Kofi Kpodogui, we salute you! Stand down, Senior; your tour of duty is accomplished.",
      date: "October 2026",
    },
    {
      id: "church-fellowship",
      author: "Garrison Methodist & Presbyterian Church Fellowship",
      relationship: "Church & Friends",
      roleTitle: "GMPC Council & Men's Fellowship",
      quote: "Blessed are the peacemakers, for they shall be called the children of God.",
      content:
        "Bro. Emmanuel was a faithful worshipper who loved God and respected the sanctuary. His regular presence in the garrison pews, his generous contributions, and his hearty singing of the great hymns of faith were an encouragement to the entire congregation. May the Lord grant him eternal rest in His heavenly paradise.",
      date: "October 2026",
    },
  ],
  gallery: [
    {
      id: "g1",
      src: "/images/brochure-cover-hq.webp",
      alt: "Memorial Portrait of Ex-WO1 Emmanuel Kofi Kpodogui in Traditional Funeral Cloth",
      caption: "Ex-WO1 Emmanuel Kofi Kpodogui draped in dignified Ghanaian traditional mourning cloth.",
      category: "Tradition",
    },
    {
      id: "g2",
      src: "/images/portrait-large.webp",
      alt: "Official Studio Portrait",
      caption: "The distinguished and gentle gaze of 'Ago Die'.",
      category: "Memorial",
    },
    {
      id: "g3",
      src: "/images/silhouette-isolated.webp",
      alt: "Military Service Salute Silhouette",
      caption: "A life of duty: Ex-WO1 saluting the national colors of the Ghana Armed Forces.",
      category: "Military",
    },
    {
      id: "g4",
      src: "/images/cloth-isolated.webp",
      alt: "Traditional Handwoven Kente Funeral Cloth",
      caption: "Intricate black-and-white handwoven mourning textiles symbolizing respect and farewell.",
      category: "Tradition",
    },
  ],
};
