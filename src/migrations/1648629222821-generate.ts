import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1648629222821 implements MigrationInterface {
    name = 'generate1648629222821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`pushToken_UNIQUE\` ON \`user\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`pushToken_UNIQUE\` ON \`user\` (\`pushToken\`)`);
    }

}
