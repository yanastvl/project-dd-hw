import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { users } from "../../store/index";
import { observer } from 'mobx-react-lite';

const UserProfile = () => {
    const { pathname } = useLocation();
    const grut = require("../../img/1koxkh10zsu-bigTopImage.jpg");

    const user = JSON.parse(localStorage.getItem('user'));

    const logout = () => {
        localStorage.removeItem('user');
        location.href = '/';
    }

    return (
            <>
                <div className="header-nav">
                    <Link to={AppRoute.TASK_LIST} className={`nav__link ${pathname === AppRoute.TASK_LIST && 'nav__link-active'}`}>Задачи</Link>
                    <Link to={AppRoute.USER_LIST} className={`nav__link ${pathname === AppRoute.USER_LIST && 'nav__link-active'}`}>Пользователи</Link>
                </div>

                <div className="user-profile">
                    <div className="user-name">
                        {user.username}
                    </div>
                    <div className="user-photo">
                    <button className="dropdown__toggle-button">
                        <img className="user-avatar" alt="" src={user.photoUrl || grut}></img>
                            <ul className="dropdown__toggle-popup menu-avatar">
                                <li className="dropdown-input li-button">
                                <Link to={`/user-page/${user.id}`} className="dropdown-link" >Посмотреть профиль</Link>
                                </li>

                                <li className="dropdown-input li-button">
                                    <a className="exit dropdown-link delete-task" onClick={logout}>Выйти из системы</a>
                                </li>
                            </ul>
                        </button>
                    </div>
                </div>
            </>
    )
}

export default UserProfile;
