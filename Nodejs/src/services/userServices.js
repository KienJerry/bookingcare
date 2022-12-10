import db from '../models/index';
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);

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

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true,
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `Login Succes!`;
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong Password!`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Please try order email !`
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: email
                }
            });

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    }
                })
            } else if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {
                        id: userId,
                    },
                    attributes: {
                        exclude: ['password'],
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email);
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used, Please try another email address!'
                });
            } else {
                let hashPassWordFormBcrypt = await hashUserPassWord(data.password);
                await db.User.create({
                    email: data.email,
                    firstName: data.firstName,
                    password: hashPassWordFormBcrypt,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                    phonenumber: data.phonenumber,
                })
                resolve({
                    errCode: 0,
                    message: 'Successfully!'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id },
        })
        if (!user) {
            resolve({
                errCode: 2,
                message: `The user isn't exist`
            })
        } else {
            await db.User.destroy({
                where: { id },
            });
            resolve({
                errCode: 0,
                message: `Delete Successfully!`
            })
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                });
            }
            let user = await db.User.findOne({
                where: {
                    id: data.id
                },
                raw: false,
            })
            if (user) {
                user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.address = data.address,
                    await user.save();
                resolve({
                    errCode: 0,
                    message: 'Updated Successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `User's not found!`
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
}