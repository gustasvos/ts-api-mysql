import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users') // entre aspas o nome da tabela
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    username: string;

    @Column({type: 'text' })
    password: string;
};