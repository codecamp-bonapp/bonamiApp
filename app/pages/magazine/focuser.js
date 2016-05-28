import {Directive, Renderer, ElementRef} from "angular2/core";
@Directive({
  selector : '[focuser]'
})
export class Focuser {
  static get parameters() {
    return [[Renderer], [ElementRef]];
  }
  constructor(renderer, elementRef) {
    this.renderer = renderer;
    this.elementRef = elementRef;
  }

  ngOnInit() {
    //search bar is wrapped with a div so we get the child input
    const searchInput = this.elementRef.nativeElement.querySelector('input');
    setTimeout(() => {
      //delay required or ionic styling gets finicky
      this.renderer.invokeElementMethod(searchInput, 'focus', []);
    }, 0);
  }
}
