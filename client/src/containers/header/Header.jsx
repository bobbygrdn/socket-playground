import './Header.css';
import companyLogo from '../../assets/images/company-logo.png';
import profileImage from '../../assets/images/profile-image.png';

export const Header = () => {
    return (
        <header className="header">
            <img src={companyLogo} alt="Company Logo" className="logo" />
            <h1 className="company-name">Socket Playground</h1>
            <input type="text" placeholder="Search..." className="search-bar" />
            <div className="profile">
                <img src={profileImage} alt="Profile" className="profile-icon" />
            </div>
            <button className="logout-button">Logout</button>
        </header>
    );
};