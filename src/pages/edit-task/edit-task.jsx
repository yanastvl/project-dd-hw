import React from "react";
import Header from "../../components/header/header.jsx";
import TaskForm from "../../components/task-form/task-form.jsx";
import { useLocation, useParams } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { tasks } from "../../store/index";

const EditTask = observer(() => {
  const { id } = useParams();
  id ? tasks.getTask(id) : tasks.task = {};

  return(
    <>
      <Header/>
      <section className="main__wrapper">
        <TaskForm/>
      </section>
      </>
    )
})

export default EditTask;