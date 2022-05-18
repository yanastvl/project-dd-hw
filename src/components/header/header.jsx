import React , { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import UserProfile from '../user-profile/user-profile.jsx';
import { tasks } from "../../store/index";


const Header = () => {
    const Logo = require("../../img/Logo.svg");
    const user = localStorage.getItem('user');

    useEffect(() => {
        const dropdowns = document.querySelectorAll('.dropdown__toggle');       
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener('click', function () {
                dropdown.classList.toggle("is-active");
            })
        });
      
        tasks.fetch().then(() => {
            const dropdownButtons = document.querySelectorAll('.dropdown__toggle-button');
            dropdownButtons.forEach((popup) => {
                document.addEventListener('click', (event) => {
                    const withinBoundaries = event.composedPath().includes(popup)
                    if (withinBoundaries) {
                        event.stopPropagation();
                        popup.classList.toggle('is-active');
                    } else {
                        popup.classList.remove('is-active');
                    }
                })
            })
        });
    }, []) 

    return (
        <section className="header">
            <div className="header-wrap">
                <Link to={AppRoute.TASK_LIST} className="header-link">
                <img className="header-logo" src={Logo} alt=""></img></Link>

                {user && <UserProfile />}
            </div>
        </section>
    )
}

export default Header;
