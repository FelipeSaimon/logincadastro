import { logar } from "../../../services/users"

export default function handler(req, resp){
    try {
        const user = logar(req.body)
        resp.status(200).json(user)
    } catch (error) {
        resp.status(400).json(error.message)
    }
}