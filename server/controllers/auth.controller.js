import { authService } from "../services/auth.service.js";




export const registerUser = async (req, res) => {
    try {
        const user = req.body
        const result = await authService.registerUser(user);
        console.log("User registration result:", result);
        if(result.success) {
                   res.status(201).json(result);
        }

    } catch (err) {
        console.log("Error during user registration:", err);
        
        res.status(500).send({ error: err.message });
    }
}
export const logUser = async (req, res) => {
    try {
        console.log("Logging in user with data:", req.body);
        
        const { email, password } = req.body
        const result = await authService.logUser(email, password);
        console.log("User login result:", result);
        if(result.success) {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}
