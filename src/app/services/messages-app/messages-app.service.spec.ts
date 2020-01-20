import { TestBed } from '@angular/core/testing';

import { MessagesAppService } from './messages-app.service';

describe('MessagesAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagesAppService = TestBed.get(MessagesAppService);
    expect(service).toBeTruthy();
  });
});
