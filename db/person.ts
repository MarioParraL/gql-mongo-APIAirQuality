import mongoose from "npm:mongoose@8.4.3";
import { Person } from "../types.ts";

const Schema = mongoose.Schema;
const PersonSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  capital: { type: String, required: true },
});

export type PersonModelType =
  & mongoose.Document
  & Omit<Person, "id" | "overall_aqi">
  & {
    capital: string;
  };
export const PersonModel = mongoose.model<PersonModelType>(
  "Person",
  PersonSchema,
);
