export interface Project {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  summary: string;
  category: string;
  role: string;
  timeline: string;
  tools: string[];
  badge?: string;
  metrics?: string;
  description: string;
  outcome: string;
  problem: {
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
    subtitle: "Intellectual Disability Caregivers Community & Care Ecosystem",
    summary:
      "Seed-grant-funded digital ecosystem for caregivers of individuals with intellectual disabilities; ecosystem covered by a published patent application.",
    category: "Caregiver Community Platform",
    role: "Lead Product Discovery & UI/UX Design",
    timeline: "2025 – 2026",
    tools: ["Figma", "User Research", "User Flows", "Prototyping"],
    badge: "Seed Grant Recipient · Published Patent Application",
    metrics: "₹2.5L Seed Grant · Patent Filed",
    description:
      "A caregiver-focused digital platform designed around the needs of individuals supporting people with intellectual disabilities. Features structured routines, caregiver community support, and assistive emergency flows.",
    outcome:
      "Seed grant awarded (2026). Caregiving ecosystem architecture covered under a published patent application. Provides caregivers of individuals with intellectual disabilities a dedicated, sensory-safe platform to coordinate daily routines, share behavioral logs, and access emergency protocols without cognitive overload.",
    problem: {
      overview:
        "Caregivers of individuals with intellectual disabilities (ID) face compounding structural friction:",
      points: [
        "Cognitive Exhaustion: 24/7 care schedules leave zero bandwidth for complex digital tools.",
        "Fragmented Logs: Medication updates, sensory triggers, and dietary notes are scattered across WhatsApp chats and physical notebooks.",
        "Privacy vs Peer Support: Families need advice from peers with similar diagnoses, but fear exposing vulnerable dependents' medical details in public groups.",
      ],
    },
    roleAndConstraints: {
      roleDesc:
        "Sole Product Designer & Discovery Lead. Owned user interviews, journey mapping, wireframing, high-fidelity prototypes in Figma, and usability reviews.",
      constraints: [
        "High emotional stakes: Cannot feel clinical or sterile, yet must avoid over-stimulating social media noise.",
        "Strict accessibility: WCAG AAA compliance, high contrast, readable type scales.",
        "Micro-sessions: Caregivers interact in short bursts under 2 minutes.",
      ],
    },
    researchInsights: [
      "The Under-2-Minute Window: Caregivers log notes while waiting at clinics or during brief pauses. All critical actions must be 1 to 2 taps away.",
      "Contextual Pseudonymity: Caregivers are willing to share candid challenges (behavioral meltdowns, puberty management) only when they can ask questions without linking their dependent's identity.",
      "Emergency Handoff Panic: When secondary helpers or respite workers step in, miscommunicating emergency steps creates immense anxiety.",
    ],
    designDecisions: [
      {
        title: "Decision 1: Low-Arousal Visual System",
        choice: "Soft neutral surfaces, muted slate accents, and generous whitespace.",
        alternativeRejected:
          "Standard colorful social feed with notification badges and auto-playing media.",
        rationale:
          "Vibrant colors and red badge counters raise stress levels during crisis moments.",
      },
      {
        title: "Decision 2: 1-Tap Emergency Care Card",
        choice:
          "Accessible offline emergency card reachable immediately from the top corner.",
        alternativeRejected:
          "Burying emergency info inside deep medical profile menus.",
        rationale:
          "In a crisis or sensory meltdown, caregivers or first responders have seconds to act.",
      },
      {
        title: "Decision 3: Scoped Care Rings",
        choice:
          "Distinct circles: Immediate Family, Care Providers, and Peer Forum.",
        alternativeRejected:
          "A single global profile with post-by-post privacy toggles.",
        rationale:
          "Healthcare routines require absolute privacy, whereas community tips can be open.",
      },
    ],
    impactOrTakeaways: {
      points: [
        "Institutional Seed Grant secured (2026).",
        "Ecosystem architecture covered under a published patent application.",
        "Next iteration: Voice-to-log transcription for hands-free documentation during active caregiving.",
      ],
    },
  },
  {
    order: 2,
    slug: "antisoch",
    title: "AntiSoch",
    subtitle: "Anti-Harassment Community Platform",
    summary:
      "Anti-harassment community platform translating distinct needs of children and adults into differentiated interaction flows and gamified safety education.",
    category: "Anti-Harassment Community Platform",
    role: "UI/UX & Interaction Design",
    timeline: "2025",
    tools: ["Figma", "Interaction Design", "UX Research", "Prototyping"],
    badge: "Safe Digital Spaces",
    metrics: "Dual Audience UX",
    description:
      "A safety-education and reporting platform with differentiated experiences for children and adults, creating safe environments to learn, report incidents, and access support resources.",
    outcome:
      "Engineered dual psychology-backed user journeys within a single platform—tailoring guidance, incident reporting, and gamified education for children versus adults.",
    problem: {
      overview:
        "Most harassment reporting tools are built for adults with bureaucratic legal terminology:",
      points: [
        "Legal and formal jargon frightens children and inhibits reporting.",
        "Children struggle to identify subtle boundary violations, cyberbullying, or manipulation.",
        "Adults require discreet legal aid and evidence journaling; children require reassurance, relatable visual language, and scenario practice.",
      ],
    },
    roleAndConstraints: {
      roleDesc:
        "UI/UX & Interaction Designer. Owned user journey mapping, interaction flows, scenario gamification, and Figma prototypes.",
      challenge:
        "Creating two completely distinct psychological experiences without fragmenting the underlying system.",
    },
    designDecisions: [
      {
        title: "Decision 1: Dual-Track Onboarding & Visual Tone",
        choice:
          "Child Flow: Warm, illustrative cards, clear visual metaphors ('Safe Circle', 'Boundary Rules'), and guided check-ins. Adult Flow: High-utility, discreet dark interface with rapid incident logging and direct legal / helpline connections.",
        alternativeRejected:
          "A single unified form that attempts to compromise between child and adult personas.",
        rationale:
          "Children need reassurance and scenario guidance; adults need rapid, confidential evidence gathering.",
      },
      {
        title: "Decision 2: Gamified Safety Education ('Scenario Quests')",
        choice:
          "Interactive scenario simulations where children make choices in simulated online and schoolyard moments with supportive feedback.",
        alternativeRejected: "Dry, text-heavy legal guideline documents.",
        rationale:
          "Immediate supportive feedback teaches boundary awareness without inducing fear or anxiety.",
      },
      {
        title: "Decision 3: Quick-Exit Safety Trigger",
        choice:
          "Persistent quick-exit toggle that instantly masks the screen into an ordinary utility widget (e.g. calculator) and clears local browser state.",
        alternativeRejected: "Standard browser tab close that leaves history intact.",
        rationale:
          "Ensures immediate physical privacy when vulnerable users are unexpectedly interrupted.",
      },
    ],
    impactOrTakeaways: {
      points: [
        "Sensitive reporting flows require deep psychological empathy and careful tone calibration.",
        "Next steps: Localized multilingual support for Tier 2 and Tier 3 communities across India.",
      ],
    },
  },
  {
    order: 3,
    slug: "simply-hemp",
    title: "Simply Hemp",
    subtitle: "Sustainable Startup Prototype",
    summary:
      "High-fidelity interactive product prototype and user experience for a sustainable hemp startup; awarded Top 5 at Hult Prize OnCampus 2024.",
    category: "Startup Product Concept",
    role: "Product & Visual Design",
    timeline: "2024",
    tools: ["Figma", "UI/UX Design", "Prototyping", "Visual Design"],
    badge: "5th Place · Hult Prize OnCampus 2024",
    metrics: "Hult Prize Finalist",
    description:
      "A sustainable consumer product startup concept developed into a high-fidelity interactive product prototype with consumer education and direct-to-consumer commerce flows.",
    outcome:
      "Secured 5th place among competitive university startup teams at Hult Prize OnCampus 2024 with a validated interactive prototype.",
    problem: {
      overview: "Sustainable materials face high consumer friction:",
      points: [
        "Shoppers are skeptical of vague eco-friendly marketing claims.",
        "Supply chain data is often buried in technical whitepapers rather than integrated into checkout.",
        "Eco-conscious storefronts frequently sacrifice digital polish, leading to high cart abandonment.",
      ],
    },
    designSolution: [
      {
        title: "Material Lifecycle Card",
        desc: "Interactive product module showing water footprint reduction and carbon-offset metrics alongside product specs.",
      },
      {
        title: "Transparent Checkout Flow",
        desc: "3-step checkout linking purchases directly to verified sustainable farming communities in India.",
      },
      {
        title: "Editorial Layout",
        desc: "Balanced organic warmth with structured, modern e-commerce interaction design.",
      },
    ],
    impactOrTakeaways: {
      points: [
        "Making sustainability metrics tangible through micro-visualizations directly increases purchase confidence.",
        "Rapid prototyping and user feedback cycles were decisive in securing Top 5 placement at Hult Prize.",
      ],
    },
  },
  {
    order: 4,
    slug: "logiclens",
    title: "LogicLens",
    subtitle: "Code Dependency Analyzer & Dev Experience Platform",
    summary:
      "A developer-focused product that helps engineering teams understand complex codebases through interactive dependency mapping, blast-radius impact analysis, and Git intelligence.",
    category: "Code Dependency Analyzer",
    role: "Product Design & Technical Architecture",
    timeline: "2024",
    tools: ["Figma", "Developer Experience", "AI Analysis", "Python", "Data Visualization"],
    badge: "Developer Tooling",
    metrics: "AI-Assisted DevEx",
    description:
      "A developer-focused product that helps engineering teams understand complex codebases through dependency mapping, blast-radius impact analysis, Git activity insights, and security auditing.",
    outcome:
      "Designed an intuitive developer experience for navigating dense enterprise repositories, reducing onboarding code comprehension time and surfacing dependency blast radiuses.",
    problem: {
      overview:
        "Modern engineering teams inherit massive monolithic or multi-service repositories with hidden couplings:",
      points: [
        "High Cognitive Overhead: Developers spend hours tracing function calls across unfamiliar modules.",
        "Fear of Breaking Changes: Changing a utility function often causes regressions in distant, unmapped services.",
        "Outdated Documentation: Architecture diagrams rot the moment a PR merges; teams lack live architectural visibility.",
      ],
    },
    designSolution: [
      {
        title: "Interactive Code Topology Graph",
        desc: "Visual node-edge graph that clusters files by directory domain with zoom-to-file semantics.",
      },
      {
        title: "Blast-Radius Impact Simulator",
        desc: "Select any function or module to highlight all upstream and downstream dependencies in real-time.",
      },
      {
        title: "Git Activity Heatmaps",
        desc: "Overlay churn and author ownership onto architectural components to identify high-risk code hotspots.",
      },
    ],
    impactOrTakeaways: {
      points: [
        "Visual Clarity vs Information Density: Designed semantic zoom levels so high-level service architecture is visible at 20% zoom, while granular AST call-stacks appear upon clicking a specific node.",
        "Keyboard-First Navigation: Implemented command-palette (Cmd+K) workflows tailored to developer habits.",
      ],
    },
  },
];
