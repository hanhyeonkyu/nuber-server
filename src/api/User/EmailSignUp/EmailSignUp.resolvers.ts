import User from "../../../entities/User";
import { EmailSignUpMutationArgs, EmailSignUpResponse } from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT"
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../..//utils/sendEmail";

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
            const { email } = args
            try {
                const existingUser = await User.findOne({ email })
                if (existingUser) {
                    return {
                        ok: false,
                        error: "You have already signed up our page",
                        token: null
                    }
                }
                else {
                    const phoneVerification = await Verification.findOne({
                        payload: args.phoneNumber,
                        verified: true
                    })
                    if (phoneVerification) {
                        const newUser = await User.create({ ...args }).save()
                        if (newUser) {
                            if (newUser.email) {
                                const emailVerification = await Verification.create({
                                    payload: newUser.email,
                                    target: "EMAIL"
                                })
                                await sendVerificationEmail(newUser.fullName, emailVerification.key)
                            }
                            const token = createJWT(newUser.id)
                            return {
                                ok: true,
                                error: null,
                                token
                            }
                        }
                        else {
                            return {
                                ok: false,
                                error: "It is not created new user through something to error in server",
                                token: null
                            }
                        }
                    }
                    else {
                        return {
                            ok: false,
                            error: "You haven't verified phone number",
                            token: null
                        }
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