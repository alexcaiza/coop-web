import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosListSearchComponent } from './pagos-list-search.component';

describe('PagosListSearchComponent', () => {
  let component: PagosListSearchComponent;
  let fixture: ComponentFixture<PagosListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
