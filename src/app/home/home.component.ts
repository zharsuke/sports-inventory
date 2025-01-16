import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ItemApiService } from '../service/item-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: any;
  items: any;

  name = 'Angular';
  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.png';

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private itemApiService: ItemApiService) { }

  onSubmit() {
    console.log('Form Submitted!', this.form.value);
    if (this.form.invalid) {
      console.log('Form is invalid!');
      alert('Form is invalid!');
    } else {
      console.log('Form is valid!');
      alert('Form is valid!');
    }
  }

  async ngOnInit() {
    console.log('HomeComponent initialized');
    const items = await firstValueFrom(this.itemApiService.getItems('items'));
    this.items = items;

    console.log(this.items);
  }

}
