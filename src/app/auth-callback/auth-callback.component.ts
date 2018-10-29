import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationCancel } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { Http, RequestOptions, Headers, Response} from '@angular/http';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  public accesstoken:any;

  constructor(private http: Http, public router: Router, private authService: AuthService) {
    router.events.subscribe(s => {
        let params = new URLSearchParams(this.url.split('#')[1]);
        this.accesstoken = params.get('access_token');
        console.log('this is access token 2 ' + this.accesstoken);
    });
   }

  ngOnInit() {
    this.authService.completeAuthentication();
  }

}
