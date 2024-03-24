import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDepositoComponent } from './formulario-deposito.component';

describe('FormularioDepositoComponent', () => {
  let component: FormularioDepositoComponent;
  let fixture: ComponentFixture<FormularioDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDepositoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
