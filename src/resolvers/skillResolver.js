import Skill from "../models/Skill";

const skillResolver = {
  Query: {
    skills: () => {
      return Skill.find()
        .then((skills) => {
          return skills.map((skill) => {
            return {
              ...skill._doc,
              _id: skill._id,
              date: new Date(skill.date).toISOString(),
            };
          });
        })
        .catch((err) => {
          throw err;
        });
    },
    findSkill: async (_, { _id }) => {
      try {
        let skill = await Skill.findById(_id);
        return {
          ...skill._doc,
          date: new Date(skill.date).toISOString(),
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    createSkill: (_, { skillInput }) => {
      const skill = new Skill({
        ...skillInput,
        date: new Date(skillInput.date),
      });
      return skill
        .save()
        .then((result) => {
          return { ...result._doc, _id: result._doc._id.toString() };
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },
    deleteSkill: async (_, { skillRemove }) => {
      try {
        const skill = await Skill.findById(skillRemove._id);
        return skill.remove().then((result) => {
          return { ...result._doc, _id: result._doc._id.toString() };
        });
      } catch (err) {
        throw err;
      }
    },
    updateSkill: async (_, { skillUpdate }) => {
      try {
        const newSkill = await Skill.findByIdAndUpdate(
          skillUpdate._id,
          {
            description: skillUpdate.description,
            date: new Date(skillUpdate.date),
          },
          { new: true }
        );
        return newSkill;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};

export default skillResolver;
