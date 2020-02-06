import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { ReportMovementMutationArgs, ReportMovementResponse } from "../../../types/graphql"
import privateResolver from "../../../utils/privateResolver";
import cleanNullArgs from "../../../utils/cleanNullArgs";


const resolvers: Resolvers = {
    Mutation: {
        ReportMovement: privateResolver(async (_, args: ReportMovementMutationArgs, { req }): Promise<ReportMovementResponse> => {
            const user: User = req.user
            const notNull = cleanNullArgs(args)
            try {
                await User.update({ id: user.id }, { ...notNull })
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