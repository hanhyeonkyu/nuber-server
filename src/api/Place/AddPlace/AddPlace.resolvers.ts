import User from "../../../entities/User";
import Place from "../../../entities/Place";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { AddPlaceMutationArgs, AddPlaceResponse } from "../../../types/graphql";


const resolvers: Resolvers = {
    Mutation: {
        AddPlace: privateResolver(async (_, args: AddPlaceMutationArgs, { req }): Promise<AddPlaceResponse> => {
            const user: User = req.user
            try {
                await Place.create({ ...args, user }).save()
                return {
                    ok: true,
                    error: null
                }
            }
            catch (err) {
                return {
                    ok: false,
                    error: err.message
                }
            }
        })
    }
}

export default resolvers
