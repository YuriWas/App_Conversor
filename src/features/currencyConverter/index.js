import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../../styles/app.styles";
import { CurrencySelector } from "../../components/currency-selector";
import { Input } from "../../components/input";
import { ResultCard } from "../../components/ResultCard";
import { currencies } from "../../constants/currencies";
import { useExchangeRate } from "../../hooks/useExchangeRate";

export function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [showResult, setShowResult] = useState(false);
  const [resultCardY, setResultCardY] = useState(0);
  const scrollViewRef = useRef(null);

  const {
    exchangeRate,
    lastUpdated,
    result,
    apiError,
    loading,
    showResultButton,
    fetchExchangeRate,
    resetExchangeState,
  } = useExchangeRate();

  useEffect(() => {
    if (showResult && resultCardY > 0) {
      scrollViewRef.current?.scrollTo({
        y: resultCardY,
        animated: true,
      });
    }
  }, [showResult, resultCardY]);

  const fromCurrencyMeta = currencies.find(
    (currency) => currency.code === fromCurrency,
  );
  const toCurrencyMeta = currencies.find(
    (currency) => currency.code === toCurrency,
  );

  const handleConvert = async () => {
    setShowResult(false);
    await fetchExchangeRate({ amount, fromCurrency, toCurrency });
  };

  const handleViewResult = () => {
    setShowResult(true);
  };

  const handleCurrencyChange = (currency, direction) => {
    if (direction === "from") {
      setFromCurrency(currency);
    } else {
      setToCurrency(currency);
    }

    resetExchangeState();
    setShowResult(false);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    resetExchangeState();
    setShowResult(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        <View style={styles.content}>
          <StatusBar style="light" />
          <View style={styles.header}>
            <Text style={styles.title}>Conversor de Moedas</Text>
            <Text style={styles.subtitle}>Converta valores de moedas</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>
            <CurrencySelector
              currencies={currencies}
              selectedCurrency={fromCurrency}
              onSelect={(currency) => handleCurrencyChange(currency, "from")}
              variant="primary"
            />

            <Input
              label="Valor"
              value={amount}
              onChangeText={(value) => {
                setAmount(value);
                resetExchangeState();
                setShowResult(false);
              }}
              placeholder="0.00"
              placeholderTextColor="#94a3b8"
              leftIcon={fromCurrencyMeta?.symbol}
              rightIcon={toCurrencyMeta?.symbol}
              topLeftText={fromCurrencyMeta?.name}
              topRightText={`Converter para ${toCurrency}`}
              bottomLeftText="Moeda base"
              bottomRightText={toCurrencyMeta?.name}
            />

            <TouchableOpacity
              style={styles.swapButton}
              onPress={handleSwapCurrencies}
            >
              <Text style={styles.swapButtonText}>⇅</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Para:</Text>
            <CurrencySelector
              currencies={currencies}
              selectedCurrency={toCurrency}
              onSelect={(currency) => handleCurrencyChange(currency, "to")}
              variant="secondary"
            />
          </View>

          <TouchableOpacity
            style={
              loading
                ? [styles.convertButton, styles.convertButtonDisabled]
                : styles.convertButton
            }
            onPress={handleConvert}
            disabled={loading}
          >
            <Text style={styles.convertButtonText}>
              {loading ? "Carregando..." : "Converter"}
            </Text>
          </TouchableOpacity>

          {showResultButton && !apiError ? (
            <TouchableOpacity
              style={styles.viewResultButton}
              onPress={handleViewResult}
            >
              <Text style={styles.viewResultButtonText}>Ver resultado</Text>
            </TouchableOpacity>
          ) : null}

          {(showResult || apiError) && (
            <View
              onLayout={(event) => setResultCardY(event.nativeEvent.layout.y)}
            >
              <ResultCard
                exchangeRate={exchangeRate}
                result={result}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                currencies={currencies}
                lastUpdated={lastUpdated}
                apiError={apiError}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
