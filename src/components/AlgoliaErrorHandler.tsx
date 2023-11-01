import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  errorComponent: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class AlgoliaErrorHandler extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AlgoliaErrorHandler caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }

    return this.props.children;
  }
}

export default AlgoliaErrorHandler;
