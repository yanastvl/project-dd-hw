import React , { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import UserProfile from '../user-profile/user-profile.jsx';
import { tasks } from "../../store/index";

const Header = () => {
    const Logo = require("../../img/Logo.svg");
    const user = localStorage.getItem('user');

    useEffect(() => {
        const dropdowns = document.querySelectorAll('.dropdown__outer');
        const search = document.getElementById('search');
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener('click', (event) => {

                window.onclick = function(event) {
                    if (event.target != dropdown) {
                        dropdowns.forEach((dropdown) => {
                            dropdown.classList.remove("is-active");
                            dropdown.children[0].classList.remove("dropdown__toggle");
                            dropdown.children[0].children[0].classList.remove("input__default");
                            dropdown.children[0].children[0].classList.remove("capet-up");
                        })
                    }
                }

                const withinBoundaries = event.composedPath().includes(search);
                if (withinBoundaries) {
                    event.stopPropagation();
                    dropdown.classList.toggle("is-active");
                    dropdown.children[0].classList.toggle("dropdown__toggle");
                    dropdown.children[0].children[0].classList.toggle("input__default");
                    dropdown.children[0].children[0].classList.toggle("capet-up");
                }
            })
        });
      
        tasks.fetch().then(() => {
            const dropdownButtons = document.querySelectorAll('.dropdown__toggle-button');
            dropdownButtons.forEach((dropdown) => {
                document.addEventListener('click', (event) => {
                    const withinBoundaries = event.composedPath().includes(dropdown);
                    if (withinBoundaries) {
                        event.stopPropagation();
                        dropdown.classList.toggle('is-active');
                    } else {
                        dropdown.classList.remove('is-active');
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
