import React from "react";
import Header from "../../components/header/header.jsx";
import UserInfo from "../../components/user-info/user-info.jsx";
import { useLocation, useParams } from "react-router-dom";
import { users, tasks } from "../../store/index";
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const UserPage = observer(() => {
  const { id } = useParams();
  const { allUsers } = users;
  const user = allUsers.find(user => user.id == id) || {};

  tasks.filter.filter = {
      "assignedUsers": [
          id
      ]
  }

  const { totalCount, filteredTasks } = tasks;

  return(
      <>
        <Header/>
          <section className="main__wrapper">
            <UserInfo user={user} totalCount={totalCount} filteredTasks={filteredTasks} />
          </section>
      </>
    )
})

export default UserPage;