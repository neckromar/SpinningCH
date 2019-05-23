import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersDeletedComponent } from './admin-users-deleted.component';

describe('AdminUsersDeletedComponent', () => {
  let component: AdminUsersDeletedComponent;
  let fixture: ComponentFixture<AdminUsersDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
