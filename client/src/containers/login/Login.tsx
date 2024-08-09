import { useState, useRef, useContext } from 'react';
import { loginUser } from '../../service/loginService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Login.css';

interface User {
    _id: string;
    name: string;
    email: string;
    profilePic: string;
}

interface Response {
    success: boolean;
    message: string;
    statusCode: number;
    responseObject: User;
}

export const Login: React.FC = (): JSX.Element => {

    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const sendRequest: Response = await loginUser({ email, password });

            if (sendRequest.success) {
                userContext?.setUser(sendRequest.responseObject);
                localStorage.setItem('userInfo', JSON.stringify(sendRequest.responseObject));
                navigate('/home');
            } else {
                console.error('Error logging in:', sendRequest.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <p className="form-title">Sign in to your account</p>
            <div className="input-container">
                <input placeholder="Enter email" type="email" ref={emailRef} required />
            </div>
            <div className="input-container">
                <input placeholder="Enter password" type={isPasswordVisible ? 'text' : 'password'} ref={passwordRef} required />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="toggle-password-visibility"
                >
                    {isPasswordVisible ? 'Hide' : 'Show'}
                </button>
            </div>
            <button className="submit" type="submit">
                Sign in
            </button>

            <p className="signup-link">
                No account?
                <a href="/register">Sign up</a>
            </p>
        </form>
    )
}