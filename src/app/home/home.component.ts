import { Component } from '@angular/core';
import { AuthApiService } from '../service/auth-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
    constructor(
      public authApiService: AuthApiService
    ) { }
}
