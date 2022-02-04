import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1643970691995 implements MigrationInterface {
    name = 'generate1643970691995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`plant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`kind\` varchar(255) NOT NULL, \`score\` int NOT NULL, \`level\` int NOT NULL, \`ordinalNumber\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plant_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NULL, \`kind\` varchar(255) NULL, \`startTime\` datetime NOT NULL, \`finishTime\` datetime NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`gmail\` varchar(255) NOT NULL, \`googleRefreshToken\` varchar(255) NOT NULL, \`deviceId\` varchar(255) NULL, \`plantId\` int NULL, \`mailId\` int NULL, UNIQUE INDEX \`IDX_35ed71a604ec2eebf2cbdcf05c\` (\`deviceId\`), UNIQUE INDEX \`REL_9731d005ff3be81253dabba223\` (\`plantId\`), UNIQUE INDEX \`REL_bb32edcf440c4ee8fc4dc50ea2\` (\`mailId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`totalCount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`plant_history\` ADD CONSTRAINT \`FK_decdd343650e4e233607ce92f52\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9731d005ff3be81253dabba2230\` FOREIGN KEY (\`plantId\`) REFERENCES \`plant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_bb32edcf440c4ee8fc4dc50ea25\` FOREIGN KEY (\`mailId\`) REFERENCES \`mail\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_bb32edcf440c4ee8fc4dc50ea25\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9731d005ff3be81253dabba2230\``);
        await queryRunner.query(`ALTER TABLE \`plant_history\` DROP FOREIGN KEY \`FK_decdd343650e4e233607ce92f52\``);
        await queryRunner.query(`DROP TABLE \`mail\``);
        await queryRunner.query(`DROP INDEX \`REL_bb32edcf440c4ee8fc4dc50ea2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_9731d005ff3be81253dabba223\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_35ed71a604ec2eebf2cbdcf05c\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`plant_history\``);
        await queryRunner.query(`DROP TABLE \`plant\``);
    }

}
