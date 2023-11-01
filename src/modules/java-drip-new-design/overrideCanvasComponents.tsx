import { ComponentType } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import getOverriddenProductInfo from './ProductInfo';
import getOverriddenShoppingCartIcon from './ShoppingCartIcon';
import getOverriddenProfileIcon from './ProfileIcon';
import getOverriddenProfileContent from './ProfileContent';

const componentMappings: {
  [key: string]: <T>(Component: ComponentType<ComponentProps<T>>) => ComponentType<ComponentProps<T>>;
} = {
  productInfo: getOverriddenProductInfo,
  shoppingCartIcon: getOverriddenShoppingCartIcon,
  profileIcon: getOverriddenProfileIcon,
  profileContent: getOverriddenProfileContent,
};

export const overrideCanvasComponents = ({
  type,
  component,
  variantId,
}: {
  type: string;
  variantId?: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<ComponentProps<any>>;
}) => {
  const componentToRegister = componentMappings[type]?.(component) || component;
  registerUniformComponent({ type, component: componentToRegister, variantId });
};
