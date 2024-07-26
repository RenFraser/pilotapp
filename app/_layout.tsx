import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@tamagui/core/reset.css";
import "react-native-reanimated";

// import polyfills for missing libs that are used in the AWS SDK clients
// the sdk breaks on versions > 3.574.0
// See this commit for the full imports in git blame.
// See: https://github.com/aws/aws-sdk-js-v3/issues/6269
// TODO: upgrade to the latest bedrock runtime with all of it's really nice types after the above github issue is resolved.
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { ReadableStream } from "web-streams-polyfill/ponyfill";
import "text-encoding-polyfill";

import tamaguiConfig from "@/tamagui.config";
import { TamaguiProvider } from "tamagui";
// @ts-expect-error added to polyfill the react native missing libs in AWS SDK v3. See:https://github.com/aws/aws-sdk-js-v3/issues/6269#issuecomment-2253591101
globalThis.ReadableStream = ReadableStream;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    // TODO: convert these to imports
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"), // eslint-disable-line @typescript-eslint/no-require-imports
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"), // eslint-disable-line @typescript-eslint/no-require-imports
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"), // eslint-disable-line @typescript-eslint/no-require-imports
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
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
