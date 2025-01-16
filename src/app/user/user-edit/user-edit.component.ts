import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private userApiService: UserApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['', Validators.required]
    });
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.userApiService.getUser(this.userId).subscribe({
      next: (user: any) => {
        this.userForm.patchValue(user);
      },
      error: (error: any) => {
        console.error('Error fetching user:', error);
        alert('Error fetching user');
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userApiService.updateUser(this.userId, this.userForm.value).subscribe({
        next: () => {
          alert('User updated successfully');
          this.router.navigate(['/admin/users']);
        },
        error: (error: any) => {
          console.error('Error updating user:', error);
          alert('Error updating user');
        }
      });
    } else {
      alert('Please fill all fields correctly');
    }
  }
}