import Hero from '../models/Hero';

export default {
  heroes: () => {
    return Hero.find()
      .then(heroes => {
        console.log(heroes);
        return heroes.map(hero => {
          return {
            ...hero._doc,
            _id: hero._id,
            date: new Date(hero.date).toISOString()
          };
        });
      })
      .catch(err => {
        throw err;
      });
  },
  findHero: async (args) => {
    try {
      let hero = await Hero.findById(args._id);
      return {
        ...hero._doc,
        date: new Date(hero.date).toISOString()
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createHero: args => {
    const hero = new Hero({
      name: args.heroInput.name,      
      date: new Date(args.heroInput.date)
    });
    return hero
      .save()
      .then(result => {
        console.log(result);
        return { ...result._doc, _id: result._doc._id.toString() };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  deleteHero: async (args) => {
    try {
      console.log(args);
      const hero = await Hero.findById(args.heroRemove._id);
      return hero.remove().then(result => {
        return { ...result._doc, _id: result._doc._id.toString() };
      });
    } catch (err) {
      throw err;
    }
  },
  updateHero: async (args) => {
    try {
      const newHero = await Hero.findByIdAndUpdate(
        args.heroUpdate._id,
        {
          name: args.heroUpdate.name,
          date: new Date(args.heroUpdate.date)
        },
        { new: true }
      );
      return newHero;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};