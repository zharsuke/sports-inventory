import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../service/user.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthApiService } from '../../service/auth-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  currentPage: number = 1;
  usersPerPage: number = 10;
  totalItems: number = 0;

  constructor(
    private userApiService: UserApiService,
    private router: Router,
    public authApiService: AuthApiService
  ) {}

  async loadUsers(page: number) {
    try {
      this.currentPage = page;
      const response: any = await firstValueFrom(
        this.userApiService.getUsers(page, this.usersPerPage)
      );
      this.users = response;
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }

  deleteUser(id: number): void {
    if(confirm('Are you sure you want to delete this user?')) {
      this.userApiService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers(this.currentPage);
          alert('User deleted successfully');
        },
        error: (error: any) => {
          console.error('Error:', error);
          alert('Error deleting user');
        }
      });
    }
  }

  editUser(id: number): void {
    this.router.navigate(['/admin/users/edit', id]);
  }

  ngOnInit(): void {
    this.loadUsers(1);
  }

  async onPageChange(newPage: number) {
    if (newPage > 0) {
      await this.loadUsers(newPage);
    }
  }
}