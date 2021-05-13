import { mergeTypeDefs } from "graphql-tools";
import heroType from "./heroType";
import skillType from "./skillType";
import root from "./root";

export default mergeTypeDefs([
  root,
  heroType,
  skillType
]);
