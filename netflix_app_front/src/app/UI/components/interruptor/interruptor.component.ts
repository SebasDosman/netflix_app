import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-interruptor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interruptor.component.html',
  styleUrls: ['./interruptor.component.css']
})
export class InterruptorComponent {

  @Input() mensajeError: string = '';

}
