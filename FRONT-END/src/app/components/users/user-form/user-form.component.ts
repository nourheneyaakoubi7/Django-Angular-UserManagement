import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEdit = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      matricule: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.userId = +params['id'];
        this.loadUser();
      }
    });
  }

  loadUser(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.userForm.patchValue(user);
      });
    }
  }

  submitForm(): void {
    if (this.userForm.valid) {
      const userData: User = this.userForm.value;

      if (this.isEdit && this.userId) {
        this.userService.updateUser(this.userId, userData).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.userService.addUser(userData).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
