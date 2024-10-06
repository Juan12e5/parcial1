import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Module } from '../../interfaces/Module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-module.component.html',
  styleUrl: './show-module.component.css'
})
export class ShowModuleComponent {
  @Input() modules: Module[] = [];
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<Module>();

  deleteModule(id: number) {
    this.onDelete.emit(id);
  }

  editModule(module: Module) {
    this.onEdit.emit(module);
  }
}
