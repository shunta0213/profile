export interface Education {
  degree: string
  institution: string
  period: string
  details?: string[]
}

export interface Skill {
  category: string
  items: string[]
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
