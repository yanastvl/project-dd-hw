import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { observer } from 'mobx-react-lite';
import { users } from "../../store/index";
import Pagination from "../../components/pagination/pagination.jsx";

const Users = observer(({totalCount,filteredUsers}) => {

    return (
    <>
        <h3 className="header-caption">Пользователи</h3>
            
        <section className="user__list">
            <div className="user__list-inner">
                <div className="user__list-window">
                    { filteredUsers.map(user => 
                        <Link to={`/user-page/${user.id}`}>
                            <div className="user__list-cards">
                                    <a className="user__list-card">{user.username}</a>
                            </div>
                        </Link>
                    ) }

                </div>
                <Pagination allObjectsNum={totalCount} objects={users}/>
            </div>
        </section>
        </>
    )
})

export default Users;
