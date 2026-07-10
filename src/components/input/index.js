import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";

export function Input({
  value,
  onChangeText,
  label,
  placeholder,
  placeholderTextColor,
  leftIcon,
  rightIcon,
  topLeftText,
  topRightText,
  bottomLeftText,
  bottomRightText,
}) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.inputBox}>
        <View style={styles.inputTopRow}>
          <Text style={styles.inputTopLeft}>{topLeftText}</Text>
          <Text style={styles.inputTopRight}>{topRightText}</Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            onChangeText={onChangeText}
            keyboardType="numeric"
          />
          {leftIcon ? (
            <Text style={styles.inputSymbolLeft}>{leftIcon}</Text>
          ) : null}
          {rightIcon ? (
            <Text style={styles.inputSymbolOverlay}>{rightIcon}</Text>
          ) : null}
        </View>

        <View style={styles.inputBottomRow}>
          <Text style={styles.inputBottomLeft}>{bottomLeftText}</Text>
          <Text style={styles.inputBottomRight}>{bottomRightText}</Text>
        </View>
      </View>
    </View>
  );
}
