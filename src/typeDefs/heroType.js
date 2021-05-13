import { buildSchema } from "graphql";

export default buildSchema(`
type Hero {
  _id: ID!
  name: String!
  date: String!
}
input HeroInput {
  name: String!
  date: String!
}
input HeroUpdate {
  _id: ID!
  name: String!
  date: String!
} 
input HeroRemove {
  _id: ID! 
} 
type RootQuery {
  heroes: [Hero!]!
  findHero(_id: ID!): Hero
}
type RootMutation {
  createHero(heroInput: HeroInput): Hero
  deleteHero(heroRemove: HeroRemove): Hero
  updateHero(heroUpdate: HeroUpdate): Hero
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`);