import User from "../../../entities/User";
import Place from "../../../entities/Place";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import cleanNullArgs from "../../../utils/cleanNullArgs";


const resolvers: Resolvers = {
    Mutation: {
        EditPlace: privateResolver(async (_, args: EditPlaceMutationArgs, { req }): Promise<EditPlaceResponse> => {
            const user: User = req.user
            try {
                const place = await Place.findOne({ id: args.placeId })
                if (place) {
                    if (place.userId === user.id) {
                        const notNull = cleanNullArgs(args)
                        await Place.update({ id: args.placeId }, { ...notNull })
                        return {
                            ok: true,
                            error: null
                        }
                    } else {
                        return {
                            ok: false,
                            error: "not authorized"
                        }
                    }
                }
                else {
                    return {
                        ok: false,
                        error: "no place found"
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