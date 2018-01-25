import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule, MatTooltipModule, MatToolbarModule, MatIconModule,
    MatListModule, MatChipsModule, MatSelectModule, MatSlideToggleModule
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routing, appRoutingProviders} from './app.routing';
import {AppComponent} from './app.component';
import {LoginComponent, SnackBarLoginOk, SnackBarLoginError} from './components/login.component';
import {RegisterComponent, SnackBarRegisterError, SnackBarRegisterOk} from './components/register.component';
import {DefaultComponent} from './components/default.component';
import {UserEditComponent} from './components/user.edit.component';
import {TaskNewComponent} from './components/task.new.component';
import {TaskEditComponent} from './components/task.edit.component';
import {GenerateDatePipe} from './pipes/generate.date.pipe';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DefaultComponent,
        UserEditComponent,
        TaskNewComponent,
        TaskEditComponent,
        GenerateDatePipe,
        SnackBarLoginOk,
        SnackBarLoginError,
        SnackBarRegisterError,
        SnackBarRegisterOk,
    ],
    imports: [
        routing,
        BrowserModule,
        HttpModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatChipsModule,
        MatSelectModule,
        MatSlideToggleModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        SnackBarLoginOk,
        SnackBarLoginError,
        SnackBarRegisterError,
        SnackBarRegisterOk,
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
