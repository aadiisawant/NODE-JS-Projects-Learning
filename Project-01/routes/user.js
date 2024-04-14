const express = require("express")
const User = require('../models/user');
const { handleGetAllUsers, handleCreateUser, handleGetUserByID, handleUpdateUserById, handleDeleteUserById } = require("../controllers/user");

const router = express.Router();


router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateUser)

router.route("/:id")
    .get(handleGetUserByID)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)


module.exports = router;