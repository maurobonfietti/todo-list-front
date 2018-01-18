import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';

@Component({
    selector: 'task-edit',
    templateUrl: '../views/task.html',
    providers: [UserService, TaskService]
})

export class TaskEditComponent implements OnInit {
    public page_title: string;
    public btn_title: string;
    public identity;
    public token;
    public task: Task;
    public status_task;
    public loading;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _taskService: TaskService
    ) {
        this.page_title = 'Editar tarea';
        this.btn_title = 'Guardar';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit() {
        if (this.identity == null && !this.identity.sub) {
            this._router.navigate(['/login']);
        } else {
            this.getTask();
        }
    }

    getTask() {
        this.loading = 'show';
        this._route.params.forEach((params: Params) => {
            let id = +params['id'];
            this._taskService.getTask(this.token, id).subscribe(
                response => {
                    if (response.status == 'success') {
                        if (response.task.user.id == this.identity.sub) {
                            this.task = response.task;
                            this.loading = 'hide';
                        } else {
                            this._router.navigate(['/index/1']);
                        }
                    } else {
                        this._router.navigate(['/login']);
                    }
                },
                error => {
                    console.log(<any> error);
                }
            );
        });
    }

    onSubmit() {
        this._route.params.forEach((params: Params) => {
            let id = +params['id'];
            this._taskService.update(this.token, this.task, id).subscribe(
                response => {
                    this.status_task = response.status;
                    if (this.status_task != "success") {
                        this.status_task = 'error';
                    } else {
                        this.task = response.data;
                        this._router.navigate(['/index/1']);
                    }
                },
                error => {
                    console.log(<any> error);
                }
            );
        });
    }

    deleteTask(id: string) {
        this._taskService.deleteTask(this.token, id).subscribe(
            response => {
                this._router.navigate(['/index/1']);
            },
            error => {
                console.log(<any> error);
            }
        );
    }
}
