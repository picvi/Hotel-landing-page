import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHint]'
})
export class HintDirective {
  @Input('hintText') private text: string;
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  showHint() {
    this.renderer.setAttribute(this.el.nativeElement, 'title', `${this.text}`)
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showHint();
  }
}