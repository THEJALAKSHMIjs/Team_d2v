import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertyDataService } from '../../core/services/property-data.service';
import { FullscreenViewerComponent } from '../../shared/fullscreen-viewer/fullscreen-viewer.component';

@Component({
  selector: 'app-stayclub-property',
  standalone: true,
  imports: [CommonModule, RouterLink, FullscreenViewerComponent],
  templateUrl: './stayclub-property.component.html',
  styleUrl: './stayclub-property.component.scss'
})
export class StayclubPropertyComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private propertyData = inject(PropertyDataService);

  title = '';
  propertyKey: string | null = null;
  images: string[] = [];
  fullscreenVisible = false;
  fullscreenIndex = 0;

  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get('property');
    this.propertyKey = key;
    const prop = key ? this.propertyData.getProperty(key) : null;
    if (prop) {
      this.title = prop.title;
      this.images = prop.images;
    }
  }

  openFullscreen(index: number): void {
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
