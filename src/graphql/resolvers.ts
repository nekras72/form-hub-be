import GraphQLJSON from "graphql-type-json";
import { DateTimeScalar } from 'graphql-date-scalars';
import db from "../modules/db";

import { GraphQLScalarType, Kind } from 'graphql';

const resolvers = {
    JSON: GraphQLJSON,
    DateTime: DateTimeScalar,

    Query: {
        submissions: () => {
            return db.submission.findMany({ orderBy: { submittedAt: 'desc' } })
        },
    },
}

export default resolvers;