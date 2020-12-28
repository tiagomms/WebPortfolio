/*
 * Portfolio Service gets the data from the json files in the
 * portfolio page
 */

import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/of';
import 'rxjs/add/operator/share';

import { ModalService } from 'app/app-services/modal.service';

import { JsonProperty, deserialize } from 'json-typescript-mapper';

import { PortfolioInfo, ChartInfo, EducationInfo, ProjectInfo }
  from '../classes/portfolio-info';
import { PortfolioChartData, ChartData } from '../classes/portfolio-chart-data';

import {
  D3Service,
  D3,
  TimeInterval,
  TimeLocaleDefinition,
  TimeLocaleObject,
  CountableTimeInterval,
  AxisTimeInterval,
  ScaleTime
} from 'd3-ng2-service';

@Injectable()
export class PortfolioService {

  private alertHasAppeared: boolean = false;
  private d3: D3;
  private urlPortfolioInfo:string = "./assets/data/portfolio_informations.min.json";
  private urlPortfolioChartData:string = "./assets/data/charts_data.min.json";

  private wholeDateInterval: [Date, Date] = 
    [new Date("2009-09-01"), new Date("2017-08-01")];

  private portfolioInfo: PortfolioInfo;
  private portfolioChartData: PortfolioChartData;

  private observablePortfolioInfo: Observable<PortfolioInfo>;
  private observablePortfolioChartData: Observable<PortfolioChartData>;
  private observablePageInfo;

  private portfolioPageID: string = "";

  private componentData;

  private imgOffset = {
    notes: 170,
    flexRow: 200,
    singleImage: 250
  };

  constructor(private http: Http, d3Service: D3Service,
    private modalService: ModalService) {
    this.d3 = d3Service.getD3(); 
  }

  public getAlertHasAppeared(): boolean { return this.alertHasAppeared; }
  public setAlertHasAppeared(value: boolean): void {
    this.alertHasAppeared = value;
  }

  public getImgOffset(name: string): number {
    return this.imgOffset[name];
  }

  private resetModals() {
    this.modalService.pop();
    this.componentData = void 0;
  }
  public setPortfolioPageID(id: string): void { 
    this.portfolioPageID = id;

    //reset Modals so no bugs occur
    this.resetModals();

    //once we leave the home page set getAlertHasAppeared to true
    // so it never shows up again
    this.setAlertHasAppeared(true);
  }
  public getPortfolioPageID(): string { return this.portfolioPageID; }

  public setComponentData(data): void { this.componentData = data; }
  public getComponentData() { return this.componentData; }

  //once all photos are in place insert this
  public getImgTheme() {
    return "/WebPortfolio/assets/img/" + this.portfolioPageID + "/theme.png";
  }

  public getImgByName(name: string) {
    return "/WebPortfolio/assets/img/" + this.portfolioPageID + "/" + name + ".png";
  }

  public getWholeDateInterval(): [Date, Date] { return this.wholeDateInterval; }
  public countWholeDateInterval(): [number, number] {
    return [0, this.d3.timeMonth.count(this.wholeDateInterval[0], this.wholeDateInterval[1])];
  }
  public getMonthByCountDate(cntDate: number): string {
    let d3 = this.d3;
    let timeFormat = d3.timeFormat("%b %Y");//%b %Y === e.g. Sep 2009

    return timeFormat(d3.timeMonth.offset(this.wholeDateInterval[0], cntDate));
  }

  public getPortfolioChartData(): Observable<PortfolioChartData> {

    let d3 = this.d3;
    let timeFormat = d3.timeFormat("%b %Y");//%b %Y === e.g. Sep 2009

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if(this.portfolioChartData) {

      // if `data` is available just return it as `Observable`
      return Observable.of(this.portfolioChartData); 

    } else if(this.observablePortfolioChartData) {

      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.observablePortfolioChartData;

    } else {

      // create the request, store the `Observable` for subsequent subscribers

      this.observablePortfolioChartData = this.http
        .get(this.urlPortfolioChartData, { headers: headers })
        .map(res => {


          // when the cached data is available we don't need the `Observable` reference anymore
          this.observablePortfolioChartData = null;
          this.portfolioChartData = deserialize(PortfolioChartData, res.json());

          //transform Dates into numbers starting from the wholeDateInterval

          for (var i = 0; i < this.portfolioChartData.charts.length; i++) {

            this.portfolioChartData.charts[i].values.map(d => {
              var vDate = new Date(d.date);
              d.date = timeFormat(vDate);

              d.cntDate = d3.timeMonth.count(this.getWholeDateInterval()[0],
                vDate);
            });
          }

          return this.portfolioChartData;
        })
        // make it shared so more than one subscriber can get the result
        .catch(this.handleError)
        .share();
      return this.observablePortfolioChartData;
    }
  }

  public getPortfolioInfo(): Observable<PortfolioInfo> {

    let d3 = this.d3;
    //%b %Y === e.g. Sep 2009
    let timeFormat = d3.timeFormat("%b %Y");

    if(this.portfolioInfo) {

      // if `data` is available just return it as `Observable`
      return Observable.of(this.portfolioInfo); 

    } else if(this.observablePortfolioInfo) {

      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.observablePortfolioInfo;

    } else {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      // create the request, store the `Observable` for subsequent subscribers

      this.observablePortfolioInfo = this.http
        .get(this.urlPortfolioInfo, { headers: headers })
        .map(res => {


          // when the cached data is available we don't need the `Observable` reference anymore
          this.observablePortfolioInfo = null;

          this.portfolioInfo = deserialize(PortfolioInfo, res.json());

          //transform Dates into numbers starting from the wholeDateInterval

          this.portfolioInfo.projects.map(d => {
            var pStartDate = new Date(d.startDate);
            var pEndDate = new Date(d.endDate);

            d.startDate = timeFormat(pStartDate);
            d.endDate = timeFormat(pEndDate);

            d.cntStartDate = d3.timeMonth.count(this.getWholeDateInterval()[0],
              pStartDate);
            d.cntEndDate = d3.timeMonth.count(this.getWholeDateInterval()[0],
              pEndDate);

            let redirectedLink:string;
            if (d.redirectedTo_project >= 0)
              redirectedLink = this.portfolioInfo.projects[d.redirectedTo_project].urlName;
            if (d.redirectedTo_education >= 0)
              redirectedLink = this.portfolioInfo.educations[d.redirectedTo_education].urlName;
            if (d.redirectedTo_chart >= 0)
              redirectedLink = this.portfolioInfo.charts[d.redirectedTo_chart].urlName;
            if (redirectedLink)
              d.urlName = redirectedLink;
          });

          this.portfolioInfo.educations.map(d => {
            var edStartDate = new Date(d.startDate);
            var edEndDate = new Date(d.endDate);

            d.startDate = timeFormat(edStartDate);
            d.endDate = timeFormat(edEndDate);

            d.cntStartDate = d3.timeMonth.count(this.getWholeDateInterval()[0], edStartDate);
            d.cntEndDate = d3.timeMonth.count(this.getWholeDateInterval()[0], edEndDate);
          });

          this.portfolioInfo.events.map(d => {
            var evDate = new Date(d.date);
            d.date = timeFormat(evDate);
            d.cntDate = d3.timeMonth.count(this.getWholeDateInterval()[0], evDate);
          });

          this.portfolioInfo.projects
            .sort(function(a,b) { return b.cntStartDate - a.cntStartDate; });
          this.portfolioInfo.educations
            .sort(function(a,b) { return b.cntStartDate - a.cntStartDate; });
          return this.portfolioInfo;
        })
        // make it shared so more than one subscriber can get the result
        .catch(this.handleError)
        .share();
      return this.observablePortfolioInfo;
    }
  }

  public getPageInfoByUrl(urlName: string): Observable<any> {

    let d3 = this.d3;
    let timeFormat = d3.timeFormat("%b %Y");
    let _portfolioStartDate: Date = this.getWholeDateInterval()[0];

    let getPInfo = function(info: PortfolioInfo, url: string) {
      let result;
      let sChar = "---";
      if (url.indexOf('chart' + sChar) != -1) {
        result = new ChartInfo();
        result = info.charts.filter( chart => chart.urlName == url )[0];
      }
      else if (url.indexOf('project' + sChar) != -1) {
        result = new ProjectInfo();
        result = info.projects.filter( project => project.urlName == url)[0];
      }
      else {
        result = new EducationInfo();
        result = info.educations.filter( ed => ed.urlName == url)[0];
      }

      if (result.startDate) {
        var _startDate = new Date(result.startDate);
        var _endDate = new Date(result.endDate);
        result.startDate = timeFormat(_startDate);
        result.endDate = timeFormat(_endDate);

        result.cntStartDate = d3.timeMonth.count(_portfolioStartDate,
          _startDate);
        result.cntEndDate = d3.timeMonth.count(_portfolioStartDate,
          _endDate);
      }
      result.disabledUrl = false;
      return result;
    }

    if(this.portfolioInfo) {
      this.observablePageInfo = null;
      return Observable.of(getPInfo(this.portfolioInfo, urlName));
    } else {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      // create the request, store the `Observable` for subsequent subscribers

      return this.http
        .get(this.urlPortfolioInfo, { headers: headers })
        .map(res => {
          let info: PortfolioInfo = deserialize(PortfolioInfo, res.json());
          return getPInfo(info, urlName);
        });
    }
  }

  private handleError (error: Response | any) {
    // learn this
    // In a real world app, you might use a remote logging infrastructure

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
