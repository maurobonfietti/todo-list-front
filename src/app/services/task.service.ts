import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {environment} from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class TaskService {
    public url: string;

    constructor(private _http: Http) {
        this.url = environment.apiUrl;
    }

    create(token, task): Observable<any> {
        let json = JSON.stringify(task);
        let params = "json=" + json;
        let headers = new Headers({'Content-Type': "application/x-www-form-urlencoded"});
        headers.append('Authorization', token);

        return this._http.post(this.url + '/task', params, {headers: headers}).map(res => res.json()).catch((e: any) => Observable.throw(e));
    }

    search(token, search = null, filter = null, order = null, priority = null, page = null) {
        let url: string;
        let params = '&filter=' + filter + '&order=' + order + '&priority=' + priority;
        let headers = new Headers({'Content-Type': "application/x-www-form-urlencoded"});
        headers.append('Authorization', token);
        if (page == null) {
            page = 1;
        }
        if (search == null) {
            url = this.url + '/task/search?page=' + page;
        } else {
            url = this.url + '/task/search/' + search + '?page=' + page;
        }

        return this._http.get(url + '?' + params, {headers: headers}).map(res => res.json());
    }

    getTask(token, id) {
        let headers = new Headers({'Authorization': token});

        return this._http.get(this.url + '/task/' + id, {headers: headers}).map(res => res.json());
    }

    update(token, task, id) {
        let json = JSON.stringify(task);
        let params = "json=" + json + '&authorization=' + token;
        let headers = new Headers({'Content-Type': "application/x-www-form-urlencoded"});
        headers.append('Authorization', token);

        return this._http.patch(this.url + '/task/' + id, params, {headers: headers}).map(res => res.json());
    }

    updateStatus(token, id) {
        let params = '&authorization=' + token;
        let headers = new Headers({'Content-Type': "application/x-www-form-urlencoded"});
        headers.append('Authorization', token);

        return this._http.patch(this.url + '/task/status/' + id, params, {headers: headers}).map(res => res.json());
    }

    updatePriority(token, id) {
        let params = '&authorization=' + token;
        let headers = new Headers({'Content-Type': "application/x-www-form-urlencoded"});
        headers.append('Authorization', token);

        return this._http.patch(this.url + '/task/priority/' + id, params, {headers: headers}).map(res => res.json());
    }

    deleteTask(token, id) {
        let headers = new Headers({'Authorization': token});

        return this._http.delete(this.url + '/task/' + id, {headers: headers}).map(res => res.json());
    }
}