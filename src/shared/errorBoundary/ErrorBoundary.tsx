import React, { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react-native';
import { Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { AuthenticationError } from './AuthenticationError';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/NavigationTypes';

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
    // Check if the error is related to authentication
    if (error instanceof AuthenticationError) {
      // Handle the authentication error, e.g., navigate to the login screen
      const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
      navigation.replace('Login');
      return;
    }
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
