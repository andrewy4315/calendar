import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failed, setFailed] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                username,
                password,
            });
    
            if (response.data) {
                navigate('/Calendar');
            } else {
                setFailed(true);
            }
        } catch (error) {
            console.error('u fucked up:', error.message);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup">
                <h2>Sign Up</h2>
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
                    <button onClick={handleSignup}>Sign Up</button>
                    <br></br>
                    <p>Already have an account? <Link to="/">Log In</Link></p>
                    {failed && <p className="error-message">This username is alreay occupied.</p>}
                </form>
            </div>
        </div>
    );
}
 
export default Login;