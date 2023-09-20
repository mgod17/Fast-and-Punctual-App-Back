import dotenv from 'dotenv';
import Server from './models/Server';

//config dotenv
dotenv.config();

const server = new Server();

server.listen();