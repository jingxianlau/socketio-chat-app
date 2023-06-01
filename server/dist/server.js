"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const envalid_1 = require("./utils/envalid");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000'
}));
app.use('/api/user', userRoutes_1.default);
app.use('/api/chat', authMiddleware_1.protect, chatRoutes_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
mongoose_1.default
    .connect(envalid_1.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
}))
    .catch(err => console.log(err));
//# sourceMappingURL=server.js.map