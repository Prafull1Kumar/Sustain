import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {Property} from '../models';
import {PropertyRepository, PropertySustainabilityMetricsRepository} from '../repositories';

export class PropertyController {
  constructor(
    @repository(PropertyRepository)
    public propertyRepository: PropertyRepository,
    @repository(PropertySustainabilityMetricsRepository)
    public propertySustainabilityMetricsRepository: PropertySustainabilityMetricsRepository,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
  ) { }

  @post('/properties')
  // @authenticate('jwt')
  @response(200, {
    description: 'Property model instance',
    content: {'application/json': {schema: getModelSchemaRef(Property)}},
  })
  async create(
    @requestBody({})
    property: any,
  ): Promise<Property> {
    // property.inspector_id = this.user.id
    const newProperty = await this.propertyRepository.create(property);
    await this.propertySustainabilityMetricsRepository.create({property_id: newProperty.id});
    return newProperty;
  }

  @get('/properties/count')
  @response(200, {
    description: 'Property model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Property) where?: Where<Property>,
  ): Promise<Count> {
    return this.propertyRepository.count(where);
  }

  @get('/properties')
  @response(200, {
    description: 'Array of Property model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Property, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Property) filter?: Filter<Property>,
  ): Promise<Property[]> {
    return this.propertyRepository.find(filter);
  }

  @patch('/properties')
  @response(200, {
    description: 'Property PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Property, {partial: true}),
        },
      },
    })
    property: Property,
    @param.where(Property) where?: Where<Property>,
  ): Promise<Count> {
    return this.propertyRepository.updateAll(property, where);
  }

  @get('/properties/{id}')
  @response(200, {
    description: 'Property model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Property, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Property, {exclude: 'where'}) filter?: FilterExcludingWhere<Property>
  ): Promise<Property> {
    return this.propertyRepository.findById(id, filter);
  }

  @patch('/properties/{id}')
  @response(204, {
    description: 'Property PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Property, {partial: true}),
        },
      },
    })
    property: Property,
  ): Promise<void> {
    await this.propertyRepository.updateById(id, property);
  }

  @put('/properties/{id}')
  @response(204, {
    description: 'Property PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() property: Property,
  ): Promise<void> {
    await this.propertyRepository.replaceById(id, property);
  }

  @del('/properties/{id}')
  @response(204, {
    description: 'Property DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.propertyRepository.deleteById(id);
  }
}
