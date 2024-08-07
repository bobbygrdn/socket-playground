import { useState, useRef } from 'react';
import { loginUser } from '../../service/loginService';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login: React.FC = (): JSX.Element => {

    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [checked, setChecked] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        const sendRequest = loginUser({ email, password });

        // TODO: Update to login the user upon success and not login the user upon any other response
        if (await sendRequest) {
            navigate('/home');
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