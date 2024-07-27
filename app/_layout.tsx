import tamaguiConfig from "@/tamagui.config";
import "@tamagui/core/reset.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ReactElement, useEffect } from "react";
import "react-native-get-random-values";
import "react-native-reanimated"; // polyfill
import "react-native-url-polyfill/auto"; // polyfill
import { TamaguiProvider } from "tamagui";
import "text-encoding-polyfill"; // polyfill
import { ReadableStream } from "web-streams-polyfill/ponyfill"; // polyfill
// @ts-expect-error added to polyfill the react native missing libs in AWS SDK v3. See:https://github.com/aws/aws-sdk-js-v3/issues/6269#issuecomment-2253591101
globalThis.ReadableStream = ReadableStream;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout(): ReactElement | undefined {
  const [loaded] = useFonts({
    // TODO: convert these to imports
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"), // eslint-disable-line @typescript-eslint/no-require-imports
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"), // eslint-disable-line @typescript-eslint/no-require-imports
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"), // eslint-disable-line @typescript-eslint/no-require-imports
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return undefined;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </TamaguiProvider>
  );
}
