import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgcadastroComponent } from './pgcadastro.component';

describe('PgcadastroComponent', () => {
  let component: PgcadastroComponent;
  let fixture: ComponentFixture<PgcadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgcadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgcadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
