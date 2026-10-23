export interface GalleryItem {
  url: string;
  alt: string;
  caption?: string;
  badge?: string;
}

export interface HowIBuiltItem {
  title: string;
  description: string;
}

export interface ResultMetric {
  label: string;
  value: string;
  description?: string;
}

export interface OptionalSection {
  title: string;
  content?: string;
  items?: string[];
  numberedItems?: string[];
  image?: {
    url: string;
    caption: string;
    alt?: string;
  };
  metrics?: ResultMetric[];
}

export interface Project {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  status?: string;
  oneLiner: string;
  overview: string;
  whyIBuiltThis: {
    problem: string;
    motivation: string;
    worthExploring?: string;
    keyPoints?: string[];
  };
  techStack: string[];
  howIBuiltThis: HowIBuiltItem[];
  resultsAchieved: {
    summary: string;
    metrics?: ResultMetric[];
    outcomes: string[];
  };
  links: {
    github?: string;
    demo?: string;
    prototype?: string;
    figma?: string;
    caseStudy?: string;
    behance?: string;
    paperOrPatent?: string;
  };
  gallery: GalleryItem[];
  webGallery?: GalleryItem[];
  appGallery?: GalleryItem[];
  bulletPoints?: string[];
  optionalSections?: OptionalSection[];

  // Backward compatibility fields
  summary?: string;
  role?: string;
  timeline?: string;
  tools?: string[];
  badge?: string;
  metrics?: string;
  description?: string;
  outcome?: string;
  githubUrl?: string;
  demoUrl?: string;
  problem?: {
    overview: string;
    points: string[];
  };
  roleAndConstraints?: {
    roleDesc: string;
    constraints?: string[];
    challenge?: string;
  };
  researchInsights?: string[];
  designDecisions?: {
    title: string;
    choice: string;
    alternativeRejected?: string;
    rationale: string;
  }[];
  designSolution?: {
    title: string;
    desc: string;
  }[];
  impactOrTakeaways?: {
    points: string[];
  };
}

export const projects: Project[] = [
  {
    order: 1,
    slug: "ablecircle",
    title: "AbleCircle",
    subtitle: "ID Caregivers Community Platform",
    category: "ID Caregivers Community Platform",
    date: "2026",
    status: "Case Study",
    bulletPoints: [
      "Documented AbleCircle’s startup journey through a UX case study covering research and ideation; surveyed 80+ parents and caregivers, with 87.5% supporting the concept, and gathered feedback from 5 NGO representatives to identify user needs and validate platform features.",
      "Designed 70+ high-fidelity screens across web and mobile in Figma, refining prototypes through 3 iterative design cycles based on parent and NGO stakeholder feedback, improving navigation, accessibility, and resource discovery, with user satisfaction increasing from 53% to 87% in usability evaluations.",
    ],
    oneLiner:
      "A trusted community platform centralizing peer support, verified therapists, resources, and NGO collaboration for caregivers of children with intellectual disabilities.",
    overview:
      "Documented AbleCircle’s startup journey through a UX case study covering research and ideation; surveyed 80+ parents and caregivers, with 87.5% supporting the concept, and gathered feedback from 5 NGO representatives to identify user needs and validate platform features. Designed 70+ high-fidelity screens across web and mobile in Figma, refining prototypes through 3 iterative design cycles based on parent and NGO stakeholder feedback, improving navigation, accessibility, and resource discovery, with user satisfaction increasing from 53% to 87% in usability evaluations.",
    whyIBuiltThis: {
      problem:
        "Caregivers and families of children with intellectual disabilities currently have to hunt through fragmented WhatsApp groups, random websites, NGOs, and unverified listings just to find therapists or daily advice. Managing critical healthcare workflows across five spreadsheets and twelve chat groups creates immense friction and emotional exhaustion.",
      motivation:
        "To replace chaotic, ad-hoc communication with one centralized, trusted digital ecosystem where parents can connect, access verified professionals without second-guessing legitimacy, and find real-world NGO support.",
      worthExploring:
        "Fragmented healthcare communities fail vulnerable families because trust is unverified. Building a dual-verification layer (UDID verification for caregivers and credential verification for healthcare providers) bridges digital peer connection with clinical credibility.",
      keyPoints: [
        "Fragmented Information: Caregivers juggle multiple spreadsheets and WhatsApp chats for basic therapy coordination.",
        "Unverified Listings: Parents struggle to verify whether service providers and therapists are authentic.",
        "Isolation: Families lack a dedicated, safe peer space designed specifically around intellectual disability care.",
      ],
    },
    techStack: [
      "Figma",
      "Canva",
      "Web Design",
      "App Design",
      "Wireframing",
      "UX Research",
    ],
    howIBuiltThis: [
      {
        title: "Peer Community & Discussion Spaces",
        description:
          "Designed dedicated community forums where parents and family caregivers can connect, exchange lived experiences, and ask questions in a supportive environment.",
      },
      {
        title: "Trust & Verification Layer",
        description:
          "Established distinct stakeholder verification workflows: ensuring only verified therapists with confirmed credentials appear in directories, alongside parent verification pathways (e.g., UDID-based checks).",
      },
      {
        title: "Therapist & Service Discovery",
        description:
          "Built intuitive search and filtering for parents to discover relevant, specialized therapists, clinic services, and caregiver support providers.",
      },
      {
        title: "NGO & Community Collaboration",
        description:
          "Integrated structured pathways for partner organizations like Samadhan NGO to host workshops, share curated care guides, and bridge digital tools with on-the-ground support.",
      },
    ],
    resultsAchieved: {
      summary:
        "Led product discovery and architecture at ViniBrawns Healthcare Solutions; secured an institutional seed grant (2026) with the caregiving ecosystem covered by a published patent application.",
      metrics: [
        { label: "Institutional Funding", value: "Seed Grant Awarded (2026)" },
        { label: "Intellectual Property", value: "Patent Application Filed" },
        { label: "Community Partner", value: "Samadhan NGO Integration" },
        { label: "Frontend Stack", value: "Next.js App Router + React 19" },
      ],
      outcomes: [
        "Secured institutional seed grant funding (2026) to advance product research and technical development.",
        "Caregiving ecosystem architecture filed and covered under a published patent application.",
        "Built responsive web platform with Next.js App Router, React 19, and Tailwind CSS v4.",
      ],
    },
    links: {
      github: "https://github.com/palakbhatt1/AbleCircle",
      caseStudy: "https://www.behance.net/gallery/251161157/Abilify-UIUX-Case-Study",
      behance: "https://www.behance.net/gallery/251161157/Abilify-UIUX-Case-Study",
    },
    gallery: [
      {
        url: "/projects/AbleCircle/ablecircle.svg",
        alt: "AbleCircle ID Caregivers Community Platform Case Study",
        caption: "AbleCircle comprehensive UX case study and high-fidelity screen architecture.",
        badge: "CASE STUDY & FIGMA",
      },
    ],
    optionalSections: [
      {
        title: "Core Ecosystem Features",
        items: [
          "Peer Community: Safe space for parents and caregivers to share routines and advice.",
          "Verified Resources: Curated directory of therapies, developmental guides, and workshops.",
          "Trust Verification: UDID validation for parents and credential checks for clinical therapists.",
          "Workshops & Events: Educational sessions organized in collaboration with Samadhan NGO.",
        ],
      },
    ],
    // Backward compatibility
    role: "Project Lead & Product Discovery",
    timeline: "2026",
    tools: ["Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "Figma"],
    badge: "Seed Grant Recipient · Patent Application Filed",
    metrics: "Seed Grant · Patent Filed",
    githubUrl: "https://github.com/palakbhatt1/AbleCircle",
    description:
      "A community platform centralizing peer support, verified therapists, and resources for caregivers of children with intellectual disabilities, eliminating scattered spreadsheets and unverified chat groups.",
    outcome:
      "Secured institutional seed grant funding (2026); ecosystem covered under a published patent application.",
  },
  {
    order: 2,
    slug: "antisoch",
    title: "AntiSoch",
    subtitle: "Anti-Harassment Community Platform",
    category: "Anti-Harassment Community Platform",
    date: "2025",
    status: "Figma",
    bulletPoints: [
      "Conducted UX research with 100+ respondents, primarily students, with 84% expressing interest in the anti-harassment community platform; identified key safety concerns and awareness gaps to inform design decisions.",
      "Designed 35+ high-fidelity screens in Figma, developing 2 distinct user journeys for children and adults with age-appropriate safety education, gamified learning for children, and accessible support resources for adults; refined prototypes through 3 feedback-driven iterations to improve usability",
    ],
    oneLiner:
      "A blended safety ecosystem combining age-differentiated mobile journeys, an AI-guided emotional support counsellor, and a hardware safety device for real-time emergency alerting.",
    overview:
      "Conducted UX research with 100+ respondents, primarily students, with 84% expressing interest in the anti-harassment community platform; identified key safety concerns and awareness gaps to inform design decisions. Designed 35+ high-fidelity screens in Figma, developing 2 distinct user journeys for children and adults with age-appropriate safety education, gamified learning for children, and accessible support resources for adults; refined prototypes through 3 feedback-driven iterations to improve usability.",
    whyIBuiltThis: {
      problem:
        "Personal safety still feels like a privilege. Victims of harassment often suffer in silence, lack early education about unsafe behavior, and have few platforms that proactively educate, emotionally support, and rapidly respond during danger. Existing tools are mostly reactive and fail to provide a safe, stigma-free space.",
      motivation:
        "To build an ecosystem that is proactive rather than purely reactive—teaching young children boundary awareness before harm occurs, offering adults confidential emotional support, and providing instantaneous one-touch emergency dispatch without needing to unlock a phone.",
      worthExploring:
        "Combining software-based psychological safety (separated age paths, anonymous sharing) with direct hardware triggers (pressure sensors, instant media capture) creates a holistic safety net.",
      keyPoints: [
        "Silent Suffering: Cultural stigmas and fear prevent victims from reporting harassment or seeking help.",
        "Reactive Gaps: Most safety tools only offer an SOS button without educational prevention or aftercare.",
        "Unlocking Delay: In physical crises, unlocking a smartphone and opening an app is often impossible.",
      ],
    },
    techStack: [
      "Figma",
      "UI/UX Design",
      "App Design",
      "Prototyping",
      "Canva",
      "UX Research",
    ],
    howIBuiltThis: [
      {
        title: "Differentiated Age-Based User Journeys",
        description:
          "Designed two distinct UX pathways: a gamified, friendly interface for minors teaching good touch / bad touch through illustrated scenarios, and a secure, anonymous community space for adults with zero identity-leakage risk.",
      },
      {
        title: "AI Emotional Support Counsellor",
        description:
          "Engineered conversation flows for a compassionate AI first-responder trained to guide users through distress, provide immediate grounding exercises, and offer warm handoffs to licensed mental health professionals.",
      },
      {
        title: "Patented Hardware Safety Device Integration",
        description:
          "Architected seamless Bluetooth pairing and trigger protocols for a wearable hardware device: featuring a 10-second buffer loop, pressure sensors, and one-touch covert SOS dispatch.",
      },
      {
        title: "Multi-Tier Emergency Dispatch",
        description:
          "Configured emergency workflows that instantly broadcast live GPS coordinates, ambient audio snippets, and alerts to designated emergency contacts, nearby verified volunteers, and local authorities.",
      },
    ],
    resultsAchieved: {
      summary:
        "Designed comprehensive multi-platform UX and system architecture addressing harassment across education, emotional support, and emergency hardware response.",
      metrics: [
        { label: "Target Demographics", value: "Minors (Under 18) & Adults (18+)" },
        { label: "Hardware Mechanism", value: "Pressure Sensor · 10s Buffer Loop" },
        { label: "Community Model", value: "Anonymous Peer Support & Counsellor" },
        { label: "Emergency Channels", value: "Contacts, Volunteers, Authorities" },
      ],
      outcomes: [
        "Delivered high-fidelity Figma prototypes for dual-demographic user journeys.",
        "Created trauma-informed UX guidelines for the AI emotional support counsellor.",
        "Mapped hardware-to-app telemetry for rapid, covert emergency alerting.",
        "Built comprehensive presentation design detailing the full protective ecosystem.",
      ],
    },
    links: {
      github: "https://github.com/palakbhatt1/AntiSoch-AntiHarassment-App",
      figma: "https://www.figma.com/design/oNVFLwxvr4OIb4FAvQIaqR/AppDev?node-id=0-1&t=lPwulGxHU5u2GBFT-1",
      prototype: "https://www.figma.com/design/oNVFLwxvr4OIb4FAvQIaqR/AppDev?node-id=0-1&t=lPwulGxHU5u2GBFT-1",
    },
    gallery: [
      {
        url: "/projects/antisoch/Home screen.svg",
        alt: "AntiSoch Mobile Island Adventure Home Screen",
        caption: "AntiSoch gamified child-safe learning dashboard with reassuring visual metaphors and scenario quest navigation.",
        badge: "MOBILE APP",
      },
      {
        url: "/projects/antisoch/Player Profile.svg",
        alt: "AntiSoch Player Profile & Badges",
        caption: "Child-safe user profile celebrating earned achievements and positive safety habits without social pressure.",
        badge: "PLAYER PROFILE",
      },
      {
        url: "/projects/antisoch/Safety Island.svg",
        alt: "Safety Island Quest Navigation & Boundary World",
        caption: "Safety Island world map guiding young users through age-appropriate boundary awareness milestones.",
        badge: "QUEST MAP",
      },
      {
        url: "/projects/antisoch/Backstory 1.svg",
        alt: "AntiSoch Narrative Backstory Introduction",
        caption: "Gentle narrative onboarding introducing characters and setting a trauma-informed, safe foundation.",
        badge: "STORY ONBOARDING",
      },
      {
        url: "/projects/antisoch/Backstory 2.svg",
        alt: "AntiSoch Interactive Story Journey",
        caption: "Illustrated scenario storytelling teaching bodily autonomy and identifying unsafe situations.",
        badge: "BOUNDARY EDUCATION",
      },
      {
        url: "/projects/antisoch/Level 1-a.svg",
        alt: "AntiSoch Level 1 Scenario Choice",
        caption: "Level 1 scenario simulation where children practice recognizing subtle boundary violations.",
        badge: "SCENARIO QUEST",
      },
      {
        url: "/projects/antisoch/Level 1-c.svg",
        alt: "AntiSoch Level 1 Reassurance and Action Feedback",
        caption: "Supportive immediate feedback reassuring children that seeking help is always safe and right.",
        badge: "FEEDBACK LOOP",
      },
      {
        url: "/projects/antisoch/Level 2-a.svg",
        alt: "AntiSoch Level 2 Trusted Adult Communication Quest",
        caption: "Level 2 interactive quest teaching how to communicate uncomfortable moments to trusted guardians.",
        badge: "COMMUNICATION QUEST",
      },
    ],
    optionalSections: [
      {
        title: "Protective Ecosystem Modules",
        items: [
          "Minors Track: Interactive stories and quizzes teaching bodily autonomy and identifying unsafe situations.",
          "Adults Track: Anonymous peer forums, legal guidance, and confidential therapy resources.",
          "AI Counsellor: Conversational support with fallback escalation to licensed professionals.",
          "Hardware Device: Pressure sensor, buffer backup, and instant alerting without phone unlocking.",
          "Emergency Dispatch: Automated location and media sharing sent to contacts, police, and hospitals.",
        ],
      },
    ],
    // Backward compatibility
    role: "UI/UX & Interaction Design",
    timeline: "2025",
    tools: ["Figma", "UI/UX Design", "Interaction Design", "UX Research", "Prototyping"],
    badge: "Safe Digital Spaces · Hardware Integration",
    metrics: "Dual Audience UX",
    githubUrl: "https://github.com/palakbhatt1/AntiSoch-AntiHarassment-App",
    description:
      "A community-powered safety education, support, and emergency response ecosystem combining a mobile app (differentiated for minors and adults), an AI emotional support counsellor, and a patented hardware safety device.",
    outcome:
      "Designed differentiated user journeys for children and adults, translating distinct needs into interaction flows and emergency response architectures.",
  },
  {
    order: 3,
    slug: "simply-hemp",
    title: "Simply Hemp",
    subtitle: "Sustainable Startup Prototype · Hult Prize Campus Finalist",
    category: "Sustainable Startup Product Concept",
    date: "2024",
    status: "5th Place · Hult Prize OnCampus 2024",
    oneLiner:
      "High-fidelity interactive e-commerce prototype and lifecycle transparency experience for a sustainable hemp consumer product startup.",
    overview:
      "Developed as a startup concept that placed among the Top 5 teams at Hult Prize OnCampus 2024, Simply Hemp is a high-fidelity interactive prototype created in Figma. It bridges consumer skepticism about eco-friendly materials with verifiable sustainability: weaving carbon-offset metrics, water conservation calculators, and direct farming community traceability into product pages and checkout flows.",
    whyIBuiltThis: {
      problem:
        "Shoppers are increasingly skeptical of vague eco-friendly marketing claims ('greenwashing'), while supply-chain and material lifecycle data is typically buried in technical whitepapers rather than integrated into checkout, driving high cart abandonment on sustainable storefronts.",
      motivation:
        "To prove that sustainable direct-to-consumer commerce can combine high-polish editorial aesthetics with transparent, verifiable supply-chain data that builds immediate consumer trust and purchase intent.",
      worthExploring:
        "Making sustainability metrics tangible through interactive micro-visualizations directly alongside product specifications removes consumer skepticism.",
      keyPoints: [
        "Greenwashing Skepticism: Shoppers dismiss generic eco-friendly claims without concrete data.",
        "Buried Traceability: Sourcing info is locked in PDFs rather than integrated into checkout.",
        "Aesthetic Sacrifice: Eco-conscious brands frequently sacrifice digital polish, hurting conversion.",
      ],
    },
    techStack: [
      "Figma",
      "Web Design",
      "UI/UX Design",
      "Visual Design",
      "Prototyping",
      "Sustainable Business Modeling",
    ],
    howIBuiltThis: [
      {
        title: "Product Sourcing & Transparency Architecture",
        description:
          "Mapped agricultural supply chain data into customer-facing product specifications, displaying verifiable metrics like gallons of water saved per garment.",
      },
      {
        title: "Interactive E-Commerce Prototype",
        description:
          "Created modular component systems in Figma for product catalog browsing, responsive filtering, transparent cart totals, and frictionless checkout flows.",
      },
      {
        title: "Brand Identity & Design System",
        description:
          "Designed a warm, earthy visual identity featuring natural typography, high-contrast product imagery, and accessible color palettes reflecting sustainable values.",
      },
    ],
    resultsAchieved: {
      summary:
        "Designed and validated a sustainable e-commerce startup experience, placing 5th at Hult Prize OnCampus 2024 among competing university venture teams.",
      metrics: [
        { label: "Competition Result", value: "5th Place · Hult Prize OnCampus 2024" },
        { label: "Design Deliverable", value: "High-Fidelity Interactive Prototype" },
        { label: "Core Focus", value: "Supply Chain Transparency & UX" },
        { label: "Tooling", value: "Figma Component Architecture" },
      ],
      outcomes: [
        "Recognized among Top 5 venture pitches at Hult Prize OnCampus 2024.",
        "Constructed end-to-end interactive clickable prototype covering browsing to checkout.",
        "Integrated interactive ecological impact counters directly into product cards.",
      ],
    },
    links: {
      figma: "https://www.figma.com/design/KumukebploWpgwb7nmMUkP/SimplyHemp?node-id=151-72&t=vR0ahnjb6NTGm38u-1",
      prototype: "https://www.figma.com/design/KumukebploWpgwb7nmMUkP/SimplyHemp?node-id=151-72&t=vR0ahnjb6NTGm38u-1",
      caseStudy: "#",
    },
    gallery: [
      {
        url: "/projects/simplyhemp/login.svg",
        alt: "Simply Hemp Customer Account Login",
        caption: "Minimalist, welcoming sign-in and account flow designed to minimize cart drop-off.",
        badge: "CUSTOMER LOGIN",
      },
      {
        url: "/projects/simplyhemp/homepage.svg",
        alt: "Simply Hemp E-Commerce Storefront Editorial Homepage",
        caption: "Simply Hemp high-polish editorial homepage with Pay Day Sale promotion and organic sustainable aesthetics.",
        badge: "STOREFRONT HOMEPAGE",
      },
      {
        url: "/projects/simplyhemp/about_us.svg",
        alt: "Simply Hemp About Us & Sustainable Craftsmanship",
        caption: "Brand story highlighting ethical sourcing, organic materials, and environmental responsibility.",
        badge: "ABOUT THE BRAND",
      },
      {
        url: "/projects/simplyhemp/speciality_bags.svg",
        alt: "Simply Hemp Specialty Bags Collection",
        caption: "Curated catalog layout showcasing eco-friendly handcrafted hemp bags with transparent material lifecycle data.",
        badge: "SPECIALTY COLLECTION",
      },
      {
        url: "/projects/simplyhemp/Group 60.svg",
        alt: "Simply Hemp Interactive Impact Visualization & Checkout",
        caption: "Interactive environmental impact counters calculating water saved and carbon offset directly in the buyer journey.",
        badge: "IMPACT METRICS",
      },
    ],
    optionalSections: [
      {
        title: "Hult Prize Validation",
        items: [
          "Developed core user journeys and interactive prototype for university startup competition.",
          "Secured 5th place ranking at Hult Prize OnCampus 2024 for sustainable business modeling and UX.",
        ],
      },
    ],
    // Backward compatibility
    role: "Product & Visual Design",
    timeline: "2024",
    tools: ["Figma", "Web Design", "UI/UX Design", "Visual Design", "Prototyping"],
    badge: "5th Place · Hult Prize OnCampus 2024",
    metrics: "Hult Prize Finalist",
    description:
      "A sustainable consumer product startup concept developed into a high-fidelity interactive prototype in Figma, placing among the Top 5 teams at Hult Prize OnCampus 2024.",
    outcome:
      "Developed high-fidelity interactive prototype defining user flows, navigation, and core experience; placed 5th at Hult Prize OnCampus 2024.",
  },
  {
    order: 4,
    slug: "ustart",
    title: "UStart",
    subtitle: "Student Entrepreneurship & Incubation Platform",
    category: "UI/UX & Product Design",
    date: "2025",
    status: "Figma",
    bulletPoints: [
      "Designed 100+ high-fidelity wireframes and prototypes in Figma; developed 3 MVP iterations informed by user interviews and founder reviews, conducted 5+ competitor analyses and usability testing to refine user flows, validate design decisions, and improve interface usability.",
    ],
    oneLiner:
      "Designed 100+ high-fidelity wireframes and prototypes in Figma, developing 3 MVP iterations informed by user interviews and usability testing.",
    overview:
      "Designed 100+ high-fidelity wireframes and prototypes in Figma; developed 3 MVP iterations informed by user interviews and founder reviews, conducted 5+ competitor analyses and usability testing to refine user flows, validate design decisions, and improve interface usability.",
    whyIBuiltThis: {
      problem:
        "Student entrepreneurs face severe hurdles: startup resources are fragmented across academic portals, traditional accelerators are intimidatingly corporate, and founders struggle to balance deep desktop research with on-the-go progress tracking.",
      motivation:
        "To design an accessible, empowering digital incubator that guides young builders step-by-step—offering long-form editorial knowledge and program portals on web, paired with daily habits, mentor chats, and milestone milestones on mobile.",
      worthExploring:
        "Designing coherent dual-surface UX where web handles deep-focus editorial learning and comprehensive applications, while mobile drives high-frequency mentor interactions, quick milestone updates, and cohort notifications.",
      keyPoints: [
        "Information Fragmentation: Collegiate startup resources were spread across disparate university websites and PDFs.",
        "High Intimidation Factor: Traditional accelerators feel out-of-reach for first-time collegiate creators.",
        "Surface Specialization: Balancing desktop web depth for learning with mobile app agility for daily founder workflows.",
      ],
    },
    techStack: [
      "Figma",
      "UI/UX Design",
      "Wireframing",
      "Prototyping",
      "Usability Testing",
      "Competitor Analysis",
    ],
    howIBuiltThis: [
      {
        title: "Dual-Surface Experience Architecture",
        description:
          "Mapped student founder workflows across desktop and mobile, ensuring each surface serves its unique strength without feature bloat.",
      },
      {
        title: "3-Step Onboarding & Profile Customization (App)",
        description:
          "Architected an intuitive mobile onboarding journey assessing venture stage, industry interest, and co-founder needs.",
      },
      {
        title: "Editorial Knowledge Base & Blog Index (Web)",
        description:
          "Designed a responsive editorial hub featuring scannable founder essays, incubation guides, and curriculum checklists.",
      },
      {
        title: "Milestone Roadmaps & Mentor Matching (App)",
        description:
          "Created stage-gated venture trackers and direct mentor communication channels to keep student teams accountable and connected.",
      },
    ],
    resultsAchieved: {
      summary:
        "Delivered full high-fidelity Figma prototypes and scalable component systems covering both responsive web (Homepage, About Us, Blog Index, Blog Detail) and native mobile app surfaces.",
      metrics: [
        { label: "Surfaces Designed", value: "Web & Mobile App" },
        { label: "Target Audience", value: "Student Entrepreneurs" },
        { label: "Deliverable", value: "Figma Design System" },
        { label: "Timeline", value: "2025" },
      ],
      outcomes: [
        "Designed comprehensive desktop web experience covering Homepage, About Us, and Blog surfaces.",
        "Prototyped 6-screen mobile app covering onboarding flows, founder dashboards, and mentor messaging.",
        "Built cohesive design token system for typography, color hierarchies, and interactive buttons.",
      ],
    },
    links: {
      figma: "https://www.figma.com/design/LmEOXO3DvCDSm1RKi50hlp/UStart?node-id=0-1&t=ghsyXCk84upwyJkP-1",
      prototype: "https://www.figma.com/design/LmEOXO3DvCDSm1RKi50hlp/UStart?node-id=0-1&t=ghsyXCk84upwyJkP-1",
    },
    webGallery: [
      {
        url: "/projects/Ustart/Web/Homepage.svg",
        alt: "Ustart Web Homepage",
        caption: "Ustart high-conversion web landing experience with curated startup pathways and ecosystem discovery.",
        badge: "HOMEPAGE",
      },
      {
        url: "/projects/Ustart/Web/About_Us.svg",
        alt: "Ustart Web About Us",
        caption: "Mission, vision, and founder community story highlighting startup incubation resources.",
        badge: "ABOUT US",
      },
      {
        url: "/projects/Ustart/Web/blogs.svg",
        alt: "Ustart Web Blogs Index",
        caption: "Editorial knowledge hub and founder insights library for early-stage entrepreneurs.",
        badge: "BLOGS",
      },
      {
        url: "/projects/Ustart/Web/blog.svg",
        alt: "Ustart Web Article View",
        caption: "Long-form editorial reading experience optimized for knowledge retention and founder guides.",
        badge: "BLOG ARTICLE",
      },
    ],
    appGallery: [
      {
        url: "/projects/Ustart/App/onboarding_screen1.svg",
        alt: "Ustart App Onboarding Screen 1",
        caption: "Welcome and core value proposition introduction for aspiring student entrepreneurs.",
        badge: "ONBOARDING 1",
      },
      {
        url: "/projects/Ustart/App/onboarding_screen2.svg",
        alt: "Ustart App Onboarding Screen 2",
        caption: "Interactive interest selection matching founders with tailored startup cohorts.",
        badge: "ONBOARDING 2",
      },
      {
        url: "/projects/Ustart/App/onboarding_screen3.svg",
        alt: "Ustart App Onboarding Screen 3",
        caption: "Profile personalization and community guidelines setup before entering incubator spaces.",
        badge: "ONBOARDING 3",
      },
      {
        url: "/projects/Ustart/App/screen1.svg",
        alt: "Ustart App Screen 1",
        caption: "Student founder dashboard featuring active pitch tracks, mentor hours, and event schedules.",
        badge: "DASHBOARD",
      },
      {
        url: "/projects/Ustart/App/screen2.svg",
        alt: "Ustart App Screen 2",
        caption: "Venture incubation roadmap with stage-by-stage milestone tracker and peer review loops.",
        badge: "VENTURE TRACK",
      },
      {
        url: "/projects/Ustart/App/screen3.svg",
        alt: "Ustart App Screen 3",
        caption: "Direct mentor messaging and investor connect portal for student-led startups.",
        badge: "MENTOR CONNECT",
      },
    ],
    gallery: [
      {
        url: "/projects/Ustart/Web/Homepage.svg",
        alt: "Ustart Web Homepage",
        caption: "Ustart high-conversion web landing experience with curated startup pathways and ecosystem discovery.",
        badge: "HOMEPAGE",
      },
      {
        url: "/projects/Ustart/Web/About_Us.svg",
        alt: "Ustart Web About Us",
        caption: "Mission, vision, and founder community story highlighting startup incubation resources.",
        badge: "ABOUT US",
      },
      {
        url: "/projects/Ustart/Web/blogs.svg",
        alt: "Ustart Web Blogs Index",
        caption: "Editorial knowledge hub and founder insights library for early-stage entrepreneurs.",
        badge: "BLOGS",
      },
      {
        url: "/projects/Ustart/Web/blog.svg",
        alt: "Ustart Web Article View",
        caption: "Long-form editorial reading experience optimized for knowledge retention and founder guides.",
        badge: "BLOG ARTICLE",
      },
    ],
    optionalSections: [
      {
        title: "Platform Ecosystem Modules",
        items: [
          "Responsive Web Discovery: Accessible landing, vision, and comprehensive founder knowledge base.",
          "Mobile Onboarding Journey: Personalized intake flow segmenting founders into startup cohort stages.",
          "Milestone & Venture Roadmap: Visual progress tracking from ideation to seed validation.",
          "Direct Mentor Directory: Seamless messaging and office hour booking between student founders and advisors.",
        ],
      },
    ],
    role: "Product & UI/UX Design",
    timeline: "2025",
    tools: ["Figma", "UI/UX Design", "Interaction Design", "Prototyping", "Design Systems"],
    badge: "Web & Mobile Ecosystem · Figma Prototype",
    metrics: "Web & Mobile",
    description:
      "A dual-surface venture incubation and community platform for student founders, featuring a responsive web resource hub and a native mobile incubator application.",
    outcome:
      "Created complete high-fidelity Figma prototypes for responsive web and mobile app surfaces, establishing reusable component libraries.",
  },
  {
    order: 5,
    slug: "logiclens",
    title: "LogicLens",
    subtitle: "Local-First Code Dependency Topology & AI Blast-Radius Platform",
    category: "Code Intelligence & Multi-Agent Systems",
    date: "2026",
    status: "Local-First Desktop Platform · Open Source",
    oneLiner:
      "Local-first developer tool mapping multi-language codebases into Tree-sitter AST dependency graphs with ChromaDB semantic search and CrewAI what-if blast-radius simulations.",
    overview:
      "LogicLens is a zero-cloud desktop application (built with pywebview, Waitress, and Flask) that parses multi-language repositories using Tree-sitter into a local SQLite graph and persistent ChromaDB vector store. It enables developers to explore call hierarchies, run natural-language code search, track Git hotspots, scan heuristic security patterns, and simulate ripple effects of code changes using CrewAI and Groq LLMs.",
    whyIBuiltThis: {
      problem:
        "Modern developers inherit large, tightly coupled codebases where modifying a single utility function can trigger regressions across distant, unmapped modules. Meanwhile, static architecture diagrams quickly rot, and uploading proprietary codebases to cloud services introduces corporate IP compliance risks and high latency.",
      motivation:
        "To build a 100% local-first desktop application that gives developers immediate structural clarity and automated regression forecasting directly on their machine, without requiring external database servers or cloud code uploads.",
      worthExploring:
        "Combining deterministic abstract syntax trees (ASTs) stored in SQLite with probabilistic vector embeddings in ChromaDB creates a unified system that handles both syntactic accuracy (who calls what) and semantic code search.",
      keyPoints: [
        "Hidden Couplings: Modifying a function causes regressions in distant, unmapped files.",
        "Architecture Rot: Static documentation becomes obsolete as soon as pull requests merge.",
        "IP Compliance: Enterprise developers cannot upload proprietary repositories to third-party cloud tools.",
      ],
    },
    techStack: [
      "Python 3.10+",
      "Tree-sitter AST",
      "SQLite",
      "ChromaDB",
      "CrewAI",
      "Groq LLM",
      "pywebview",
      "Waitress",
      "Flask",
      "vis-network",
      "Tailwind CSS",
    ],
    howIBuiltThis: [
      {
        title: "Tree-sitter Multi-Language AST Parsing",
        description:
          "Extracts abstract syntax trees across Python (.py), JavaScript/JSX (.js, .jsx), TypeScript/TSX (.ts, .tsx), Java (.java), Go (.go), and C/C++ (.cpp, .cc, .h, .hpp) to map functions, classes, calls, and API routes into SQLite.",
      },
      {
        title: "Incremental File-Fingerprinting Engine",
        description:
          "Maintains an analysis manifest per collection tracking mtime_ns and file size. On subsequent runs, unchanged files are skipped entirely, avoiding full re-analysis and rebuilding only modified code.",
      },
      {
        title: "Per-Project ChromaDB Vector Semantic Search",
        description:
          "Assigns each analyzed repository root an isolated ChromaDB collection on local disk (ll_proj_<hash>), allowing natural-language code search without sending snippets off-machine.",
      },
      {
        title: "CrewAI + Groq What-If Blast Radius Simulation",
        description:
          "Streams predictive impact reports via Server-Sent Events (SSE), coordinating autonomous agents to analyze call hierarchies and forecast regression risk before pull requests merge.",
      },
    ],
    resultsAchieved: {
      summary:
        "Built a packaged, zero-cloud desktop application supporting 6+ programming language ecosystems with sub-second AST graph traversal, local vector search, and multi-agent what-if simulations.",
      metrics: [
        { label: "Language Support", value: "Python, JS, TS, Java, Go, C++" },
        { label: "Graph Storage", value: "Local SQLite (logiclens_graph.db)" },
        { label: "Vector Storage", value: "Local ChromaDB Collections" },
        { label: "Privacy Model", value: "100% Local-First (Zero Cloud DB)" },
      ],
      outcomes: [
        "Packaged into a standalone Windows desktop app using PyInstaller, Waitress, and pywebview.",
        "Implemented incremental mtime/size manifest detection to skip unchanged files on re-analysis.",
        "Engineered accessible UI with ARIA modals, keyboard focus rings, and dark glassmorphic styling.",
        "Released as an open-source tool on GitHub: shivin4/logiclens.",
      ],
    },
    links: {
      github: "https://github.com/shivin4/logiclens",
      demo: "https://shivin4.github.io/logiclens/",
    },
    demoUrl: "https://shivin4.github.io/logiclens/",
    gallery: [
      {
        url: "/projects/logiclens-1.jpg",
        alt: "LogicLens Interactive Dependency Graph and Blast Radius Report",
        caption: "LogicLens desktop interface with interactive dependency topology, CrewAI blast-radius panel, and vector code search.",
        badge: "TREE-SITTER & SQLITE",
      },
      {
        url: "/projects/project-agent-ide.jpg",
        alt: "LogicLens Multi-Agent What-If Architecture",
        caption: "CrewAI multi-agent reasoning flow simulating downstream ripple effects for proposed diffs.",
        badge: "CREWAI & GROQ",
      },
    ],
    optionalSections: [
      {
        title: "Architecture & Data On Disk",
        items: [
          "logiclens_graph.db (SQLite): Stores structural graph (nodes, edges, calls, dependencies) for the active project.",
          "chroma_data/ (ChromaDB): Stores persistent vector collections per project folder (ll_proj_<hash>) for semantic search.",
          "analysis_manifest_<collection>.json: Fingerprint manifest storing mtime_ns and size per file for incremental analysis.",
          "What-If Engine: Server-Sent Events (SSE) streaming insights from CrewAI agents and Groq Llama-3.",
        ],
      },
    ],
    // Backward compatibility
    role: "Core Architecture & DevEx Design",
    timeline: "2026",
    tools: [
      "Python",
      "Flask",
      "Tree-sitter",
      "SQLite",
      "ChromaDB",
      "CrewAI",
      "pywebview",
      "Waitress",
    ],
    badge: "Multi-Agent DevEx · Local-First",
    metrics: "Tree-sitter AST · CrewAI Agents",
    githubUrl: "https://github.com/shivin4/logiclens",
    description:
      "A local-first code intelligence platform that analyzes multi-language repositories, mapping functions, classes, API routes, and dependencies using Tree-sitter and SQLite, with ChromaDB semantic search and CrewAI impact analysis.",
    outcome:
      "Built a zero-cloud desktop application supporting 6+ languages with incremental file fingerprinting and multi-agent what-if simulations.",
  },
  {
    order: 6,
    slug: "claimxplain",
    title: "ClaimXplain",
    subtitle: "Multimodal Video Fact-Check & Explanation System",
    category: "Multimodal NLP & Fact Verification",
    date: "2026",
    status: "Fine-Tuned Mistral-7B · QLoRA",
    oneLiner:
      "End-to-end multimodal AI system that transcribes video audio, isolates fact-checkable claims with an NLTK heuristic engine, and verifies claims using ChromaDB and a fine-tuned 4-bit Mistral-7B model.",
    overview:
      "ClaimXplain extracts audio from local video uploads (.mp4, .mov), generates timestamped transcripts using Whisper, filters fact-checkable statements with a custom heuristic scoring algorithm, queries multi-hop context from ChromaDB, and delivers structured SUPPORTED or NOT_SUPPORTED verdicts with grounded 1-sentence explanations via fine-tuned Mistral-7B QLoRA.",
    whyIBuiltThis: {
      problem:
        "Fact-checking video content is bottlenecked by labor-intensive transcription and severe inference latency. Passing entire, raw conversational transcripts directly to LLMs causes massive context-window bloat and wastes tokens on conversational filler ('um', 'like', 'you know'), while base zero-shot models frequently hallucinate or fail structured output formats.",
      motivation:
        "To build a fast, reliable verification pipeline that runs locally on consumer GPUs (e.g., NVIDIA T4) without burning API credits on conversational noise, achieving 100% JSON schema adherence.",
      worthExploring:
        "Decoupling deterministic claim extraction (heuristic scoring) from generative verification (fine-tuned LLM) slashes downstream token consumption by over 60% while significantly boosting factual precision.",
      keyPoints: [
        "Audio Ingestion Overhead: Need automated, timestamped extraction directly from raw video media.",
        "Token Bloat: Conversational speech contains >60% non-factual filler words.",
        "Schema Brittleness: Base zero-shot LLMs fail strict JSON contracts required for automated pipelines.",
      ],
    },
    techStack: [
      "Python",
      "Mistral-7B (Instruct-v0.3)",
      "QLoRA (bitsandbytes 4-bit nf4)",
      "PEFT",
      "ChromaDB",
      "Whisper ASR",
      "NLTK",
      "Hugging Face",
      "Streamlit",
    ],
    howIBuiltThis: [
      {
        title: "Stage 1: Whisper ASR Audio Ingestion",
        description:
          "Extracts audio tracks from local .mp4/.mov uploads and processes them through an optimized Whisper speech-to-text pipeline with timestamped sentence segmentation.",
      },
      {
        title: "Stage 2: Deterministic Heuristic Claim Detection",
        description:
          "Uses NLTK sentence tokenization with a regex fallback. Scores candidate sentences by awarding points for empirical triggers ('causes', 'percent', 'million', 'cures', numbers, comparative adjectives) and penalizing short sentences (min_words=6) and questions. Sentences scoring >= 0.45 are flagged as verifiable claims.",
      },
      {
        title: "Stage 3: Multi-Hop ChromaDB Vector Retrieval",
        description:
          "Vectorizes candidate claims and queries top-3 multi-hop evidence passages from a pre-indexed ChromaDB instance populated with claims from the HoVer benchmark dataset.",
      },
      {
        title: "Stage 4: 4-bit Quantized Mistral-7B QLoRA Inference",
        description:
          "Fine-tuned Mistral-7B-Instruct-v0.3 on 26,171 claims with targeted attention projection LoRA adapters, guaranteeing structured SUPPORTED/NOT_SUPPORTED classification alongside a grounded 1-sentence explanation.",
      },
    ],
    resultsAchieved: {
      summary:
        "Fine-tuned Mistral-7B on 26,171 claims from the HoVer dataset using 4-bit QLoRA, achieving a 100% schema parsing success rate and demonstrable gains across accuracy, F1, ROUGE-L, and BLEU over baseline.",
      metrics: [
        { label: "Classification Accuracy", value: "69.6% (+13.4% vs 56.2%)" },
        { label: "Macro F1-Score", value: "67.9% (+11.8% vs 56.1%)" },
        { label: "ROUGE-L Score", value: "0.407 (+0.203 vs 0.204)" },
        { label: "BLEU Score", value: "0.247 (+0.206 vs 0.041)" },
      ],
      outcomes: [
        "100% JSON schema parsing rate achieved across all evaluation splits, eliminating structural hallucination.",
        "Model weights published on Hugging Face: iamnotpalak/claimxplain-hover-mistral7b-instructv0.3.",
        "Built interactive real-time Streamlit dashboard with live video ingestion and evidence inspection.",
        "Engineered conversational filler cleaning (FILLER_RE regex) to prevent Whisper transcript noise from triggering false claims.",
      ],
    },
    links: {
      github: "https://github.com/palakbhatt1/ClaimXplain-AI-FactCheck-System",
      demo: "https://drive.google.com/file/d/1OJePoMLj57h9q41-juMHZuKX9_UqJQbi/view?usp=drive_link",
    },
    gallery: [
      {
        url: "/projects/claimxplain-1.jpg",
        alt: "ClaimXplain Video Player and Fact-Check Verification",
        caption: "ClaimXplain dashboard showing timestamped transcript, ChromaDB evidence retrieval, and Mistral-7B verification verdict.",
        badge: "AI PIPELINE",
      },
      {
        url: "/projects/project-latent-vis.jpg",
        alt: "ChromaDB Multi-Hop Retrieval and Latent Space",
        caption: "Vector space visualization of multi-hop claim embeddings indexed in ChromaDB from the HoVer dataset.",
        badge: "CHROMADB",
      },
    ],
    optionalSections: [
      {
        title: "Engineering Decisions & Trade-offs",
        items: [
          "4-bit Quantization (bitsandbytes): Used nf4 quantization to run a 7B parameter model on consumer GPUs (NVIDIA T4). Trade-off: ~10-15% latency increase, but saves ~10GB VRAM.",
          "Heuristic vs LLM Extraction: Opted for an NLTK heuristic claim extractor instead of an LLM pass to save tokens and inference time, with the trade-off of potentially missing subtle implicit claims.",
          "Resiliency & Fallbacks: Integrated graceful fallback to Claude 3.5 API or pure heuristic keyword matching if GPU inference is unavailable.",
        ],
      },
    ],
    // Backward compatibility
    role: "AI Engineering & System Architecture",
    timeline: "2026",
    tools: ["Python", "Mistral-7B", "QLoRA", "ChromaDB", "Whisper", "Streamlit", "Hugging Face"],
    badge: "Fine-Tuned Mistral-7B · QLoRA",
    metrics: "26k Claims · 100% Schema Adherence",
    githubUrl: "https://github.com/palakbhatt1/ClaimXplain-AI-FactCheck-System",
    demoUrl: "https://drive.google.com/file/d/1OJePoMLj57h9q41-juMHZuKX9_UqJQbi/view?usp=drive_link",
    description:
      "An end-to-end multimodal AI system that extracts speech from video files, identifies fact-checkable claims using a heuristic scoring algorithm, retrieves multi-hop evidence via ChromaDB, and outputs structured verifications using a fine-tuned Mistral-7B QLoRA model.",
    outcome:
      "Fine-tuned Mistral-7B on 26,171 claims from the HoVer dataset with QLoRA. Improved accuracy from 56.2% to 69.6% (F1: 67.9%), achieved 100% JSON schema adherence, and published weights on Hugging Face.",
  },
  {
    order: 7,
    slug: "personapath",
    title: "PersonaPath",
    subtitle: "Multi-Modal Speech & Literacy Assessment AI",
    category: "Audio-Visual ML & Developmental Speech Analysis",
    date: "2026",
    status: "Multi-Modal AI Prototype · Open Source",
    oneLiner:
      "Two-phase multimodal AI system combining Wav2Vec 2.0 speech transcription, MobileNetV2 facial emotion recognition, and LSTM vocal confidence tracking with Claude API feedback.",
    overview:
      "PersonaPath is a multimodal assessment system designed to coach speaking and reading development across two distinct demographics: Phase 1 (Ages 5–10) as a Literacy Coach evaluating pronunciation alignment (Levenshtein distance), reading pace (WPM), and hesitation; and Phase 2 (Ages 10+) as a Presentation Pro analyzing facial affect and vocal delivery. Synchronized metrics are piped to Anthropic's Claude API to generate personalized coaching feedback in a Gradio dashboard.",
    whyIBuiltThis: {
      problem:
        "Traditional public speaking and reading assessments rely heavily on subjective human feedback or single-modality transcripts. Existing tools evaluate either text or audio in isolation, completely ignoring how facial expressions of confidence or anxiety correlate directly with vocal pacing, pauses, and articulation.",
      motivation:
        "To build an automated, accessible developmental coach capable of analyzing visual affect and acoustic metrics concurrently, delivering encouraging, data-backed guidance tailored to young learners and mature presenters.",
      worthExploring:
        "Fusing computer vision facial emotion recognition with acoustic time-series feature extraction and Levenshtein phoneme alignment provides a significantly more holistic picture of communicative confidence than audio-only models.",
      keyPoints: [
        "Subjective Evaluations: Students rarely receive standardized, objective metrics on pacing and hesitation.",
        "Isolated Channels: Transcripts do not capture vocal trembling, hesitation gaps, or anxious facial cues.",
        "Age-Specific Demographics: Children need literacy support; older students need presentation poise.",
      ],
    },
    techStack: [
      "Python",
      "PyTorch",
      "Wav2Vec 2.0 (facebook/wav2vec2-base-960h)",
      "MobileNetV2 (CNN)",
      "2-Layer LSTM (RNN)",
      "Librosa",
      "OpenCV",
      "Anthropic Claude API",
      "Gradio",
    ],
    howIBuiltThis: [
      {
        title: "Speech Recognition & Pronunciation Alignment",
        description:
          "Runs audio through fine-tuned facebook/wav2vec2-base-960h to transcribe speech, then applies Levenshtein string distance against target texts to calculate word-level accuracy, WPM pace, and pause hesitation counts.",
      },
      {
        title: "Facial Emotion Recognition via MobileNetV2",
        description:
          "Samples webcam video frames using OpenCV and classifies micro-expressions into 7 emotional categories (Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral) using a MobileNetV2 architecture trained on FER-2013.",
      },
      {
        title: "Acoustic Feature Extraction & LSTM Confidence Scorer",
        description:
          "Extracts 13 MFCC features, pitch (chroma), and root-mean-square energy over time using Librosa, feeding sequential feature vectors into a 2-layer LSTM to predict speaker confidence trajectories.",
      },
      {
        title: "Claude API Feedback & Gradio Interface",
        description:
          "Synthesizes multimodal metrics into structured prompt context for Claude 3.5, outputting constructive, personalized coaching feedback in an interactive Gradio UI.",
      },
    ],
    resultsAchieved: {
      summary:
        "Engineered and evaluated a dual-phase multimodal assessment system combining computer vision, audio processing, and LLM feedback with validated accuracy benchmarks across speech and affect.",
      metrics: [
        { label: "Emotion Model Accuracy", value: "62.6% Val Accuracy (FER-2013)" },
        { label: "Speech Model", value: "Wav2Vec 2.0 (facebook/wav2vec2-base-960h)" },
        { label: "Acoustic Architecture", value: "2-Layer LSTM (Hidden Dim: 64)" },
        { label: "Target Demographics", value: "Ages 5–10 (Literacy) & Ages 10+ (Poise)" },
      ],
      outcomes: [
        "Trained MobileNetV2 on FER-2013 dataset (28,709 train / 7,178 test images), achieving 62.6% validation accuracy.",
        "Engineered 2-layer LSTM acoustic predictor trained on LibriSpeech clean audio subsets for confidence tracking.",
        "Built Levenshtein pronunciation alignment flagging mispronounced words and pacing deviations.",
        "Integrated Claude API for dynamic, context-aware coaching advice displayed in an interactive Gradio app.",
      ],
    },
    links: {
      github: "https://github.com/palakbhatt1/PersonaPath-Literacy-Speech-Assessment",
    },
    gallery: [
      {
        url: "/projects/personapath-1.jpg",
        alt: "PersonaPath Dual-Phase Speech & Affect Assessment Interface",
        caption: "PersonaPath multimodal assessment dashboard analyzing facial affect, acoustic confidence, and reading accuracy.",
        badge: "PYTORCH & GRADIO",
      },
      {
        url: "/projects/project-ambient-audio.jpg",
        alt: "PersonaPath Acoustic Confidence Waveform",
        caption: "Acoustic feature extraction (MFCCs, pitch, pauses) mapped against speech time-series.",
        badge: "LIBROSA & WAV2VEC2",
      },
    ],
    optionalSections: [
      {
        title: "Dual-Demographic Phase Architecture",
        items: [
          "Phase 1: Literacy Coach (Ages 5–10): Evaluates pronunciation accuracy, reading pace (WPM), and hesitation pauses against target children's texts.",
          "Phase 2: Presentation Pro (Ages 10+): Tracks facial expressiveness, eye contact consistency, pitch variation, and vocal energy for public speaking.",
          "Teacher / Parent Portal: Aggregates longitudinal progress charts across reading and presentation milestones.",
        ],
      },
    ],
    // Backward compatibility
    role: "ML Engineer & Multi-Modal Architecture",
    timeline: "2026",
    tools: [
      "PyTorch",
      "Wav2Vec2",
      "MobileNetV2",
      "Librosa",
      "OpenCV",
      "Gradio",
      "Claude API",
    ],
    badge: "Computer Vision + Audio LSTM",
    metrics: "Dual-Phase ML · Affect & Speech",
    githubUrl: "https://github.com/palakbhatt1/PersonaPath-Literacy-Speech-Assessment",
    description:
      "A two-phase multi-modal AI system for literacy and presentation assessment, combining Wav2Vec2 transcription, Levenshtein pronunciation alignment, acoustic features (MFCC, pitch, pauses), and a fine-tuned MobileNetV2 emotion model.",
    outcome:
      "Trained MobileNetV2 on FER-2013 (62.6% validation accuracy), built 2-layer LSTM acoustic predictor on LibriSpeech, and deployed an interactive Gradio coaching dashboard powered by Claude API.",
  },
  {
    order: 8,
    slug: "pathwise",
    title: "PathWise",
    subtitle: "Exploring AI Reasoning through Evolving Maze Challenges",
    category: "Search Optimization & Fuzzy Reasoning",
    date: "2025",
    status: "Java AI Demonstration Game · Open Source",
    oneLiner:
      "Java-based AI demonstration game visualizing search algorithms (DFS, Best-First, A*) and Mamdani fuzzy combat logic in a dynamically mutating maze.",
    overview:
      "PathWise is a dynamic Java-based maze demonstration game set inside a grid environment that procedurally mutates every 20 seconds. It visualizes how different AI algorithms operate under uncertainty: enemy agents navigate using Depth-First Search (DFS) for deep patrol and Greedy Best-First Search for fast heuristic pursuit, player guidance is computed via A* Search, and combat encounters are resolved through Mamdani fuzzy inference curves (evaluating player mana and sword possession) rather than rigid win/lose conditionals.",
    whyIBuiltThis: {
      problem:
        "Traditional pathfinding and search algorithms are almost always taught and evaluated on static, predictable grids that fail to reflect real-world autonomous systems. Furthermore, rigid binary conditionals (if player has sword, win; else lose) fail to model the non-linear, probabilistic decision-making found in complex environments.",
      motivation:
        "To build an interactive, visual testbed where algorithm trade-offs under periodic topological mutations become immediately visible, and demonstrate how fuzzy logic provides continuous probability gradients for uncertain game decisions.",
      worthExploring:
        "Dynamic maze mutations expose the critical trade-offs between heuristic optimality (A*) and compute speed (Greedy Best-First) when precomputed paths are suddenly invalidated.",
      keyPoints: [
        "Static Benchmark Illusion: Real environments change during traversal, invalidating precomputed paths.",
        "Rigid Binary Logic: Hardcoded conditional branches fail to handle continuous probability gradients.",
        "Algorithmic Trade-offs: Visualizing DFS patrol versus Best-First pursuit in real time.",
      ],
    },
    techStack: [
      "Java 8+",
      "JFuzzyLogic (Fuzzy Inference Engine)",
      "Java Swing / AWT",
      "Multi-threading",
    ],
    howIBuiltThis: [
      {
        title: "Dynamic Maze Mutation Thread",
        description:
          "Runs an asynchronous background thread that mutates grid walls every 20 seconds, invalidating precomputed routes and forcing agents to dynamically recalculate paths.",
      },
      {
        title: "Search Algorithm Implementation",
        description:
          "Implemented Depth-First Search (DFS), Greedy Best-First Search, and A* Search with Manhattan distance heuristics to demonstrate path optimality versus compute overhead.",
      },
      {
        title: "Mamdani Fuzzy Inference Combat",
        description:
          "Defined fuzzy membership functions in FCL (Fuzzy Control Language) evaluating player mana (low, medium, high) and weapon states to output continuous combat win probabilities.",
      },
      {
        title: "Swing / AWT Game Loop",
        description:
          "Built a multi-threaded 2D rendering loop supporting maze grid sizes from 35x35 up to 90x90 with real-time algorithm state overlays.",
      },
    ],
    resultsAchieved: {
      summary:
        "Built and benchmarked an interactive Java game engine demonstrating multi-algorithm pathfinding resilience and continuous fuzzy combat resolution in dynamic environments.",
      metrics: [
        { label: "Algorithms Implemented", value: "DFS, Best-First, A*, Random Walk, DLS" },
        { label: "Mutation Cycle", value: "Procedural Grid Shift Every 20s" },
        { label: "Fuzzy Combat Engine", value: "JFuzzyLogic (Mamdani Inference)" },
        { label: "Supported Grid Scale", value: "35x35 to 90x90 Tiles" },
      ],
      outcomes: [
        "Implemented 5 distinct autonomous behaviors across player guidance and enemy AI.",
        "Engineered continuous probability combat system using Mamdani fuzzy inference curves.",
        "Visualized algorithm trade-offs under dynamic topological mutations in a 2D Swing engine.",
        "Open-sourced on GitHub: palakbhatt1/PathWise-Exploring-AI-Reasoning-through-Evolving-Maze-Challenges.",
      ],
    },
    links: {
      github:
        "https://github.com/palakbhatt1/PathWise-Exploring-AI-Reasoning-through-Evolving-Maze-Challenges",
    },
    gallery: [
      {
        url: "/projects/pathwise-1.jpg",
        alt: "PathWise Procedural Maze and Algorithm Exploration",
        caption: "PathWise dynamic maze game visualizing DFS, Greedy Best-First, and A* Search in a procedurally mutating grid.",
        badge: "JAVA & AWT",
      },
      {
        url: "/projects/project-latent-vis.jpg",
        alt: "PathWise Mamdani Fuzzy Inference Surface",
        caption: "Continuous probability surface computed via Mamdani fuzzy logic for combat outcomes.",
        badge: "JFUZZYLOGIC",
      },
    ],
    optionalSections: [
      {
        title: "Autonomous Agent Roles",
        items: [
          "Bumblebee (Depth-First Search): Patrols deep dead-ends systematically.",
          "Dino (Greedy Best-First Search): Fast pursuit using Manhattan distance heuristics.",
          "Zombie (Random Walk): Unpredictable baseline movement.",
          "Compass (A* Search): Computes the admissible shortest path to the center goal.",
          "Spell (Depth-Limited DFS): Clears enemies within a bounded search radius.",
        ],
      },
    ],
    // Backward compatibility
    role: "AI Algorithm Design & Development",
    timeline: "2025",
    tools: ["Java 8+", "JFuzzyLogic", "Java Swing / AWT", "Multi-threading"],
    badge: "Heuristic Search · Fuzzy Logic",
    metrics: "5 Search Algorithms · Dynamic Graph",
    githubUrl:
      "https://github.com/palakbhatt1/PathWise-Exploring-AI-Reasoning-through-Evolving-Maze-Challenges",
    description:
      "A dynamic Java AI demonstration game where mazes procedurally mutate every 20 seconds, enemies navigate using search algorithms (DFS, Best-First Search), and combat is resolved through JFuzzyLogic fuzzy inference.",
    outcome:
      "Implemented 5 search algorithms and Mamdani fuzzy combat logic in a multi-threaded Java game engine supporting 35x35 to 90x90 maze sizes.",
  },
];
