import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'design-library-nx-sb-butn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nx-sb-butn.component.html',
  styleUrls: ['./nx-sb-butn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'design-librarynx-sb-butn',
  },
})
export class NxSbButnComponent {
  /**
   * Is this the principal call to action on the page?
   */
  @Input()
  primary = false;

  /**
   * What background color to use
   */
  @Input()
  backgroundColor?: string;

  /**
   * How large should the button be?
   */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Button';

  /**
   * Optional click handler
   */
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.primary
      ? 'design-library-nx-sb-butn--primary'
      : 'design-library-nx-sb-butn--secondary';

    return [
      'design-library-nx-sb-butn',
      `design-library-nx-sb-butn--${this.size}`,
      mode,
    ];
  }
}
