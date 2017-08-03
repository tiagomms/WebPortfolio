import { Component, Input, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalService } from 'app/app-services/modal.service';
import { PortfolioInfo, ChartInfo } from '../../classes/portfolio-info';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'modal-chart',
  templateUrl: './modal-chart.component.html'
})
export class ModalChartComponent implements OnInit {

  chartID: string;
  pageID: string;

  chartInfo: ChartInfo;

  constructor(private modalService: ModalService,
    public portfolioService: PortfolioService,
    private injector: Injector) { 
    this.chartID = this.injector.get('chartID');
    this.pageID = this.injector.get('pageID');
  }
  ngOnInit() { 

      this.portfolioService.getPortfolioInfo().subscribe( info => {
        this.chartInfo = info.charts[this.chartID];
      });

  }

  createChartID(id: string) { return "chart-" + id; }
  setChartIdOnProjectTimeline(id: string) { return "charts " + id; }
  getPageIDIfNotChart(pageID: string) {
    return pageID.indexOf('charts') == -1 ? pageID : void 0;
  }

  setUrlCorrectly(url: string) { return url; }

  openModalChart(){ this.modalService.open('modalChart'); }
  closeModalChart(){ this.modalService.close('modalChart'); }
}
