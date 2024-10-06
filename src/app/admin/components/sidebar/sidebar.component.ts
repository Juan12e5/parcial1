import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleType } from '../../interfaces/Module-type';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() onCategorySelected = new EventEmitter<string>();

  types: ModuleType[] = [
    { name: 'Educativo' },
    { name: 'Creativo' },
    { name: 'Tecnología' },
    { name: 'Salud' },
    { name: 'Negocios' }
  ];

  selectCategory(type: string) {
    this.onCategorySelected.emit(type);
  }
}
