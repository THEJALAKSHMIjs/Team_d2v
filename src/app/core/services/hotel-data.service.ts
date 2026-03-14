import { Injectable } from '@angular/core';

export interface HotelCategory {
  key: string;
  label: string;
  images: string[];
}

export interface HotelItem {
  key: string;
  title: string;
  images?: string[];
  categories?: Record<string, string[]>;
}

@Injectable({ providedIn: 'root' })
export class HotelDataService {
  private readonly data: Record<string, HotelItem> = {
    central: {
      key: 'central',
      title: 'Central Hotel by D2V',
      images: Array.from({ length: 57 }, (_, i) => `images/cen/c${i + 1}.jpeg`)
    },
    amaravati: {
      key: 'amaravati',
      title: 'Hotel Amaravati by D2V',
      images: Array.from({ length: 48 }, (_, i) => `images/am/am${i + 1}.jpeg`)
    },
    dana: {
      key: 'dana',
      title: 'Dana Residency (Thammanam)',
      categories: {
        deluxe: Array.from({ length: 6 }, (_, i) => `images/dana/deluxe/d${i + 1}.jpeg`),
        executive: Array.from({ length: 15 }, (_, i) => `images/dana/executive/e${i + 1}.jpeg`),
        suite: Array.from({ length: 15 }, (_, i) => `images/dana/suite/s${i + 1}.jpeg`)
      }
    },
    palm: {
      key: 'palm',
      title: 'Palm Grove by D2V (Edappally)',
      categories: {
        oak: Array.from({ length: 18 }, (_, i) => `images/palm/p${i + 1}.jpeg`),
        mahogany: Array.from({ length: 50 }, (_, i) => `images/palm/mahogany/m${i + 1}.jpeg`)
      }
    },
    zoot: {
      key: 'zoot',
      title: 'Zoot Kochi Infopark (Kakkanad)',
      images: Array.from({ length: 47 }, (_, i) => `images/zoot/z${i + 1}.jpeg`)
    },
    saaaj: {
      key: 'saaaj',
      title: 'Hotel Saaaj (Kalamassery)',
      categories: {
        standard: Array.from({ length: 5 }, (_, i) => `images/saaaj/standard/s${i + 1}.jpeg`),
        family: Array.from({ length: 7 }, (_, i) => `images/saaaj/family/f${i + 1}.jpeg`),
        deluxe: Array.from({ length: 10 }, (_, i) => `images/saaaj/deluxe/d${i + 1}.jpeg`),
        bhk2: Array.from({ length: 10 }, (_, i) => `images/saaaj/2bhk/b${i + 1}.jpeg`)
      }
    }
  };

  getHotel(key: string): HotelItem | null {
    return this.data[key] ?? null;
  }

  getThrissurHotels(): HotelItem[] {
    return ['central', 'amaravati'].map(k => this.data[k]).filter(Boolean);
  }

  getKochiHotels(): HotelItem[] {
    return ['dana', 'palm', 'zoot', 'saaaj'].map(k => this.data[k]).filter(Boolean);
  }

  getCategoryLabel(categoryKey: string): string {
    const labels: Record<string, string> = {
      oak: 'OAK ROOM',
      mahogany: 'Mahogany (2BHK Apartment)',
      deluxe: 'DELUXE',
      executive: 'EXECUTIVE',
      suite: 'SUITE',
      standard: 'STANDARD',
      family: 'FAMILY',
      bhk2: '2BHK'
    };
    return labels[categoryKey] ?? categoryKey.toUpperCase();
  }
}
