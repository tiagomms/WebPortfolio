import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

import { ModalImageComponent } from '../../objects/modal-image/modal-image.component';
import { ModalChartComponent } from '../../objects/modal-chart/modal-chart.component';
import { ModalPageTimelineComponent } 
  from '../../objects/modal-page-timeline/modal-page-timeline.component';
import { DynamicModalComponent } from 'app/app-objects/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'portfolio-project-page',
  templateUrl: './portfolio-project-page.component.html'
})
export class PortfolioProjectPageComponent implements OnInit {

  img0 = {
    name: 'portfolio-main-page-Layout',
    caption: `
    Portfolio Main Page initial mockup, designed on Inkscape.
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
