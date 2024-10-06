import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Module } from '../../interfaces/Module';
import { CommonModule } from '@angular/common';
import { ModuleType } from '../../interfaces/Module-type';

@Component({
  selector: 'app-update-module',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-module.component.html',
  styleUrl: './update-module.component.css'
})
export class UpdateModuleComponent implements OnInit {
  @Input() module!: Module;
  @Output() onUpdate = new EventEmitter<Module>();
  @Output() onCancel = new EventEmitter<void>();
  moduleForm!: FormGroup;

  // Definimos los tipos directamente en el componente
  types: ModuleType[] = [
    { name: 'Educativo' },
    { name: 'Creativo' },
    { name: 'Tecnología' },
    { name: 'Salud' },
    { name: 'Negocios' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.moduleForm = this.fb.group({
      name: [this.module?.name, [Validators.required, Validators.minLength(5)]],
      description: [this.module?.description, [Validators.required, Validators.minLength(10)]],
      image: [this.module?.image, Validators.required], 
      type: [this.module?.type, Validators.required], 
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];  // Obtener el archivo seleccionado
    const allowedTypes = ['image/png', 'image/jpeg'];  // Tipos de archivos permitidos
    
    if (file && allowedTypes.includes(file.type)) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        this.moduleForm.patchValue({ image: base64String });
        this.moduleForm.get('image')?.updateValueAndValidity();  // Validar el control de imagen
      };

      reader.readAsDataURL(file);  // Convertir el archivo a base64
      this.moduleForm.get('image')?.setErrors(null);  // Limpiar errores de tipo
    } else {
      // Si el tipo de archivo no es válido, establecer el error en el control de imagen
      this.moduleForm.get('image')?.setErrors({ invalidFileType: true });
    }
  }

  submitForm(): void {
    if (this.moduleForm.invalid) {
      this.moduleForm.markAllAsTouched();
      return;
    }

    const updatedModule = { ...this.module, ...this.moduleForm.value };
    this.onUpdate.emit(updatedModule);
    alert('Módulo actualizado correctamente');
  }

  cancelUpdate(): void {
    this.onCancel.emit();
  }
}
