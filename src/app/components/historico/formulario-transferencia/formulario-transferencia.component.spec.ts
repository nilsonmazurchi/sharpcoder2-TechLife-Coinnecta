import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTransferenciaComponent } from './formulario-transferencia.component';

describe('FormularioTransferenciaComponent', () => {
  let component: FormularioTransferenciaComponent;
  let fixture: ComponentFixture<FormularioTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioTransferenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
