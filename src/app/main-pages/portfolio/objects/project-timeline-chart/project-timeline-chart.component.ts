import { Component, ElementRef,
  NgZone,
  OnDestroy, OnInit, AfterViewInit,
  Input,
  HostBinding, HostListener } from '@angular/core';
import { Location }               from '@angular/common';

import { Subject }    from 'rxjs/Subject';

import { PortfolioInfo, ProjectInfo, EducationInfo, ChartInfo, EventInfo } from '../../classes/portfolio-info';
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
  selector: 'project-timeline-chart',
  template: '<svg></svg>'
})
export class ProjectTimelineChartComponent implements OnInit,AfterViewInit,OnDestroy {

  private d3: D3; 
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  portfolioInfo: PortfolioInfo;
  pageInfo;

  eventDates: Array<[string, number, string]>;
  projectDates: Array<[number, string, number, number, string, string, boolean]>;

  @Input() componentClass: string;
  @HostBinding('class') itemName = '';
  @Input() timelineType: string;
  @Input() isMainPage: string;
  @Input() hasNotMarginLeft: string;
  @Input() thisID: string;
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
    public portfolioService: PortfolioService, private location: Location) { 

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

  private drawChart(event) {

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
    let margin = {top: 12, right: 1, bottom: 6, left: 18};
    let yRowGapPadding: number = 12;

    let ySlot: Array<[number, string, number, number, string, string, boolean]> = new Array();

    let timelineType: string = this.timelineType;
    let pdLenght: number = this.projectDates.length;
    let pageInfo = this.pageInfo;

    let isMainPage: boolean = this.isMainPage == 'true';
    let hasNotMarginLeft: boolean = this.hasNotMarginLeft == 'true';

    /*
     * currentCntDatesOverlap returns true if the comparison startDate 
     * element is between the current startDate and EndDate
     */
    function currentCntDatesOverlap(
      element: [number, string, number, number, string, string, boolean],
      thisCntStartDate: number, thisCntEndDate: number) 
    {
      return element[2] >= thisCntStartDate && element[2] <= thisCntEndDate;
    }

    /*
     * getMaxOverlapedDates returns the maximum of items which dates overlap
     * Important to get the set the Svg Height (linePadding * maxOverlap +
     * chart padding top & bottom )
     * the idea is to run the getVacantYSlot prior to everything
     */
    function getMaxOverlapedDates(
      filteredList: Array<[number, string, number, number, string, string, boolean]>)
    {
      for (var i=0; i < filteredList.length; i++) {
        getVacantYSlot(filteredList[i]);
      }
      return ySlot.length;
    }

    /*
     * getVacantYSlot pushes a new item if all the item dates in the array
     * overlap (all items in array currentCntDatesOverlap = true), or 
     * the array is empty.
     * if an item in the array does not overlap it is replaced
     * return: index of the new item
     * if this item already exists, it is returned its index.
     */
    function getVacantYSlot(
      element: [number, string, number, number, string, string, boolean]) {
      var ySlotLength = ySlot.length;
      if (ySlotLength === 0) {
        ySlot.push(element);
        return 0;
      }

      var indexOfElement = ySlot.indexOf(element);
      if (indexOfElement !== -1)
        return indexOfElement;

      for (var i=0; i < ySlotLength; i++) {
        if (!currentCntDatesOverlap(ySlot[i], element[2], element[3])) {
          ySlot[i] = element;
          return i;
        }
      }
      ySlot.push(element);
      return ySlotLength;
    }


    if (this.parentNativeElement !== null) {
      d3ParentElement = d3.select(this.parentNativeElement);

      d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

      //clean svg
      if (this.d3Svg.empty && !this.d3Svg.empty()) {
        this.d3Svg.selectAll('*').remove();
      }

      let projectOverlap = getMaxOverlapedDates(this.projectDates);
      if (projectOverlap == 0) {
        d3Svg.style('height', projectOverlap);
        d3ParentElement.style('height', projectOverlap);
        return event;
      }

      height = yRowGapPadding * projectOverlap;
      svgHeight = height + margin.top + margin.bottom;

      svgWidth = this.parentNativeElement.getBoundingClientRect().width;
      margin.left = (hasNotMarginLeft ? 1 : margin.left);
      width = svgWidth - margin.left - margin.right;

      d3Svg.style('height', svgHeight + 'px');

      x0 = this.portfolioService.countWholeDateInterval();
      y0 = [0, projectOverlap - 1];

      x = d3.scaleLinear().domain(x0)
        .range([0, width]);
      y = d3.scaleLinear().domain(y0)
        .range([0, height]);

      d3Svg.append<SVGGElement>('g')
        .attr('class', 'borderRect')
        .attr('transform', 'translate('+ margin.left +','+ 0 +')')
        .append<SVGRectElement>('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width + margin.right)
        .attr('height', svgHeight)
        .attr('class', 'regularSvgBorder');

      let eventLines = d3Svg.append<SVGGElement>('g')
        .attr('class', 'eventLines')
        .attr('transform', 'translate('+ margin.left +','+ 0 +')');

      eventLines.selectAll<SVGLineElement, any>('line.event-stroke')
        .data(this.eventDates)
        .enter()
        .append<SVGLineElement>('line')
        .attr('class', 'event-stroke thin-strokeWidth')
        .attr('x1', function(d) { return x(d[1]); })
        .attr('x2', function(d) { return x(d[1]); })
        .attr('y1', 0)
        .attr('y2', svgHeight);

      if (pageInfo) {

        eventLines.selectAll<SVGLineElement, any>('line.thisID')
          .data([pageInfo.cntStartDate, pageInfo.cntEndDate])
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

      let d3TimelineLines = d3Svg.selectAll<SVGGElement, any>('g.timeline')
        .data(this.projectDates)
        .enter()
        .append<SVGGElement>('g')
        .attr('class', 'timeline')
        .attr('transform', 'translate('+ margin.left +','+ margin.top +')')

        .append<SVGAElement>('a')
          .attr('xlink:href', function(d) {
            if (!d[6])
              return '/portfolio/' + d[5];
            return;
          })
          .classed('disabled', function(d) { return d[6]; })

          //interactivity - link connected to this chart line 'hovered'
          // class 'hover' was created for this purpose
          .attr('data-hover', function(d) { return 'line' +timelineType+ d[0]; })
          .on('mouseover', function(d) {
            d3.selectAll('[data-hover="link' +timelineType+ d[0] + '"]')
              .each(function() {
                if (this)
                  d3.select(this).classed('hover', true);
              });
          })
          .on('mouseleave', function(d) {
            d3.selectAll('[data-hover="link' + timelineType + d[0] + '"]')
              .each(function() {
                if (this)
                  d3.select(this).classed('hover', false);
              });
          });

      d3TimelineLines.append<SVGRectElement>('rect')
        .attr('x', function(d) { return x(d[2]); })
        .attr('y', function(d) { return y(getVacantYSlot(d))-yRowGapPadding+2;})
        .attr('width', function(d) { return x(d[3]-d[2]); })
        .attr('height', function(d) { return yRowGapPadding; })
        .attr('class', 'rectNoFillNoStroke');

      d3TimelineLines.append<SVGLineElement>('line')
        .attr('x1', function(d) { return x(d[2]); })
        .attr('x2', function(d) { return x(d[3]); })
        .attr('y1', function(d) { return y(getVacantYSlot(d)); })
        .attr('y2', function(d) { return y(getVacantYSlot(d)); })
        .attr('class', function(d) {
          var classLineName = (d[4] !== '' ? d[4] : 'project');
          return classLineName + '-stroke  timeline-strokeWidth'; 
        });
      d3TimelineLines.append<SVGLineElement>('line')
        .attr('x1', function(d) { return x(d[2]); })
        .attr('x2', function(d) { return x(d[2]); })
        .attr('y1', function(d) { return y(getVacantYSlot(d)) - 3; })
        .attr('y2', function(d) { return y(getVacantYSlot(d)) + 3; })
        .attr('class', function(d) {
          var classLineName = (d[4] !== '' ? d[4] : 'project');
          return classLineName + '-stroke  timeline-strokeWidth'; 
        });
      d3TimelineLines.append<SVGLineElement>('line')
        .attr('x1', function(d) { return x(d[3]); })
        .attr('x2', function(d) { return x(d[3]); })
        .attr('y1', function(d) { return y(getVacantYSlot(d)) - 3; })
        .attr('y2', function(d) { return y(getVacantYSlot(d)) + 3; })
        .attr('class', function(d) {
          var classLineName = (d[4] !== '' ? d[4] : 'project');
          return classLineName + '-stroke  timeline-strokeWidth'; 
        });
      d3TimelineLines.append<SVGTextElement>('text')
        .attr('x', function(d) { return x(d[2] + (d[3] - d[2])/2); })
        .attr('y', function(d) { return y(getVacantYSlot(d)); })
        .attr('transform', 'translate(0, -2)')
        .attr('text-anchor', 'middle')
        .attr('class', 'regularSvgText')
        .text(function(d, i) { 
          if (timelineType == "projects")
            return pdLenght - i;
          return d[1];
        });
    }

    return event;
  }

  ngOnInit() {
    //binding class to chart
    this.itemName = this.componentClass;
  }

  ngAfterViewInit() {

    //variables for data binding to private mappings
    let filteredList;
    let isMainPage: boolean = this.isMainPage == 'true';

    this.portfolioService.getPortfolioInfo().subscribe(
      portfolioInfo => {
        this.portfolioInfo = portfolioInfo;
        if (isMainPage) {

          if (this.timelineType == "projects") {
            filteredList = this.portfolioInfo.projects
              .filter( project => project.main_display === true );
          } else {
            filteredList = this.portfolioInfo.educations;
          }

        } else if (this.thisID) {

          let thisID = this.thisID.split(" ");
          let thisInfo = this.portfolioInfo[thisID[0]]
            .filter( item => item.id == parseInt(thisID[1]) )[0];

          if (this.timelineType == "projects") {
            filteredList = (thisInfo.relatedTo_project ?
              this.portfolioInfo.projects
                .filter( project => 
                  (thisInfo.relatedTo_project).indexOf(project.id) != -1) :
              []);
          } else {
            filteredList = (thisInfo.relatedTo_education ?
              this.portfolioInfo.educations
              .filter( ed => 
                (thisInfo.relatedTo_education).indexOf(ed.id) != -1) :
              []);
          }
        }

        if (this.pageID) {

          let pageID = this.pageID.split(" ");
          this.pageInfo = this.portfolioInfo[pageID[0]]
            .filter( item => item.id == parseInt(pageID[1]) )[0];
        }

        this.eventDates = this.portfolioInfo.events.map(
          function(e): [string, number, string] {
            return [e.date, e.cntDate, e.name];
          }
        );


        this.projectDates = filteredList.map(
          function(p): [number, string, number, number, string, string, boolean] { 
            return [p.id, p.description_XS, p.cntStartDate, p.cntEndDate,
              (p.education_type ? p.education_type : ''), p.urlName, p.disabledUrl];
          })

        this.drawChart(undefined);
      }, error =>  this.errorMessage = <any>error);
  }

}
