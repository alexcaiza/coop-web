import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosMainComponent } from './pagos-main.component';

describe('PagosMainComponent', () => {
  let component: PagosMainComponent;
  let fixture: ComponentFixture<PagosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
