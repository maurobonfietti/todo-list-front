import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'snack-bar-component-example',
    templateUrl: '../views/register.error.html',
})
export class SnackBarComponentExampleError2 {
    constructor(public snackBar: MatSnackBar) {}
}

@Component({
    selector: 'snack-bar-component-example',
    templateUrl: '../views/register.ok.html',
})
export class SnackBarComponentExampleError3 {
    constructor(public snackBar: MatSnackBar) {}
}

@Component({
    selector: 'register',
    templateUrl: '../views/register.html',
    providers: [UserService]
})

export class RegisterComponent implements OnInit {
    public title: string;
    public user: User;
    public status;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    matcher = new MyErrorStateMatcher();

    constructor(
        private _userService: UserService,
        public snackBar: MatSnackBar
    ) {
        this.title = 'Registrate';
        this.user = new User(1, "user", "", "", "", "");
    }

    openSnackBarError() {
        this.snackBar.openFromComponent(SnackBarComponentExampleError2, {
            duration: 3000,
        });
    }

    openSnackBarOk() {
        this.snackBar.openFromComponent(SnackBarComponentExampleError3, {
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
                window.location.href = '/login';
            },
            error => {
                console.log(<any> error);
                this.status = 'error';
                this.openSnackBarError();
            }
        );
    }
}
