import React, { useEffect } from "react";
import Header from "../../components/header/header.jsx";
import Tasks from "../../components/tasks/tasks.jsx";
import { useLocation } from "react-router-dom";
import { tasks, users, baseFilter } from "../../store/index";
import { observer } from 'mobx-react-lite';

const TaskList = observer(() => {
  const { filteredTasks, totalCount } = tasks;

  return(
    <>
      <Header/>
        <section className="main__wrapper">
          <Tasks filteredTasks={filteredTasks} totalCount={totalCount}/>
        </section>
      </>
    )
})

export default TaskList;