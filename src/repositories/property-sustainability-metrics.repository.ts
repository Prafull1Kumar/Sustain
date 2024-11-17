import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {PropertySustainabilityMetrics, PropertySustainabilityMetricsRelations} from '../models';

export class PropertySustainabilityMetricsRepository extends DefaultCrudRepository<
  PropertySustainabilityMetrics,
  typeof PropertySustainabilityMetrics.prototype.id,
  PropertySustainabilityMetricsRelations
> {
  constructor(
    @inject('datasources.Postgresql') dataSource: PostgresqlDataSource,
  ) {
    super(PropertySustainabilityMetrics, dataSource);
  }
}
