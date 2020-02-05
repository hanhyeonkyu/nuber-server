import jwt from "jsonwebtoken"
import User from "../entities/User"

const decodeJWT = async (token: string): Promise<User | undefined> => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN as string)
        const { id } = decoded as { [key: string]: number }
        const user = await User.findOne({ id })
        return user
    }
    catch (err) {
        return undefined;
    }
}

export default decodeJWT