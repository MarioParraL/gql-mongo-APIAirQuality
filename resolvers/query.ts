import { GraphQLError } from "graphql";
import { PersonModel } from "../db/person.ts";
export const Query = {
  getPersons: async () => {
    try {
      const persons = await PersonModel.find();
      return persons;
    } catch (err) {
      console.log(err);
      throw new GraphQLError(err);
    }
  },

  getPerson: async (_: unknown, args: { id: string }) => {
    try {
      const person = await PersonModel.findById(args.id);
      return person;
    } catch (err) {
      console.log(err);
      throw new GraphQLError(err);
    }
  },
};
