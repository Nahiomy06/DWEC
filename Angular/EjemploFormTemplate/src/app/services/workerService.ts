import { Service } from '@angular/core';
import { Iworder } from '../interfaces/iworder';

@Service()
export class WorkerService {
  private arrayWorkers: Iworder[];

  constructor() {
    this.arrayWorkers = [];
  }

  addWorker(worker: Iworder) {
    this.arrayWorkers.push(worker);
  }
  getAllWorkers(): Iworder[] {
    return this.arrayWorkers;
  }

  removeLastWorker(): void {
    this.arrayWorkers.pop();
  }
}
