import './AuthPageModal.css';
import api from '../../api';

import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';



const AuthPageModal = () => {
    const { visibleAuthModal, setVisibleAuthModal, setLoggedIn, isLoading, setIsLoading, setUser} = useAuth();


    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const rootClasses = ["modal"]
    if (visibleAuthModal) {
        rootClasses.push("active")
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) {
            return
        }

        setIsLoading(true);

        try {
            const response = await api.post("/user/login/", {
                username: username,
                password: password
            })
            setUser(response.data.company)
            console.log("Success!", response.data)
            setSuccessMessage("Login Successful!")
            localStorage.setItem("accessToken", response.data.tokens.access);
            localStorage.setItem("refreshToken", response.data.tokens.refresh)
            setLoggedIn(true)
            setVisibleAuthModal(false)
            setError(null)
        }
        catch (error) {
            console.log("Error during Login!", error.response?.data);
            if (error.response && error.response.data) {
                Object.keys(error.response.data).forEach(field => {
                    const errorMessages = error.response.data[field];
                    if (errorMessages && errorMessages.length > 0) {
                        setError(errorMessages[0]);
                    }
                })
            }
        }
        finally {
            setIsLoading(false)
        }

    };

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisibleAuthModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h1>Авторизация</h1>
                <form className="form">
                    <input
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}

                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        autoComplete='off'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Войти</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default AuthPageModal;