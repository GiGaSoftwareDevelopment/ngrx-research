import { Meta } from '@storybook/angular';
import { NxSbButnComponent } from './nx-sb-butn.component';

export default {
  title: 'libs/shared/ui-design-library/design-library-nx-sb-butn',
  component: NxSbButnComponent,
} as Meta<NxSbButnComponent>;

export const canvas = {
  render: (args: NxSbButnComponent) => ({
    props: args,
  }),
  args: {
    primary: false,
    backgroundColor: '#ff00ff',
    size: 'medium',
    label: 'Button',
  },
};
