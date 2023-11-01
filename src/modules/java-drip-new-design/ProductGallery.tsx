import { FC } from 'react';
import classNames from 'classnames';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import BaseProductGallery, { BaseProductGalleryProps } from '../../canvas/ProductGallery';
import { metrophobic } from '../../fonts';
import { ContainerVariants } from '../../components/Container';

const ProductGallery: FC<BaseProductGalleryProps> = props => (
  <BaseProductGallery
    {...props}
    styles={{
      title: classNames('tracking-[5.5px]', metrophobic.className),
      description: metrophobic.className,
    }}
  />
);

[undefined, ContainerVariants.BackgroundInContainer, ContainerVariants.FluidContent].forEach(variantId => {
  registerUniformComponent({
    type: 'productGallery',
    component: ProductGallery,
    variantId,
  });
});
