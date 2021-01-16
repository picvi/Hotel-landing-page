import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appHintPro]',
})
export class HintProDirective {
  @Input('hintProText') private text: string;
  
  constructor(private renderer: Renderer2, private el: ElementRef, private tpl: TemplateRef<any>, private vc: ViewContainerRef) {}

  showHint() {
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText(this.text);
    const hint = this.renderer.appendChild(div, text);
    const q = this.tpl.createEmbeddedView({
      text: this.text
    })
    this.vc.insert(q);
    
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showHint();
  }
}
