import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  authenticate,
  enableBiometrics,
} from "../../shared/biometrics/BiometricsService";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../shared/navigation/NavigationTypes";

const LoginScreen = () => {
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleEnableBiometrics = async () => {
    const success = await enableBiometrics();
    setBiometricsEnabled(success);
  };

  const handleLogin = async () => {
    const success = await authenticate();
    if (success) {
      // Navigate to the main app screen
      navigation.replace("TransactionHistory");
    } else {
      // Biometric authentication failed
      alert("Biometric authentication failed");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../shared/img/login_logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Secure Login</Text>
      {!biometricsEnabled ? (
        <TouchableOpacity
          style={styles.enableButton}
          onPress={handleEnableBiometrics}
        >
          <Text style={styles.enableButtonText}>Enable Biometrics</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login with Biometrics</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  enableButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
  },
  enableButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
