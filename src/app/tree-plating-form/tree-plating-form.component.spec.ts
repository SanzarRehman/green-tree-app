import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TreePlatingFormComponent } from './tree-plating-form.component';

describe('TreePlatingFormComponent', () => {
  let component: TreePlatingFormComponent;
  let fixture: ComponentFixture<TreePlatingFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TreePlatingFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TreePlatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
