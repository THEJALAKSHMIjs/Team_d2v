import { Injectable } from '@angular/core';

export interface PropertyItem {
  key: string;
  title: string;
  images: string[];
}

@Injectable({ providedIn: 'root' })
export class PropertyDataService {
  private readonly data: Record<string, PropertyItem> = {
    river: {
      key: 'river',
      title: "River Vill'e",
      images: Array.from({ length: 52 }, (_, i) => `images/river/r${i + 1}.jpeg`)
    },
    luna: {
      key: 'luna',
      title: 'Luna Nest',
      images: Array.from({ length: 25 }, (_, i) => `images/luna/l${i + 1}.jpeg`)
    },
    tranquil: {
      key: 'tranquil',
      title: 'Tranquil',
      images: Array.from({ length: 42 }, (_, i) => `images/tranquil/t${i + 1}.jpeg`)
    },
    woody: {
      key: 'woody',
      title: 'Woody & Co',
      images: Array.from({ length: 27 }, (_, i) => `images/woody/w${i + 1}.jpeg`)
    },
    container: {
      key: 'container',
      title: 'The Leafy Nook Container Stay',
      images: Array.from({ length: 39 }, (_, i) => `images/container/c${i + 1}.jpeg`)
    },
    yrt: {
      key: 'yrt',
      title: 'The Nilgiri Paradise',
      images: Array.from({ length: 42 }, (_, i) => `images/yrt/y${i + 1}.jpeg`)
    },
    hillheaven: {
      key: 'hillheaven',
      title: 'The Hill Heaven',
      images: Array.from({ length: 23 }, (_, i) => `images/hill/h${i + 1}.jpeg`)
    },
    littlehome: {
      key: 'littlehome',
      title: 'Little Home',
      images: Array.from({ length: 30 }, (_, i) => `images/little/l${i + 1}.jpeg`)
    },
    mist: {
      key: 'mist',
      title: "The Mist'e Munnar",
      images: Array.from({ length: 36 }, (_, i) => `images/mist/m${i + 1}.jpeg`)
    }
  };

  getProperty(key: string): PropertyItem | null {
    return this.data[key] ?? null;
  }

  getKochiProperties(): PropertyItem[] {
    return ['river', 'luna', 'tranquil'].map(k => this.data[k]).filter(Boolean);
  }

  getOotyProperties(): PropertyItem[] {
    return ['woody', 'container', 'yrt', 'hillheaven', 'littlehome'].map(k => this.data[k]).filter(Boolean);
  }

  getMunnarProperties(): PropertyItem[] {
    return ['mist'].map(k => this.data[k]).filter(Boolean);
  }
}
