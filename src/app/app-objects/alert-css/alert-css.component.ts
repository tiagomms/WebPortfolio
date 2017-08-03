import { Component, Input, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { PortfolioService } from '../../main-pages/portfolio/services/portfolio.service';

@Component({
  selector: 'alert-css',
  templateUrl: './alert-css.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AlertCssComponent implements OnInit {
  @Input() componentClass: string;
  @HostBinding('class') itemName = '';

  constructor(public ps: PortfolioService) { }
  ngOnInit() {
    this.itemName = this.componentClass;
  }
}
