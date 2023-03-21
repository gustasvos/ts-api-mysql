import { Request, Response } from "express";
import { userRepository } from '../repositories/userRepository';
import { BadRequestError } from "../helpers/api-errors";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 10);
        const userExists = await userRepository.findOneBy({ email });

        if (userExists) throw new BadRequestError('Email already exists');

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

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await userRepository.findOneBy({ email });
        
        if (!user) {
            throw new BadRequestError('invalid email or password');
        }
        
        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
            throw new BadRequestError('invalid email or password');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '1h'});

        const { password: _, ...userLogin } = user;

        return res.json({
            user: userLogin,
            token: token
        });
    };

};
