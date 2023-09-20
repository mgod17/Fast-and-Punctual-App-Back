"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const conections_1 = __importDefault(require("../db/conections"));
class Server {
    constructor() {
        this.apiPaths = {
            users: "/api/users",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        //initial methods
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        (0, conections_1.default)();
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //JSON
        this.app.use(express_1.default.json());
        //MORGAN
        this.app.use((0, morgan_1.default)("dev"));
    }
    routes() {
        this.app.use(this.apiPaths.users, user_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server listening on port " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map