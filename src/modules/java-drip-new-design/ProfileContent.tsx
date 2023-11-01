import { ComponentType } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';
import { metrophobic } from '../../fonts';

const getOverriddenProductInfo =
  <T,>(Component: ComponentType<ComponentProps<T>>): ComponentType<ComponentProps<T>> =>
  (props: ComponentProps<T>) => (
    <Component
      {...props}
      styles={{
        container: metrophobic?.className,
      }}
    />
  );

export default getOverriddenProductInfo;
