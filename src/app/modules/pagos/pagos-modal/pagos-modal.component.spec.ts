import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosModalComponent } from './pagos-modal.component';

describe('PagosModalComponent', () => {
  let component: PagosModalComponent;
  let fixture: ComponentFixture<PagosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
