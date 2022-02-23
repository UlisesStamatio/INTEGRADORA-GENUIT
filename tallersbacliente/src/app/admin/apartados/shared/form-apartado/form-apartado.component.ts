import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ApartadosService } from '../apartados.service';
@Component({
  selector: 'app-form-apartado',
  templateUrl: './form-apartado.component.html',
  styleUrls: []
})
export class FormApartadoComponent implements OnInit {
  errors: any[] = [];
  form!: FormGroup;
  loading: boolean = false;

  @Input() libro?: any;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(
    private apartadoService: ApartadosService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fechaInicio: [this.libro?.fechaInicio, [Validators.required]],
      fechaFin: [this.libro?.fechaFin, [Validators.required]],
      espacio: [this.libro?.espacio.id,[Validators.required]],
      usuario: [this.libro?.usuario.id, [Validators.required]],
      estado: [this.libro?.estado, [Validators.required]]
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
