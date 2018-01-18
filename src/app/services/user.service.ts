import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from '../models/user';
import "rxjs/add/operator/map";

@Injectable()
export class UserService {

    public url: string;
    public identity;
    public token;

    constructor(private _http: Http) {
        this.url = "http://localhost/webapp/backend/web/app_dev.php";
    }

    signUp(user_to_login: string) {
        let json = JSON.stringify(user_to_login);
        let params = "json=" + json;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

        return this._http.post(this.url + '/login', params, {headers: headers}).map(res => res.json());
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        let token = JSON.parse(localStorage.getItem('token'));

        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    register(user_to_register) {
        let json = JSON.stringify(user_to_register);
        let params = "json=" + json;
        let headers = new Headers({'Content-Type': "application/x-www-form-urlencoded"});

        return this._http.post(this.url + '/user/new', params, {headers: headers}).map(res => res.json());
    }

    update_user(user_to_update: User) {
        let json = JSON.stringify(user_to_update);
        let params = "json=" + json + '&authorization=' + this.getToken();
        let headers = new Headers({'Content-Type': "application/x-www-form-urlencoded"});
        headers.append('Authorization', this.getToken());

        return this._http.patch(this.url + '/user/edit', params, {headers: headers}).map(res => res.json());
    }
}