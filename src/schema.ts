import { GraphQLSchema } from "graphql"
import { makeExecutableSchema } from "graphql-tools"
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"
import path from "path"

const allTypes: GraphQLSchema[] = fileLoader(
    path.join(__dirname, "./api/**/*.graphql")
)

const allResolvers: any = fileLoader(
    path.join(__dirname, "./api/**/*.resolvers.*")
)

const mergeType: any = mergeTypes(allTypes)
const mergeResolver: any = mergeResolvers(allResolvers)

const schema = makeExecutableSchema({
    typeDefs: mergeType,
    resolvers: mergeResolver
})

export default schema

