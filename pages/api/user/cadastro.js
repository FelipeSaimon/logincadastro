import { cadastrar } from "../../../services/users"

export default function handler(req, res){
    try {
        const newUser = cadastrar(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json(error.message)
    }
}