import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

import { ModalImageComponent } from '../../objects/modal-image/modal-image.component';
import { ModalChartComponent } from '../../objects/modal-chart/modal-chart.component';
import { ModalPageTimelineComponent } 
  from '../../objects/modal-page-timeline/modal-page-timeline.component';
import { DynamicModalComponent } from 'app/app-objects/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'ger-app',
  templateUrl: './ger-app.component.html'
})
export class GerAppComponent implements OnInit {

  img0 = {
    name: 'evolution-page',
    caption: `
    A patient’s eye on treatment status page - it included a summary of the 
    patient’s clinical status and a chart displaying the eye’s progression 
    and treatment.  
    `
  };

  img1 = {
    name: 'chart1',
    caption: `
    One of the 5 possible charts from the "analysis of selected clinical criteria" 
    page. For all patients who fulfilled specific criteria, data would be merged 
    for statistical and graphical analysis. These charts held additional information 
      that could be seen while hovering.
    `
  };

  img2 = {
    name: 'chart2',
    caption: `
    One of the 5 possible charts from the "analysis of selected clinical criteria" 
    page. For all patients who fulfilled specific criteria, data would be merged 
    for statistical and graphical analysis. These charts held additional information 
      that could be seen while hovering - which we can observe on this chart.
    `
  };

  img3 = {
    name: 'chart4',
    caption: `
    One of the 5 possible charts from the "analysis of selected clinical criteria" 
    page. For all patients who fulfilled specific criteria, data would be merged 
    for statistical and graphical analysis. These charts held additional information 
      that could be seen while hovering.
    `
  };

  constructor(public ps: PortfolioService) { }
  ngOnInit() { }

  createDynamicModalImage(imgDetails) {
    let data = {
      component: ModalImageComponent,
      inputs: { 
        imgFullPath: this.ps.getImgByName(imgDetails.name),
        imgCaption: imgDetails.caption
      }
    };

    this.ps.setComponentData(data);
  }

}
