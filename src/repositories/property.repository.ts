import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {Property, PropertyRelations, PropertySustainabilityMetrics} from '../models';
import {PropertySustainabilityMetricsRepository} from './property-sustainability-metrics.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {

  public readonly propertySustainabilityMetrics: HasOneRepositoryFactory<PropertySustainabilityMetrics, typeof Property.prototype.id>;

  constructor(
    @inject('datasources.Postgresql') dataSource: PostgresqlDataSource, @repository.getter('PropertySustainabilityMetricsRepository') protected propertySustainabilityMetricsRepositoryGetter: Getter<PropertySustainabilityMetricsRepository>,
  ) {
    super(Property, dataSource);
    this.propertySustainabilityMetrics = this.createHasOneRepositoryFactoryFor('propertySustainabilityMetrics', propertySustainabilityMetricsRepositoryGetter);
    this.registerInclusionResolver('propertySustainabilityMetrics', this.propertySustainabilityMetrics.inclusionResolver);
  }
}
