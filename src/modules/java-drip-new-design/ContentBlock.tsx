import { FC } from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import BaseContentBlock, { ContentBlockProps } from '../../canvas/ContentBlock';
import { metrophobic } from '../../fonts';

const ContentBlock: FC<ContentBlockProps> = props => (
  <BaseContentBlock
    {...props}
    styles={{
      title: metrophobic.className,
      text: metrophobic.className,
    }}
  />
);

registerUniformComponent({
  type: 'content',
  component: ContentBlock,
});
