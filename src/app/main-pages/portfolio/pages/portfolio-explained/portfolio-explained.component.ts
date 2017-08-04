import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

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

  getImgByName(name: string) {
    return "/assets/img/portfolio explained/" + name + ".png";
  }

  constructor(public ps: PortfolioService) { }
  ngOnInit() { }
}
