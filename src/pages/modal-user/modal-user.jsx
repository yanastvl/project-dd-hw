import React from "react";
import Header from "../../components/header/header.jsx";
import UserPage from "../../pages/user-page/user-page.jsx";
import ModalEdit from "../../components/modal-edit/modal-edit.jsx";
import { useLocation, useParams } from "react-router-dom";
import { users } from "../../store/index";
import { observer } from 'mobx-react-lite';

const ModalUser = observer(() => {
  const { id } = useParams();
  const { allUsers } = users;
  const user = allUsers.find(user => user.id == id) || {};

  return(
    <>
      <section className="main__wrapper">
        <UserPage />
        <ModalEdit user={user} />
      </section>
      </>
    )
})

export default ModalUser;