import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import companyLogo from '../../assets/images/company-logo.png';
import './Authentication.css'

export const Authentication: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleButtonClick = () => {
        navigate('/login');
    }

    const shouldShowButton = location.pathname === '/';

    return (
        <article id='auth-container'>
            <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <img src={companyLogo} alt="Company Logo" id='home-page-logo' />
                <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>Socket Playground</h1>
                {shouldShowButton && <button className="submit" onClick={handleButtonClick}>Get Started</button>}
            </section>
            <Outlet />
        </article>
    )
}
