'use strict';

exports.up = function (db, callback) {
    return db.createTable('users', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: 'string',
            notNull: true
        },
        email: {
            type: 'string',
            unique: true,
            notNull: true
        },
        reset_password_token: {
            type: 'string'
        },
        reset_password_expires: {
            type: 'datetime'
        },
        password: {
            type: 'string',
            notNull: true
        },
        created_at: {
            type: 'datetime'
        },
        updated_at: {
            type: 'datetime'
        },
        deleted_at: {
            type: 'datetime'
        }
    }, callback);
};

exports.down = function (db, callback) {
    return db.dropTable('users', callback);
};