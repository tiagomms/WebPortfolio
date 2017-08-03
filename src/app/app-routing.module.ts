/*
 * App routes for the all pages
 */

// Angular Route Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// app pages
import { AboutComponent } from './main-pages/about/about.component';
import { PortfolioComponent } from './main-pages/portfolio/portfolio.component';
import { EducationPageStructureComponent } from './main-pages/portfolio/objects/education-page-structure/education-page-structure.component';
import { DetailedSkillsComponent } from './main-pages/portfolio/pages/detailed-skills/detailed-skills.component';
import { PortfolioExplainedComponent } from './main-pages/portfolio/pages/portfolio-explained/portfolio-explained.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'portfolio/skills', component: DetailedSkillsComponent },
  { path: 'portfolio/explained', component: PortfolioExplainedComponent },
  { path: 'portfolio/:urlName', component: EducationPageStructureComponent },
  { path: 'home', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
