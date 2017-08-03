/*
* PortfolioHeaderLinkComponent - input introtext, title1, title2,
*   color and background color. We also add the css classes, in this case
*   bootstrap widths
*   Goal: being our headers links for other pages / activate functionalities
*/

import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'portfolio-header-link',
  templateUrl: './portfolio-header-link.component.html',
  styleUrls: ['./portfolio-header-link.component.css']
})

export class PortfolioHeaderLinkComponent implements OnInit {

  @Input() phlPageTitle: string;
  @Input() phlPageSubtitle: string;

  @Input() phlIntroText: string;
  @Input() phlTitle1: string;
  @Input() phlTitle2: string;

  @Input() phlBgColorClass: string;
  @Input() phlBindingClass: string;

  @Input() headerLink: string;

  @HostBinding('class') itemName = '';

  ngOnInit() {
    this.itemName = this.phlBindingClass;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  navigateInPortfolioTo(headerLink: string): void {
    if (headerLink == "main")
      this.router.navigate(['/portfolio']);
    else if (headerLink)
      this.router.navigate(['/portfolio', headerLink]);
    else
      window.location.reload();
  }

}
