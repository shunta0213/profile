export interface Publication {
  authors: string
  year: number
  title: string
  venue: string
  volume?: string
  pages?: string
  doi?: string
  toAppear?: boolean
}

export interface Presentation {
  title: string
  event: string
  date: string
  location: string
  type: string
  url?: string
}

export interface ResearchArea {
  title: string
  description: string
}

export interface ContactInfo {
  email: string
  affiliation: {
    lab: {
      name: string
      url: string
    }
    department: string
    university: string
  }
}
