"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const UserManagement_1 = __importDefault(require("./components/UserManagement"));
function App() {
    return (<div className="App">
      <UserManagement_1.default />
    </div>);
}
exports.default = App;
