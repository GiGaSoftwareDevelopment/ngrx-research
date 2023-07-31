import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SignalEntityStoreComponent} from './signal-entity-store.component';

describe('SignalEntityStpreComponent', () => {
  let component: SignalEntityStoreComponent;
  let fixture: ComponentFixture<SignalEntityStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalEntityStoreComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SignalEntityStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
