/*
* Starting app component
* The HTML is just a router-outlet because this app has 2 different page 
* templates:
* (A) regular pages - with standard header and footer
* (B) portfolio pages - designed for the maximum interaction possible. These
*   pages do not have a standard header and footer.
*/

import { Component } from '@angular/core';
import { PortfolioInfo } from './main-pages/portfolio/classes/portfolio-info';
import { PortfolioChartData } from './main-pages/portfolio/classes/portfolio-chart-data';
import { PortfolioService } from './main-pages/portfolio/services/portfolio.service';

@Component({
  selector: 'app-root',
  // provide globally shared services only at the root component
  providers: [ PortfolioService ], 
  templateUrl: './app.component.html'
})
export class AppComponent {

  portfolioInfo: PortfolioInfo;
  portfolioChartData: PortfolioChartData;

  constructor( portfolioService: PortfolioService ) {
    
    portfolioService.getPortfolioInfo().subscribe(data => {
      this.portfolioInfo = data;
    });
    portfolioService.getPortfolioChartData().subscribe(data => {
      this.portfolioChartData = data;
    });
  }
}
