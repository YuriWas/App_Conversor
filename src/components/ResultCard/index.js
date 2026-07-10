import { View, Text } from "react-native";
import { styles } from "../../styles/app.styles";
import { colors } from "../../styles/colors";
import { formatExchangeDate } from "../../utils/formatDate";

export function ResultCard({
  exchangeRate,
  result,
  fromCurrency,
  toCurrency,
  currencies,
  lastUpdated,
  apiError,
}) {
  if (!result && !apiError) return null;

  const toSymbol = currencies.find(
    (currency) => currency.code === toCurrency,
  )?.symbol;
  const formattedDate = formatExchangeDate(lastUpdated);

  return (
    <View style={styles.cardResult}>
      {apiError ? (
        <Text style={[styles.cardResultText, { color: colors.textSecondary }]}>
          {apiError}
        </Text>
      ) : (
        <>
          <Text style={styles.cardResultTitle}>Resultado</Text>
          <Text style={styles.cardResultValue}>
            {toSymbol} {result}
          </Text>
          <View style={styles.cardResultInfo}>
            <Text style={styles.cardResultText}>
              Taxa de Câmbio 1: {fromCurrency} = {exchangeRate?.toFixed(4)}{" "}
              {toCurrency}
            </Text>
          </View>
          {formattedDate ? (
            <Text style={styles.cardResultFooter}>
              Última atualização: {formattedDate}
            </Text>
          ) : null}
        </>
      )}
    </View>
  );
}
