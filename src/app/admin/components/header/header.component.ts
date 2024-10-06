import { CommonModule } from '@angular/common';
import { Component,  Output, EventEmitter  } from '@angular/core';
import { Module } from '../../interfaces/Module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() onCreate = new EventEmitter();

  toggleCreate(){
    this.onCreate.emit()
    console.log('Se emitió el evento')
  }
}
