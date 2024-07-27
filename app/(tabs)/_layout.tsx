import { TabBarIcon } from "@/components/navigation/tab-bar-icon";
import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          // eslint-disable-next-line sonarjs/no-unstable-nested-components
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              name={focused ? "home" : "home-outline"}
            />
          ),
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          // eslint-disable-next-line sonarjs/no-unstable-nested-components
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              name={focused ? "code-slash" : "code-slash-outline"}
            />
          ),
          title: "Explore",
        }}
      />
    </Tabs>
  );
}
