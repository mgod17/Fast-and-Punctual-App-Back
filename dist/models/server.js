"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const conections_1 = __importDefault(require("../db/conections"));
class Server {
    constructor() {
        this.apiPaths = {
            users: "/api/users",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8080";
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
        const corsOptions = {
            origin: "http://localhost:3000",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true,
        };
        this.app.use((0, cors_1.default)(corsOptions));
        //JSON
        this.app.use(express_1.default.json());
        //MORGAN
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(body_parser_1.default.json());
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
//# sourceMappingURL=server.js.map