import React, { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react-native';
import { Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to Sentry
    Sentry.captureException(error, { extra: { errorInfo } });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <FallbackComponent />;
    }

    return this.props.children;
  }
}

const FallbackComponent = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>Something went wrong.</Text>
    <Text style={styles.message}>
      An error has occurred and has been reported. Please try again later.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});
export default ErrorBoundary;
