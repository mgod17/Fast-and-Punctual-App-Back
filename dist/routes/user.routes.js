"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const router = (0, express_1.Router)();
router.post("/register", user_controllers_1.registerUser);
router.post("/login", user_controllers_1.loginUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map