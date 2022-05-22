import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import { tasks } from "../../store/index";
import { users } from "../../store/index";
import { observer } from 'mobx-react-lite';
import { StatusMap, RankMap } from '../utils/utils.jsx';
import Pagination from "../../components/pagination/pagination.jsx";

const Tasks = observer(({filteredTasks, totalCount}) => {
    const { allUsers } = users;
    const [form, setForm] = useState({
        query: ""
    })

    const [filter, setFilter] = useState({});
    if (JSON.stringify(filter) === '{}') {
        tasks.filter.filter = filter;
    }

    const userList = {};
    allUsers.map(item => {userList[item.id] = item.username});

    const deleteTask = (id) => {
        tasks.deleteTask(id)
    }

    const updateTaskStatus = (id, status) => {
        tasks.updateTaskStatus(id, status)
    }

    const handleFieldChange = (evt) => {
        const { name, value } = evt.target;
        setForm({...form, [name]: value})
    }

    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        const target = evt.target;
        const checkedUsers = document.querySelectorAll('input[class="checkbox-default user"]:checked');
        const assignedUsers = Array.from(checkedUsers).map(user => user.value);

        tasks.filter.filter = {
            "query": target.query.value,
            "assignedUsers": assignedUsers,
            "type": [
                target.task.checked ? target.task.name : null,
                target.bug.checked ? target.bug.name : null,
            ].filter(Boolean),
            "status": [
                target.opened.checked ? target.opened.name : null,
                target.inProgress.checked ? target.inProgress.name : null,
                target.testing.checked ? target.testing.name : null,
                target.complete.checked ? target.complete.name : null,
            ].filter(Boolean),
            "rank": [
                target.low.checked ? target.low.name : null,
                target.medium.checked ? target.medium.name : null,
                target.high.checked ? target.high.name : null,
            ].filter(Boolean),
        };
        setFilter(tasks.filter.filter);
        tasks.fetch();
    }

    return (
    <>
        <div className="caption-inner">
        <h3 className="header-caption">Задачи</h3>
        <div className="caption__button-inner">
            <Link to={AppRoute.ADD_TASK}  className="primary-button" >Добавить задачу</Link>
        </div>
    </div>

        <section className="task__list">
            <div className="task__list-inner">

            <form onSubmit={handleOnSubmit}>
                <div className="search" id="search">

            <div className="dropdown__outer dropdown__toggle-type">
              <div>
              <div className="dropdown__label input__empty capet-down">
                        <span className = "dropdown__toggle-text ">Тип</span>  
                        </div>
                        <ul className="dropdown__toggle-menu">
                            <li className="dropdown-input">
                                <label>
                                    <input type="checkbox" className="checkbox-default" name="task"/> Задача
                                </label>
                            </li>
                            <li className="dropdown-input">
                                <label>
                                    <input type="checkbox" className="checkbox-default" name="bug"/> Ошибка
                                </label>
                            </li>
                        </ul>
                        </div>
            </div>

                   <div className={`dropdown__toggle-task ${!form.query ? 'input__empty' : 'input__default'}`}>
                        <input 
                            type="text" 
                            placeholder="Название задачи" 
                            name="query"
                            onChange={handleFieldChange}
                            value={form.query}
                        />
                    </div> 

                    <div className="dropdown__outer dropdown__toggle-user">
                     <div>
                     <div className=" dropdown__label input__empty capet-down">
                         <span className = "dropdown__toggle-text">Пользователь</span> 
                         </div> 
                            <ul className="dropdown__toggle-menu">
                                {allUsers.map(user =>
                                    <li className="dropdown-input">
                                        <label>
                                            <input type="checkbox" className="checkbox-default user" value={user.id}/> {user.username}
                                        </label>
                                    </li>
                                )}
                            </ul>
                    </div> 
                    </div> 
                   

        
                         <div className="dropdown__outer dropdown__toggle-status">
              <div>
              <div className=" dropdown__label input__empty capet-down">
                        <span className = "dropdown__toggle-text">Статус</span> 
                        </div> 
                            <ul className="dropdown__toggle-menu">

                            <li className="dropdown-input">
                                <label>
                                    <input type="checkbox" className="checkbox-default" name="opened"/> Открыто
                                </label>
                            </li>
                            <li className="dropdown-input">
                                <label>
                                    <input type="checkbox" className="checkbox-default" name="inProgress"/> В работе
                                </label>
                            </li>
                            <li className="dropdown-input">
                                <label>
                                    <input type="checkbox" className="checkbox-default" name="testing"/> Тестируется
                                </label>
                            </li>
                            <li className="dropdown-input">
                                <label>
                                    <input type="checkbox" className="checkbox-default" name="complete"/> Сделано
                                </label>
                            </li>
                            </ul>
                   
                    </div> 
                    </div>  
                    

                    <div className="dropdown__outer dropdown__toggle-priority">
                     <div>
                     <div className=" dropdown__label input__empty capet-down">
                        <span className = "dropdown__toggle-text">Приоритет</span> 
                        </div>  
                        <ul className="dropdown__toggle-menu">

                            <li className="dropdown-input">
                                <label>
                                    <input type="checkbox" className="checkbox-default" name="low"/> Низкий
                                </label>
                            </li>
                            <li className="dropdown-input">
                                <label >
                                    <input type="checkbox" className="checkbox-default" name="medium"/> Средний
                                </label>
                            </li>
                            <li className="dropdown-input">
                                <label>
                                    <input type="checkbox" className="checkbox-default" name="high"/> Высокий
                                </label>
                            </li>
                        </ul>
                    </div> 
       
                    </div> 
                     <button className="primary-button task-button" type="submit">Применить</button> 

                </div>
                </form>

                <div className="task__list-window">

            { filteredTasks.map(task => 
                                    <div className="task__page">
                                    <div className="task__page-list">
                                        <div className="type__inner">
                                            <div className={`task__page-type square square-${task.type}`}>
                                                <div className="circle"></div>
                                            </div>
                                        </div>
                                        <div className="task__inner">
                                            <Link to={`/task/${task.id}`}>
                                                <div className="task__page-text">
                                                    {task.title ? task.title : "---"}
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="caption__inner">
                                            <h3 to={`/task/${task.id}`} className="task__list-card">{userList[task.assignedId] ? userList[task.assignedId] : "---"}</h3>
                                        </div>
                                        <div className="status__inner">
                                            <button className={`task__page-button status-${task.status}`}>{StatusMap[task.status]}</button></div>
                                         
                                        <div className="rank__inner">
                                            <button className={`task__page-rank button__rank-${task.rank}`}>{RankMap[task.rank]}</button></div>
                                            <button className="dropdown__toggle-button user__list-more">
                                        <svg className="burger-button" width="20" height="20" viewBox="0 0 20 20" fill="" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 5C5 4.44772 5.44772 4 6 4H14C14.5523 4 15 4.44772 15 5C15 5.55228 14.5523 6 14 6H6C5.44772 6 5 5.55228 5 5Z" fill=""/>
                                        <path d="M5 10C5 9.44772 5.44772 9 6 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10Z" fill=""/>
                                        <path d="M5 15C5 14.4477 5.44772 14 6 14H14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16H6C5.44772 16 5 15.5523 5 15Z" fill=""/>
                                        </svg>
                        
                                    <ul className="dropdown__toggle-popup menu-button">
                                        <li className="dropdown-input li-button">
                                            <Link to={`/task-edit/${task.id}`} className="dropdown-link">Редактировать</Link>
                                        </li>
            
                                        <li className="dropdown-input li-button" onClick={() => deleteTask(task.id)}>
                                            <a className="dropdown-link delete-task">Удалить</a>
                                        </li>

                                        {task.status  === "opened" && 
                                            <li className="dropdown-input li-button" onClick={() => updateTaskStatus(task.id, 'inProgress')}>
                                                <a className="dropdown-link">Взять в работу</a>
                                            </li>
                                        }
            
                                        {task.status === "inProgress" && 
                                            <li className="dropdown-input li-button" onClick={() => updateTaskStatus(task.id, 'testing')}>
                                                <a className="dropdown-link">На тестирование</a>
                                            </li>
                                        }
            
                                        {["inProgress", "testing", "complete"].includes(task.status) && 
                                            <li className="dropdown-input li-button" onClick={() => updateTaskStatus(task.id, 'opened')}>
                                                <a className="dropdown-link">Переоткрыть</a>
                                            </li>
                                        }

                                        {["opened", "testing", "inProgress"].includes(task.status) && 
                                            <li className="dropdown-input li-button" onClick={() => updateTaskStatus(task.id, 'complete')}>
                                                <a className="dropdown-link">Готово</a>
                                            </li>
                                        }
                                    </ul>
                             
                                </button>
                            </div>
                        </div>
            ) }
    
                </div>
                <Pagination allObjectsNum={totalCount} objects={tasks}/>
            </div>
        </section>
        </>
    )
})

export default Tasks;
