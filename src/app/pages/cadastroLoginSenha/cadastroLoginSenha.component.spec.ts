import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLoginSenhaComponent } from './cadastroLoginSenha.component';

describe('CadastroLoginSenhaComponent', () => {
  let component: CadastroLoginSenhaComponent;
  let fixture: ComponentFixture<CadastroLoginSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroLoginsenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroLoginsenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
