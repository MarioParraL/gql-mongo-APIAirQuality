import { GraphQLError } from "graphql";
import { PersonModelType } from "../db/person.ts";
import { getAirQualityFromCapital } from "../lib/apifunctions.ts";

export const Person = {
  overall_aqi: async (parent: PersonModelType): Promise<string> => {
    try {
      const CapitalInfo = await getAirQualityFromCapital(parent.capital);
      return CapitalInfo.overall_aqi;
    } catch (err) {
      console.log(err);
      throw new GraphQLError(err);
    }
  },
};
