import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ModalImageComponent } from '../../objects/modal-image/modal-image.component';
import { DynamicModalComponent } from 'app/app-objects/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'portfolio-explained',
  templateUrl: './portfolio-explained.component.html',
  styleUrls: ['./portfolio-explained.component.css']
})
export class PortfolioExplainedComponent implements OnInit {

  img0 = {
    name: 'portfolio-timeline',
    caption: `
    `
  };

  img1 = {
    name: 'portfolio-links',
    caption: `
    `
  };

  img2 = {
    name: 'charts-comparison',
    caption: `
    A skill chart and the inner consciousness chart, respectively
    `
  };

  img3 = {
    name: 'other-page-example',
    caption: `
    A Portfolio Page with the 4 sections highlighted
    `
  };
  getImgByName(name: string) {
    return "WebPortfolio/assets/img/portfolio explained/" + name + ".png";
  }

  constructor(public ps: PortfolioService) { }
  ngOnInit() { }

  createDynamicModalImage(imgDetails) {
    let data = {
      component: ModalImageComponent,
      inputs: { 
        imgFullPath: this.getImgByName(imgDetails.name),
        imgCaption: imgDetails.caption
      }
    };
    this.ps.setComponentData(data);
  }
}
