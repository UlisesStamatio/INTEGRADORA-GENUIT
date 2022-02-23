import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmailUnicoValidator } from '../shared/email-unico.validator';
import { AuthService } from '../shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: []
})
export class RegistroComponent implements OnInit {

  hidePassword: boolean = true;
  error?: string;

  form: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.email], [this.emailUnicoValidator]],
    nombres: [, [Validators.required]],
    apellidos: [, [Validators.required]],
    passwordPlain: [, [Validators.required, Validators.minLength(4)]],
    cargo: [,[Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private emailUnicoValidator: EmailUnicoValidator
  ) { }

  ngOnInit(): void {
  }

  registrar() {
    if (this.form.invalid) {
      return;
    }

    const registroValues = this.form.value;

    this.authService.registrar(registroValues)
      .subscribe(() => {
        this.authService.login(registroValues['email'], registroValues['passwordPlain'])
          .subscribe((response: any) => {
            this.router.navigate(['/']);

            this.snackBar.open(`Bienvenido ${response['name']}`, 'Cerrar', {
              duration: 5 * 1000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          })
      }, error => {
        this.error = error.error.message;
      })

    
  }

}
