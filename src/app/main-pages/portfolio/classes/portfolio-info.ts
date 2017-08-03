import { JsonProperty } from 'json-typescript-mapper';
export class EventInfo {
  id: number;
  date: string;
  cntDate: number;
  name: string;
  constructor() {
    this.id = void 0;
    this.date = void 0;
    this.cntDate = void 0;
    this.name = void 0;
  }
}

export class ChartInfo {
  id: number;
  name: string;
  urlName: string;
  disabledUrl: boolean;
  redirectedTo_chart: number;
  redirectedTo_education: number;
  redirectedTo_project: number;
  relatedTo_chart: number[];
  relatedTo_education: number[];
  relatedTo_project: number[];
  description_XS: string;

  constructor() {
    this.id = void 0;
    this.name = void 0;
    this.urlName = void 0;
    this.disabledUrl = void 0;
    this.redirectedTo_chart = void 0;
    this.redirectedTo_education = void 0;
    this.redirectedTo_project = void 0;
    this.relatedTo_chart = void 0;
    this.relatedTo_education = void 0;
    this.relatedTo_project = void 0;
    this.description_XS = void 0;
  }
}

export class EducationInfo {
  id: number;
  name: string;
  urlName: string;
  disabledUrl: boolean;
  education_type: string;
  startDate: string;
  endDate: string;
  cntStartDate: number;
  cntEndDate: number;
  relatedTo_chart: number[];
  relatedTo_education: number[];
  relatedTo_project: number[];
  description_XS: string;
  atLocation: string;

  constructor() {
    this.id = void 0;
    this.name = void 0;
    this.urlName = void 0;
    this.disabledUrl = false; //always false
    this.education_type = void 0;
    this.startDate = void 0;
    this.endDate = void 0;
    this.cntStartDate = void 0;
    this.cntEndDate = void 0;
    this.relatedTo_chart = void 0;
    this.relatedTo_education = void 0;
    this.relatedTo_project = void 0;
    this.description_XS = void 0;
    this.atLocation = void 0;
  }
}

export class ProjectInfo {
  id: number;
  name: string;
  urlName: string;
  disabledUrl: boolean;
  redirectedTo_chart: number;
  redirectedTo_education: number;
  redirectedTo_project: number;
  main_display: boolean;
  startDate: string;
  endDate: string;
  cntStartDate: number;
  cntEndDate: number;
  relatedTo_chart: number[];
  relatedTo_education: number[];
  relatedTo_project: number[];
  description_XS: string;

  constructor() {
    this.id = void 0;
    this.name = void 0;
    this.urlName = void 0;
    this.disabledUrl = void 0;
    this.redirectedTo_chart = void 0;
    this.redirectedTo_education = void 0;
    this.redirectedTo_project = void 0;
    this.main_display = void 0;
    this.startDate = void 0;
    this.endDate = void 0;
    this.cntStartDate = void 0;
    this.cntEndDate = void 0;
    this.relatedTo_chart = void 0;
    this.relatedTo_education = void 0;
    this.relatedTo_project = void 0;
    this.description_XS = void 0;
  }
}

export class PortfolioInfo {
  @JsonProperty({clazz: ChartInfo, name: 'charts'})
  charts: ChartInfo[];
  @JsonProperty({clazz: ProjectInfo, name: 'projects'})
  projects: ProjectInfo[];
  @JsonProperty({clazz: EducationInfo, name: 'educations'})
  educations: EducationInfo[];
  @JsonProperty({clazz: EventInfo, name: 'events'})
  events: EventInfo[];

  constructor() {
    this.charts = void 0;
    this.projects = void 0;
    this.educations = void 0;
    this.events = void 0;
  }
}

