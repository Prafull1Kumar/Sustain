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
    try {
      const newProperty = await this.propertyRepository.create(property);
      let metrice = {
        property_id: newProperty.id,
        energy_efficiency_ratio: 0,
        water_efficiency_ratio: 0,
        indoor_air_quality_index: 0,
        outdoor_air_quality_index: 0,
        green_space_area: 0,
        safety_rating: 0,
        inspector_id: undefined
      }
      await this.propertySustainabilityMetricsRepository.create(metrice);
      return newProperty;
    } catch (error) {
      throw error;
    }

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

  calculateDominantFactor(properties: Property[]): any[] {
    return properties.map(property => {
      const metrics = property.propertySustainabilityMetrics;
      if (!metrics) {
        return {
          ...property,
          factor: 'Renewable Energy'
        };
      }
      // Calculate average for each factor
      const factorScores = {
        'Renewable Energy': (metrics.energy_efficiency_ratio + metrics.water_efficiency_ratio) / 2,
        'Embodied Carbon': (metrics.indoor_air_quality_index + metrics.outdoor_air_quality_index) / 2,
        'Biodiversity': metrics.green_space_area,
        'Social Value': metrics.safety_rating
      };

      // Find the highest scoring factor
      let maxScore = -1;
      let dominantFactor = '';

      for (const [factor, score] of Object.entries(factorScores)) {
        if (score > maxScore) {
          maxScore = score;
          dominantFactor = factor;
        }
      }

      // Return property with added factor
      return {
        ...property,
        factor: dominantFactor
      };
    });
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
    // let properties = await this.propertyRepository.find({include: ['propertySustainabilityMetrics']});
    let properties = await this.propertyRepository.find({
      include: ['propertySustainabilityMetrics']
    });

    // Add factor to each property
    const propertiesWithFactors = this.calculateDominantFactor(properties);

    return propertiesWithFactors;
    // return properties;
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
