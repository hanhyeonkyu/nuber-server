import User from "../../../entities/User"
import { EmailSignInMutationArgs, EmailSignInResponse } from '../../../types/graphql'
import { Resolvers } from "../../../types/resolvers"
import createJWT from "../../../utils/createJWT"

const resolvers: Resolvers = {
    Mutation: {
        EmailSignIn: async (_, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
            const { email, password } = args
            try {
                const user = await User.findOne({ email })
                if (!user) {
                    return {
                        ok: false,
                        error: "No User with that email",
                        token: null
                    }
                }
                const checkPassword = await user.comparePassword(password)
                if (checkPassword) {
                    const token = createJWT(user.id)
                    return {
                        ok: true,
                        error: null,
                        token
                    }
                }
                else {
                    return {
                        ok: false,
                        error: "Wrong password",
                        token: null
                    }
                }
            }
            catch (err) {
                return {
                    ok: false,
                    error: err.message,
                    token: null
                }
            }
        }
    }
}

export default resolvers