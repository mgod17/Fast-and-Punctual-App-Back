"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretToken = process.env.SECRET_TOKEN || "FAST&FURIUS";
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, secretToken, { expiresIn: "2h" });
};
exports.generateToken = generateToken;
const validateToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secretToken);
    }
    catch (error) {
        return null;
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=userToken.js.map