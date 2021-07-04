import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicService {
  declare id: number | null;

  constructor() {}

  getBaseUrl(): string {
    return 'http://localhost:3000';
  }

  setId(id: number): void {
    if (typeof(id) !== 'number') {
      this.id = null;
    }

    this.id = id;
    localStorage.setItem('id', '' + this.id);
  }

  getId(): number {
    if (!this.id) {
      const id: string = localStorage.getItem('id') as string;

      if (!id || id === 'null' || id === 'undefined' || isNaN(+id)) {
        this.id = null;
      } else {
        this.id = +id;
      }
    } 

    return this.id as number
  }
}
