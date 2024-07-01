import { GraphQLError } from "graphql";
import { PersonModel, PersonModelType } from "../db/person.ts";
import { getInfoFromPhone } from "../lib/apifunctions.ts";
import { getCapitalFromCountry } from "../lib/apifunctions.ts";

export const Mutation = {
  addPerson: async (
    _: unknown,
    args: { name: string; phone: string },
  ): Promise<PersonModelType> => {
    try {
      const phoneInfo = await getInfoFromPhone(args.phone);
      if (!phoneInfo.is_valid) {
        throw new Error("Invalid phone number");
      }

      const countryInfo = await getCapitalFromCountry(
        phoneInfo.country,
      );

      const person = new PersonModel({
        name: args.name,
        phone: args.phone,
        country: phoneInfo.country,
        capital: countryInfo[0].capital,
      });

      await person.save();
      return person;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },

  deletePerson: async (_: unknown, args: { id: string }): Promise<Boolean> => {
    try {
      const person = await PersonModel.deleteOne({ _id: args.id });
      return person.deletedCount === 1;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },

  updatePerson: async (
    _: unknown,
    args: { id: string; name: string; phone: string },
  ): Promise<PersonModelType> => {
    try {
      const person = await PersonModel.findById(args.id);
      if (!person) {
        throw new GraphQLError("No person founded");
      }

      if (args.phone && args.phone !== person.phone) {
        const phoneInfo = await getInfoFromPhone(args.phone);
        if (!phoneInfo.is_valid) {
          "Invalid phone number";
        }

        const countryInfo = await getCapitalFromCountry(
          phoneInfo.country,
        );

        person.phone = args.phone;
        person.capital = countryInfo[0].capital;
      }

      if (args.name) {
        person.name = args.name;
      }

      await person.save();
      return person;
    } catch (err) {
      throw new GraphQLError(err);
    }
  },
};
