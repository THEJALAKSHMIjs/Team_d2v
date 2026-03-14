import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fullscreen-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fullscreen-viewer.component.html',
  styleUrl: './fullscreen-viewer.component.scss'
})
export class FullscreenViewerComponent {
  @Input() images: string[] = [];
  @Input() currentIndex = 0;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() indexChange = new EventEmitter<number>();

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (!this.visible) return;
    if (e.key === 'Escape') this.close.emit();
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
  }

  get currentImage(): string {
    return this.images[this.currentIndex] ?? '';
  }

  get counterText(): string {
    return `${this.currentIndex + 1} / ${this.images.length}`;
  }

  next(): void {
    if (this.images.length <= 0) return;
    const next = (this.currentIndex + 1) % this.images.length;
    this.indexChange.emit(next);
  }

  prev(): void {
    if (this.images.length <= 0) return;
    const prev = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.indexChange.emit(prev);
  }

  private dragStartX = 0;

  onPointerDown(e: PointerEvent): void {
    this.dragStartX = e.clientX;
  }

  onPointerUp(e: PointerEvent): void {
    const delta = e.clientX - this.dragStartX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) this.prev();
      else this.next();
    }
  }

  onTouchStart(e: TouchEvent): void {
    this.dragStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent): void {
    if (e.changedTouches.length === 0) return;
    const delta = e.changedTouches[0].clientX - this.dragStartX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) this.prev();
      else this.next();
    }
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('viewer-backdrop')) {
      this.close.emit();
    }
  }
}
