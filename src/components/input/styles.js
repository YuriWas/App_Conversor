import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: colors.textSecondary,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  inputBox: {
    borderRadius: 24,
    backgroundColor: colors.inputBackground,
    padding: 18,
    marginBottom: 16,
  },
  inputTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  inputTopLeft: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
  inputTopRight: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
  inputRow: {
    position: "relative",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    overflow: "hidden",
  },
  textInput: {
    backgroundColor: "transparent",
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  inputSymbolLeft: {
    position: "absolute",
    left: 16,
    top: 18,
    color: colors.destaque,
    fontSize: 18,
  },
  inputSymbolOverlay: {
    position: "absolute",
    right: 16,
    top: 18,
    color: colors.destaque,
    fontSize: 18,
  },
  inputBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  inputBottomLeft: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  inputBottomRight: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
