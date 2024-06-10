import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

/*
usage:
<div (clickOutside)="closeNotesMenu()"></div>
*/

@Directive({
  standalone: true,
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) {}

  @Output() clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}
