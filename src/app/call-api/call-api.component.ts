import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response} from '@angular/http';
import { Router, NavigationCancel } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-call-api',
  templateUrl: './call-api.component.html',
  styleUrls: ['./call-api.component.css']
})
export class CallApiComponent implements OnInit {
  response: string;
  public accesstoken: any;

  constructor(private http: Http, public router: Router) {

   }

  ngOnInit() {
    let header = new Headers({ 'Authorization': 'Bearer '  + this.accesstoken});
    let options = new RequestOptions({ headers: header});
    this.http.get("https://api.reckon.com/r1/cashbooks", options)
          .subscribe(response => this.response = response.text());
  }

}
