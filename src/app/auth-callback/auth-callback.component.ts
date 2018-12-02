import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationCancel, ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { Http, RequestOptions, Headers, Response} from '@angular/http';
import * as qs from 'querystring';
import * as _ from 'lodash';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})




export class AuthCallbackComponent implements OnInit {
  public accesstoken:any;

  constructor(private http: Http, public router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    this.authService.completeAuthentication();
    const params = qs.parse(window.location.search.substring(1));
    this.activatedRoute.fragment.subscribe((fragment: string) => {
      new URLSearchParams(fragment).get('access_token');
      const response = _.fromPairs(Array.from(new URLSearchParams(fragment)));
      console.log(response.access_token);

    })
  }

}
