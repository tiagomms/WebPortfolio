import { Component, ElementRef,
  NgZone,
  OnDestroy, OnInit, AfterViewInit, OnChanges,
  Input,
  HostBinding, HostListener } from '@angular/core';
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
  selector: 'written-events-on-timeline',
  template: '<svg class="all-visible"></svg>'
})
export class WrittenEventsOnTimelineComponent implements OnInit,AfterViewInit,
  OnDestroy, OnChanges {

  private d3: D3; 
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  portfolioInfo: PortfolioInfo;
  pageInfo;
  eventDates: Array<[string, number, string]>;
  currentPageID: string;
  toReuseComponent: boolean;

  @Input() componentClass: string;
  @HostBinding('class') itemName = '';
  @Input() isMainPage: string;
  @Input() filterOdd: string;
  @Input() pageID: string;
  @Input() hasNotMarginLeft: string;
  @Input() isUpperAxis: string;
  @Input() isTimelineAxis: string;

  errorMessage: string;

  //svg resize
  resizeEvent$: Subject<MouseEvent> = new Subject<MouseEvent>();
  actualResizeHandler;
  @HostListener('window:resize', ['$event'])
  onResize(event){
    //fooling mouse event by returning the event on the drawing Chart function
    this.resizeEvent$.next(this.drawChart(event));
  }

  constructor(element: ElementRef, d3Service: D3Service,
    public portfolioService: PortfolioService) { 

    this.d3 = d3Service.getD3(); 
    this.parentNativeElement = element.nativeElement;
    this.toReuseComponent = false; 

    //svg resize
    this.resizeEvent$.throttleTime(500)
      .debounceTime(490).subscribe(this.actualResizeHandler);
  }

  ngOnDestroy() {
    if (this.d3Svg.empty && !this.d3Svg.empty()) {
      this.d3Svg.selectAll('*').remove();
    }
  }

  ngOnInit() {
    //binding class to chart
    this.itemName = this.componentClass;
  }

  ngOnChanges() {
    if (this.toReuseComponent && this.currentPageID != this.pageID) {
      this.drawChart(undefined);
    }
  }
  ngAfterViewInit() {

    let filterOdd:number = parseInt(this.filterOdd);
    let isMainPage:boolean = this.isMainPage == 'true';

    this.portfolioService.getPortfolioInfo().subscribe(
      portfolioInfo => {
        this.portfolioInfo = portfolioInfo;
        this.eventDates = this.portfolioInfo.events.filter(
          function(e, i) {
            return (isMainPage ? i % 2 === filterOdd : true);
          })
          .map(function(e, i): [string, number, string] {
            return [e.date, e.cntDate, e.name];
          });

        if (this.pageID) {
          let pageID = this.pageID.split(" ");
          this.pageInfo = this.portfolioInfo[pageID[0]]
            .filter( item => item.id == parseInt(pageID[1]) )[0];
        }
        this.drawChart(undefined);
      });
    this.toReuseComponent = (this.pageID != undefined);
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
    let x0: [number, number];
    let y0: [number, number];
    let margin = {top: 15, right: 1, bottom: 5, left: 18};
    let tickHeight: number = 7;
    let tickPadding: number = 6;
    let ySlot: number[] = [];
    let yAbs: number;
    let orientation: number;
    let txtBottomPadding: number;
    let minimumTxtWidthBetweenDates: number = 22;
    let maxOverlapedDates: number;

    let filterOdd:number = parseInt(this.filterOdd);
    let isMainPage:boolean = this.isMainPage == 'true';
    let hasNotMarginLeft: boolean = this.hasNotMarginLeft == 'true';
    let isUpperAxis: boolean = this.isUpperAxis == 'true';
    let isTimelineAxis: boolean = this.isTimelineAxis == 'true';

    let eventDates = this.eventDates;
    let pageInfo = this.pageInfo;
    let portfolioService = this.portfolioService;

    let dateInterval: number[];
    if (this.pageID) {
      dateInterval = [
        portfolioService.countWholeDateInterval()[0],
        pageInfo.cntStartDate,
        pageInfo.cntEndDate,
        portfolioService.countWholeDateInterval()[1]
      ]
    }
    else {
      dateInterval = portfolioService.countWholeDateInterval();
    }


    function currentCntDatesOverlap( 
      date1: number, date2: number, fixedWidth: number
    )
    {
      return Math.abs(x(date2) - x(date1)) <= fixedWidth;
    }

    function getVacantYSlot( cntDate: number ) {
      var ySlotLength = ySlot.length;
      if (ySlotLength === 0) {
        ySlot.push(cntDate);
        return 0;
      }

      var indexOfElement = ySlot.indexOf(cntDate);
      if (indexOfElement !== -1)
        return indexOfElement;

      for (var i=0; i < ySlotLength; i++) {
        if (!currentCntDatesOverlap(ySlot[i], cntDate, minimumTxtWidthBetweenDates)) {
          ySlot[i] = cntDate;
          return i;
        }
      }
      ySlot.push(cntDate);
      return ySlotLength;
    }

    function getMaxOverlapedDates(dateInterval: number[])
    {
      for (var i=0; i < dateInterval.length; i++) {
        getVacantYSlot(dateInterval[i]);
      }
      return ySlot.length;
    }

    if (this.parentNativeElement !== null) {
      d3ParentElement = d3.select(this.parentNativeElement);

      d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

      if (this.d3Svg.empty && !this.d3Svg.empty()) {
        this.d3Svg.selectAll('*').remove();
      }

      svgWidth = this.parentNativeElement.getBoundingClientRect().width;
      margin.left = (hasNotMarginLeft ? 1 : margin.left);
      width = svgWidth - margin.left - margin.right;

      x0 = portfolioService.countWholeDateInterval();
      x = d3.scaleLinear().domain(x0).range([0 , width]);

      maxOverlapedDates = getMaxOverlapedDates(dateInterval.reverse());

      height = (this.filterOdd === "0" || this.filterOdd === "1" ? 50 :
        (this.isTimelineAxis ? 113 :
        (maxOverlapedDates - 1) * 20 + 15));


      svgHeight = height + margin.top + margin.bottom;
      d3Svg.style('height', svgHeight + 'px');


      let d3G = d3Svg.append<SVGGElement>('g')
        .attr('class', 'allEventsOnTimeline')
        .attr('transform', 'translate('+ margin.left +','+ 0 +')');

      yAbs = (filterOdd == 0 || isUpperAxis ? svgHeight : 0);
      orientation = (filterOdd == 0 || isUpperAxis ? -1 : 1);
      txtBottomPadding = (orientation == -1 ? 0 : 4);

      let d3EventOnTimeline = d3G
        .selectAll<SVGGElement, any>('g.eventOnTimeline')
        .data(eventDates)
        .enter()
        .append<SVGGElement>('g')
        .attr('class', 'eventOnTimeline');

      /* in Main Page case - two different axis, above and below the timeline
       * chart */
      if (isMainPage) {
        let d3EventOnTimelineDiv = d3EventOnTimeline
          .append<SVGForeignObjectElement>('foreignObject')
          .attr('transform', 'translate('+ (-margin.left) +','+ 0 +')')
          .attr('width', function(d, i) {
            var r;
            if (i === 0) {
              if (filterOdd === 0) {
                r = x(eventDates[i+1][1] + eventDates[i][1]);
              } else {
                r = x(eventDates[i+1][1] - eventDates[i][1]);
              }
            }
            else if (i + 1 == eventDates.length) {
              r = x(eventDates[i][1] - eventDates[i-1][1]);
            } else {
              r = Math.min(x(eventDates[i+1][1] - eventDates[i][1]),
                x(eventDates[i][1] - eventDates[i-1][1]));
            }
            return Math.round(r - tickPadding);
          })
          .attr('x', function(d, i) {
            var r, min;
            if (i === 0) {
              if (filterOdd === 0) {
                r = -x(eventDates[i+1][1] + eventDates[i][1])/2;
              }
              else {
                r = x(eventDates[i][1]);
                r-= x(eventDates[i+1][1] - eventDates[i][1])/2;
              }
            }
            else {
              if (i + 1 == eventDates.length) {
                min = x(eventDates[i][1] - eventDates[i-1][1]);
              } else {
                min = Math.min(x(eventDates[i+1][1] - eventDates[i][1]),
                  x(eventDates[i][1] - eventDates[i-1][1]));
              }
              r = x(eventDates[i][1]) - min/2;
            }
            // foreignObjects are not affected by groups, hence margin.left
            return Math.round(r + tickPadding/2 + margin.left);
          })
          .attr('y', tickHeight + tickPadding / 2)
          .attr('height', height)
            .append("xhtml:div")
            .attr('class', function(d, i) {
              var r = 'eventTextDiv';
              r += ' ' + (filterOdd === 0 ? 'flex-end ' : 'flex-start ');
              return r + ' ' + 'talign-center';
            })
            .html(function(d, i) {
              var spanDate = "<span><i>" + d[0] + "</i></span>";
              var spanText = "<span>" + d[2] + "</span>";
              return spanDate + spanText;
            });

        d3EventOnTimeline.append<SVGLineElement>('line')
          .attr('x1', function(d) { return x(d[1]); })
          .attr('x2', function(d) { return x(d[1]); })
          .attr('y1', yAbs)
          .attr('y2', yAbs + tickHeight * orientation)
          .attr('class', 'event-stroke timelineAxis-strokeWidth');
      }
      /* is TimelineAxis - one axis with the events written above and below a
       * central line */
      else if (isTimelineAxis) {

        let sectionHeight = 50;
        let d3EventOnTimelineDiv = d3EventOnTimeline
          .append<SVGForeignObjectElement>('foreignObject')
          .attr('transform', 'translate('+ (-margin.left) +','+ 0 +')')
          .attr('width', function(d, i) {
            var r;
            if (i === 0 ) {
              r = x(eventDates[i+2][1] + eventDates[i][1]);
            }
            else if (i == 1) {
              r = x(eventDates[i+2][1] - eventDates[i][1]);
            }
            else if (i + 2 >= eventDates.length) {
              r = x(eventDates[i][1] - eventDates[i-2][1]);
            } else {
              r = Math.min(x(eventDates[i+2][1] - eventDates[i][1]),
                x(eventDates[i][1] - eventDates[i-2][1]));
            }
            return Math.round(r - tickPadding);
          })
          .attr('x', function(d, i) {
            var r, min;
            if (i == 0) {
              r = -x(eventDates[i+2][1] + eventDates[i][1])/2;
            }
            else if (i == 1) {
              r = x(eventDates[i][1]);
              r-= x(eventDates[i+2][1] - eventDates[i][1])/2;
            }
            else {
              if (i + 2 >= eventDates.length) {
                min = x(eventDates[i][1] - eventDates[i-2][1]);
              } else {
                min = Math.min(x(eventDates[i+2][1] - eventDates[i][1]),
                  x(eventDates[i][1] - eventDates[i-2][1]));
              }
              r = x(eventDates[i][1]) - min/2;
            }
            // foreignObjects are not affected by groups, hence margin.left
            return Math.round(r + tickPadding/2 + margin.left);
          })
          .attr('y', function (d, i) { 
            return (i % 2 == 0 ? 0 : 
              height / 2 + tickHeight + tickPadding / 2);
          })
          .attr('height', sectionHeight)
            .append("xhtml:div")
            .attr('class', function(d, i) {
              var r = 'eventTextDiv disabled';
              r += ' ' + (i % 2 == 0 ? 'flex-end ' : 'flex-start ');
              return r + ' ' + 'talign-center';
            })
            .html(function(d, i) {
              var spanDate = "<span><i>" + d[0] + "</i></span>";
              var spanText = "<span>" + d[2] + "</span>";
              return spanDate + spanText;
            });

        d3EventOnTimeline.append<SVGLineElement>('line')
          .attr('x1', function(d) { return x(d[1]); })
          .attr('x2', function(d) { return x(d[1]); })
          .attr('y1', (height - tickHeight) / 2)
          .attr('y2', (height + tickHeight) / 2)
          .attr('class', 'event-stroke timelineAxis-strokeWidth');

        d3G.append<SVGLineElement>('line')
          .attr('x1', 0)
          .attr('x2', width)
          .attr('y1', (height) / 2)
          .attr('y2', (height) / 2)
          .attr('class', 'event-stroke thin-strokeWidth');

        if (this.pageID != undefined && this.pageID.indexOf('charts') == -1) {

          let d3IntervalDatesGroup = d3G.append<SVGGElement>('g')
            .attr('class', 'intervalDates');

          d3IntervalDatesGroup.selectAll<SVGLineElement, any>('line.pageID')
            .data( [pageInfo.cntStartDate, pageInfo.cntEndDate] )
            .enter()
            .append<SVGLineElement>('line')
            .attr('class', function() {
              var classes = 'timelineAxis-strokeWidth ';
              classes += (pageInfo.education_type ? 
                pageInfo.education_type : 'project') + '-stroke';
              return classes;
            })
            .attr('x1', function(d) { return x(d); })
            .attr('x2', function(d) { return x(d); })
            .attr('y1', (height - tickHeight) / 2)
            .attr('y2', (height + tickHeight) / 2);
        }
      }

      /* else - just the lines representing the events, but with no text */
      else {

        let d3IntervalDatesGroup = d3G.append<SVGGElement>('g')
          .attr('class', 'intervalDates');

        d3IntervalDatesGroup.selectAll<SVGLineElement, any>('line.pageID')
          .data(dateInterval.reverse())
          .enter()
          .append<SVGLineElement>('line')
          .attr('class', function(d, i) {
            if (i == 0 || i == dateInterval.length -1)
              return 'medium-strokeAxis regularSvgBorder';
            var classes = 'timelineAxis-strokeWidth ';
            classes += (pageInfo.education_type ? 
              pageInfo.education_type : 'project') + '-stroke';
            return classes;
          })
          .attr('x1', function(d) { return x(d); })
          .attr('x2', function(d) { return x(d); })
          .attr('y1', yAbs)
          .attr('y2', function(d, i) {
            var ifPageIDTimesTickHeight = getVacantYSlot(d) * 4;
            if (ifPageIDTimesTickHeight === 0)
              ifPageIDTimesTickHeight = 1;
            return yAbs + (tickHeight * ifPageIDTimesTickHeight * orientation);
          })

        let d3IntervalDates = d3IntervalDatesGroup
          .selectAll<SVGTextElement, any>('text.intervalDates')
          .data(dateInterval.reverse())
          .enter()
          .append<SVGTextElement>('text')
          .attr('class', 'dateText')
          .attr('transform', function(d) {
            return 'translate(' + x(d) + ')';
          })
          .attr('y', function(d, i) {
            var ifPageIDTimesAxisPadding = getVacantYSlot(d) + 1;
            return (yAbs + (22 * ifPageIDTimesAxisPadding - txtBottomPadding) 
              * orientation);
          });

        d3IntervalDates.append('tspan')
          .attr('x', 0)
          .attr('dy', 0)
          .attr('text-anchor', 'middle')
          .text(function(d) {
            var date = (portfolioService.getMonthByCountDate(d)).split(" ");
            return date[0];
          });

        d3IntervalDates.append('tspan')
          .attr('x', 0)
          .attr('dy', '1.4em')
          .attr('text-anchor', 'middle')
          .text(function(d) {
            var date = (portfolioService.getMonthByCountDate(d)).split(" ");
            return date[1];
          });

        d3EventOnTimeline.append<SVGLineElement>('line')
          .attr('x1', function(d) { return x(d[1]); })
          .attr('x2', function(d) { return x(d[1]); })
          .attr('y1', yAbs)
          .attr('y2', yAbs + tickHeight * orientation)
          .attr('class', 'event-stroke timelineAxis-strokeWidth');
      }
    }
    this.currentPageID = this.pageID;
    return event;
  }
}
