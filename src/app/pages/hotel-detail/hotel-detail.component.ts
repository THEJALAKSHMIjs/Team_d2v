import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HotelDataService, HotelItem } from '../../core/services/hotel-data.service';
import { FullscreenViewerComponent } from '../../shared/fullscreen-viewer/fullscreen-viewer.component';

interface CategoryView {
  key: string;
  label: string;
  images: string[];
}

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FullscreenViewerComponent],
  templateUrl: './hotel-detail.component.html',
  styleUrl: './hotel-detail.component.scss'
})
export class HotelDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private hotelData = inject(HotelDataService);

  title = '';
  hotelKey: string | null = null;
  categories: CategoryView[] = [];
  flatImages: string[] = [];
  fullscreenVisible = false;
  fullscreenIndex = 0;

  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get('name');
    this.hotelKey = key;
    const hotel = key ? this.hotelData.getHotel(key) : null;
    if (hotel) {
      this.title = hotel.title;
      if (hotel.images) {
        this.flatImages = hotel.images;
      }
      if (hotel.categories) {
        this.categories = Object.entries(hotel.categories).map(([k, imgs]) => ({
          key: k,
          label: this.hotelData.getCategoryLabel(k),
          images: imgs
        }));
      }
    }
  }

  openFullscreen(images: string[], index: number): void {
    this.flatImages = images;
    this.fullscreenIndex = index;
    this.fullscreenVisible = true;
  }

  closeFullscreen(): void {
    this.fullscreenVisible = false;
  }

  onFullscreenIndexChange(index: number): void {
    this.fullscreenIndex = index;
  }
}
