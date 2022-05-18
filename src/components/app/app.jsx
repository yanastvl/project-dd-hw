import React, { FC, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect, HashRouter } from "react-router-dom";
import Login from "../../pages/login/login.jsx";
import UserList from "../../pages/user-list/user-list.jsx";
import TaskList from "../../pages/task-list/task-list.jsx";
import ViewTask from "../../pages/view-task/view-task.jsx"; 
import EditTask from "../../pages/edit-task/edit-task.jsx";
import UserPage from "../../pages/user-page/user-page.jsx";
import ModalUser from "../../pages/modal-user/modal-user.jsx";
import ModalTask from "../../pages/modal-task/modal-task.jsx";
import Error404 from "../../pages/error-404/error-404.jsx";
import { AppRoute } from '../../const';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('user');

  return (
    <Route {...rest} render={props => user
      ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: AppRoute.LOGIN, state: { from: props.location } }} />
      )
    } />
  )
}

const App = () => {
  const user = localStorage.getItem('user');

  return (
    <HashRouter>
      <Switch>
        <PrivateRoute exact path={AppRoute.USER_LIST} component={UserList} />
        <PrivateRoute exact path={AppRoute.TASK_LIST} component={TaskList} />
        <PrivateRoute exact path={AppRoute.ADD_TASK} component={EditTask} />
        <PrivateRoute exact path={AppRoute.VIEW_TASK} component={ViewTask} />
        <PrivateRoute exact path={AppRoute.EDIT_TASK} component={EditTask} />
        <PrivateRoute exact path={AppRoute.USER_PAGE} component={UserPage} />
        <PrivateRoute exact path={AppRoute.MODAL_USER} component={ModalUser} />
        <PrivateRoute exact path={AppRoute.MODAL_TASK} component={ModalTask} />
        {!user ? 
          <Route exact path={AppRoute.LOGIN} component={Login} />
          :
          <Redirect to={{ pathname: AppRoute.TASK_LIST }} />
        }
      </Switch>
    </HashRouter>
)}

export default App;
