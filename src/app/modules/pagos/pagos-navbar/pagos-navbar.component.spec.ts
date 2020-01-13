import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosNavbarComponent } from './pagos-navbar.component';

describe('PagosNavbarComponent', () => {
  let component: PagosNavbarComponent;
  let fixture: ComponentFixture<PagosNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
