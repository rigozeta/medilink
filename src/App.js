import { useState } from 'react';
import Login from './components/Login';
import TableList from './components/TableList';

import logo from './jrcg-logo.png';
import './App.scss';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  const loggingIn = (e) => {
    setUsername(e)
    setIsLoggedIn(true)
  }

  const loggingOut = () => {
    setUsername("");
    setIsLoggedIn(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      
      {!isLoggedIn && (
        <Login login={loggingIn}/>
      )}

      {isLoggedIn && (
        <TableList username={username} logout={loggingOut}/>
      )}
      
    </div>
  );
}

export default App;
