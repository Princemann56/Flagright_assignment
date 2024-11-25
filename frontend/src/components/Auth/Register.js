import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/auth';
import AuthForm from './AuthForm';

const Register = () => {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');  
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!userID || !password || !role) {  // Check for role as well
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await registerUser({ userID, password, role });
            setTimeout(() => {
                navigate('/login');
            }, 1500); // Small delay to show success message
        } catch (err) {
            setError(err.message || 'Error during registration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ minWidth: '300px' }}>
                {/* <h2 className="text-center mb-4">Register</h2> */}
                <AuthForm
                    handleSubmit={handleRegister}
                    fields={[
                        { 
                            id: 'userID', 
                            label: 'User ID', 
                            type: 'text', 
                            value: userID, 
                            onChange: setUserID, 
                            placeholder: 'Enter your User ID' 
                        },
                        { 
                            id: 'password', 
                            label: 'Password', 
                            type: 'password', 
                            value: password, 
                            onChange: setPassword, 
                            placeholder: 'Enter your password' 
                        },
                        { 
                            id: 'role', 
                            label: 'Role', 
                            type: 'select', 
                            value: role,  
                            onChange: setRole, 
                            options: [
                                { value: 'user', label: 'User' },
                                { value: 'admin', label: 'Admin' }
                            ]
                        }
                    ]}
                    buttonText={isLoading ? "Registering..." : "Register"}
                    disabled={isLoading}
                />
                {error && <p className="text-danger mt-3">{error}</p>}
                <p className="mt-3 text-center">
                  Already have an account? <Link to="/login">Login here</Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
