import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../../service/auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authApiService: AuthApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      console.log('Submitting login form', this.loginForm.value);

      this.authApiService.login(email, password).subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.accessToken);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Login failed', error);
          alert('Login failed: ' + (error.error?.message || 'Unknown error'));
        }
      });
    } else {
      console.log('Form is invalid', this.loginForm.value);
      alert('Please fill all fields correctly');
    }
  }
}