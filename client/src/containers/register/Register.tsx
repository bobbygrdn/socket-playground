import { useState, useRef } from 'react';
import { registerUser } from '../../service/registerService';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = (): JSX.Element => {

    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisisble] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisisble(prevState => !prevState);
    }

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        const sendRequest = registerUser({ name, email, password, confirmPassword });

        if (await sendRequest) {
            navigate('/login');
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <p className="form-title">Sign up for an account</p>
            <div className="input-container">
                <input placeholder="Enter name" type="text" ref={nameRef} required />
            </div>
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
            <div className="input-container">
                <input placeholder="Confirm password" type={isConfirmPasswordVisible ? 'text' : 'password'} ref={confirmPasswordRef} required />
                <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="toggle-password-visibility"
                >
                    {isConfirmPasswordVisible ? 'Hide' : 'Show'}
                </button>
            </div>
            <button className="submit" type="submit">
                Sign Up
            </button>

            <p className="signup-link">
                Already have an account?
                <a href="/login">Login</a>
            </p>
        </form>
    )
}