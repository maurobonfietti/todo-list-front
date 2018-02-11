import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material';

export class errorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    templateUrl: '../views/register.ok.html',
})
export class SnackBarRegisterOk {
    constructor(public snackBar: MatSnackBar) {}
}

@Component({
    templateUrl: '../views/register.error.html',
})
export class SnackBarRegisterError {
    constructor(public snackBar: MatSnackBar) {}
}

@Component({
    selector: 'register',
    templateUrl: '../views/register.html',
    providers: [UserService]
})

export class RegisterComponent implements OnInit {
    public title: string;
    public user;
    public status;

    public identity;
    public token;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    matcher = new errorStateMatcher();

    constructor(
        private _userService: UserService,
        public snackBar: MatSnackBar
    ) {
        this.title = 'Registrate';
//        this.user = new User(1, "user", "", "", "", "");
        this.user = {
            "email": "",
            "password": "",
            "getData": true
        };
    }

    openSnackBarOk() {
        this.snackBar.openFromComponent(SnackBarRegisterOk, {
            duration: 3000,
        });
    }

    openSnackBarError() {
        this.snackBar.openFromComponent(SnackBarRegisterError, {
            duration: 3000,
        });
    }

    ngOnInit() {
        console.log('register.component [OK]');
    }

    onSubmit() {
        this._userService.register(this.user).subscribe(
            response => {
                this.status = response.status;
                this.status = 'success';
                this.openSnackBarOk();
                console.log(this.user);
//                window.location.href = '/login';
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                this.identity = null;
                this.token = null;
//                window.location.href = '/login';
                this._userService.signUp(this.user).subscribe(
                    response => {
                        this.identity = response;
                        if (this.identity.lenght <= 1) {
                            console.log('Server Error...');
                        } {
                            console.log(this.identity);
                            if (!this.identity.status) {
                                localStorage.setItem('identity', JSON.stringify(this.identity));
                                this.user.getData = false;
                                this._userService.signUp(this.user).subscribe(
                                    response => {
                                        this.token = response;
                                        if (this.token.lenght <= 1) {
                                            console.log('Server Error...');
                                        } {
                                            if (!this.token.status) {
                                                localStorage.setItem('token', JSON.stringify(this.token));
                                                this.openSnackBarOk();
                                                window.location.href = '/index/1';
                                            }
                                        }
                                    },
                                    error => {
                                        console.log(<any> error);
                                    }
                                );
                            }
                        }
                    },
                    error => {
                        console.log(<any> error);
                        this.openSnackBarError();
                    }
                );
            },
            error => {
                console.log(<any> error);
                this.status = 'error';
                this.openSnackBarError();
            }
        );
    }
}
