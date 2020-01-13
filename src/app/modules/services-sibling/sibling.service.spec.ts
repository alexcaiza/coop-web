import { SiblingService } from './sibling.service';
import { TestBed } from '@angular/core/testing';

describe('DespositosSiblingSearchListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiblingService = TestBed.get(SiblingService);
    expect(service).toBeTruthy();
  });
});
