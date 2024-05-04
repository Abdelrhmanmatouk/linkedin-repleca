import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { isAuthenticated } from "../../middlewares/aurh.middleware.js";
import { IsHR } from "../../middlewares/isHR.js";
import { bonus } from "./bonus.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { bonusSchema } from "./bonus.schema.js";

const router = Router()


router.get('/',isAuthenticated,IsHR,asyncHandler(bonus))


export default router