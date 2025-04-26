export interface HeroPage {
  id: string;
  backgroundColor: string;
  heroTitle: string;
  heroSubTitle: string;
  heroImage: string;
  heroBtnText: string;
  heroBtnTextColor: string;
  heroBtnBgColor: string;
  heroBtnCTA: string;
  heroPageName: 'heroPageMain' | 'heroPagePromotion';
}

export interface FormData extends Omit<HeroPage, 'id'> {
  id?: string;
  userId?: string;
}

export enum ContentView {
  MAIN = 'main',
  HERO = 'hero',
  PROMOTE = 'promote'
}
