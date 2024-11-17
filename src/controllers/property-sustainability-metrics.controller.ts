import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PropertySustainabilityMetrics} from '../models';
import {PropertySustainabilityMetricsRepository} from '../repositories';

export class PropertySustainabilityMetricsController {
  constructor(
    @repository(PropertySustainabilityMetricsRepository)
    public propertySustainabilityMetricsRepository : PropertySustainabilityMetricsRepository,
  ) {}

  @post('/property-sustainability-metrics')
  @response(200, {
    description: 'PropertySustainabilityMetrics model instance',
    content: {'application/json': {schema: getModelSchemaRef(PropertySustainabilityMetrics)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropertySustainabilityMetrics, {
            title: 'NewPropertySustainabilityMetrics',
            exclude: ['id'],
          }),
        },
      },
    })
    propertySustainabilityMetrics: Omit<PropertySustainabilityMetrics, 'id'>,
  ): Promise<PropertySustainabilityMetrics> {
    return this.propertySustainabilityMetricsRepository.create(propertySustainabilityMetrics);
  }

  @get('/property-sustainability-metrics/count')
  @response(200, {
    description: 'PropertySustainabilityMetrics model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PropertySustainabilityMetrics) where?: Where<PropertySustainabilityMetrics>,
  ): Promise<Count> {
    return this.propertySustainabilityMetricsRepository.count(where);
  }

  @get('/property-sustainability-metrics')
  @response(200, {
    description: 'Array of PropertySustainabilityMetrics model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PropertySustainabilityMetrics, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PropertySustainabilityMetrics) filter?: Filter<PropertySustainabilityMetrics>,
  ): Promise<PropertySustainabilityMetrics[]> {
    return this.propertySustainabilityMetricsRepository.find(filter);
  }

  @patch('/property-sustainability-metrics')
  @response(200, {
    description: 'PropertySustainabilityMetrics PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropertySustainabilityMetrics, {partial: true}),
        },
      },
    })
    propertySustainabilityMetrics: PropertySustainabilityMetrics,
    @param.where(PropertySustainabilityMetrics) where?: Where<PropertySustainabilityMetrics>,
  ): Promise<Count> {
    return this.propertySustainabilityMetricsRepository.updateAll(propertySustainabilityMetrics, where);
  }

  @get('/property-sustainability-metrics/{id}')
  @response(200, {
    description: 'PropertySustainabilityMetrics model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PropertySustainabilityMetrics, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PropertySustainabilityMetrics, {exclude: 'where'}) filter?: FilterExcludingWhere<PropertySustainabilityMetrics>
  ): Promise<PropertySustainabilityMetrics> {
    return this.propertySustainabilityMetricsRepository.findById(id, filter);
  }

  @patch('/property-sustainability-metrics/{id}')
  @response(204, {
    description: 'PropertySustainabilityMetrics PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropertySustainabilityMetrics, {partial: true}),
        },
      },
    })
    propertySustainabilityMetrics: PropertySustainabilityMetrics,
  ): Promise<void> {
    await this.propertySustainabilityMetricsRepository.updateById(id, propertySustainabilityMetrics);
  }

  @put('/property-sustainability-metrics/{id}')
  @response(204, {
    description: 'PropertySustainabilityMetrics PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() propertySustainabilityMetrics: PropertySustainabilityMetrics,
  ): Promise<void> {
    await this.propertySustainabilityMetricsRepository.replaceById(id, propertySustainabilityMetrics);
  }

  @del('/property-sustainability-metrics/{id}')
  @response(204, {
    description: 'PropertySustainabilityMetrics DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.propertySustainabilityMetricsRepository.deleteById(id);
  }
}
