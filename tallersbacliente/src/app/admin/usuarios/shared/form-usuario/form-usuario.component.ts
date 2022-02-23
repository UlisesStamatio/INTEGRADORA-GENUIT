import { UsuariosService } from '../usuarios.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: []
})
export class FormUsuarioComponent implements OnInit {
  errors: any[] = [];
  form!: FormGroup;
  hidePassword: boolean = true;
  loading: boolean = false;
  error?: string;

  @Input() usuario?: any;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombres: [this.usuario?.nombres, [Validators.required]],
      apellidos: [this.usuario?.apellidos, [Validators.required]],
      email: [this.usuario?.email, [Validators.required, Validators.email]],
      passwordPlain: [this.usuario?.password, [Validators.required, Validators.minLength(4)]],
      cargo: [this.usuario?.cargo, [Validators.required]],
      rol: [this.usuario?.rol, [Validators.required]],
      status: [this.usuario?.status]
    });
  }


  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.onSave.emit(this.form.value);
  }
}
