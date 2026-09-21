import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Write } from './write';

describe('Write', () => {
  let component: Write;
  let fixture: ComponentFixture<Write>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Write],
    }).compileComponents();

    fixture = TestBed.createComponent(Write);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
