"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const envalid_1 = require("envalid");
require("dotenv/config");
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)(),
    MONGO_URI: (0, envalid_1.str)()
});
//# sourceMappingURL=envalid.js.map