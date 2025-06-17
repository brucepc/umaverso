import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/core/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.authService.login(email!, password!)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.snackBar.open(this.getFirebaseErrorMessage(error.code), 'Fechar', { duration: 5000 });
      });
  }

  private getFirebaseErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'O email fornecido é inválido.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Email ou senha incorretos.';
      default:
        return 'Ocorreu um erro ao tentar fazer login. Tente novamente.';
    }
  }
} 