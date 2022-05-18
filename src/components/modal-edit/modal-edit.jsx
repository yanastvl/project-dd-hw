import React from 'react';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { users } from "../../store/index";

const ModalEdit = observer(({user}) => {
    const history = useHistory();

    const [form, setForm] = useState({
        username: user? user.username : '',
        photoUrl: user? user.photoUrl : '',
        about: user? user.about : '',
    })

    const usernameIsEmpty = !form.username ? true : false;
    const photoUrlIsEmpty = !form.photoUrl ? true : false;
    const aboutIsEmpty = !form.about ? true : false;

    const handleFieldChange = (evt) => {
        const { name, value } = evt.target;
        setForm({...form, [name]: value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        users.editUser({
            id: user.id,
            login: user.login,
            password: '',
            ...form
        }).then(() => {
            history.push(`/user-page/${user.id}`)
        })
    }

    const goBack = (evt) => {
        evt.preventDefault();
        history.goBack();
    }

return(
    <section className="modal">
    <div className="modal-wrap overlay">
        <div className="modal-inner">
        <h2 className="modal-header">
            Редактирование пользователя
        </h2>
        <form onSubmit={handleSubmit}>
            <div className="modal-body">
                <div className="authorization__input-inner">
                <label htmlFor="name" className="authorization__input-text">Имя пользователя</label>
                <input 
                    type="text" 
                    className={`authorization__input-input ${usernameIsEmpty ? 'input__empty' : 'input__default'}`} 
                    name="username"
                    onChange={handleFieldChange}
                    value={form.username}
                    placeholder="username"
                    required
                    />
                </div>
                <div className="authorization__input-inner">
                    <label htmlFor="url" className="authorization__input-text">URL фотографии</label>
                    <input 
                        type="text" 
                        className={`authorization__input-input ${photoUrlIsEmpty ? 'input__empty' : 'input__default'}`} 
                        name="photoUrl"
                        onChange={handleFieldChange}
                        value={form.photoUrl}
                        placeholder="Введите URL"
                        required
                        />
                    </div>
                    <div className="authorization__input-inner">
                        <label htmlFor="textarea" className="authorization__input-text">О себе</label>
                        <textarea 
                            className={`modal__textarea ${aboutIsEmpty ? 'input__empty' : 'input__default'}`} 
                            name="about"
                            onChange={handleFieldChange}
                            value={form.about}
                            required
                            ></textarea>
                    </div>
            </div>

            <div className="modal-footer">
                <button type="submit" className="primary-button space">Сохранить</button>
                <button onClick={goBack} className="default-button">Отмена</button>
            </div>
        </form>
    </div>
    </div>
</section>

    )
});

export default ModalEdit;