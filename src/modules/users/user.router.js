import { Router } from "express";
import {asyncHandler} from './../../utils/asyncHandler.js'
import * as userController from './user.controller.js'
import { activationschema, changePasswordschema, emailschema, recoveryEmailschema, resetPasswordSchema, signinschema, signupSchema, updateschema } from "./user.schema.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { isAuthenticated } from "../../middlewares/aurh.middleware.js";
import { IsloggedIn } from "../../middlewares/isLoggedIn.js";

const router=Router()

// sign up

router.post('/signup',validation(signupSchema),asyncHandler(userController.signup))

// activation
router.get('/activate_account/:token',validation(activationschema) ,asyncHandler(userController.activation))

// signin

router.post('/signin',validation(signinschema),asyncHandler(userController.signin))

// update account

router.patch('/update',isAuthenticated,IsloggedIn,validation(updateschema),asyncHandler(userController.update))

// delete account

router.delete('/delete_account',isAuthenticated,IsloggedIn,asyncHandler(userController.deleteAccount))

// get user data
router.get('/',isAuthenticated,IsloggedIn,asyncHandler(userController.getUser))



// change password

router.patch('/change_password',isAuthenticated,IsloggedIn,validation(changePasswordschema),asyncHandler(userController.changePassword))

// forget code
router.patch('/forgetcode',validation(emailschema),asyncHandler(userController.forgetCode))

// reset password

router.patch('/resetpassword',validation(resetPasswordSchema),asyncHandler(userController.resetPassword))

// get account by recovery email

router.get('/recoveryemail',validation(recoveryEmailschema),asyncHandler(userController.recoveryEmail))

// get another user data

router.get('/:id',asyncHandler(userController.getAnotherUser))

export default router