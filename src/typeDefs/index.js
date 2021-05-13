import { buildSchema } from "graphql";
import heroType from "./heroType";
import skillType from "./skillType";

export default buildSchema(`
type Query {
  _empty: String
}
type Mutation {
  _empty: String
}
${heroType}
${skillType}
`);
