import React from 'react';
import { useHistory } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { closeDropdown, toggleDropdown } from '../utils/utils.jsx';
import { tasks, users, comments } from "../../store/index";
import { useState } from "react";

const ModalWork = observer(() => {
    const history = useHistory();
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const { task } = tasks;

    const goBack = (evt) => {
        evt.preventDefault();
        history.goBack();
    }

    const timeMap = {
        "day": 1440,
        "hour": 60,
        "minutes": 1
    }

    const [form, setForm] = useState({
        time: "",
        timeFormat: "day",
        comment: ""
    })
    
    const timeIsEmpty = !form.time ? true : false;
    const commentIsEmpty = !form.comment ? true : false;

    const handleFieldChange = (evt) => {
        const { name, value } = evt.target;
        setForm({...form, [name]: value});
    }

    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        const time = form.time * timeMap[form.timeFormat];
        const data = {
            timeInMinutes: time,
            comment: form.comment,
            currentUser: userId,
        }
        tasks.patchTask(task.id, data).then(() => {
            comments.fetch();
            history.goBack();
        });
    }

    return (
        <section className="modal">
        <div className="modal-wrap overlay">
            <div className="modal-inner">
            <h2 className="modal-header">
         Запись о работе
            </h2>
            <form onSubmit={handleOnSubmit}>
                <div className="modal-body">
                    <div className="authorization__input-inner">
                    <label htmlFor="name" className="authorization__input-text">Затраченное время</label>
                    <input 
                    type="number" 
                    min="0"
                    value={form.time}
                    className={`authorization__input-input ${timeIsEmpty ? 'input__empty' : 'input__default'}`}
                    name="time"
                    onChange={handleFieldChange}
                    required
                    />
                    </div>

                    <div className="authorization__input-inner">
                    <label htmlFor="name" className="authorization__input-text">Единица измерения</label>
                    <select className="task-select input__default capet-down"
                     value={form.timeFormat} 
                     onChange={handleFieldChange} 
                     onBlur={closeDropdown}
                     onClick={toggleDropdown}
                     name="timeFormat">
                        <option value="day">День</option>
                        <option value="hour">Час</option>
                        <option value="minutes">Минута</option>
                    </select>
                        </div>

                        <div className="authorization__input-inner">
                        <div  className="authorization__input-form" >
                            <label htmlFor="textarea" className="authorization__input-text">Комментарий</label>
                            <textarea 
                            className={`modal__textarea ${commentIsEmpty ? 'input__empty' : 'input__default'}`} 
                            value={form.comment}
                            name="comment"
                            onChange={handleFieldChange}
                            required
                            ></textarea>
                            </div>
                            </div>
                        
                </div>

                <div className="modal-footer">
                    <button type="submit" className="primary-button space">Добавить</button>
                    <button className="default-button" onClick={goBack}>Отмена</button>
                </div>
            </form>
        </div>
        </div>
    </section> 

    )
    });
    
export default ModalWork;
