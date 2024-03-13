import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosucessoComponent } from './cadastrosucesso.component';

describe('CadastrosucessoComponent', () => {
  let component: CadastrosucessoComponent;
  let fixture: ComponentFixture<CadastrosucessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrosucessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrosucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
