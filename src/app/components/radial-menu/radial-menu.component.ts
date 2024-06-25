import { NgIf } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  inject,
} from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  standalone: true,
  selector: 'radial-menu',
  templateUrl: './radial-menu.html',
  imports: [NgIf],
  styles: `
  .backdrop {
    background-color: rgba(0,0,0,0.4);
    backdrop-filter: blur(1px);
    box-shadow: 0 0 30px 20px rgba(0,0,0,0.4);
  }
  `,
})
export class RadialMenuComponent implements AfterContentInit {
  @Input() radius: number = 40;
  @Input() innerRadius: number = 30;
  @Input() hasBackdrop = false;

  private renderer = inject(Renderer2);

  @ContentChildren('outerCircleItems')
  outerCircleItems: QueryList<ElementRef>;

  @ContentChildren('innerCircleItems') innerCircleItems: QueryList<ElementRef>;

  ngAfterContentInit(): void {
    this.circularDistribution(this.outerCircleItems, this.radius);
    this.circularDistribution(this.innerCircleItems, this.innerRadius);
  }

  circularDistribution(children: QueryList<ElementRef>, radius: number) {
    const step = (2 * Math.PI) / children.length;
    // to rotate items around
    // let angle = ( x * Math.PI) / this.children.length;
    let angle = Math.PI;

    children.forEach((child) => {
      const x = Math.round(radius * Math.cos(angle));
      const y = Math.round(radius * Math.sin(angle));
      const el = child.nativeElement;

      this.renderer.setStyle(el, 'position', 'absolute');
      this.renderer.setStyle(el, 'transform', 'translate(-50%, -50%)');
      this.renderer.setStyle(el, 'top', x + 'px');
      this.renderer.setStyle(el, 'left', y + 'px');
      angle -= step;
    });
  }
}
