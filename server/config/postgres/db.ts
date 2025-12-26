import { Sequelize } from "sequelize";

export const postgres = new Sequelize('short_db', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: console.log,
});


try {
    await postgres.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}