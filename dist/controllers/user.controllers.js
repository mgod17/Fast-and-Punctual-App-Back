"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = __importDefault(require("../models/Users"));
const userToken_1 = require("../token/userToken");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const existingUser = yield Users_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "The email already exists" });
        }
        const user = new Users_1.default({ email, password, role });
        yield user.save();
        const token = (0, userToken_1.generateToken)({ userId: user._id, email, role: user.role });
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Users_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Incorrect credentials" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect credentials" });
        }
        const token = (0, userToken_1.generateToken)({ userId: user._id, email, role: user.role });
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=user.controllers.js.map