import { useState } from "react";
import { exchangeRateApi } from "../services/api";
import { convertCurrency } from "../../utils/convertCurrency";

export function useExchangeRate() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [result, setResult] = useState("");
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);

  const fetchExchangeRate = async ({ amount, fromCurrency, toCurrency }) => {
    if (!amount) {
      setApiError("Atribua um Valor");
      setShowResultButton(false);
      return;
    }

    setLoading(true);
    setApiError(null);
    setShowResultButton(false);

    const data = await exchangeRateApi(fromCurrency);
    if (!data) {
      setApiError("Não foi possível conectar à API.");
      setLoading(false);
      return;
    }

    if (data.rates == null || data.rates[toCurrency] == null) {
      setApiError("A API não retornou a moeda selecionada.");
      setLoading(false);
      return;
    }

    const rate = data.rates[toCurrency];
    setExchangeRate(rate);

    const timestamp = data.time_last_updated
      ? data.time_last_updated * 1000
      : data.date
        ? new Date(data.date).getTime()
        : null;

    setLastUpdated(timestamp);

    const convertedAmount = convertCurrency(amount, rate);
    setResult(convertedAmount);
    setShowResultButton(true);
    setLoading(false);
  };

  const resetExchangeState = () => {
    setApiError(null);
    setShowResultButton(false);
    setResult("");
  };

  return {
    exchangeRate,
    lastUpdated,
    result,
    apiError,
    loading,
    showResultButton,
    fetchExchangeRate,
    resetExchangeState,
    setApiError,
  };
}
