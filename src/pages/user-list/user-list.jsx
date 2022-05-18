import React from "react";
import { useState, useEffect } from 'react';
import Header from "../../components/header/header.jsx";
import Users from "../../components/users/users.jsx";
import Pagination from "../../components/pagination/pagination.jsx";
import { useLocation } from "react-router-dom";
import { users } from "../../store/index";
import { observer } from 'mobx-react-lite';

const UserList = observer(() => {
  const { totalCount, filteredUsers } = users;

  return(
    <>
      <Header/>
      <section className="main__wrapper">
        <Users totalCount={totalCount} filteredUsers={filteredUsers} />
      </section>
      </>
    )
})

export default UserList;