const fs = require('fs');
const crypto = require('crypto');
const e = require('express');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class usersRepository extends Repository {
    async create(attrs) {

        attrs.id = this.randomId();
        const salt = crypto.randomBytes(8).toString('hex');
        const buf = await scrypt(attrs.password, salt, 64);


        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        }
        records.push(record);
        await this.writeAll(records);

        return record;
    }

    async comparePasswords(saved, supplied){

        const [hashed, salt] = saved.split('.')
        const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

        return hashed === hashedSuppliedBuf.toString('hex')
    }
}

module.exports = new usersRepository('users.json'); 

