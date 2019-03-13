import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/x-www-form-urlencoded');

const httpOptions = {
  headers: headers_object
};



import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) {}
  // private http: HttpClient

  title = 'CoWorkArles';

    // tslint:disable-next-line: use-life-cycle-interface
    // ngOnInit() {
    //   const obs = this.http.get(ApiService.getApiURL());
    //   obs.subscribe(() => console.log('Réponse obtenue'));
    // }

    // tslint:disable-next-line: use-life-cycle-interface
    // ngOnInit() {
    //   const obs = this.http.get(ApiService.getData());
    //   console.log('Affichage ok');
    // }

    // tslint:disable-next-line: use-life-cycle-interface
    ngOnInit() {
      let obs = this.http.post('http://localhost:8090/users/register/', httpOptions);
      obs.subscribe(() => console.log('Api récupérée'));
    }


}
