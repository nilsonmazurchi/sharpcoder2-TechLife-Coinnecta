import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgloginComponent } from './pglogin.component';

describe('PgloginComponent', () => {
  let component: PgloginComponent;
  let fixture: ComponentFixture<PgloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgloginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
