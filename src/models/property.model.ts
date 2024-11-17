import {Entity, model, property, hasOne} from '@loopback/repository';
import {PropertySustainabilityMetrics} from './property-sustainability-metrics.model';

@model({
  name: 'property',
  strict: false
})
export class Property extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid'
  })
  id?: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: [
        'PROFESSIONAL',
        'EDUCATIONAL',
        'SPORTS',
        'RESIDENTIAL',
        'HOSPITAL',
        'RETAIL',
        'INDUSTRIAL',
        'HOSPITALITY',
        'GOVERNMENT',
        'MIXED_USE'
      ],
    },
    default: 'EDUCATIONAL'
  })
  type?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
  })
  address_line_1: string;

  @property({
    type: 'string',
    required: false,
  })
  address_line_2: string;

  @property({
    type: 'string',
    required: false,
  })
  city: string;

  @property({
    type: 'string',
    required: false,
  })
  country: string;

  @property({
    type: 'string',
    required: false,
  })
  zip_code: string;

  @property({
    type: 'string',
    required: false,
  })
  inspector_id: string;

  @hasOne(() => PropertySustainabilityMetrics, {keyTo: 'property_id'})
  propertySustainabilityMetrics: PropertySustainabilityMetrics;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
