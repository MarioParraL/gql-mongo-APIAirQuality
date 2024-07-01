export const typeDefs = `#graphql
    type Person {
        id: ID!
        name: String!
        phone: String!
        country: String!
        overall_aqi: String!
    }

    type Query {
        getPersons: [Person!]!
        getPerson(id:ID!): Person!
    }

    type Mutation {
        addPerson(name: String!, phone: String!): Person!
        deletePerson(id:ID!): Boolean!
        updatePerson(id:ID!, name: String, phone: String): Person!
    }
`;
