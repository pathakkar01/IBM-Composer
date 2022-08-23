import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RESTUIComponent } from './restui.component';

describe('RESTUIComponent', () => {
  let component: RESTUIComponent;
  let fixture: ComponentFixture<RESTUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RESTUIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RESTUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
