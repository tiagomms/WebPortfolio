import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { ModalImageComponent } from '../modal-image/modal-image.component';
import { ModalChartComponent } from '../modal-chart/modal-chart.component';
import { ModalPageTimelineComponent } 
  from '../modal-page-timeline/modal-page-timeline.component';
import { DynamicModalComponent } from 'app/app-objects/dynamic-modal/dynamic-modal.component';

import { PortfolioService } from '../../services/portfolio.service';

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'education-page-structure',
  templateUrl: './education-page-structure.component.html',
  styleUrls: ['./education-page-structure.component.css']
})

export class EducationPageStructureComponent implements OnInit {

  componentData = null;
  dynamicArray: number[] = [-1];
  pageInfo;
  pageID: string = "";
  thisID: string = "";
  skillsList: number[] = []; 
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isPageLoaded: boolean = false;
  currentPageID: string = "";
  themeOffset: number = 120;

  constructor(
    public portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => { 
        this.isLoading.next(true);
        let urlName = (params['urlName'] ? params['urlName'] : '');
        return this.portfolioService.getPageInfoByUrl(urlName);
      })
      .finally(() => { this.isLoading.next(false) })
      .subscribe( 
        (info) => { 
          this.pageInfo = info;

          if (this.pageInfo.id != undefined) {
            let urlName = this.pageInfo.urlName;
            this.pageID = urlName.substr(0, urlName.indexOf('---'));
            if (this.pageID == "working-experience" 
              || this.pageID == "volunteering")
              this.pageID = "education";
            this.pageID += "s " + this.pageInfo.id;
            this.thisID = this.pageInfo.id;

            this.portfolioService.setPortfolioPageID(this.pageID);
            this.skillsList = this.pageInfo.relatedTo_chart;
          }
          this.dynamicArray[0]++;
        },
        (error) => { console.log(error); }
      )
  }

  createDynamicModalChart(cID: number, pID: string){
    let data = {
      component: ModalChartComponent,
      inputs: {
        chartID: cID,
        pageID: pID
      }
    };
    this.portfolioService.setComponentData(data);
  }

  createDynamicModalPageTimeline(pID: string){
    let data = {
      component: ModalPageTimelineComponent,
      inputs: {
        pageID: pID
      }
    };
    this.portfolioService.setComponentData(data);
  }

  getPageTitle() {
    if (this.pageID.indexOf("charts") != -1 && this.pageID != "charts 21")
      return this.pageInfo.name + " Experience";
    return this.pageInfo.name;
  }
  getPageSubTitle() {
    let subtitle: string = '';
    
    if (this.pageID.indexOf('charts') != -1)
      return "Sep 2009 - Aug 2017";

    if (this.pageInfo.atLocation) 
      subtitle = "at " + this.pageInfo.atLocation + " ";
    if (this.pageInfo.startDate)
      subtitle +="( "+this.pageInfo.startDate+" - "+this.pageInfo.endDate+" )";

    return subtitle;
  }
  getBgColor() {
    let bgColorType;
    if (this.pageID == "educations 0" || this.pageID == "educations 4")
      bgColorType = "working";
    else if (this.pageID == "educations 5")
      bgColorType = "volunteering";
    else {
      bgColorType = this.pageID.substr(0, this.pageID.indexOf(" ") - 1);
      bgColorType = (bgColorType == 'chart' ? 'skill' : bgColorType);
    }
    return "bgcolor-" + bgColorType;
  }
  getPageIDIfNotChart(pageID: string) {
    return pageID.indexOf('charts') == -1 ? pageID : void 0;
  }

  getImgTheme() {
    return "/assets/img/" + this.pageID + "/theme.png";
  }
}
