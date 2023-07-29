import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NxSbButnComponent } from './my-button.component';

describe('NxSbButnComponent', () => {
  let component: NxSbButnComponent;
  let fixture: ComponentFixture<NxSbButnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NxSbButnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NxSbButnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createNxNgMatPrototype', () => {
    expect(component).toBeTruthy();
  });
});
