import heroResolver from './heroResolver';
import skillResolver from './skillResolver';

export default {
  ...heroResolver,
  ...skillResolver
};