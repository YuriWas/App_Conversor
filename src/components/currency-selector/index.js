import { View } from "react-native";
import { Button } from "../button";
import { styles } from "./styles";

export function CurrencySelector({
  currencies,
  selectedCurrency,
  onSelect,
  variant,
}) {
  return (
    <View style={styles.currencyGrid}>
      {currencies.map((currency) => (
        <Button
          key={currency.code}
          title={currency.code}
          variant={variant}
          onPress={() => onSelect(currency.code)}
          isSelected={selectedCurrency === currency.code}
        />
      ))}
    </View>
  );
}
