import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      dateOfBirth: [''],
    }, { validators: passwordMatchValidator('password', 'confirmPassword') });

  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const formValue = this.registerForm.value;
    const userData = {
      username: formValue.username,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      dateOfBirth: formValue.dateOfBirth ?? null,
      role: 'reader'
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = "Échec de l'inscription. Veuillez réessayer.";
        this.loading = false;
      }
    });
  }
}
