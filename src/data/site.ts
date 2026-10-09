// Site-wide details. Edit these values to change the name, title, links, etc.
export const site = {
  name: 'Denise Mae Chua, PhD',
  shortName: 'Denise Chua',
  givenName: 'Denise Mae',
  familyName: 'Chua',
  jobTitle: 'Speech-Language Pathologist and Researcher',
  role: 'Research Officer',
  lab: { name: 'Swallowing Research Laboratory', url: 'https://swallow.edu.hku.hk/' },
  affiliation: { name: 'The University of Hong Kong', url: 'https://www.hku.hk/' },
  location: 'Hong Kong',
  description:
    'Denise Mae Chua, PhD — speech-language pathologist and swallowing (dysphagia) researcher at the Swallowing Research Laboratory, University of Hong Kong.',
  email: 'dnchua@hku.hk',
  cv: '/files/DMNChua_CV2026.pdf',
  ogImage: '/images/og.jpg',
};

export type SocialLink = { label: string; handle: string; url: string; icon: 'email' | 'linkedin' | 'x' | 'orcid' };

export const links: SocialLink[] = [
  { label: 'Email', handle: site.email, url: `mailto:${site.email}`, icon: 'email' },
  { label: 'LinkedIn', handle: 'in/dnsemae', url: 'https://www.linkedin.com/in/dnsemae/', icon: 'linkedin' },
  { label: 'X (Twitter)', handle: '@denisechuaSLP', url: 'https://x.com/denisechuaSLP', icon: 'x' },
  { label: 'ORCID', handle: '0000-0001-6211-2161', url: 'https://orcid.org/0000-0001-6211-2161', icon: 'orcid' },
];

export const nav = [
  { label: 'About', href: '/' },
  { label: 'Research', href: '/research/' },
  { label: 'Teaching', href: '/teaching/' },
  { label: 'CV', href: '/cv/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Contact', href: '/contact/' },
];

// Redesign preview (Bolus Brief / fluoro concepts). Set showDesignSwitcher to false once one is chosen.
export const designs = [
  { id: 'fluoro', label: 'Fluoro' },
  { id: 'negative', label: 'Negative' },
  { id: 'scholarly', label: 'Classic' },
  { id: 'swallow', label: 'Swallow' },
] as const;
export type DesignId = (typeof designs)[number]['id'];
export const defaultDesign: DesignId = 'scholarly';
export const showDesignSwitcher = true;
