import React, { useEffect, useState, useReducer } from "react";
// import './Dropdown.sass';
// import '../../../_styles/style.sass'
// import closedDropdown from '../../../_images/closedDropdown.svg';
// import openedDropdown from '../../../_images/openedDropdown.svg';
import { values } from "mobx";


export const Dropdown = ({label}) => {
    const [opened, setOpened] = useState(false);
    console.log(opened);

    const handleOpen = () => {
        setOpened(!opened)
        
    }

    useEffect(() => {
        const dropdowns = document.querySelectorAll('.dropdown__toggle');
        const dropdownsButton = document.querySelectorAll('.dropdown__toggle-button');


        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener('click', function () {
                dropdown.classList.toggle("is-active");
            })
        });
    
        dropdownsButton.forEach((button) => {
            button.addEventListener('click', function (e) {
                e.stopPropagation();
                toggleMenu(); 
            })
        });

        document.addEventListener('click', function (e){
            const target = e.target;
            const its_menu = target == menuHeader || menuHeader.contains(target);
            const its_btnMenu = target == dropdownsButton;
            const menu_is_active = menuHeader.classList.contains('is-active');
            
            if (!its_menu && !its_btnMenu && menu_is_active) {
                toggleMenu();
            }


        })
    },
    [])

    return(
        <div className="dropdown__inner dropdown__toggle-type" onClick={handleOpen}>
            <div className="dropdown__toggle">
            <div className=" dropdown__label dropdown__label-type  input__default">
                <span className = "dropdown__toggle-text">Тип</span>  
                <div className="caret-close"></div>
            </div>
                <ul className="dropdown__toggle-menu">
                    <li className="dropdown-input">
                        <label>
                            <input type="checkbox" className="checkbox-default"/> Задача
                        </label>
                    </li>
                    <li className="dropdown-input">
                        <label>
                            <input type="checkbox" className="checkbox-default"/> Ошибка
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    )
}
