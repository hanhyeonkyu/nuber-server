import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { DeletePlaceMutationArgs, DeletePlaceResponse } from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        DeletePlace: privateResolver(async (_, args: DeletePlaceMutationArgs, { req }): Promise<DeletePlaceResponse> => {
            const user: User = req.user
            try {
                const place = await Place.findOne({ id: args.placeId })
                if (place) {
                    if (place.userId === user.id) {
                        place.remove()
                        return {
                            ok: true,
                            error: null
                        }
                    }
                    else {
                        return {
                            ok: false,
                            error: "not Authorized"
                        }
                    }
                }
                else {
                    return {
                        ok: false,
                        error: "place not found"
                    }
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