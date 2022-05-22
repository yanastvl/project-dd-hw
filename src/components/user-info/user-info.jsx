import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { tasks, users } from "../../store/index";
import { StatusMap, RankMap } from '../utils/utils.jsx';
import Pagination from "../../components/pagination/pagination.jsx";


const UserInfo = observer(({user,totalCount,filteredTasks}) => {
    const userId = JSON.parse(localStorage.getItem('user')).id;

    return (
    <>
        <div className="caption-inner">
        <h3 className="header-caption">{user.username}</h3>
        <div className="caption__button-inner">
            <Link to={AppRoute.ADD_TASK + `?userId=${user.id}`} className="default-button space">Добавить задачу</Link>
            {userId === user.id && 
                <Link to={`/modal-user/${user.id}`}  className="primary-button">Редактировать</Link>
            }
        </div>
    </div>
        <section className="user__page">
        <div className="user__page-inner">
            <div className="user__page-window">
                <div className="user-col">
                    <div className="user__page-photo">
                        <img className="user__page-avatar" src={user.photoUrl}></img>
                    </div>
                    <div className="user__page-info">
                        <p className="user__page-about">О себе</p>
                        <p className="user__page-content">{user.about}</p>
                    </div>
                </div>
                <div className="line"></div>
                <div className="task-col">
                    <h4 className="task__page-subtitle">Задачи</h4>
                    <div className="task__page-inner">

                        { filteredTasks.map(task => 
                            <div className="task__page">
                                <Link to={`/task/${task.id}`} >
                                    <div className="task__page-list">
                                    <div className="type__inner">
                                        <div className={`task__page-user square square-${task.type}`}>
                                            <div className="circle"></div>
                                        </div>
                                    </div>
                                        <div className="task__user">
                                        <div className="task__page-text">{task.title}</div>
                                        </div>
                                        <div className="status__user">
                                            <button className={`task__page-button status-${task.status}`}>{StatusMap[task.status]}</button></div>
                                        <div className="rank__user">
                                            <button className={`task__page-rank button__rank-${task.rank}`}>{RankMap[task.rank]}</button></div>
                                    </div>
                                </Link>
                            </div>
                        )}
 
                    </div>
                    <Pagination allObjectsNum={totalCount} objects={tasks}></Pagination>
                </div>
            </div>
        </div>
    </section>
</>
    )
});

export default UserInfo;
