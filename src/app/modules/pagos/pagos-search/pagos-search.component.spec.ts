import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosSearchComponent } from './pagos-search.component';

describe('PagosSearchComponent', () => {
  let component: PagosSearchComponent;
  let fixture: ComponentFixture<PagosSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
