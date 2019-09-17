import {MigrationInterface, QueryRunner} from 'typeorm';
import * as fs from 'fs';
import { User } from '../users/users.entity';
import { Transaction } from '../transactions/transcations.entity';
import { Role } from '../roles/roles.entity';

export class CreateInitialTables1568502265624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY NOT NULL, "category" varchar NOT NULL, "type" varchar NOT NULL, "originAccount" integer NOT NULL, "beneficiaryAccount" integer NOT NULL, "amount" integer NOT NULL, "description" varchar NOT NULL, "companyId" integer NOT NULL, "date" datetime NOT NULL, "initiatorId" integer, "approverId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "companyId" integer NOT NULL, "roleId" integer)`);
        await queryRunner.query(`CREATE TABLE "role" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "maxAmount" integer, "maxTxnCount" integer, "canSend" boolean NOT NULL, "canApprove" boolean NOT NULL, "canApproveOwn" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction" ("id" integer PRIMARY KEY NOT NULL, "category" varchar NOT NULL, "type" varchar NOT NULL, "originAccount" integer NOT NULL, "beneficiaryAccount" integer NOT NULL, "amount" integer NOT NULL, "description" varchar NOT NULL, "companyId" integer NOT NULL, "date" datetime NOT NULL, "initiatorId" integer, "approverId" integer, CONSTRAINT "FK_a27ecb80756e83596ba26bba6bc" FOREIGN KEY ("initiatorId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_131e4837b6502cfe7db13a8e81b" FOREIGN KEY ("approverId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction"("id", "category", "type", "originAccount", "beneficiaryAccount", "amount", "description", "companyId", "date", "initiatorId", "approverId") SELECT "id", "category", "type", "originAccount", "beneficiaryAccount", "amount", "description", "companyId", "date", "initiatorId", "approverId" FROM "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction" RENAME TO "transaction"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "companyId" integer NOT NULL, "roleId" integer, CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "companyId", "roleId") SELECT "id", "username", "companyId", "roleId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);

        const roleData = JSON.parse(fs.readFileSync('src/migrations/initial_data/roles.json', 'utf-8'));
        queryRunner.manager.createQueryBuilder()
          .insert()
          .into(Role)
          .values(roleData)
          .execute();

        const userData = JSON.parse(fs.readFileSync('src/migrations/initial_data/users.json', 'utf-8'));
        queryRunner.manager.createQueryBuilder()
          .insert()
          .into(User)
          .values(userData.map(user => {
              return {
                  id: user.id,
                  username: user.username,
                  companyId: user.company_id,
                  roleId: user.role_id,
              };
          }))
          .execute();

        const transactionData = JSON.parse(fs.readFileSync('src/migrations/initial_data/transactions.json', 'utf-8'));
        queryRunner.manager.createQueryBuilder()
          .insert()
          .into(Transaction)
          .values(transactionData.map(transaction => {
              return {
                  id: transaction.id,
                  category: transaction.category,
                  type: transaction.type,
                  originAccount: transaction.origin_account,
                  beneficiaryAccount: transaction.beneficiary_account,
                  amount: transaction.amount,
                  description: transaction.description,
                  initiatorId: transaction.initiator_id,
                  approverId: transaction.approver_id,
                  companyId: transaction.company_id,
                  date: new Date(transaction.date),
              };
          }))
          .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "companyId" integer NOT NULL, "roleId" integer)`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "companyId", "roleId") SELECT "id", "username", "companyId", "roleId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME TO "temporary_transaction"`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY NOT NULL, "category" varchar NOT NULL, "type" varchar NOT NULL, "originAccount" integer NOT NULL, "beneficiaryAccount" integer NOT NULL, "amount" integer NOT NULL, "description" varchar NOT NULL, "companyId" integer NOT NULL, "date" datetime NOT NULL, "initiatorId" integer, "approverId" integer)`);
        await queryRunner.query(`INSERT INTO "transaction"("id", "category", "type", "originAccount", "beneficiaryAccount", "amount", "description", "companyId", "date", "initiatorId", "approverId") SELECT "id", "category", "type", "originAccount", "beneficiaryAccount", "amount", "description", "companyId", "date", "initiatorId", "approverId" FROM "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
