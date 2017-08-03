/*
 * About Component - About me page
*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit { 

  constructor() { }
  meYears: number;
  ngOnInit() {
    let ageDifMs = Date.now() - (new Date("1991-11-17")).getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    this.meYears = Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
