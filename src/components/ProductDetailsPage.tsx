import { FC, useEffect, useMemo } from 'react';
import { useUniformContext } from '@uniformdev/context-react';
import { camelize } from '@/utilities';
import Page from './Page';
import { PageProps } from './Page';

const ProductDetailsPage: FC<PageProps> = props => {
  const { context } = useUniformContext();
  const { pageSubcategories } = props.data?.parameters || {};
  const subcategories = pageSubcategories?.value as string[] | undefined;

  const enrichments = useMemo(
    () =>
      subcategories?.map((subCategory: string) => ({
        cat: 'subCategory',
        key: camelize(subCategory),
        str: 5,
      })) || [],
    [subcategories]
  );

  useEffect(() => {
    context.update({ enrichments });
  }, [context, enrichments]);

  return <Page {...props} />;
};

export default ProductDetailsPage;
