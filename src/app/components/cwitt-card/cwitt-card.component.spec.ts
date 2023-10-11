import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwittCardComponent } from './cwitt-card.component';

describe('CwittCardComponent', () => {
  let component: CwittCardComponent;
  let fixture: ComponentFixture<CwittCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CwittCardComponent]
    });
    fixture = TestBed.createComponent(CwittCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
