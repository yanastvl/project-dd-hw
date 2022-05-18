import React from "react";
import Header from "../../components/header/header.jsx";
import Task from "../../components/task/task.jsx";
import { useLocation, useParams, useEffect } from "react-router-dom";
import { tasks, users, comments } from "../../store/index";
import { observer } from 'mobx-react-lite';

const ViewTask = observer(() => {
  const { id } = useParams();
  tasks.getTask(id).then(task => {
    users.getUser(task.userId);
    users.getAssignedUser(task.assignedId);
  });
  comments.taskId = id;

  return(
      <>
        <Header/>
          <section className="main__wrapper">
            <Task />
          </section>
      </>
    )
})

export default ViewTask;