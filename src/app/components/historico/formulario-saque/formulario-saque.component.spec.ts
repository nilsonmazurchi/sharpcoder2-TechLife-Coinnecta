import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioSaqueComponent } from './formulario-saque.component';

describe('FormularioSaqueComponent', () => {
  let component: FormularioSaqueComponent;
  let fixture: ComponentFixture<FormularioSaqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioSaqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioSaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
