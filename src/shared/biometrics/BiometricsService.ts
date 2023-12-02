import { RSA } from "react-native-rsa-native";
import * as SecureStore from "expo-secure-store";
import dayjs from "dayjs";
import { authenticateAsync } from "expo-local-authentication";

const askForBiometrics = async () =>
  await authenticateAsync({
    disableDeviceFallback: false,
    promptMessage: "Enable biometrics login",
    cancelLabel: "Not now",
  });

export const enableBiometrics = async (): Promise<boolean> => {
  const biometricsResult = await askForBiometrics();
  if (biometricsResult?.success) {
    // const keys = await RSA.generateKeys(1024);
    // await SecureStore.setItemAsync("USER_BIOMETRIC_KEY", keys.private);
    // await postBiometricKey({
    //     biometricKey: {
    //         publicKey: keys.public
    //     }
    // });
  }

  return biometricsResult?.success || false;
};

export const authenticate = async (): Promise<boolean> => {
  const biometricsResult = await authenticateAsync({
    disableDeviceFallback: false,
    // promptMessage: "Login with biometrics",
    cancelLabel: "Cancel",
  });
  if (biometricsResult?.success) {
    // await sendSignature();
  }

  // Should return the status from backend server
  return biometricsResult?.success;
};

const sendSignature = async () => {
  const signature = await generateSignature();
  if (signature) {
    // await postSignature({
    //     signature
    // });
  }
};

const generateSignature = async () => {
  const biometrics = await SecureStore.getItemAsync("USER_BIOMETRIC_KEY");
  const payload = {
    exp: dayjs().add(5, "minutes").unix(),
  };

  if (biometrics) {
    const signature = await sign(biometrics, payload);
    return signature;
  }
};

async function sign(privateKey: string, payload: any) {
  const signature = await RSA.signWithAlgorithm(
    payload,
    privateKey,
    "SHA256withRSA"
  );
  return signature;
}
