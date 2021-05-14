import { mergeTypeDefs } from "graphql-tools";
import hero from "./hero.graphql";
import skill from "./skill.graphql";
import root from "./root.graphql";

export default mergeTypeDefs([
  root,
  hero,
  skill
]);
