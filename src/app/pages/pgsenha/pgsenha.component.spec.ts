import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgsenhaComponent } from './pgsenha.component';

describe('PgsenhaComponent', () => {
  let component: PgsenhaComponent;
  let fixture: ComponentFixture<PgsenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgsenhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgsenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
