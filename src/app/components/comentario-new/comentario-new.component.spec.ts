import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioNewComponent } from './comentario-new.component';

describe('ComentarioNewComponent', () => {
  let component: ComentarioNewComponent;
  let fixture: ComponentFixture<ComentarioNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentarioNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
