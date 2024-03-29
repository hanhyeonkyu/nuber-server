import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse,
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      try {
        const verification = await Verification.findOne({
          where: { payload: phoneNumber, key },
        });
        if (!verification) {
          return {
            ok: true,
            error: "Verification token not valid",
            token: null,
          };
        } else {
          verification.verified = true;
          verification.save();
        }
      } catch (err) {
        return {
          ok: true,
          error: err.message,
          token: null,
        };
      }

      try {
        const user = await User.findOne({ where: { phoneNumber } });
        console.log(user);
        if (user) {
          user.verifiedPhoneNumber = true;
          user.save();
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          return {
            ok: true,
            error: null,
            token: null,
          };
        }
      } catch (err) {
        return {
          ok: true,
          error: err.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
