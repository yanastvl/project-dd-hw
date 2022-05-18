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

// class UsersStore {
//     data = [];
//     usersList = {};
//     profileData = {};
  
//     constructor () {
//       makeAutoObservable(this,{},{
//         autoBind: true,
//       })
//       onBecomeObserved(this, 'data', this.usersFetch);
//     }
  
//     *usersFetch() {
//       const response = yield getUsers();
//       this.data  = response;
//       this.data.map(item => {this.usersList[item.id] = item.username});
  
//     }
//     *getLogin(form) {
//       console.log(form);
//       const response = yield userLogin(form);
//       this.profileData  = response;
//       console.log(this.profileData);
//       if (this.profileData.id) {
//         localStorage.setItem('userId', this.profileData.id);
        
//       }
//     }
//     *takeUser(id) {
//       const response = yield getUser(id);
//       this.profileData  = response;
//     }
//   }

// class EventsStore {
//     data = [];
//     filtredData = [];

//     constructor() {
//         makeAutoObservable(this, {}, {
//             autoBind:true,
//             archiveData:computed,
//             notArchiveData:computed
//         });

//         onBecomeObserved(this,'data', this.fetch)
//     }

//     get archiveData(){
//         return this.data.map(event => new EventStore(event)).filter(x => x.archive)
//     }

//     get notArchiveData(){
//         return this.data.map(event => new EventStore(event)).filter(x => !x.archive)
//     }

//     get pastData(){
//         return this.data
//         .map(event => new EventStore(event))
//         .filter(x => moment(x.date).isBefore(moment(),'day') && !x.archive);
//     }
    
//     get todayData(){
//         return this.data
//         .map(event => new EventStore(event))
//         .filter(x => moment(x.date).isSame(moment(),'day') && !x.archive);
//     }
    
//     get futureData(){
//         return this.data
//         .map(event => new EventStore(event))
//         .filter(x => moment(x.date).isAfter(moment(),'day') && !x.archive);
//     }

//     get favoriteData() {
//         return this.data
//         .map(event => new EventStore(event))
//         .filter(x => x.favorite && !x.archive);
//     }

//     get pastSort(){
//         return this.data
//         .map(event => new EventStore(event))
//         .sort(function(a,b){
//             return new Date(a.date) - new Date(b.date)});
//     }

//     get futureSort(){
//         return this.data
//         .map(event => new EventStore(event))
//         .sort(function(a,b){
//             return new Date(b.date) - new Date(a.date)});
//     }

//     *fetch(){
//         const response = yield getEvents();
//         this.data = response.map(event => new EventStore(event));
//         this.filtredData = response.map(event => new EventStore(event)).filter(x=>!x.archive);
//     }

//     *addEvent(data){
//         yield addEvent(data)
//         yield this.fetch();
//     }

//     *editEvent(data){
//         yield editEvent(data);
//         yield this.fetch();
//     }

//     *deleteEvent(id){
//         yield deleteEvent(id);
//         yield this.fetch();
//     }

//     *deleteArchiveEvents(){
//         yield deleteArchiveEvents();
//         yield this.fetch();
//     }
// }

export const users = new UsersStore();
export const tasks = new TasksStore();
export const comments = new CommentsStore();