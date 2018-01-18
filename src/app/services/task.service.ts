import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class TaskService {
    public url: string;

    constructor(private _http: Http) {
        this.url = "http://localhost/webapp/backend/web/app_dev.php";
    }

    create(token, task) {
        let json = JSON.stringify(task);
        let params = "json=" + json;
        let headers = new Headers({'Content-Type': "application/x-www-form-urlencoded"});
        headers.append('Authorization', token);

        return this._http.post(this.url + '/task/new', params, {headers: headers}).map(res => res.json());
    }

    search(token, search = null, filter = null, order = null, page = null) {
        let url: string;
        let params = 'authorization=' + token + '&filter=' + filter + '&order=' + order;
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

        return this._http.post(url, params, {headers: headers}).map(res => res.json());
    }

    getTask(token, id) {
        let headers = new Headers({'Authorization': token});

        return this._http.get(this.url + '/task/detail/' + id, {headers: headers}).map(res => res.json());
    }

    update(token, task, id) {
        let json = JSON.stringify(task);
        let params = "json=" + json + '&authorization=' + token;
        let headers = new Headers({'Content-Type': "application/x-www-form-urlencoded"});
        headers.append('Authorization', token);

        return this._http.patch(this.url + '/task/edit/' + id, params, {headers: headers}).map(res => res.json());
    }

    updateStatus(token, id) {
        let params = '&authorization=' + token;
        let headers = new Headers({'Content-Type': "application/x-www-form-urlencoded"});
        headers.append('Authorization', token);

        return this._http.patch(this.url + '/task/update-status/' + id, params, {headers: headers}).map(res => res.json());
    }

    deleteTask(token, id) {
        let headers = new Headers({'Authorization': token});

        return this._http.delete(this.url + '/task/remove/' + id, {headers: headers}).map(res => res.json());
    }
}