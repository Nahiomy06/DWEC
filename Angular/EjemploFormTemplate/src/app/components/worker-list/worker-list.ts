import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Iworder } from '../../interfaces/iworder';
import { WorkerService } from '../../services/workerService';

@Component({
  imports: [],
  selector: 'app-worker-list',
  styleUrl: './worker-list.css',
  templateUrl: './worker-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class WorkerList {
  arraysWorkers: Iworder[];

  private workerService = inject(WorkerService);

  constructor() {
    this.arraysWorkers = [];
  }

  ngOnInit(): void {
    this.arraysWorkers = this.workerService.getAllWorkers();
  }

  btnEliminarTrabajdores(): void {
    this.workerService.removeLastWorker();
  }
}
