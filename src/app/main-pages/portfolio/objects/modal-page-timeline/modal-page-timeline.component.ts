import { Component, Input, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalService } from 'app/app-services/modal.service';
import { PortfolioInfo } from '../../classes/portfolio-info';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'modal-page-timeline',
  templateUrl: './modal-page-timeline.component.html'
})
export class ModalPageTimelineComponent implements OnInit {

  pageID: string;
  pageInfo;

  constructor(private modalService: ModalService,
    public portfolioService: PortfolioService,
    private injector: Injector) { 
    this.pageID = this.injector.get('pageID');
  }

  ngOnInit() {

    this.portfolioService.getPortfolioInfo().subscribe( info => {
      let pageID = this.pageID.split(" ");
      this.pageInfo = info[pageID[0]]
        .filter( item => item.id == parseInt(pageID[1]) )[0];
    });
  }

  openModalTimeline(){ this.modalService.open('modalTimeline'); }
  closeModalTimeline(){ this.modalService.close('modalTimeline'); }

}
