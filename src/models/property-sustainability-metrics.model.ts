import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'property_sustainability_metrics',
  strict: false
})
export class PropertySustainabilityMetrics extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid'
  })
  id?: string;

  @property({
    type: 'string',
    required: false,
  })
  inspector_id: string;

  @property({
    type: 'string',
    required: false,
  })
  property_id: string;

  @property({
    type: 'number',
    default: 0
  })
  energy_efficiency_ratio: number;

  @property({
    type: 'number',
    default: 0
  })
  water_efficiency_ratio: number;

  @property({
    type: 'number',
    default: 0
  })
  indoor_air_quality_index: number;

  @property({
    type: 'number',
    default: 0
  })
  outdoor_air_quality_index: number;

  @property({
    type: 'number',
    default: 0
  })
  green_space_area: number;

  @property({
    type: 'number',
    default: 0
  })
  safety_rating: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PropertySustainabilityMetrics>) {
    super(data);
  }
}

export interface PropertySustainabilityMetricsRelations {
  // describe navigational properties here
}

export type PropertySustainabilityMetricsWithRelations = PropertySustainabilityMetrics & PropertySustainabilityMetricsRelations;
