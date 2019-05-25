import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContenidoActivarComponent } from './admin-contenido-activar.component';

describe('AdminContenidoActivarComponent', () => {
  let component: AdminContenidoActivarComponent;
  let fixture: ComponentFixture<AdminContenidoActivarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContenidoActivarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContenidoActivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
