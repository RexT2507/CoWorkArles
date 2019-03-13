import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/x-www-form-urlencoded');

const httpOptions = {
  headers: headers_object
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

}
