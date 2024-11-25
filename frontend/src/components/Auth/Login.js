import React, { useState, useContext } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { loginUser } from '../../services/auth';
import AuthForm from './AuthForm';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await loginUser({ userID, password });
            login(data.token);
            navigate('/dashboard');
        } catch {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ minWidth: '300px' }}>
                {/* <h2 className="text-center mb-4">Login</h2> */}
                <AuthForm
                    handleSubmit={handleLogin}
                    fields={[
                        { id: 'userID', label: 'User ID', type: 'text', value: userID, onChange: setUserID, placeholder: 'Enter your User ID' },
                        { id: 'password', label: 'Password', type: 'password', value: password, onChange: setPassword, placeholder: 'Enter your password' },
                    ]}
                    buttonText="Login"
                />
                {error && <p className="text-danger text-center mt-3">{error}</p>}
                <div className="text-center mt-3">
                    <p className="mb-0">
                        Don't have an account? {' '}
                        <Link to="/register" className="text-primary">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
