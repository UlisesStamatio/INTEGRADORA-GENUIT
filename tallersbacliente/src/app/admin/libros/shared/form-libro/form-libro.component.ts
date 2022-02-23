import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { LibroService } from '../libro.service';

@Component({
  selector: 'app-form-libro',
  templateUrl: './form-libro.component.html',
  styleUrls: []
})
export class FormLibroComponent implements OnInit {
  errors: any[] = [];
  form!: FormGroup;
  urlImagen?: string;
  loading: boolean = false;


  @Input() libro?: any;
  @Output() onSave: EventEmitter<any> = new EventEmitter();


  constructor(
    private libroService: LibroService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.libro) {
      this.urlImagen = this.libro.urlPortada;
    }

    this.form = this.formBuilder.group({
      titulo: [this.libro?.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      slug: [this.libro?.slug, [Validators.required, Validators.maxLength(250)]],
      descripcion: [this.libro?.descripcion, [Validators.required]],
      rutaPortada: [this.libro?.rutaPortada, [Validators.required]],
      cupos: [this.libro?.cupos, [Validators.required, Validators.min(0)]],
      equipos: [this.libro?.equipos, [Validators.required, Validators.min(0)]],
      proyectores: [this.libro?.proyectores, [Validators.required, Validators.min(0)]],
      direccion: [this.libro?.direccion, [Validators.required]],
      status: [this.libro?.status]
    });
  }

  uploadFile(event: any, fieldName: string) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      this.libroService.uploadFile(formData)
        .subscribe((data: any) => {
          this.form.controls[fieldName].setValue(data.ruta);

          if (fieldName != 'rutaArchivo') {
            this.urlImagen = data.url;
          }
        });
    }
  }

  onChangeTitulo() {
    const slug = this.form.controls.titulo.value
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
    
    this.form.controls.slug.setValue(slug);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.onSave.emit(this.form.value);
  }

}
