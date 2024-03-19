import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failed, setFailed] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password,
            });

            if (response.data.success) {
                const { allTodos } = response.data;
                navigate('/Calendar', { state: { allTodos, username } });
            } else {
                setFailed(true);
            }
        } catch (error) {
            console.error('login error:', error.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login">
                <h2>Login</h2>
                <form>
                    <label>Username: </label>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br></br>
                    <label>Password: </label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br></br>
                    <button onClick={handleLogin}>Login</button>
                    <br></br>
                    <p>Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
                    {failed && <p className="error-message">Incorrect username or password</p>}
                </form>
            </div>
        </div>
    );
}
 
export default Login;