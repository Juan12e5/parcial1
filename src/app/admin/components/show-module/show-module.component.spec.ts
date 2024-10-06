import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowModuleComponent } from './show-module.component';

describe('ShowModuleComponent', () => {
  let component: ShowModuleComponent;
  let fixture: ComponentFixture<ShowModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
