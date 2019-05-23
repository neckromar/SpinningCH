import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersActivedComponent } from './admin-users-actived.component';

describe('AdminUsersActivedComponent', () => {
  let component: AdminUsersActivedComponent;
  let fixture: ComponentFixture<AdminUsersActivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersActivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersActivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
