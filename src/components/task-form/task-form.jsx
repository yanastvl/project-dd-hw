import React from 'react';
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import moment from "moment";
import { useHistory } from "react-router-dom";
import { closeDropdown, toggleDropdown } from '../utils/utils.jsx';
import { users, tasks } from "../../store/index";
import { observer } from 'mobx-react-lite';


const TaskForm = observer(() => {
    const { id } = useParams();
    const search = useLocation().search;
    const assignedId =new URLSearchParams(search).get("userId");
    
    const { task }  = tasks;

    const history = useHistory();
    const { allUsers } = users;
    const userId = JSON.parse(localStorage.getItem('user')).id;

    const [form, setForm] = useState({
        assignedId: id ? task.assignedId : assignedId,
        description: id ? task.description : '',
        rank:  id ? task.rank : 'low',
        title:  id ? task.title : '',
        type: id ? task.type : 'task',
    })

    if (!form.id && id){
        tasks.getTask(id).then(() => setForm({...tasks.task}) )
    }

    const handleFieldChange = (evt) => {
        const { name, value } = evt.target;
        setForm({...form, [name]: value})
    }

    const handleSubmit = (evt) => {
        const data = {
            id: id,
            dateOfCreation: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
            dateOfUpdate: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
            status: "opened",
            timeInMinutes: 0,
            userId: userId,
            ...form
        }
        evt.preventDefault();
        tasks.createOrEditTask(data).then(() => history.goBack())
    }

    const goBack = (evt) => {
        evt.preventDefault();
        history.goBack();
    }

    return (
        <>
        <form onSubmit={handleSubmit}>

        <div className="caption-inner">
            <h3 className="header-caption">{id ? 'Редактирование' : 'Создание'}</h3>
                <div className="caption__button-inner">
                    <button type="submit" className="primary-button">Сохранить</button>
                    <button className="default-button" onClick={goBack}>Отмена</button>
                </div>
        </div>

    <section className="task__list">
            <div className="task__list-inner">
            <div className="task-window">
            <div className="user-col">

            <div className="task-inner"> 
                <p className="task-label">Исполнитель</p>
                <select className="task-select input__default capet-down" 
                    name="assignedId" 
                    value={form.assignedId} 
                    onChange={handleFieldChange} 
                    onBlur={closeDropdown}
                    onClick={toggleDropdown}
                    required
                    >
                    <option>---</option>
                    {allUsers.map(user => 
                    <option 
                        value={user.id}> 
                        {user.username}  
                    </option>)} 
                </select>
            </div>

            <div className="task-inner"> 
                <p className="task-label">Тип запроса</p>
                <select className="task-select input__default capet-down" name="type" value={form.type} 
                onChange={handleFieldChange} 
                onBlur={closeDropdown}
                onClick={toggleDropdown}
                >
                    <option value="task"> Задача</option>
                    <option value="bug"> Ошибка</option>
                </select>
            </div>

            <div className="task-inner"> 
                <p className="task-label">Приоритет</p>
                <select className="task-select input__default capet-down" name="rank" 
                    value={form.rank} 
                    onChange={handleFieldChange}
                    onBlur={closeDropdown}
                    onClick={toggleDropdown}
                    >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                </select>
            </div>


            </div>
            <div className="line"></div>

            <div className="text-col">
            <div className="task-inner"> 
            <p className="task-label">Название</p>

            <div className="dropdown__input">
                    <input 
                    className={`dropdown__input-input ${!form.title ? 'input__empty' : 'input__default'}`}
                    type="text" 
                    onChange={handleFieldChange} 
                    placeholder="Название задачи"
                    name="title"
                    value={form.title}
                    required
                    />
            </div>
            </div>

                    <div className="task-inner"> 
                    <p className="task-label">Описание</p>
                    <textarea 
                    onChange={handleFieldChange} 
                    className={`edit__textarea ${!form.description ? 'input__empty' : 'input__default'}`} 
                    name="description"
                    value={form.description}
                    required
                    ></textarea>
                </div>
            </div>
                <div className="comment-col">

                </div>

            </div>
            </div>
            </section>
        </form>

        </>
    )
})

export default TaskForm;
