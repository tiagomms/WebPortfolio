import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

import { ModalImageComponent } from '../../objects/modal-image/modal-image.component';
import { ModalChartComponent } from '../../objects/modal-chart/modal-chart.component';
import { ModalPageTimelineComponent } 
  from '../../objects/modal-page-timeline/modal-page-timeline.component';
import { DynamicModalComponent } from 'app/app-objects/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'biofeedback-project',
  templateUrl: './biofeedback-project.component.html'
})
export class BiofeedbackProjectComponent implements OnInit {

  img0 = {
    name: 'game',
    caption: 'Game Interface'
  };
  img1 = {
    name: 'ecg-circuit',
    caption: 'ECG circuit connected to an Arduino'
  };
  img2 = {
    name: 'schematic',
    caption: ''
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
