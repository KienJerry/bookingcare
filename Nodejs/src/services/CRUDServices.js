import bcrypt from 'bcryptjs';
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let creactNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWordFormBcrypt = await hashUserPassWord(data.password);
            await db.User.create({
                email: data.email,
                firstName: data.firstname,
                password: hashPassWordFormBcrypt,
                lastName: data.lastname,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phonenumber: data.phonenumber,
            })
            resolve('Successfully created!');
        } catch (e) {
            reject(e);
        }
    });
}

let hashUserPassWord = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWord = await bcrypt.hashSync(password, salt);
            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
}

let getUserInfoById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: true,
            });
            if (users) {
                resolve(users);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    });
}

let updateUserData = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id
                },
                raw: false,
            })
            if (user) {
                user.firstName = data.firstname;
                user.lastName = data.lastname;
                user.address = data.address;
                await user.save();
                resolve();
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: false,
            })

            if (user) {
                await user.destroy();
                resolve();
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
}


module.exports = {
    creactNewUser: creactNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}