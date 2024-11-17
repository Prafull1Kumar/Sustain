import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Property,
  PropertySustainabilityMetrics,
} from '../models';
import {PropertyRepository, PropertySustainabilityMetricsRepository} from '../repositories';

export class PropertyPropertySustainabilityMetricsController {
  constructor(
    @repository(PropertyRepository) protected propertyRepository: PropertyRepository,
    @repository(PropertySustainabilityMetricsRepository) protected propertySustainabilityMetricsRepository: PropertySustainabilityMetricsRepository,
  ) { }

  @get('/properties/{id}/property-sustainability-metrics', {
    responses: {
      '200': {
        description: 'Property has one PropertySustainabilityMetrics',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PropertySustainabilityMetrics),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PropertySustainabilityMetrics>,
  ): Promise<PropertySustainabilityMetrics> {
    return this.propertyRepository.propertySustainabilityMetrics(id).get(filter);
  }

  @post('/properties/{id}/property-sustainability-metrics', {
    responses: {
      '200': {
        description: 'Property model instance',
        content: {'application/json': {schema: getModelSchemaRef(PropertySustainabilityMetrics)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Property.prototype.id,
    @requestBody({}) propertySustainabilityMetrics: any,
  ): Promise<PropertySustainabilityMetrics> {
    propertySustainabilityMetrics.property_id = id;
    return this.propertySustainabilityMetricsRepository.create(propertySustainabilityMetrics)
    // return this.propertyRepository.propertySustainabilityMetrics(id).create(propertySustainabilityMetrics);
  }

  @patch('/properties/{id}/property-sustainability-metrics', {
    responses: {
      '200': {
        description: 'Property.PropertySustainabilityMetrics PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropertySustainabilityMetrics, {partial: true}),
        },
      },
    })
    propertySustainabilityMetrics: Partial<PropertySustainabilityMetrics>,
    @param.query.object('where', getWhereSchemaFor(PropertySustainabilityMetrics)) where?: Where<PropertySustainabilityMetrics>,
  ): Promise<Count> {
    try {
      return this.propertyRepository.propertySustainabilityMetrics(id).patch(propertySustainabilityMetrics, where);
    } catch (error) {
      throw error;
    }

  }

  @del('/properties/{id}/property-sustainability-metrics', {
    responses: {
      '200': {
        description: 'Property.PropertySustainabilityMetrics DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PropertySustainabilityMetrics)) where?: Where<PropertySustainabilityMetrics>,
  ): Promise<Count> {
    return this.propertyRepository.propertySustainabilityMetrics(id).delete(where);
  }
}
