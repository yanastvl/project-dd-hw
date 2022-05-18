import React from "react";
import Header from "../../components/header/header.jsx";
import Task from "../../components/task/task.jsx";
import ModalWork from "../../components/modal-work/modal-work.jsx";
import { useLocation, useParams } from "react-router-dom";
import { tasks } from "../../store/index";
import { observer } from 'mobx-react-lite';

const ModalTask = observer(() => {
  const { id } = useParams();
  tasks.getTask(id);

  return(
    <>
      <Header/>
      <section className="main__wrapper">
        <Task/>
        <ModalWork/>
      </section>
      </>
    )
})

export default ModalTask;