import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { AppRoute } from '../../const';
import { users } from "../../store/index";
import { observer } from 'mobx-react-lite';

const AuthWindow = observer(() => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);
    const [error, raiseError] = useState(false);

    const [form, setForm] = useState({
        login: "username",
        password: "password"
    })

    const loginIsEmpty = !form.login ? true : false;
    const passIsEmpty = !form.password ? true : false;

    const handleFieldChange = (evt) => {
        const { name, value } = evt.target;
        setForm({...form, [name]: value});
        raiseError(false);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        users.login({
            login: form.login,
            password: form.password,
        }
        ).then(() => {
            history.push(AppRoute.TASK_LIST);
        }, () => {
            setErrorMessage("Неправильный логин или пароль");
            raiseError(true);
        });
      }

    return (
        <section className="authorization">
            <form onSubmit={handleSubmit}>
                <div className="authorization-inner">
                    <h2 className="authorization-text">
                        Авторизация
                    </h2>
                    <div className="authorization__input-inner">
                        <label htmlFor="login" className="authorization__input-text">Логин</label>
                        <input 
                            type="text" 
                            className={`authorization__input-input ${loginIsEmpty ? 'input__empty' : 'input__default'} ${error && 'input__error'}`} 
                            name="login" 
                            required
                            value={form.login} 
                            onChange={handleFieldChange}
                        ></input> 
                    </div>
                    <div className="authorization__input-inner authorization__password">
                        <label htmlFor="login" className="authorization__input-text">Пароль</label>
                        <input 
                            type="password" 
                            className={`authorization__input-input ${passIsEmpty ? 'input__empty' : 'input__default'} ${error && 'input__error'}`} 
                            name="password" 
                            required
                            value={form.password} 
                            onChange={handleFieldChange}
                        ></input>
                
                    </div>
                    <div className="authorization-error">{errorMessage}</div>
                    <div className="authorization__button-inner">
                        <button className="authorization__input-button success-button">Вход</button></div>
                </div>
            </form>
        </section>
    )
})

export default AuthWindow;
