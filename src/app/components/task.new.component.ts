import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';

@Component({
    selector: 'task-new',
    templateUrl: '../views/task.html',
    providers: [UserService, TaskService]
})

export class TaskNewComponent implements OnInit {
    public page_title: string;
    public btn_title: string;
    public identity;
    public token;
    public task: Task;
    public status_task;
    public loading;

    constructor(
        private _router: Router,
        private _userService: UserService,
        private _taskService: TaskService
    ) {
        this.page_title = 'Crear tarea';
        this.btn_title = 'Crear tarea';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit() {
        if (this.identity == null && !this.identity.sub) {
            this._router.navigate(['/login']);
        } else {
            this.task = new Task(0, '', '', 'todo', 'null', 'null');
        }
    }

    onSubmit() {
        this._taskService.create(this.token, this.task).subscribe(
            response => {
                this.status_task = response.status;
                if (this.status_task != "success") {
                    this.status_task = 'error';
                } else {
                    this.task = response.data;
                    this._router.navigate(['/']);
                }
            },
            error => {
                console.log(<any> error);
            }
        );
    }
}
