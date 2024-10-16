import React from 'react';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">User Management System</h1>
      </header>
      <main>
        <UserList />
      </main>
    </div>
  );
}

export default App;
