# Digital Bank Project Setup

## Description

This repository contains the setup instructions for the Digital Bank project (Frontend).

1. **Clone the Repository:**
    ```bash
    git clone [repository_url]
    ```

2. **Install Node.js and npm:**
    - Ensure that Node.js and npm are installed on your device. You can download them from the [official Node.js website](https://nodejs.org/).

3. **Install Project Dependencies:**
    ```bash
    cd [project_folder]
    npm install
    ```

## Steps to Run the Project (Android)

1. **Install Expo Go App:**
    - Download the Expo Go app from the [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) for testing on physical devices.

2. **Start the Project:**
    ```bash
    npx expo start
    ```
   
3. **Scan QR Code:**
    - Open the Expo Go app and scan the QR code displayed in the terminal.
    - Ensure your mobile phone is connected to the same network as your running laptop

## Tech Stack

- React Native
- TypeScript
- Expo
- React Native Paper
- mockapi.io
- Sentry

## Type of Error Handling

1. Network
2. Authentication
3. Data
4. Navigation
5. Server side

## Note

- While the project has been optimized and tested for optimal performance on Android devices, iOS users may encounter a limitation related to Expo LocalAuthentication. Specifically, there might be an issue with the automatic prompting of biometric authentication (Face ID) on iOS devices. As an alternative, users can utilize the passcode authentication method in such situations.
- The implementation of RSA key generation and storage, crucial for biometric authentication, is currently commented out in the code for demonstration purposes. In a production environment, it is highly recommended to implement this section to enhance security. This ensures the proper generation and secure storage of RSA keys for biometric authentication.

## References

1. **Clean Architecture:**
    - [Medium Article](https://medium.com/@ganeshraj020794/clean-architecture-in-react-native-38025e2d7223)
    - [LinkedIn Post](https://www.linkedin.com/pulse/simple-understanding-clean-architecture-react-native-john-jackson/)
2. **Responsive UI:**
    - [Android Developer Guide](https://developer.android.com/guide/topics/large-screens/support-different-screen-sizes)
3. **UI Library:**
    - [React Native Paper](https://reactnativepaper.com/)
4. **Biometric:**
    - [Dev.to Article](https://dev.to/allanloji/setting-up-biometric-login-on-your-react-native-app-4903)
    - [Expo LocalAuthentication](https://docs.expo.dev/versions/latest/sdk/local-authentication/)
