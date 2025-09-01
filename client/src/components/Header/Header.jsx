import './Header.css'
import logo from '../../assets/images/silant_logo.jpg'
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { setVisibleAuthModal, isLoggedIn, handleLogout } = useAuth()

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-content">
                    <img src={logo} alt="Logo" className="logo" />
                    <div className="header-center">
                        <div className="contact">+7-8352-20-12-09, Telegram</div>
                        <div className="header-title">
                            Электронная сервисная книжка "Мой Силант"
                        </div>
                    </div>
                    {isLoggedIn ? <button className="auth-button" onClick={() => handleLogout()}>Выйти</button> :
                    
                        <button className="auth-button" onClick={() => setVisibleAuthModal(true)}>
                            Авторизация
                        </button>

                    }
                </div>

            </div>
        </header>
    );
}

export default Header;