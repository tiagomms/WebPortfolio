/*
 * PortfolioProjectLinksComponent - input title, subtext, and background color
 *   text color always white
 */

import { Component, Input, 
  AfterViewInit, OnDestroy,
  Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';

import { PortfolioInfo,
  ProjectInfo, EducationInfo, ChartInfo } from '../../classes/portfolio-info';

import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'portfolio-project-links',
  templateUrl: './portfolio-project-links.component.html',
  styleUrls: ['./portfolio-project-links.component.css']
})

export class PortfolioProjectLinksComponent implements AfterViewInit {

  errorMessage: string;
  @Input() isMainPage: string;
  @Input() toSplit: string;
  @Input() pageID: string;
  @Input() projectsTitle: string;

  portfolioInfo: PortfolioInfo;

  projectsFilteredList: ProjectInfo[];
  worksFilteredList: EducationInfo[];
  educationsFilteredList: EducationInfo[];
  volunteersFilteredList: EducationInfo[];

  isItMainPage: boolean;
  isToSplit: boolean;
  isASkill: boolean;
  isThereAnyEducation: boolean;
  XProjects: number = 7;
  isMoreThanXProjects: boolean;
  countColumns: number;


  getProjectsTitle(): string {
    if (this.pageID == "charts 21")
      return "Related Events";
    return this.projectsTitle;
  }
  // function to add data-attribute to help hover interactivity between lines
  // and links
  concatLink(jsonKey:string, id:number) { 
    return 'link' + jsonKey + id.toString();
  }
  // function to add interactivity between lines and respective links while
  // hovering
  hoverLines(jsonKey:string, id:number, isOver: boolean) {
    let _allChartLines = document.querySelectorAll(
      '[data-hover="line' + jsonKey + id.toString() + '"]');

    for (var i = 0; i < _allChartLines.length; i++) {
      if (isOver) {
        _allChartLines[i].classList.add('hover');
      } else {
        _allChartLines[i].classList.remove('hover');
      }
    }
  }

  constructor (public portfolioService: PortfolioService,
    private renderer: Renderer2,
    private cdRef:ChangeDetectorRef,
    private el: ElementRef) { 
  }

  ngAfterViewInit() { 
    this.getInfoLists();
    this.cdRef.detectChanges();
  }

  getInfoLists() {
    let isMainPage = this.isMainPage == 'true';

    this.portfolioService.getPortfolioInfo().subscribe(
      portfolioInfo => {
        this.portfolioInfo = portfolioInfo;

        if (isMainPage) {
          this.projectsFilteredList = this.portfolioInfo.projects
            .filter( project => project.main_display === true )

          this.educationsFilteredList = this.portfolioInfo.educations
            .filter( ed => ed.education_type === "education" );
          this.volunteersFilteredList = this.portfolioInfo.educations
            .filter( ed => ed.education_type === "volunteering" );
          this.worksFilteredList = this.portfolioInfo.educations
            .filter( ed => ed.education_type === "working" );

        } 
        else if (this.pageID) {

          let pageID = this.pageID.split(" ");
          let itemInfo = this.portfolioInfo[pageID[0]]
            .filter( item => item.id == parseInt(pageID[1]))[0];

          if (itemInfo.relatedTo_project) {
            this.projectsFilteredList = this.portfolioInfo.projects
              .filter ( project =>
                (itemInfo.relatedTo_project).indexOf(project.id) != -1)
          } 
          else {
            this.projectsFilteredList = [];
          }
          if (itemInfo.relatedTo_education) {
            this.educationsFilteredList = this.portfolioInfo.educations
              .filter( ed => 
                ed.education_type === "education" 
                && (itemInfo.relatedTo_education).indexOf(ed.id) != -1);
            this.volunteersFilteredList = this.portfolioInfo.educations
              .filter( ed => 
                ed.education_type === "volunteering" 
                && (itemInfo.relatedTo_education).indexOf(ed.id) != -1);
            this.worksFilteredList = this.portfolioInfo.educations
              .filter( ed => 
                ed.education_type === "working" 
                && (itemInfo.relatedTo_education).indexOf(ed.id) != -1);
          } 
          else {
            this.educationsFilteredList = [];
            this.volunteersFilteredList = [];
            this.worksFilteredList = [];
          }
        } 
        else {
          this.projectsFilteredList = this.portfolioInfo.projects;
          this.educationsFilteredList = this.portfolioInfo.educations;
          this.volunteersFilteredList = [];
          this.worksFilteredList = [];

        }

        this.projectsFilteredList.reverse();
        this.educationsFilteredList.reverse();
        this.volunteersFilteredList.reverse();
        this.worksFilteredList.reverse();

        this.isItMainPage = this.isMainPage == 'true';
        this.isToSplit = this.toSplit == 'true';

        this.isASkill = (this.pageID != undefined &&
          this.pageID.indexOf('charts') != -1);

        this.isThereAnyEducation = (this.worksFilteredList.length +
            this.educationsFilteredList.length +
            this.volunteersFilteredList.length) != 0;

        this.isMoreThanXProjects = (this.projectsFilteredList.length 
          > this.XProjects);

        this.countColumns = (!this.isToSplit ? 1 : 
          (this.isASkill && this.isThereAnyEducation ? 3 : 2));

      }, error =>  this.errorMessage = <any>error);
  }
}

