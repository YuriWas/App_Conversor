// 1. Mudamos para 'import' para trazer as ferramentas para dentro do arquivo
import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

// 2. Mudamos para 'styles' (no plural) para bater com o seu botão
export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 8, // 3. Removemos a duplicata escrita com 'v' minúsculo
    margin: 4,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.text,
    fontWeight: "500", // 4. Letra 'W' maiúscula e o 500 entre aspas!
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
});
