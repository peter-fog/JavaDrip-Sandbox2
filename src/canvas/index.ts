import './Accordion';
import './AccordionItem';
import './AddToCart';
import './Banner';
import './Breadcrumbs';
import './Button';
import './CallToAction';
import './Card';
import './CardBlock';
import './Carousel';
import './_containers/Container';
import './_containers/Grid';
import './_containers/GridItem';
import './ContentBlock';
import './Divider';
import './Feature';
import './FeaturedCallout';
import './Hero';
import './Image';
import './Modal';
import './_navigation/Footer';
import './_navigation/FooterSection';
import './_navigation/Header';
import './_navigation/IconLink';
import './_navigation/NavLink';
import './_navigation/_mega-menu/NavigationMenu';
import './_navigation/_mega-menu/NavigationMenuSection';
import './_navigation/_mega-menu/NavigationMenuSectionLink';
import './_navigation/_mega-menu/NavigationOneColumnMenu';
import './_navigation/_mega-menu/NavigationOneColumnMenuLink';
import './_navigation/_mega-menu/NavigationTwoColumnMenu';
import './Price';
import './ProductDetails';
import './ProductInfo';
import './ProductGallery';
import './Review';
import './RichText';
import './Spacer';
import './Testimonial';
import './Video';

import '@/modules/promotion';
import '@/modules/fake-cart';
import '@/modules/segment';
import '@/modules/java-drip-new-design';
import './AlgoliaSearch/AlgoliaHits';
import './AlgoliaSearch/AlgoliaInstantSearch';
import './AlgoliaSearch/AlgoliaRefinementList';
import './AlgoliaSearch/AlgoliaSearchBox';

import ProductInfo from '../modules/fake-cart/ProductInfo';
import ShoppingCartIcon from '../modules/fake-cart/ShoppingCartIcon';
import ProfileIcon from '../modules/segment/ProfileIcon';
import ProfileContent from '../modules/segment/ProfileContent';
import { overrideCanvasComponents } from '../modules/java-drip-new-design/overrideCanvasComponents';

// This is override of fake-commerce ProductInfo component to apply custom styling
overrideCanvasComponents({
  type: 'productInfo',
  component: ProductInfo,
});

// This is override of fake-commerce CartIcon component to apply custom styling
overrideCanvasComponents({
  type: 'shoppingCartIcon',
  component: ShoppingCartIcon,
});

// This is override of fake-commerce ProfileIcon component to apply custom styling
overrideCanvasComponents({
  type: 'profileIcon',
  component: ProfileIcon,
});

// This is override of fake-commerce ProfileContent component to apply custom styling
overrideCanvasComponents({
  type: 'profileContent',
  component: ProfileContent,
});

export { default as Card } from './Card';
export { CardVariants } from './Card';
