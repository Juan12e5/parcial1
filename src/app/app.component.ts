import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CreateModuleComponent } from './admin/components/create-module/create-module.component';
import { HeaderComponent } from './admin/components/header/header.component';
import { ShowModuleComponent } from './admin/components/show-module/show-module.component';
import { SidebarComponent } from './admin/components/sidebar/sidebar.component';
import { UpdateModuleComponent } from './admin/components/update-module/update-module.component';
import { Module } from '../app/admin/interfaces/Module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent, CreateModuleComponent, ShowModuleComponent, UpdateModuleComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  modules: Module[] = [];
  filteredModules: Module[] = [];
  searchTerm: string = '';
  selectedCategory: string | null = null;
  isCreating: boolean = false;
  selectedModule: Module | null = null;

  ngOnInit(): void {
    this.loadModules();
    this.filteredModules = [...this.modules];  // Inicialmente, todos los módulos son visibles
  }

  loadModules(): void {
    const savedModules = localStorage.getItem('modules');
    this.modules = savedModules ? JSON.parse(savedModules) : [];
    this.applyFilters();  // Aplicamos filtros si los hay
  }

  createModule(newModule: Module): void {
    newModule.id = this.modules.length > 0 ? this.modules[this.modules.length - 1].id + 1 : 1;  // Asignar un id único
    this.modules.push(newModule);
    this.saveModules();  // Guardamos en LocalStorage
    this.applyFilters();  // Aplicamos los filtros actualizados
    this.isCreating = false;
  }
  

  updateModule(updatedModule: Module): void {
    const index = this.modules.findIndex(m => m.id === updatedModule.id);
    if (index !== -1) {
      this.modules[index] = updatedModule;
      this.saveModules();
      this.applyFilters();  // Aplicamos los filtros actualizados
    }
    this.isCreating = false;
  }

  deleteModule(id: number): void {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este módulo?');
    if (confirmed) {
      this.modules = this.modules.filter(module => module.id !== id);
      this.saveModules();
      this.applyFilters();  // Actualizamos los filtros
    }
  }

  saveModules(): void {
    localStorage.setItem('modules', JSON.stringify(this.modules));
  }

  filterModules(): void {
    this.applyFilters();  // Llamamos a la función que maneja los filtros
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();  // Actualizamos el filtro por categoría
  }

  clearFilter(): void {
    this.selectedCategory = null;
    this.applyFilters();  // Limpiamos los filtros
  }

  applyFilters(): void {
    let modules = [...this.modules];

    // Aplicar filtro por categoría si hay una seleccionada
    if (this.selectedCategory) {
      modules = modules.filter(module => module.type === this.selectedCategory);
    }

    // Aplicar filtro de búsqueda por nombre
    if (this.searchTerm) {
      modules = modules.filter(module =>
        module.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredModules = modules;  // Actualizamos los módulos filtrados en la UI
  }

  openCreateForm(): void {
    this.isCreating = true;
    this.selectedModule = null;
  }

  cancelCreation(): void {
    this.isCreating = false;
  }

  editModule(module: Module): void {
    this.selectedModule = module;
    this.isCreating = true;
  }

  cancelUpdate(): void {
    this.isCreating = false;
    this.selectedModule = null;
  }
}