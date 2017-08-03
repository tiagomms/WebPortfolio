// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';

// external libraries imports
import { D3Service } from 'd3-ng2-service';
import * as $ from 'jquery';
import * as _ from 'underscore'
import { AlertModule } from 'ngx-bootstrap';

// App routings
import { AppRoutingModule } from './app-routing.module';

// App Components
import { AppComponent } from './app.component';
import { AboutComponent } from './main-pages/about/about.component';
import { PortfolioComponent } from './main-pages/portfolio/portfolio.component';
import { MainHeaderComponent } from './app-objects/main-header/main-header.component';
import { PortfolioHeaderLinkComponent } from './main-pages/portfolio/objects/portfolio-header-link/portfolio-header-link.component';
import { PortfolioProjectLinksComponent } from './main-pages/portfolio/objects/portfolio-project-links/portfolio-project-links.component';
import { ProjectTimelineChartComponent } from './main-pages/portfolio/objects/project-timeline-chart/project-timeline-chart.component';
import { WrittenEventsOnTimelineComponent } from './main-pages/portfolio/objects/written-events-on-timeline/written-events-on-timeline.component';
import { DetailedSkillsComponent } from './main-pages/portfolio/pages/detailed-skills/detailed-skills.component';

// Directives
import { ModalComponent } from './app-directives/modal/modal.component';

// Services
import { PortfolioService } from './main-pages/portfolio/services/portfolio.service';
import { ModalService } from './app-services/modal.service';

import { ChartSkillTimeComponent } from './main-pages/portfolio/objects/chart-skill-time/chart-skill-time.component';
import { EducationPageStructureComponent } from './main-pages/portfolio/objects/education-page-structure/education-page-structure.component';
import { ModalChartComponent } from './main-pages/portfolio/objects/modal-chart/modal-chart.component';
import { DynamicModalComponent } from './app-objects/dynamic-modal/dynamic-modal.component';
import { ModalPageTimelineComponent } from './main-pages/portfolio/objects/modal-page-timeline/modal-page-timeline.component';
import { ChartCaptionsComponent } from './main-pages/portfolio/objects/chart-captions/chart-captions.component';
import { BiofeedbackProjectComponent } from './main-pages/portfolio/pages/biofeedback-project/biofeedback-project.component';
import { ModalImageComponent } from './main-pages/portfolio/objects/modal-image/modal-image.component';
import { BiomechanicsGaitCycleComponent } from './main-pages/portfolio/pages/biomechanics-gait-cycle/biomechanics-gait-cycle.component';
import { PlacementComponent } from './main-pages/portfolio/pages/placement/placement.component';
import { MasterThesisComponent } from './main-pages/portfolio/pages/master-thesis/master-thesis.component';
import { GastagusComponent } from './main-pages/portfolio/pages/gastagus/gastagus.component';
import { ComputationalNeuroscienceComponent } from './main-pages/portfolio/pages/computational-neuroscience/computational-neuroscience.component';
import { Ecole42Component } from './main-pages/portfolio/pages/ecole-42/ecole-42.component';
import { GerAppComponent } from './main-pages/portfolio/pages/ger-app/ger-app.component';
import { PortfolioProjectPageComponent } from './main-pages/portfolio/pages/portfolio-project-page/portfolio-project-page.component';
import { BiomedicalEngineeringComponent } from './main-pages/portfolio/pages/biomedical-engineering/biomedical-engineering.component';
import { EducationTechnologyComponent } from './main-pages/portfolio/pages/education-technology/education-technology.component';
import { WebProgrammingComponent } from './main-pages/portfolio/pages/web-programming/web-programming.component';
import { DesignXpComponent } from './main-pages/portfolio/pages/design-xp/design-xp.component';
import { EducationXpComponent } from './main-pages/portfolio/pages/education-xp/education-xp.component';
import { MathematicsXpComponent } from './main-pages/portfolio/pages/mathematics-xp/mathematics-xp.component';
import { OtherProgrammingXpComponent } from './main-pages/portfolio/pages/other-programming-xp/other-programming-xp.component';
import { InnerConsciousnessComponent } from './main-pages/portfolio/pages/inner-consciousness/inner-consciousness.component';
import { PortfolioExplainedComponent } from './main-pages/portfolio/pages/portfolio-explained/portfolio-explained.component';
import { AlertCssComponent } from './app-objects/alert-css/alert-css.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    PortfolioComponent,
    MainHeaderComponent,
    PortfolioHeaderLinkComponent,
    PortfolioProjectLinksComponent,
    ProjectTimelineChartComponent,
    WrittenEventsOnTimelineComponent,
    ChartSkillTimeComponent,
    EducationPageStructureComponent,
    ModalComponent,
    ModalChartComponent,
    DynamicModalComponent,
    ModalPageTimelineComponent,
    ChartCaptionsComponent,
    DetailedSkillsComponent,
    BiofeedbackProjectComponent,
    ModalImageComponent,
    BiomechanicsGaitCycleComponent,
    PlacementComponent,
    MasterThesisComponent,
    GastagusComponent,
    ComputationalNeuroscienceComponent,
    Ecole42Component,
    GerAppComponent,
    PortfolioProjectPageComponent,
    BiomedicalEngineeringComponent,
    EducationTechnologyComponent,
    WebProgrammingComponent,
    DesignXpComponent,
    EducationXpComponent,
    MathematicsXpComponent,
    OtherProgrammingXpComponent,
    InnerConsciousnessComponent,
    PortfolioExplainedComponent,
    AlertCssComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers:    [ D3Service, PortfolioService, ModalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
