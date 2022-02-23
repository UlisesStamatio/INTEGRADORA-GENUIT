import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors,ReactiveFormsModule } from '@angular/forms';
import { ApartadosService } from '../apartados.service'; 
import { AuthService } from 'src/app/auth/shared/auth.service'; 
@Component({
  selector: 'app-form-apartados',
  templateUrl: './form-apartados.component.html',
  styleUrls: []
})
export class FormApartadosComponent implements OnInit {
  errors: any[] = [];
  form!: FormGroup;
  loading: boolean = false;

  @Input()  libro?: any;
  @Input() apartados?:any;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    let idUsuario=this.authService.getId();
    
    this.form = this.formBuilder.group({
      fechaInicio: [this.apartados?.fechaInicio, [Validators.required]],
      fechaFin: [this.apartados?.fechaFin, [Validators.required]],
      espacio: [this.libro?.id,[Validators.required]],
      usuario: [idUsuario, [Validators.required]],
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
