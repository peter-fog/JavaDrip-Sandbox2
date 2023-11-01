import { ComponentType } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';
import AlgoliaErrorHandler from '@/components/AlgoliaErrorHandler';
import { ErrorPropertyCallout } from '../components';

export function withErrorCallout<T>(
  Component: ComponentType<ComponentProps<T>>,
  errorText: string
): ComponentType<ComponentProps<T>> {
  return function wrapper(props: ComponentProps<T>) {
    return (
      <AlgoliaErrorHandler errorComponent={<ErrorPropertyCallout classNames="py-3" title={errorText} />}>
        <Component {...props} />
      </AlgoliaErrorHandler>
    );
  };
}
