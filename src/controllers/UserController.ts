import { Request, Response } from "express";
import { userRepository } from '../repositories/userRepository';

export class UserController {
    async create(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const newUser = userRepository.create({ 
                username: username,
                password: password
            });

            await userRepository.save(newUser);
            
            return res.status(201).json(newUser);
        } catch (error) {
            
        }
    };

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        await userRepository.delete({ id: parseInt(id) });
        
        return res.status(200)
    };
};
