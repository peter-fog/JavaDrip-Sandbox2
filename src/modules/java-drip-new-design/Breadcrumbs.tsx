import { FC } from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import BaseBreadcrumbs, { BreadcrumbsProps } from '../../canvas/Breadcrumbs';
import { metrophobic } from '../../fonts';

const Breadcrumbs: FC<BreadcrumbsProps> = props => (
  <BaseBreadcrumbs
    {...props}
    styles={{
      container: metrophobic.className,
    }}
  />
);

registerUniformComponent({
  type: 'breadcrumbs',
  component: Breadcrumbs,
});
