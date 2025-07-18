import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  editUser(id: number): void {
    this.router.navigate(['/edit-user', id]);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  sendEmail(userId: number): void {
    this.userService.sendEmail(userId).subscribe(() => {
      alert('Email envoyé avec succès !');
    });
  }
}
