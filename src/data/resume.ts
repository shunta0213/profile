export interface Education {
  degree: string
  institution: string
  period: string
  details?: string[]
}

export interface Experience {
  title: string
  organization: string
  period: string
  description: string[]
  url?: string
}

export interface Activity {
  title: string
  organization: string
  url?: string
  period: string
  description: string[]
}

export const education: Education[] = [
  {
    degree: 'B.Eng. in Applied Physics and Physico-Informatics',
    institution: 'Keio University',
    period: '2022 - Present',
    details: [
      'Lab: Shu Tanaka Lab',
    ],
  },
]

export const experience: Experience[] = [
  {
    title: 'Software Engineer (Internship)',
    organization: 'LayerX, inc.',
    url: 'https://layerx.co.jp/',
    period: 'Jan 2025 - Sep 2025',
    description: [
      'Developed a SaaS platform for AI agent and workflow automation called "Ai Workforce".',
      'Led the development of AI-powered features such as translation of PDFs and Microsoft Office files, and automated operations on Word documents.',
    ],
  },
  {
    title: 'Software Engineer (Short-term internship)',
    organization: 'MoneyForward, inc.',
    url: 'https://moneyforward.com/',
    period: 'Sep 2024 - Sep 2024',
    description: [
      'Improved the performance of the aggregation of journal entries in accounting SaaS software.',
      'Developed the product as part of a global team (Cloud ERP Accounting Plus Team) consisting of 10+ engineers in English.'
    ],
  },
  {
    title: 'Software Engineer (Short-term internship)',
    organization: 'LayerX, inc.',
    url: 'https://layerx.co.jp/',
    period: 'Aug 2024 - Aug 2024',
    description: [
      'Conducted workshops to add and improve features for a corporate card SaaS product.'
    ],
  },
  {
    title: 'Software Engineer (Internship)',
    organization: 'FastLabel, inc.',
    url: 'https://fastlabel.ai/',
    period: 'Feb 2024 - Nov 2024',
    description: [
      'Developed the AI annotation SaaS.',
    ],
  },
  {
    title: 'Software Engineer',
    organization: 'Wanderlust, inc.',
    url: 'https://wander-lust.io/',
    period: 'Dec 2022 - August 2023',
    description: [
      'Funding member of the company.',
      'Developed the location sharing app "Locket".',
    ],
  },
]

export const activities: Activity[] = [
  {
    title: 'Student Volunteer',
    organization: 'Global Quantum Tomodachi no Kai (Trans: Global Quantum Friendship Club)',
    period: 'May 2025',
    description: [
      'Organized by Quantum Forum',
      'Volunteered at the Global Quantum Friendship Club event held on May 13, 2025 at Deloitte Tohmatsu Innovation Park Room D Auditorium.',
    ],
  },
  {
    title: 'Community Member',
    organization: 'Google Developers Student Clubs (GDSC) Keio University',
    url: 'https://developers.google.com/community',
    period: 'Apr 2022 - Mar 2023',
    description: [
      'Engineer community supported by Google in Keio University.',
    ],
  },
  {
    title: 'Community Manager',
    organization: 'Cloud League',
    url: 'https://cloud-league.vercel.app/',
    period: 'May 2022 - Mar 2022',
    description: [
      'Engineer community consisting of Google Developers Student Clubs (GDSC) members in Keio University, University of Tokyo, Tohoku University, and Hitotsubashi University etc.',
      'Hosted events such as hackathons, workshops, and lectures supported by companies and Google.',
    ],
  },
]
