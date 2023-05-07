"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000'
}));
app.get('/', (req, res) => {
    res.send('API is Running');
});
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map