import { FC, useCallback, useState, ChangeEvent } from 'react';
import Image from '../../components/Image';
import classNames from 'classnames';
import {
  ComponentProps,
  registerUniformComponent,
  UniformText,
  useUniformCurrentComposition,
} from '@uniformdev/canvas-react';
import { formatProjectMapLink, getMediaUrl } from '../../utilities';
import {
  getImageOverlayColorStyle,
  getImageOverlayOpacityStyle,
  getObjectFitClass,
  getTextClass,
} from '../../utilities/styling';
import { withoutContainer } from '../../hocs/withoutContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BaseContainer, { ContainerProps } from '../../components/Container';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

type EmailSignupFormProps = ComponentProps<
  ContainerProps & {
    title?: string;
    titleStyle?: Types.HeadingStyles;
    description?: string;
    image?: string;
    buttonCopy: string;
    buttonLink: Types.ProjectMapLink;
    buttonStyle: Types.ButtonStyles;
    overlayColor?: Types.AvailableColor;
    overlayOpacity?: Types.AvailableOpacity;
    objectFit?: Types.AvailableObjectFit;
  }
>;

const EmailSignupForm: FC<EmailSignupFormProps> = ({
  titleStyle: TitleTag = 'h1',
  description,
  image,
  buttonLink = { path: '/signup?registered=true' },
  buttonCopy,
  buttonStyle = 'primary',
  overlayOpacity,
  overlayColor,
  objectFit,
  backgroundType,
  containerVariant,
  paddingBottom,
  paddingTop,
  marginBottom,
  marginTop,
}) => {
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState<string>('');
  const { isContextualEditing } = useUniformCurrentComposition();

  const imageUrl = getMediaUrl(image);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = e.target;
    setEmail(newValue);
    setIsError(!EMAIL_REGEX.test(newValue));
  }, []);

  return (
    <BaseContainer
      paddingBottom={paddingBottom}
      paddingTop={paddingTop}
      marginBottom={marginBottom}
      marginTop={marginTop}
      backgroundType={backgroundType}
      containerVariant={containerVariant}
    >
      <div className="hero min-h-[500px] relative text-primary-content">
        <div className="hero-content text-center p-0">
          {Boolean(imageUrl) && (
            <>
              <Image
                fill
                alt="hero-image"
                src={imageUrl}
                priority
                className={classNames('absolute top-0 bottom-0 left-0 right-0 -z-10', getObjectFitClass(objectFit))}
              />
              <div
                className={classNames(
                  'absolute top-0 bottom-0 left-0 right-0 z-10',
                  getImageOverlayOpacityStyle(overlayOpacity),
                  getImageOverlayColorStyle(overlayColor)
                )}
              ></div>
            </>
          )}
          <div className="flex flex-col mx-1 md:mx-10 z-20">
            <UniformText
              placeholder="Title goes here"
              parameterId="title"
              as={TitleTag}
              className={classNames('font-bold', getTextClass(TitleTag))}
            />
            <UniformText placeholder="Description goes here" parameterId="description" as="div" className="py-6" />
            <Input
              id="email"
              label="Email"
              className="text-white"
              value={email}
              onChange={handleInputChange}
              errorMessage={isError ? 'Please Enter a valid email address' : ''}
            />
            <div className={classNames('pb-6', { 'py-6': !description })}>
              {Boolean(buttonLink) && (
                <Button
                  className="mx-1"
                  href={formatProjectMapLink(buttonLink)}
                  copy={
                    isContextualEditing || buttonCopy ? (
                      <UniformText
                        placeholder="Sign up"
                        parameterId="buttonCopy"
                        onClick={isContextualEditing ? e => e.preventDefault() : undefined}
                      />
                    ) : (
                      'Sign up'
                    )
                  }
                  style={buttonStyle}
                  disable={(isError || !email) && !isContextualEditing}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

registerUniformComponent({
  type: 'emailSignupForm',
  component: withoutContainer(EmailSignupForm),
});

export default withoutContainer(EmailSignupForm);
