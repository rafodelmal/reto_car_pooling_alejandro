import { TestBed } from '@angular/core/testing';

import { ActualizarDireccionService } from './actualizar-direccion.service';

describe('ActualizarDireccionService', () => {
  let service: ActualizarDireccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarDireccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
