import React from "react";
import Header from "../../components/header/header.jsx";
import Tasks from "../../components/tasks/tasks.jsx";

const TaskList = () => {

  return(
    <>
      <Header/>
        <section className="main__wrapper">
          <Tasks/>
        </section>
      </>
    )
}

export default TaskList;