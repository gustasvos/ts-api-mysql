import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677374745813 implements MigrationInterface {
    name = 'default1677374745813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` text NOT NULL, \`password\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
