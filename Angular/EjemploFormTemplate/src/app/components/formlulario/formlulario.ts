import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Iworder } from '../../interfaces/iworder';
import { WorkerService } from '../../services/workerService';

@Component({
  imports: [FormsModule],
  selector: 'app-formlulario',
  styleUrl: './formlulario.css',
  templateUrl: './formlulario.html',
})
export class Formlulario {
  private workerService = inject(WorkerService);

  getDataForm(miFormulario: NgForm): void {
    let trabajador: Iworder = miFormulario.value as Iworder;
    // this.arraysWorkers.push(trabajador);
    // console.log(trabajador);
    this.workerService.addWorker(trabajador);
    miFormulario.reset();
  }
}
