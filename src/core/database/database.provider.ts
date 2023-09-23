import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './db.config';
// import { User } from 'src/modules/users/user.entity';
import { Client } from 'pg';
import * as pg from 'pg';
import { User } from 'src/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      try {
        const { host, port, username, password, database } = config;
        const client = new Client({
          user: username,
          password: password,
          host: host,
        });

        client.connect();
        let res =  await client.query(`SELECT 1 from pg_database WHERE datname = '${database}'`);
        if (
         res.rowCount == 1
          // `$( psql -XtAc "SELECT 1 FROM pg_database WHERE datname='${database}'" )" = '1`
          // `psql ${database} -c '\q' 2>&1`
        ) {

          console.log('Database already exists!');
          const sequelize = new Sequelize(config);
          sequelize.addModels([User]);
          await sequelize.sync();
          console.log('Connection has been established successfully.');
          return sequelize;
         
        } else {
          console.log("Database does not exist!");
         
          client.query(`CREATE DATABASE ${database};`, async (err, res) => {
            console.log('err', err);
            console.log('res', res);

            const sequelize = new Sequelize(config);
            sequelize.addModels([User]);
            await sequelize.sync();
            console.log('Connection has been established successfully.');
            client.end();
            return sequelize;
          });
        }
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    },
  },
];
