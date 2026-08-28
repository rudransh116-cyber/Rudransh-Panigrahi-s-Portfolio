export interface Greeting {
  greeting: string;
  name: string;
  language: string;
  pronunciation?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: string;
  tags: string[];
  link?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  subtext: string;
  category: string;
}

export type ViewTab = 'home' | 'works' | 'contact';
