/*
* Portfolio Page is the main page of the portfolio
*/

import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './services/portfolio.service';
import { ModalChartComponent } from './objects/modal-chart/modal-chart.component';
import { DynamicModalComponent } from 'app/app-objects/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  pageID = "charts main-page";

  constructor(public ps: PortfolioService) { }
  ngOnInit() { this.ps.setPortfolioPageID(this.pageID); }

  createDynamicModalChart(cID: number, pID: string){
    let data = {
      component: ModalChartComponent,
      inputs: {
        chartID: cID,
        pageID: this.pageID
      }
    };

    this.ps.setComponentData(data);
  }
}
