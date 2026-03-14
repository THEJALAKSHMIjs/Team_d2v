import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroSliderService } from '../../core/services/hero-slider.service';
import { PropertyDataService, PropertyItem } from '../../core/services/property-data.service';
import { HotelDataService, HotelItem } from '../../core/services/hotel-data.service';

type Tab = 'stayclub' | 'hotel' | null;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private heroSlider = inject(HeroSliderService);
  private propertyData = inject(PropertyDataService);
  private hotelData = inject(HotelDataService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  activeTab: Tab = null;
  selectedProperty: string | null = null;
  selectedHotel: string | null = null;
  bgIndex = 0;
  bgImage = '';
  private intervalId: ReturnType<typeof setInterval> | null = null;

  kochiProps = this.propertyData.getKochiProperties();
  ootyProps = this.propertyData.getOotyProperties();
  munnarProps = this.propertyData.getMunnarProperties();
  thrissurHotels = this.hotelData.getThrissurHotels();
  kochiHotels = this.hotelData.getKochiHotels();

  ngOnInit(): void {
    this.cycleBackground();
    this.intervalId = setInterval(() => this.cycleBackground(), 4500);
    this.route.queryParams.subscribe(() => this.restoreFromQueryParams());
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private restoreFromQueryParams(): void {
    const params = new URLSearchParams(window.location.search);
    const open = params.get('open');
    const property = params.get('property');
    const hotel = params.get('hotel');
    if (open === 'stayclub' && property) {
      this.activeTab = 'stayclub';
      this.selectedProperty = property;
      this.selectedHotel = null;
      setTimeout(() => {
        this.openAccordionsForSelectedProperty();
        this.scrollToAccordion();
      }, 150);
    } else if (open === 'hotel' && hotel) {
      this.activeTab = 'hotel';
      this.selectedHotel = hotel;
      this.selectedProperty = null;
      setTimeout(() => {
        this.openAccordionsForSelectedHotel();
        this.scrollToAccordion();
      }, 150);
    } else {
      this.selectedProperty = null;
      this.selectedHotel = null;
    }
  }

  private openAccordionsForSelectedProperty(): void {
    if (!this.selectedProperty) return;
    const city = document.getElementById('accordion-city');
    const kochi = document.getElementById('accordion-kochi-props');
    const hill = document.getElementById('accordion-hill');
    const ooty = document.getElementById('accordion-ooty-props');
    const munnar = document.getElementById('accordion-munnar-props');
    if (this.kochiProps.some(p => p.key === this.selectedProperty)) {
      city?.setAttribute('open', '');
      kochi?.setAttribute('open', '');
    }
    if (this.ootyProps.some(p => p.key === this.selectedProperty)) {
      hill?.setAttribute('open', '');
      ooty?.setAttribute('open', '');
    }
    if (this.munnarProps.some(p => p.key === this.selectedProperty)) {
      hill?.setAttribute('open', '');
      munnar?.setAttribute('open', '');
    }
  }

  private openAccordionsForSelectedHotel(): void {
    if (!this.selectedHotel) return;
    const thrissur = document.getElementById('accordion-thrissur');
    const kochi = document.getElementById('accordion-kochi-hotels');
    if (this.thrissurHotels.some(h => h.key === this.selectedHotel)) {
      thrissur?.setAttribute('open', '');
    }
    if (this.kochiHotels.some(h => h.key === this.selectedHotel)) {
      kochi?.setAttribute('open', '');
    }
  }

  onHeroClick(event: MouseEvent): void {
    if (!this.activeTab) return;
    const target = event.target as HTMLElement;
    if (!target.closest('#accordion-section') && !target.closest('.hero-buttons')) {
      this.clearTab();
    }
  }

  private cycleBackground(): void {
    const images = this.heroSlider.bgImages;
    this.bgImage = images[this.bgIndex] ?? '';
    this.bgIndex = (this.bgIndex + 1) % images.length;
  }

  openStayClub(): void {
    this.activeTab = 'stayclub';
    this.scrollToAccordion();
  }

  openHotels(): void {
    this.activeTab = 'hotel';
    this.scrollToAccordion();
  }

  clearTab(): void {
    this.activeTab = null;
    this.selectedProperty = null;
    this.selectedHotel = null;
  }

  openProperty(property: PropertyItem): void {
    this.router.navigate(['/stayclub', property.key], {
      queryParams: { open: 'stayclub', property: property.key }
    });
  }

  openHotel(hotel: HotelItem): void {
    this.router.navigate(['/hotel', hotel.key], {
      queryParams: { open: 'hotel', hotel: hotel.key }
    });
  }

  private scrollToAccordion(): void {
    document.getElementById('accordion-section')?.scrollIntoView({ behavior: 'smooth' });
  }
}
