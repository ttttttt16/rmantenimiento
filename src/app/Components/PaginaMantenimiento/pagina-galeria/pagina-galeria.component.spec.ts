import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaGaleriaComponent } from './pagina-galeria.component';

describe('PaginaGaleriaComponent', () => {
  let component: PaginaGaleriaComponent;
  let fixture: ComponentFixture<PaginaGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaGaleriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
