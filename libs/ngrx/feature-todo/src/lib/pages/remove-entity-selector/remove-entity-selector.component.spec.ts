import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RemoveEntitySelectorComponent} from './remove-entity-selector.component';

describe('RemoveEntitySelectorComponent', () => {
  let component: RemoveEntitySelectorComponent;
  let fixture: ComponentFixture<RemoveEntitySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveEntitySelectorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveEntitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
