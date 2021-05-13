import Skill from '../models/Skill';

const skillResolver = {
  skills: () => {
    return Skill.find()
      .then(skills => {
        return skills.map(skill => {
          return {
            ...skill._doc,
            _id: skill._id,
            date: new Date(skill.date).toISOString()
          };
        });
      })
      .catch(err => {
        throw err;
      });
  },
  findSkill: async (args) => {
    try {
      let skill = await Skill.findById(args._id);
      return {
        ...skill._doc,
        date: new Date(skill.date).toISOString()
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createSkill: args => {
    const skill = new Skill({
      description: args.skillInput.description,      
      date: new Date(args.skillInput.date)
    });
    return skill
      .save()
      .then(result => {
        return { ...result._doc, _id: result._doc._id.toString() };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  deleteSkill: async (args) => {
    try {
      const skill = await Skill.findById(args.skillRemove._id);
      return skill.remove().then(result => {
        return { ...result._doc, _id: result._doc._id.toString() };
      });
    } catch (err) {
      throw err;
    }
  },
  updateSkill: async (args) => {
    try {
      const newSkill = await Skill.findByIdAndUpdate(
        args.skillUpdate._id,
        {
          description: args.skillUpdate.description,
          date: new Date(args.skillUpdate.date)
        },
        { new: true }
      );
      return newSkill;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};

export default skillResolver;