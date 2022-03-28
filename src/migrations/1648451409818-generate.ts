import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1648451409818 implements MigrationInterface {
    name = 'generate1648451409818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_35ed71a604ec2eebf2cbdcf05c\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deviceId\` \`pushToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`pushToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`pushToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_46a8cb003e381c3c3566d268ca\` (\`pushToken\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_46a8cb003e381c3c3566d268ca\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`pushToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`pushToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`pushToken\` \`deviceId\` varchar(255) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_35ed71a604ec2eebf2cbdcf05c\` ON \`user\` (\`deviceId\`)`);
    }

}
