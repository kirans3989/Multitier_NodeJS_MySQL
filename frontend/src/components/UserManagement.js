"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
function UserManagement() {
    const [users, setUsers] = (0, react_1.useState)([]);
    const [newUser, setNewUser] = (0, react_1.useState)({ name: '', email: '' });
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const fetchUsers = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = yield response.json();
            setUsers(data);
            setIsLoading(false);
        }
        catch (error) {
            setError('Failed to fetch users');
            setIsLoading(false);
            console.error('There was a problem with the fetch operation:', error);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchUsers();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const response = yield fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            setNewUser({ name: '', email: '' });
            fetchUsers(); // Refresh the user list
        }
        catch (error) {
            setError('Failed to add user');
            console.error('There was a problem adding the user:', error);
        }
    });
    if (isLoading)
        return <div>Loading...</div>;
    if (error)
        return <div>Error: {error}</div>;
    return (<div className="container">
      <h1>User Management</h1>
      
      <div className="add-user-form">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" name="name" value={newUser.name} onChange={handleInputChange} placeholder="Name" required/>
          </div>
          <div>
            <input type="email" name="email" value={newUser.email} onChange={handleInputChange} placeholder="Email" required/>
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>

      <div className="user-list">
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (<tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
}
exports.default = UserManagement;
