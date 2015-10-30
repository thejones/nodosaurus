import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';

import {HttpClient} from "aurelia-http-client";

let baseUrl = 'http://localhost:3001/auth/forgot'

@inject(AuthService, HttpClient)
export class Signup{
	constructor( auth, httpClient){
		this.auth = auth;
		this.http = httpClient;
	}
	heading = 'Forgot Password';

	email='';
	password='';

	askForPasswordReset(){
		this.http.post(`${baseUrl}`, {email: this.email } )
            .then( () => {
				alert("RESPONSE !");

				}
			);
	}
}
