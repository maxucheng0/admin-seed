import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { STColumn, STRes } from '@delon/abc';
import { URL } from '../../common/url';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  url = URL.USER;
  params = { };
  res: STRes = {
    reName: { list: "userList", total: "userCount" }
  };
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '用户名', index: 'username' },
    { title: '头像', index: 'headPortrait', type: 'img' },
    { title: '联系方式', index: 'contract' },
    { title: '昵称', index: 'displayName' },
    { title: '注册时间', index: 'dateCreated', type: 'date' },
    { title: '是否冻结', index: 'enabled', type: 'badge', badge: { true: { text: '有效', color: 'processing' }, false: { text: '冻结', color: 'warning' } } }
  ];

  constructor(private http: _HttpClient) { }

  ngOnInit(): void {
  }


}
