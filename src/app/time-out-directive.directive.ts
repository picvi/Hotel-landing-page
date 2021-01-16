import { Directive, Input, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';

@Directive({
  selector: '[appTimeOutDirective]'
})
export class TimeOutDirectiveDirective {
  @Input() private appTimeOutDirective: number = null;
  constructor(private tp: TemplateRef<any>, private vc: ViewContainerRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.vc.createEmbeddedView(this.tp)
    }, this.appTimeOutDirective)
  }

  ngOnDestroy():void {
    this.vc.clear();
  }
}
