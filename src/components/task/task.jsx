import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useLocation, useHistory } from "react-router-dom";
import { tasks, users, comments } from "../../store/index";
import { StatusMap, RankMap, TaskMap } from '../utils/utils.jsx';
import { observer } from 'mobx-react-lite';
import moment from "moment";

const Task = observer(() => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const { task } = tasks;
    const { allUsers, user, assignedUser } = users;

    const createdAt = moment(task.dateOfCreation).format('DD.MM.YY HH:mm');
    const updatedAt = moment(task.dateOfUpdate).format('DD.MM.YY HH:mm');
    const createdCom = (comment) => { return moment(comment.dateOfCreation).format('DD.MM.YY HH:mm') }

    const { allComments } = comments;

    const history = useHistory();

    const deleteTask = (id) => {
        tasks.deleteTask(id);
        history.goBack();
    }

    const updateTaskStatus = (id, status) => {
        tasks.updateTaskStatus(id, status);
        history.goBack();
    }

    const handleSubmit = (evt) => {
        const data = {
            taskId: task.id,
            userId: userId,
            text: form.text
        }
        evt.preventDefault();
        comments.addComment(data);
        setForm({text: ""});
    }

    const [form, setForm] = useState({
        text: ""
    })

    const handleFieldChange = (evt) => {
        const { name, value } = evt.target;
        setForm({...form, [name]: value});
    }

    const textIsEmpty = !form.text ? true : false;

    const deleteComment = (id) => {
        comments.deleteComment(id);
    }

    const duration = moment.duration(task.timeInMinutes, 'minutes');
  
    function declension(forms, val) {
        const cases = [ 2, 0, 1, 1, 1, 2 ];
        return forms[(val % 100 > 4 && val % 100 < 20) ? 2 : cases[(val % 10 < 5) ? val % 10 : 5]];
    }

    const ref_days = declension([ 'день', 'дня', 'дней' ], duration.days());
    const ref_hours = declension([ 'час', 'часа', 'часов' ], duration.hours());
    const ref_minutes = declension([ 'минута', 'минуты', 'минут' ], duration.minutes());

    let time = '';
    duration.days() ? time += `${duration.days()} ${ref_days} ` : false
    duration.hours() ? time += `${duration.hours()} ${ref_hours} ` : false
    duration.minutes() ? time += `${duration.minutes()} ${ref_minutes}` : false

    return (
        <>

    <div className="caption-inner">
        <div className="caption-title">
        <h3 className="header-caption">{task.title}
        </h3>
        <div className="header__page-button">
                                            <button className={`header-button status-${task.status}`}>{StatusMap[task.status]}</button></div>
                                            </div>
        <div className="caption__button-inner">
        <button className="default-button" onClick={() => updateTaskStatus(task.id, 'inProgress')}>Взять в работу</button>
        <Link to={`/task-edit/${task.id}`} className="primary-button space">Редактировать</Link>
        <button className="error-button" onClick={() => deleteTask(task.id)}>Удалить</button>
    </div>
    </div>

 
    <section className="task__list">
            <div className="task__list-inner">
            <div className="task-window">
            <div className="user-col">

            <div className="task-inner"> 
            <p className="task-label">Исполнитель</p>
            <p className="task-text">{assignedUser.username}</p>
            </div>

            <div className="task-inner"> 
            <p className="task-label">Автор задачи</p>
            <p className="task-text">{user.username}</p>
            </div>

            <div className="task-inner"> 
            <p className="task-label">Тип запроса</p>
            <p className="task-text">{TaskMap[task.type]}</p>
            </div>

            <div className="task-inner"> 
            <p className="task-label">Приоритет</p>
            <p className="task-text">{RankMap[task.rank]}</p>
            </div>


            <div className="task-inner"> 
            <p className="task-label">Дата создания</p>
            <p className="task-text">{createdAt}</p>
            </div>

            <div className="task-inner"> 
            <p className="task-label">Дата изменения</p>
            <p className="task-text">{updatedAt}</p>
            </div>

            <div className="task-inner time-form"> 
            <p className="task-label">Затрачено времени</p>
            <p className="task-text">{time}</p>
            </div>

            <Link to={`/modal-task/${task.id}`}>
                        <button className="primary-button">Сделать запись о работе</button>
            </Link>


            </div>

            <div className="line"></div>

            <div className="text-col">
            <div className="task-inner"> 
            <p className="task-label">Описание</p>
            <p className="task-text">{task.description}</p>
            </div>

            </div>
            <div className="line"></div>

            <div className="comment-col">
            <div className="task-inner"> 
            <p className="task-label">Комментарии ({allComments.length})</p>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        className={`form__textarea  ${textIsEmpty ? 'input__empty' : 'input__default'}`} 
                        name="text"
                        onChange={handleFieldChange}
                        value={form.text}
                        required
                    ></textarea>
                    <button className="success-button" type="submit">Добавить комментарий</button>
                </form>
            </div>

            {allComments.map(comment => 
                <div className="task-inner"> 
                    <div className="task-delete"> 
                        <p className="task-label">{allUsers.find(user => user.id === comment.userId).username} ({createdCom(comment)})</p>

                        {comment.userId === userId &&
                            <button className="delete-comm" onClick={() => deleteComment(comment.id)}>Удалить</button>
                        }
                    </div>
                        <p className="task-text">{comment.text}</p>
                </div>
            )}
         
            </div>

          
            </div>
    </div>
</section>
    </>
    )
})

export default Task;
