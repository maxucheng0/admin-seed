import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SocialService, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { StartupService } from '@core';
import { URL } from '../../../common/url';
import { OssService } from "../../../common/services/oss.service";

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  loading = false;

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    private ossService: OssService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  form: FormGroup;
  error = '';
  type = 0;

  // #region get captcha

  count = 0;
  interval$: any;

  // #endregion

  submit() {
    this.error = '';
    this.userName.markAsDirty();
    this.userName.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.userName.invalid || this.password.invalid) {
      return;
    }

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.http.post(URL.LOGIN, { username: this.userName.value, password: this.password.value }).subscribe(
      (res: any) => {
        setTimeout(() => {
          this.loading = false;
        }, 500);

        this.reuseTabService.clear();
        if (res.roles[0] === 'ROLE_ADMIN') {
          // 设置Token信息
          this.tokenService.set({
            token: res.access_token,
            name:  res.displayName,
            roles: res.roles,
            email: res.username,
            id: 10000,
            time: +new Date(),
          });
          sessionStorage.setItem('currentUserId', res.userId);
          //获取OSS SecurityToken
          this.ossService.getSecurityToken().subscribe((res: any) => {
            sessionStorage.setItem('accessKeyId', res.accessKeyId);
            sessionStorage.setItem('dir', res.dir);
            sessionStorage.setItem('expire', res.expire);
            sessionStorage.setItem('host', res.host);
            sessionStorage.setItem('policy', res.policy);
            sessionStorage.setItem('signature', res.signature);
            sessionStorage.setItem('cdnUrl', res.cdnUrl);
          });
          sessionStorage.setItem('userId', res.userId);
          sessionStorage.setItem('token', res.access_token);
          // 重新获取 StartupService 内容，若其包括 User 有关的信息的话
          this.startupSrv.load().then(() => this.router.navigate(['/shop']));
        } else {
          this.error = `登陆失败，您没有登陆权限`;
        }
      },
      error => {
        console.log('oops', error);
        this.error = `账户或密码错误`;
        this.loading = false;
      });
  }

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
