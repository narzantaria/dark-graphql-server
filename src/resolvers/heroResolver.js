import Hero from "../models/Hero";

const heroResolver = {
  Query: {
    heroes: () => {
      return Hero.find()
        .then((heroes) => {
          return heroes.map((hero) => {
            return {
              ...hero._doc,
              _id: hero._id,
              date: new Date(hero.date).toISOString(),
            };
          });
        })
        .catch((err) => {
          throw err;
        });
    },
    findHero: async (_, { _id }) => {
      try {
        let hero = await Hero.findById(_id);
        return {
          ...hero._doc,
          date: new Date(hero.date).toISOString(),
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    createHero: (_, { heroInput }) => {
      const hero = new Hero({
        ...heroInput,
        date: new Date(heroInput.date),
      });
      return hero
        .save()
        .then((result) => {
          return { ...result._doc, _id: result._doc._id.toString() };
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },
    deleteHero: async (_, { heroRemove }) => {
      try {
        const hero = await Hero.findById(heroRemove._id);
        return hero.remove().then((result) => {
          return { ...result._doc, _id: result._doc._id.toString() };
        });
      } catch (err) {
        throw err;
      }
    },
    updateHero: async (_, { heroUpdate }) => {
      try {
        const newHero = await Hero.findByIdAndUpdate(
          heroUpdate._id,
          {
            name: heroUpdate.name,
            date: new Date(heroUpdate.date),
          },
          { new: true }
        );
        return newHero;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};

export default heroResolver;
