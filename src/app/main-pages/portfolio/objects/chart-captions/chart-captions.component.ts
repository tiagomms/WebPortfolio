import { Component, Input } from '@angular/core';

@Component({
  selector: 'chart-captions',
  templateUrl: './chart-captions.component.html'
})
export class ChartCaptionsComponent {
  @Input() isMainPage: string;
}
