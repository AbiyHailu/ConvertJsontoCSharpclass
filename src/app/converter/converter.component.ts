import { Component, Input } from '@angular/core';

@Component({
  selector: 'convert',
  templateUrl: `converter.component.html`,
  styles: [`h1 { font-family: Lato; }`]
})
export class ConverterComponent  {
  @Input() name: string;
}
