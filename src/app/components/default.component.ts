import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'default',
    templateUrl: '../views/default.html',
    providers: [UserService, TaskService]
})

export class DefaultComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public tasks: Array<Task>;
    public status_task;
    public pages;
    public pagesPrev;
    public pagesNext;
    public loading = 'show';

    public task: Task;

    public priority = 2;
    public filter = 2;
    public order = 1;
    public searchString: string;
    public totalItemsCount = 0;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _taskService: TaskService,
        public snackBar: MatSnackBar
    ) {
        this.title = 'Home Page';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.loading = 'show';
    }

    openSnackBar(message: string) {
      this.snackBar.open(message, null, {
        duration: 2000,
      });
    }

    ngOnInit() {
        console.log('default.component [OK]');
        this.search();
        this.task = new Task(0, '', '', 'todo', 'null', 'null');
    }

    createTask() {
        this._taskService.create(this.token, this.task).subscribe(
            response => {
                this.status_task = response.status;
                if (this.status_task != "success") {
                    this.status_task = 'error';
                } else {
                    this.openSnackBar('Tarea creada exitosamente');
                    this.task = new Task(0, '', '', 'todo', 'null', 'null');
                    this.search();
                }
            },
            error => {
                console.log(<any> error);
            }
        );
    }

    search() {
        this.loading = 'show';
        this._route.params.forEach((params: Params) => {
            if (!this.searchString || this.searchString.trim().length == 0) {
                this.searchString = null;
            }
            let page = +params['page'];
            if (!page) {
                page = 1;
            }
            this._taskService.search(this.token, this.searchString, this.filter, this.order, this.priority, page).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.tasks = response.data;
                        this.totalItemsCount = response.totalItemsCount;
                        this.loading = 'hide';
                        this.pages = [];
                        for (let i = 0; i < response.totalPages; i++) {
                            this.pages.push(i);
                        }
                        if (page >= 2) {
                            this.pagesPrev = (page - 1);
                        } else {
                            this.pagesPrev = page;
                        }
                        if (page < response.totalPages || page == 1) {
                            this.pagesNext = (page + 1);
                        } else {
                            this.pagesNext = page;
                        }
                    } else {
                        this._router.navigate(['/index/1']);
                    }
                },
                error => {
                    console.log(<any> error);
                }
            );
        });
    }

    updateStatus(id: string) {
        this._taskService.updateStatus(this.token, id).subscribe(
            response => {
                this.status_task = response.status;
                if (this.status_task != "success") {
                    this.status_task = 'error';
                } else {
                    this.playSound();
                    this.search();
                }
            },
            error => {
                console.log(<any> error);
            }
        );
    }

    updatePriority(id: string) {
        this._taskService.updatePriority(this.token, id).subscribe(
            response => {
                this.status_task = response.status;
                if (this.status_task != "success") {
                    this.status_task = 'error';
                } else {
                    this.search();
                }
            },
            error => {
                console.log(<any> error);
            }
        );
    }

    updateTask(task: Task) {
        this._taskService.update(this.token, task, task.id).subscribe(
            response => {
                this.status_task = response.status;
                if (this.status_task != "success") {
                    this.status_task = 'error';
                } else {
                    this.task = response.data;
                    this.search();
                }
            },
            error => {
                console.log(<any> error);
            }
        );
    }

    deleteTask(id: string) {
        this._taskService.deleteTask(this.token, id).subscribe(
            response => {
                console.log(response);
                this.search();
            },
            error => {
                console.log(<any> error);
            }
        );
    }

    playSound(){
        let audio = new Audio();
        audio.src = "../../assets/sound/level.mp3";
        audio.load();
        audio.play();
    }
}
