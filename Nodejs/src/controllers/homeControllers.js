import db from "../models/index";
import CRUDService from "../services/CRUDServices";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', { data: JSON.stringify(data) });
    } catch (e) {
        console.log(e)
    }
}
let getCRUD = async (req, res) => {
    return res.render('crud/crud.ejs');
}

let postCRUD = async (req, res) => {
    await CRUDService.creactNewUser(req.body);
    return res.redirect("/get-crud");
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render('crud/displayCRUD.ejs', {
        data: data
    });
}
let getEditCRUD = async (req, res) => {
    if (req.query.id) {
        let userData = await CRUDService.getUserInfoById(req.query.id);

        return res.render('crud/editCRUD.ejs', {
            data: userData
        });
    } else {
        return res.send("Giá trị truyền vào không có dữ liệu");
    }
}

let putCRUD = async (req, res) => {
    await CRUDService.updateUserData(req.body);
    return res.redirect("/get-crud");
}

let deleteCRUD = async (req, res) => {
    if (req.query.id) {
        await CRUDService.deleteUserById(req.query.id);
        return res.redirect("/get-crud");
    } else {
        return res.send("Giá trị truyền vào không có dữ liệu");
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}