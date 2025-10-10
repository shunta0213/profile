export interface SocialLink {
  name: string
  url: string
  icon: string
  ariaLabel: string
}

export const socialLinks: SocialLink[] = [
  {
    name: 'X',
    url: 'https://x.com/sprshunt',
    icon: 'x',
    ariaLabel: 'X (Twitter)'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/sprshunt',
    icon: 'linkedin',
    ariaLabel: 'LinkedIn'
  },
  {
    name: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=CEK8MD4AAAAJ',
    icon: 'google-scholar',
    ariaLabel: 'Google Scholar'
  },
  {
    name: 'ORCID',
    url: 'https://orcid.org/0009-0007-6517-3374',
    icon: 'orcid',
    ariaLabel: 'ORCID'
  }
]
