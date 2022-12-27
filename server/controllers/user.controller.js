const connection = require('../mysql')
const sendSMS = require('../send')

const addNewUser = (phone, created = Date.now().toString()) => {
    return new Promise((res, rej) => {
        connection.query(`INSERT INTO user(phone, created) VALUES(${phone}, ${created})`,
            function(err, results) {
                if(err) {
                    rej(err);
                }
                res({
                    phone,
                    created,
                    id: results.insertId
                });
            })
    });
};

const checkUserInDB = (phoneFromClient) => {
    return new Promise((res, _rej) => {
        connection.query("SELECT * FROM user", (err, results) => {
            const checkIfUserExist = results.find(phone => phone.phone === phoneFromClient.substring(1));
            return res(checkIfUserExist);
        });
    });
}

const getOrCreate = async (phoneFromClient) => {
    try {
        let user = await checkUserInDB(phoneFromClient);

        if (!user) {
            user = await addNewUser(phoneFromClient);
        }
        return user;
    } catch (error) {
        console.log(error);
    }
}

module.exports = getOrCreate
