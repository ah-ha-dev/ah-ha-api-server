import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1648551673279 implements MigrationInterface {
    name = 'generate1648551673279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plant_history\` CHANGE \`kind\` \`kind\` enum ('GREENONION', 'TOMATO', 'BROCCOLI') NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_87ba178d1393e55a6fef127005\` (\`notification\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_6296ab31ced9292089f807dd41\` (\`notificationLimit\`)`);
        await queryRunner.query(`ALTER TABLE \`plant_history\` CHANGE \`kind\` \`kind\` enum ('GREENONION', 'TOMATO', 'BROCCOLI') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plant_history\` CHANGE \`kind\` \`kind\` enum ('GREENONION', 'TOMATO', 'BROCCOLI') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_6296ab31ced9292089f807dd41\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_87ba178d1393e55a6fef127005\``);
        await queryRunner.query(`ALTER TABLE \`plant_history\` CHANGE \`kind\` \`kind\` enum ('GREENONION', 'TOMATO', 'BROCCOLI') NOT NULL`);
    }

}
