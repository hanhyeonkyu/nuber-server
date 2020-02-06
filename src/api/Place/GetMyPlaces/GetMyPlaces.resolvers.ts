import User from "../../../entities/User";
import { GetMyPlacesResponse } from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";


const resolvers: Resolvers = {
    Query: {
        GetMyPlaces: privateResolver(async (_, __, { req }): Promise<GetMyPlacesResponse> => {
            try {
                const user = await User.findOne({ id: req.user.id }, { relations: ["places"] })
                if (user) {
                    return {
                        ok: true,
                        places: user.places,
                        error: null
                    }
                }
                else {
                    return {
                        ok: false,
                        places: null,
                        error: "user not found"
                    }
                }
            }
            catch (err) {
                return {
                    ok: false,
                    places: null,
                    error: err.message
                }
            }
        })
    }
}

export default resolvers