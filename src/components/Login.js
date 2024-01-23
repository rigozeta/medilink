import { useState } from 'react';

import '../styles/Utils.scss'
import '../styles/Login.scss'

function Login(props) {

    const [username, setUsername] = useState("");
    const [usernameFocus, setUsernameFocus] = useState(false)
    const [password, setPassword] = useState("");
    const [passwordFocus, setPasswordFocus] = useState(false)

    const validatePassword = (pass) => {
        let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{8,}$/;
        return pattern.test(pass);
    }

    const formValid = () => {
        if(username.length < 3) {            
            return false;
        }
        
        if(!validatePassword(password)) {
            return false;
        }

        return true;
    }

    const login = (e) => {
        e.preventDefault();
        
        props.login(username);
    }
    

    return (
        <div id="Login">
            <form className="login-form" onSubmit={login}>
                <div className='form-block'>
                    <label htmlFor='username'>User Name</label>
                    <input type='text' autoComplete='off' name='username' id='username' onChange={(e) => setUsername(e.target.value)} onFocus={(e) => setUsernameFocus(true)} onBlur={(e) => setUsernameFocus(false)}/>
                    {usernameFocus && (
                        <span className='input-hint'>Username should be atleast 3 characters</span>
                    )}
                </div>
                <div className='form-block'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} onFocus={(e) => setPasswordFocus(true)} onBlur={(e) => setPasswordFocus(false)}/>
                    {passwordFocus && (
                        <span className='input-hint'>Password should be a minimum of 8 characters with at least 1 uppercase, 1 lowercase, and 1 special character</span>
                    )}
                </div>
                <div className='form-block'>
                    <button className='block btn primary' disabled={!formValid()}>Log In</button>
                </div>
            </form>
        </div>
    );
}

export default Login;