import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ngrx-remove-entity-selector',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule ],
  templateUrl: './remove-entity-selector.component.html',
  styleUrls: [ './remove-entity-selector.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveEntitySelectorComponent {


  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });


}
