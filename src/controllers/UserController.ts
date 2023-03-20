import { Request, Response } from "express";
import { userRepository } from '../repositories/userRepository';
import { BadRequestError } from "../helpers/api-errors";
import bcrypt from 'bcrypt';

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 10);
        const userExists = await userRepository.findOneBy({ email });

        if (userExists) throw new BadRequestError('Emails already exists');

        const newUser = userRepository.create({
            name,
            email,
            password: hashPassword
        });
        
        await userRepository.save(newUser);
        const { password: _, ...user} = newUser;
        
        // console.log(newUser.password);
        return res.status(201).json(user);
    };

};
