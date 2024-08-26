
const typeDefs = `#graphql
scalar JSON
scalar DateTime

type Query {
  submissions: [Submission!]!
}

type Submission {
  id: ID!
  submittedAt: DateTime!
  data: JSON!
  createdAt: DateTime!
  updatedAt: DateTime!
}
`;
export default typeDefs;
