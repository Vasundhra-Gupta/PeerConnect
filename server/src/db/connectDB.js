import mysql from 'mysql2';
import mongoose from 'mongoose';

class DBConnection {
    constructor() {
        this.connection = null;
        this.migrationConnection = null;
    }

    static getInstance() {
        if (!DBConnection.Instance) {
            DBConnection.Instance = new DBConnection();
        }
        return DBConnection.Instance;
    }

    connect = async () => {
        try {
            if (!this.connection) {
                switch (process.env.DATABASE_TYPE) {
                    case 'MySQL': {
                        await this.connectMYSQL();
                        break;
                    }
                    case 'MongoDB': {
                        await this.connectMongoDB();
                        break;
                    }
                    default: {
                        throw new Error('Unsupported DB type');
                    }
                }
            }
            return this.connection;
        } catch (err) {
            return console.log("DB didn't connected, error:", err.message);
        }
    };

    async connectMYSQL() {
        try {
            this.connection = mysql
                .createPool({
                    host: process.env.MYSQL_HOST,
                    user: process.env.MYSQL_USER,
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DATABASE_NAME,
                })
                .promise();

            // Testing the connection
            const conn = await this.connection.getConnection();
            console.log(`MySQL connected, host: ${conn.config.host}`);
            conn.release();
        } catch (err) {
            return console.log("MySQL didn't connected, error:", err.message);
        }
    }

    async connectMongoDB() {
        try {
            this.connection = await mongoose.connect(
                `${process.env.MONGO_DB_URL}${process.env.MONGO_DB_NAME}`
            );
            console.log(
                `MongoDB connected, host: ${this.connection.connection.host}`
            );
        } catch (err) {
            return console.log("MongoDB didn't connected, error:", err.message);
        }
    }

    async mongodbMigrationConnect() {
        try {
            if (!this.migrationConnection) {
                this.migrationConnection = await mongoose.connect(
                    `${process.env.MONGO_DB_URL}${process.env.MONGO_DB_NAME}`
                );
                console.log(
                    `MongoDB connected for migration, host: ${this.migrationConnection.connection.host}`
                );
            }
            return this.migrationConnection;
        } catch (err) {
            return console.log(
                'Error in connecting MongoDB for migration.',
                err.message
            );
        }
    }

    async mongodbMigrationDisconnect() {
        try {
            if (this.migrationConnection) {
                await mongoose.disconnect();
                this.migrationConnection = null;
                console.log('MongoDB migration connection closed');
            }
            return;
        } catch (err) {
            return console.log(
                'Error in closing MongoDB migration connection.',
                err.message
            );
        }
    }
}

export const dbInstance = DBConnection.getInstance();
