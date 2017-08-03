import { JsonProperty } from 'json-typescript-mapper';

export class ChartDateDetails {
  complexity: number;
  motivation: number;

  constructor() {
    this.complexity = void 0;
    this.motivation = void 0;
  }
}
export class ChartDatum {
  date: string;
  cntDate: number;
  @JsonProperty({clazz: ChartDateDetails, name: 'details'})
  details: ChartDateDetails;

  constructor() {
    this.date = void 0;
    this.cntDate = void 0;
    this.details = void 0;
  }
}
export class ChartData {
  id: number;
  @JsonProperty({clazz: ChartDatum, name: 'values'})
  values: ChartDatum[];

  constructor() {
    this.id = void 0;
    this.values = void 0;
  }
}
export class PortfolioChartData {
  @JsonProperty({clazz: ChartData, name: 'charts'})
  charts: ChartData[];
  constructor() {
    this.charts = void 0;
  }
}
