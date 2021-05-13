import { mergeResolvers } from "graphql-tools";
import heroResolver from "./heroResolver";
import skillResolver from "./skillResolver";

export default mergeResolvers([
  heroResolver,
  skillResolver
]);
