import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

import { ModalImageComponent } from '../../objects/modal-image/modal-image.component';
import { ModalChartComponent } from '../../objects/modal-chart/modal-chart.component';
import { ModalPageTimelineComponent } 
  from '../../objects/modal-page-timeline/modal-page-timeline.component';
import { DynamicModalComponent } from 'app/app-objects/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'gastagus',
  templateUrl: './gastagus.component.html'
})
export class GastagusComponent implements OnInit {

  img0 = {
    name: 'GASTagus-Tiago',
    caption: 'Running around with some children from Achada Grande de Trás neighbourhood, where we lived, August 2010'
  };

  img1 = {
    name: 'GASTagus-Rita',
    caption: 'Training in SOS Children’s Village Headquarters in Cape Verde, August 2010'
  };

  img2 = {
    name: 'GASTagus-Encontro',
    caption: 'GASTagus community, February 2012'
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
