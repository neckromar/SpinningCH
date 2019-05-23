import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersInactivedComponent } from './admin-users-inactived.component';

describe('AdminUsersInactivedComponent', () => {
  let component: AdminUsersInactivedComponent;
  let fixture: ComponentFixture<AdminUsersInactivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersInactivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersInactivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
