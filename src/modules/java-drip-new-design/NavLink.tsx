import { FC } from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import {
  HeaderLink as BaseHeaderLink,
  NavigationGroup as BaseNavigationGroup,
  LinkProps,
} from '../../canvas/_navigation/NavLink';

const NavigationGroup: FC<LinkProps> = props => (
  <BaseNavigationGroup
    {...props}
    styles={{
      link: 'hover:text-secondary',
      activeLink: 'text-secondary',
    }}
  />
);

const HeaderLink: FC<LinkProps> = props => (
  <BaseHeaderLink
    {...props}
    styles={{
      link: 'hover:text-secondary',
      activeLink: 'text-secondary',
    }}
  />
);

// default variant
registerUniformComponent({
  type: 'navigationLink',
  component: HeaderLink,
});

registerUniformComponent({
  type: 'navigationLink',
  component: HeaderLink,
  variantId: 'header',
});

registerUniformComponent({
  type: 'navigationGroup',
  component: NavigationGroup,
});
