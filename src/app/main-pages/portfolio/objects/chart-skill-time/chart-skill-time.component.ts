import { Component, ElementRef,
  NgZone,
  OnDestroy, OnInit, AfterViewInit,
  Input,
  HostBinding, HostListener } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { PortfolioInfo, ChartInfo } from '../../classes/portfolio-info';
import { PortfolioChartData, ChartData } from '../../classes/portfolio-chart-data';
import { PortfolioService } from '../../services/portfolio.service';

import {
  D3Service,
  D3,
  Axis,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition,
  TimeInterval,
  TimeLocaleDefinition,
  TimeLocaleObject,
  CountableTimeInterval,
  AxisTimeInterval,
  ScaleTime,
} from 'd3-ng2-service';

@Component({
  selector: 'chart-skill-time',
  template: '<svg style="height:1px"></svg>'
})
export class ChartSkillTimeComponent implements OnInit,OnDestroy,AfterViewInit {

  private d3: D3; 
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  portfolioInfo: PortfolioInfo;
  pageInfo;
  chartInfo: ChartInfo;
  chartData: ChartData;

  eventDates: [string, number, string][];
  dataByDateIntervals: [string, number, number, number][][];

  @Input() componentClass: string;
  @HostBinding('class') itemName = '';

  @Input() isMainPage: string;
  @Input() hasTitle: string;
  @Input() heightNotSaved: string;
  @Input() isMoreRelevant: string;

  @Input() chartID: number;
  @Input() pageID: string;

  errorMessage: string;

  //svg resize
  resizeEvent$: Subject<MouseEvent> = new Subject<MouseEvent>();
  actualResizeHandler;
  @HostListener('window:resize', ['$event'])
  onResize(event){
    //fooling mouse event
    this.resizeEvent$.next(this.drawChart(event));
  }

  constructor(element: ElementRef, d3Service: D3Service,
    public portfolioService: PortfolioService) { 

    this.d3 = d3Service.getD3(); 
    this.parentNativeElement = element.nativeElement;

    //svg resize
    this.resizeEvent$.throttleTime(500)
      .debounceTime(490).subscribe(this.actualResizeHandler);
  }

  ngOnDestroy() {
    if (this.d3Svg.empty && !this.d3Svg.empty()) {
      this.d3Svg.selectAll('*').remove();
    }
  }

  public drawChart(event) {

    let isMainPage = this.isMainPage == 'true';
    let hasTitle = this.hasTitle == 'true';
    let heightNotSaved = this.heightNotSaved == 'true';
    let isMoreRelevant = this.isMoreRelevant == 'true';

    let chartID = this.chartID;
    let chartInfo = this.chartInfo;
    let pageInfo = this.pageInfo;

    let self = this;
    let d3 = this.d3;
    let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
    let d3Svg: Selection<SVGSVGElement, any, null, undefined>;
    let d3G: Selection<SVGGElement, any, null, undefined>;
    let width: number;
    let height: number;
    let svgWidth: number;
    let svgHeight: number;
    let x: ScaleLinear<number, number>;
    let y: ScaleLinear<number, number>;
    let xAxis: Axis<number>;
    let yAxis: Axis<number>;
    let x0: [number, number];
    let y0: [number, number];
    let margin = {top: 1, right: 1, bottom: 1, left: 18};
    let axisPadding: number = 3;
    let defaultHeight: number = 60;
    let titleHeight: number = hasTitle ? 15 : 0;
    let mainCharts: number[] = [0,6,10,12,17,21];

    //if is InnerConsciousness chart - colors change
    let isInnerC:boolean = (chartID == 21);

    if (this.parentNativeElement !== null) {
      d3ParentElement = d3.select(this.parentNativeElement);

      //svg comes with a standardized height of 150px, and with grid fractions
      //the heights get 'mixed' always setting the grid-item to 150px
      //the trick is to lower the svg height to the minimum possible
      //in order to get the right grid area
      // once done, i can get the grid fraction height and set it in the svg
      d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

      //clean svg
      if (d3Svg.empty && !d3Svg.empty()) {
        d3Svg.selectAll('*').remove();
      }

      svgWidth = this.parentNativeElement.getBoundingClientRect().width;
      width = svgWidth - margin.left - margin.right;

      if (heightNotSaved) {
        svgHeight = defaultHeight;
      } else {
        svgHeight = this.parentNativeElement.getBoundingClientRect().height;
      }
      height = svgHeight - margin.top - margin.bottom - titleHeight;

      d3Svg.style('height', svgHeight + 'px');

      x0 = this.portfolioService.countWholeDateInterval();
      y0 = [0, 11];

      x = d3.scaleLinear().domain(x0).range([0, width]);
      y = d3.scaleLinear().domain(y0).range([height, 0]);

      let yTickValues = [2.5, 8.5];
      let yTickLabels = ['-', '+']; 
      // font-size change according to label below

      yAxis = d3.axisLeft<number>(y).tickValues(yTickValues)
        .tickFormat(function(d, i) { return yTickLabels[i]; });

      d3Svg.append<SVGGElement>('g')
        .attr('class', 'axis skillAxis--y')
        .classed('relevantTickText', isMoreRelevant)
        .attr('transform', 'translate('+ (margin.left - axisPadding) +','
          + (titleHeight + margin.top) +')')
        .call(yAxis);

      /*  put back once in production
      let complexity = d3.line()
        .x(function(d) { return x(d[1]); }) // cntDate
        .y(function(d) { return y(d[2]); }); // details.complexity

      let motivation = d3.line()
        .x(function(d, i) { return x(d[1]); }) // cntDate
        .y(function(d, i) { return y(d[3]); }); // details.motivation
      */

      //delete once in production
      let complexity = d3.line()
        .x(function(d) { return x(d[0]); }) // cntDate
        .y(function(d) { return y(d[1]); }); // details.complexity

      let motivation = d3.line()
        .x(function(d, i) { return x(d[0]); }) // cntDate
        .y(function(d, i) { return y(d[1]); }); // details.motivation

      let surroundingRect = d3Svg.append<SVGGElement>('g')
        .attr('class', 'borderRect')
        .attr('transform', 'translate('+ margin.left +','+ titleHeight +')');

        surroundingRect.append<SVGRectElement>('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width + margin.right)
        .attr('height', svgHeight - titleHeight)
        .attr('class', !isMoreRelevant ? 'regularSvgBorder':'relevantSvgBorder');

      let d3G = d3Svg.append<SVGGElement>('g')
        .attr('class', 'chartLines')
        .attr('transform', 'translate('+ margin.left + ',' 
          + (margin.top + titleHeight) +')');

      let d3MainLines = d3G.append<SVGGElement>('g')
        .attr('class', 'main-lines');

      d3MainLines.selectAll<SVGPathElement, any>('path.first-line')
        .data(this.dataByDateIntervals)
        .enter()
        .append('path')
        .attr('class', (isInnerC ? 'clarity-line' : 'complexity-line'))
        .attr('d', function(d) { 
          var last = d[d.length - 1];

          //put back once in production
          //return complexity(d) + 'H' + x(last[1] + 1);

          //to delete once in production
          var lol = d.map(function(rofl): [number, number]
            { return [rofl[1], rofl[2]];} );
          return complexity(lol) + 'H' + x(last[1] + 1);
        });

      let d3SecLines = d3G.append<SVGGElement>('g')
        .attr('class', 'secondary-lines');

      d3SecLines.selectAll<SVGPathElement, any>('path.first-line')
        .data(this.dataByDateIntervals)
        .enter()
        .append('path')
        .attr('class', (isInnerC ? 'happiness-line' : 'motivation-line'))
        .attr('d', function(d) { 
          var last = d[d.length - 1];

          //put back once in production
          //return motivation(d) + 'H' + x(last[1] + 1);

          //to delete once in production
          var lol = d.map(function(rofl): [number, number]
            { return [rofl[1], rofl[3]];} );
          return motivation(lol) + 'H' + x(last[1] + 1);
        });


      let eventLines = d3Svg.append<SVGGElement>('g')
        .attr('class', 'eventLines')
        .attr('transform', 'translate('+ margin.left +','
          + (titleHeight) +')');

      eventLines.selectAll<SVGLineElement, any>('line.event-stroke')
        .data(this.eventDates)
        .enter()
        .append<SVGLineElement>('line')
        .attr('class', 'event-stroke thin-strokeWidth')
        .attr('x1', function(d) { return x(d[1]); })
        .attr('x2', function(d) { return x(d[1]); })
        .attr('y1', 0)
        .attr('y2', svgHeight - titleHeight);

      if (this.pageID) {

        eventLines.selectAll<SVGLineElement, any>('line.pageID')
          .data([ pageInfo.cntStartDate, pageInfo.cntEndDate ])
          .enter()
          .append<SVGLineElement>('line')
          .attr('class', function(d) {
            var classes = 'medium-strokeWidth ';
            classes += (pageInfo.education_type ? 
              pageInfo.education_type : 'project') + '-stroke';
            return classes;
          })
          .attr('x1', function(d) { return x(d); })
          .attr('x2', function(d) { return x(d); })
          .attr('y1', 0)
          .attr('y2', svgHeight);

      }

      if (hasTitle) {
        let titleGroup = d3Svg.append<SVGGElement>('g')
          .attr('transform', 'translate('+ margin.left +','
            + (titleHeight-3) +')')
          .append<SVGTextElement>('text')
          .attr('class', function() {
            var txt = 'chart-title ';
            if (mainCharts.indexOf(chartInfo.id) !== -1)
              txt += 'tupper';
            else
              txt += 'disabled';
            return txt;
          })
          .text(chartInfo.name);
      }
    }

    return event;
  }
  ngOnInit() {
    //binding class to chart so there are no problems once we draw the charts
    this.itemName = this.componentClass;
  }

  ngAfterViewInit() { 

    // once css is settled we may draw charts
    this.portfolioService.getPortfolioChartData().subscribe( data => {

      function splitChartDataByDateIntervals(chartDataMapped) {
        var splittedData = [];
        var start = 0;

        for (var i = 1; i < chartDataMapped.length; i++) {
          if (chartDataMapped[i][1] !== chartDataMapped[i - 1][1] + 1) {
            splittedData.push(chartDataMapped.slice(start, i)); 
            start = i;
          }
        }
        splittedData.push(chartDataMapped.slice(start, chartDataMapped.length)); 
        return splittedData;
      }

      this.portfolioService.getPortfolioInfo().subscribe( info => {

        this.portfolioInfo = info;
        this.chartInfo = info.charts[this.chartID];
        this.chartData = data.charts[this.chartID];

        this.eventDates = this.portfolioInfo.events.map(
          function(e): [string, number, string] {
            return [e.date, e.cntDate, e.name];
          });

        let chartDataMapped = this.chartData.values.map( 
          function(d): [string, number, number, number] {
          return [d.date, d.cntDate, d.details.complexity, d.details.motivation];
        });

        this.dataByDateIntervals = splitChartDataByDateIntervals(chartDataMapped);

        if (this.pageID) {
          let pageID = this.pageID.split(" ");
          this.pageInfo = this.portfolioInfo[pageID[0]]
            .filter( item => item.id == parseInt(pageID[1]) )[0];
        }

        //draw chart
        this.drawChart(undefined);

      });
    });
  }

}
