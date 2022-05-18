import React from "react";
import Header from "../../components/header/header.jsx";
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

const Error404 = () => {

    return(
        <>
            <Header/>
                <section className="main__wrapper">
                    <p className="">Ошибка 404</p>
                    <p className="">Страница не найдена.</p>
                    <Link to={AppRoute.TASK_LIST} className="">Перейти на главную</Link>
                </section>
        </>
    )
}

export default Error404;