import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoNavComponent } from './historico-nav.component';

describe('HistoricoNavComponent', () => {
  let component: HistoricoNavComponent;
  let fixture: ComponentFixture<HistoricoNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
