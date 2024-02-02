import { Component, ErrorInfo, ReactNode } from "react";

export interface ErrorBoundaryProps {
  errorPage: React.FunctionComponent<{
    errorMessage?: string;
    remount?: () => void;
  }>;
  children?: ReactNode;
  subscribeTo?: string;
}

interface State {
  /** True if there was an error caught. */
  hasError: boolean;
  /** The error message, undefined iff hasError is false. */
  errorMessage?: string;
  /** Resets the hasError to false whenever this value changes. */
  subscribedValue?: string;
}

/**
 * An error boundary is like a big Catch for any errors in its children. This will
 * clear itself whenever the URL changes from the one that caused the error.
 *
 * Error boundaries DO NOT catch errors inside event handlers. They only
 * catch errors during rendering a component. To catch errors inside event handlers,
 * wrap it in a normal TRY-CATCH.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      subscribedValue: props.subscribeTo,
    };
  }

  static getDerivedStateFromProps(
    props: ErrorBoundaryProps,
    state: State,
  ): State {
    // Clears the hasError state when the subscribedValue changes
    const valueChanged = state.subscribedValue !== props.subscribeTo;
    return {
      hasError: valueChanged ? false : state.hasError,
      errorMessage: valueChanged ? undefined : state.errorMessage,
      subscribedValue: props.subscribeTo,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.stack,
    };
  }

  /**
   * When the error boundary catches an error, it will log the error
   * to the console.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error Boundary Caught an Erorr:");
    console.error(error);
    console.error(JSON.stringify(errorInfo));
  }

  public remount(): void {
    this.setState((old) => ({ ...old, hasError: false }));
  }

  /** @returns The Error Page if errored, the children otherwise */
  public render(): ReactNode {
    if (this.state.hasError)
      return (
        <this.props.errorPage
          errorMessage={this.state.errorMessage}
          remount={() => this.setState((old) => ({ ...old, hasError: false }))}
        />
      );
    return this.props.children;
  }
}

export default ErrorBoundary;
