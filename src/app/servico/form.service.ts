import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, take } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class FormService {
  private formData = new BehaviorSubject<any>(null);



  setFormData(data: any) {
    this.formData.pipe(take(1)).subscribe(currentData => {
      const combinedData = { ...currentData, ...data };
      this.formData.next(combinedData);
    });
  }


  getFormData() {
    return this.formData.asObservable().pipe(
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
    );
  }
  clearFormData() {
    this.formData.next(null);
  }
}
