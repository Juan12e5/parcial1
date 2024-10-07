import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Module } from '../../interfaces/Module';
import { ModuleType } from '../../interfaces/Module-type';

@Component({
  selector: 'app-create-module',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-module.component.html',
  styleUrl: './create-module.component.css'
})
export class CreateModuleComponent {
  @Output() onCreate = new EventEmitter<Module>();
  @Output() onCancel = new EventEmitter<void>();
  moduleForm: FormGroup;

  types: ModuleType[] = [
    { name: 'Educativo' },
    { name: 'Creativo' },
    { name: 'Tecnología' },
    { name: 'Salud' },
    { name: 'Negocios' }
  ];

  constructor(private fb: FormBuilder) {
    this.moduleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.moduleForm.invalid) {
      this.moduleForm.markAllAsTouched();  
      return;
    }

    const newModule = this.moduleForm.value;
    this.onCreate.emit(newModule);
    this.moduleForm.reset();
    alert('Módulo creado correctamente');
  }

  cancelCreation(): void {
    this.onCancel.emit();
    this.moduleForm.reset();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0]; 
    const allowedTypes = ['image/png', 'image/jpeg'];
    
    if (file && allowedTypes.includes(file.type)) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        this.moduleForm.patchValue({ image: base64String });
        this.moduleForm.get('image')?.updateValueAndValidity();
      };

      reader.readAsDataURL(file);
      this.moduleForm.get('image')?.setErrors(null); 
    } else {
      this.moduleForm.get('image')?.setErrors({ invalidFileType: true });
    }
  }
}
