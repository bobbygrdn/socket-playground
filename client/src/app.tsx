import { MainWindow } from './containers/mainWindow/MainWindow';
import { Authentication } from './containers/authentication/Authentication';
import { Login } from './containers/login/Login';
import { Register } from './containers/register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const App: React.FC = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Authentication />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="/home/*" element={<MainWindow />} />
            </Routes>
        </Router>
    );
}
