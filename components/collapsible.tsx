import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, ReactElement, useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

export function Collapsible({
  children,
  title,
}: { title: string } & PropsWithChildren): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsOpen((value) => !value)}
        style={styles.heading}
      >
        <Ionicons
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    marginLeft: 24,
    marginTop: 6,
  },
  heading: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
});
