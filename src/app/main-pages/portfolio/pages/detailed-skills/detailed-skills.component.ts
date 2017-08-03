import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ModalChartComponent } from '../../objects/modal-chart/modal-chart.component';
import { DynamicModalComponent } from 'app/app-objects/dynamic-modal/dynamic-modal.component';

@Component({
selector: 'detailed-skills',
  templateUrl: './detailed-skills.component.html',
  styleUrls: ['./detailed-skills.component.css']
})
export class DetailedSkillsComponent implements OnInit {

  pageID = "charts skillset";

  constructor(public ps: PortfolioService) { }
  ngOnInit() { 
    this.ps.setPortfolioPageID(this.pageID);
  }

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
