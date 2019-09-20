import { Injectable } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import { URL } from '../url';
import { _HttpClient } from '@delon/theme';
@Injectable()
export class UserService {

    constructor(private http: _HttpClient) { }

    public getUserList(param) {
        return  this.http.get(URL.USER, param);
    }

    public getUser(id) {
        return  this.http.get(URL.USER + '/' + id);
    }

    public frozenUser(id, operation) {
        return  this.http.put(URL.USER + '/' + id + `?operation=${operation}`);
    }

    public resetPassword(username) {
        return  this.http.put(URL.USER + '/resetPassword', {username: username});
    }

    public saveUser(user) {
        return  this.http.post(URL.USER, user);
    }

    public updateUser(id, user, operation) {
        return this.http.put(URL.USER + '/' + id + `?operation=${operation}`, user)
    }
}
