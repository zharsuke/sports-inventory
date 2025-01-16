import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from '../../service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userApiService: UserApiService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userApiService.createUser(this.userForm.value).subscribe({
        next: () => {
          alert('User created successfully');
          this.router.navigate(['/admin/users']);
        },
        error: (error: any) => {
          console.error('Error creating user:', error);
          alert('Error creating user');
        }
      });
    } else {
      alert('Please fill all fields correctly');
    }
  }
}