import { computed, makeAutoObservable, onBecomeObserved } from "mobx";
import { login, getUser, editUser, getUsers, getTasks, createOrEditTask, updateTaskStatus, deleteTask, getTask, patchTask, addComment, getComments, deleteComment } from '../api' ;
// import moment from "moment";

export const baseFilter = {
    "filter": {},
    "page": 0,
    "limit": 10
};

class TasksStore {
    filteredTasks = [];
    filter = baseFilter;
    totalCount = 0;
    task = {};

    constructor() {
        makeAutoObservable(this, {}, {
            autoBind:true,
        });
        onBecomeObserved(this, 'filteredTasks', this.fetch)
    }

    *fetch() {
        const filtered_response = yield getTasks(this.filter);
        this.filteredTasks = filtered_response.data;
        this.totalCount = filtered_response.total;
    }

    *createOrEditTask(data) {
        yield createOrEditTask(data);
        yield this.fetch();
    }

    *updateTaskStatus(id, status) {
        yield updateTaskStatus(id, status);
        yield this.fetch();
    }

    *deleteTask(id) {
        yield deleteTask(id);
        yield this.fetch();
    }

    *getTask(id) {
        this.task = yield getTask(id);
        return this.task;
    }

    *patchTask(id, data) {
        this.task = yield patchTask(id, data);
        return this.task.task;
    }
}


class CommentsStore {
    allComments = [];
    taskId = '';

    constructor() {
        makeAutoObservable(this, {}, {
            autoBind:true,
        });
        onBecomeObserved(this, 'allComments', this.fetch)
    }

    *fetch() {
        this.allComments = yield getComments(this.taskId);
    }

    *addComment(data) {
        yield addComment(data).then(response => {
            this.taskId = response.taskId;
        });
        yield this.fetch();
    }

    *deleteComment(id){
        yield deleteComment(id);
        yield this.fetch();
    }
}


class UsersStore {
    allUsers = [];
    filteredUsers = [];
    filter = baseFilter;
    totalCount = 0;
    user = {};
    assignedUser = {};

    constructor() {
        makeAutoObservable(this, {}, {
            autoBind:true,
        });
        onBecomeObserved(this, 'allUsers', this.fetch)
    }

    *fetch() {
        baseFilter.limit = 0;
        const response = yield getUsers(baseFilter);
        this.allUsers = response.data;

        const filtered_response = yield getUsers(this.filter);
        this.filteredUsers = filtered_response.data;
        this.totalCount = filtered_response.total;
    }

    *login(data){
        yield login(data).then(response => {
            if (response.id) {
                localStorage.setItem('user', JSON.stringify(response));
            } else {
                throw new PermissionDenied();
            }
        });
    }

    *getUser(id) {
         this.user = yield getUser(id);
    }

    *getAssignedUser(id) {
        this.assignedUser = yield getUser(id);
   }

    *editUser(data) {
        yield editUser(data).then(response => {
            localStorage.setItem('user', JSON.stringify(response));
        });
        yield this.fetch();
    }
}

export const users = new UsersStore();
export const tasks = new TasksStore();
export const comments = new CommentsStore();