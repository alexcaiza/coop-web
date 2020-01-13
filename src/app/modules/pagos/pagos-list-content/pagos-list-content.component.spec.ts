import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosListContentComponent } from './pagos-list-content.component';

describe('PagosListContentComponent', () => {
  let component: PagosListContentComponent;
  let fixture: ComponentFixture<PagosListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
