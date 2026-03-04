/**
 * UMOJA-ai site-wide constants.
 * All user-facing copy is centralised here so components stay clean.
 */

export const SITE = {
  name: 'UMOJA-ai',
  tagline: 'Transforming Education Across Africa',
  taglineShort: 'AI-Assisted Education for Africa',
  footerNote: 'UMOJA — Unity in Swahili.',
  copyright: '© 2026 UMOJA-ai. All rights reserved.',
  email: 'hello@umoja-ai.com',
} as const;

export const META = {
  title: 'UMOJA-ai | AI-Assisted Education for Africa',
  description:
    'UMOJA-ai delivers AI-powered, curriculum-aligned education to African classrooms. Our platform empowers teachers with intelligent lesson delivery that works offline, on solar power, across any network.',
} as const;

export const NAV_LINKS = [
  { label: 'The Crisis', href: '#crisis' },
  { label: 'Our Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Our Model', href: '#model' },
  { label: 'Why Ghana', href: '#ghana' },
] as const;

export const HERO = {
  headline: 'Transforming Education Across Africa',
  subheadline:
    'UMOJA-ai delivers curriculum-aligned, AI-assisted lessons to classrooms across Africa — empowering teachers, engaging students, and improving outcomes at scale.',
  ctaPrimary: 'Learn More',
  ctaSecondary: 'Partner With Us',
} as const;

export const CRISIS_STATS = [
  {
    stat: 9,
    prefix: '',
    suffix: ' in 10',
    label: 'Children Cannot Read by Age 10',
    description:
      'Across Sub-Saharan Africa, the majority of children complete primary school without acquiring basic literacy.',
  },
  {
    stat: 5.4,
    prefix: '',
    suffix: 'M+',
    label: 'Additional Teachers Needed',
    description:
      'Africa faces a structural teacher shortage that conventional training pipelines cannot close in time.',
  },
  {
    stat: 1000000,
    prefix: '~',
    suffix: '',
    finalLabel: '1M',
    label: 'Children Out of School in Ghana',
    description:
      'Even in one of Africa\'s most education-committed nations, hundreds of thousands of children remain unreached.',
  },
] as const;

export const CRISIS_BODY =
  'This is not merely an educational challenge — it is a humanitarian and economic emergency. Without urgent intervention, an entire generation risks being left behind, with consequences that will compound for decades across the continent.';

export const SOLUTION_CARDS = [
  {
    iconName: 'BrainCircuit',
    title: 'AI-Powered Lessons',
    description:
      'An AI avatar delivers curriculum-aligned lessons via projector, guided by the classroom teacher who remains in full control of the learning experience.',
  },
  {
    iconName: 'Wifi',
    title: 'Works Anywhere',
    description:
      'Solar-powered and offline-capable. Delivered via mobile networks or pre-loaded for communities without reliable connectivity.',
  },
  {
    iconName: 'Globe',
    title: 'Built for Africa',
    description:
      'Designed from the ground up for African classrooms, cultural contexts, and curricula — not adapted from Western products.',
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: 'Lesson Delivered',
    description:
      'An AI avatar presents a structured, curriculum-aligned lesson through a classroom projector.',
  },
  {
    number: 2,
    title: 'Teacher Guides',
    description:
      'The teacher controls the pace, adds local context, and steers the class based on student responses.',
  },
  {
    number: 3,
    title: 'Students Interact',
    description:
      'Questions and discussions flow naturally through the teacher and AI working in tandem.',
  },
  {
    number: 4,
    title: 'Progress Assessed',
    description:
      'Built-in formative assessments track individual and class-level understanding in real time.',
  },
  {
    number: 5,
    title: 'Outcomes Improve',
    description:
      'Data-driven insights help teachers focus their attention exactly where it matters most.',
  },
] as const;

export const THREE_PARTY = {
  heading: 'No Single Party Can Do This Alone',
  subheading: 'Together, we create a self-sustaining education system.',
  quote:
    'UMOJA-ai is built to work through collaboration. Government supports curriculum alignment and national rollout. Telecom companies enable wide delivery through mobile networks. UMOJA-ai provides the platform and learning system. Together, the partnership creates a practical path to improving education quality quickly, fairly, and at national scale.',
  parties: [
    {
      iconName: 'Cpu',
      name: 'UMOJA-ai',
      color: 'green' as const,
      description:
        'Technology platform, AI content delivery, teacher training, and ongoing system maintenance.',
    },
    {
      iconName: 'Building2',
      name: 'Government',
      color: 'gold' as const,
      description:
        'Curriculum authority, institutional support, policy alignment, and the regulatory framework.',
    },
    {
      iconName: 'Radio',
      name: 'Telecom Partners',
      color: 'green' as const,
      description:
        'Connectivity infrastructure, network distribution, and last-mile reach to every classroom.',
    },
  ],
} as const;

export const WHY_GHANA = {
  heading: 'Ghana: The Perfect Launchpad',
  tagline: 'Ghana is our launchpad. Africa is our destination.',
  body: 'Ghana combines political stability, strong education investment, advanced mobile infrastructure, and a thriving digital economy — making it the ideal environment to prove and scale UMOJA-ai before expanding across West Africa and beyond.',
  stats: [
    {
      iconName: 'MapPin',
      label: 'Stable Democracy',
      description: 'Strong long-term commitment to education, with more than 6% of GDP dedicated annually.',
    },
    {
      iconName: 'Signal',
      label: '113% Mobile Penetration',
      description: 'Mobile infrastructure is already established, expanding, and reliable.',
    },
    {
      iconName: 'Smartphone',
      label: '67% Mobile Money Adoption',
      description: 'Digital payment infrastructure is already embedded in everyday Ghanaian life.',
    },
    {
      iconName: 'Globe',
      label: 'ECOWAS Gateway',
      description: "Ghana's success creates the proven model that catalyses West African adoption.",
    },
  ],
} as const;

export const IMPACT = {
  heading: 'The Opportunity We Cannot Miss',
  bigStatLabel: 'School-Age Children Across Africa',
  bigStatTarget: 400,
  bigStatSuffix: 'M+',
  quotes: [
    {
      text: 'Universal basic education could double Africa\'s GDP per capita by 2050.',
      source: 'World Bank',
    },
    {
      text: 'Each additional year of schooling boosts incomes by 12.4% in Sub-Saharan Africa.',
      source: 'UNESCO Institute for Statistics',
    },
  ],
  body: 'Revenue generated through the platform creates a self-sustaining fund for school infrastructure, learning materials, and continuous teacher development — ensuring the impact compounds over time.',
} as const;

export const CONTACT = {
  heading: 'Join the Movement',
  subheading:
    'Whether you represent a government, telecom company, investment firm, or educational institution — we want to hear from you. UMOJA-ai is built on partnership. Let\'s talk.',
  trustItems: [
    'Confidential discussions',
    'Tailored partnership structures',
    'Response within 48 hours',
  ],
  submitLabel: 'Start the Conversation',
  successMessage: "Message sent! We'll be in touch within 48 hours.",
  errorMessage: 'Something went wrong. Please try again.',
} as const;

export const ROLE_OPTIONS = [
  { value: 'Government', label: 'Government' },
  { value: 'Telecom', label: 'Telecom' },
  { value: 'Investor', label: 'Investor' },
  { value: 'Educator', label: 'Educator' },
  { value: 'Other', label: 'Other' },
] as const;

export const INTEREST_OPTIONS = [
  { value: 'Partnership', label: 'Partnership' },
  { value: 'Investment', label: 'Investment' },
  { value: 'Pilot Program', label: 'Pilot Program' },
  { value: 'General Inquiry', label: 'General Inquiry' },
] as const;
