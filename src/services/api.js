const base_url = "https://api.exchangerate-api.com/v4/latest";

export async function exchangeRateApi(fromCurrency) {
  try {
    const response = await fetch(`${base_url}/${fromCurrency}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Erro na Api:", err);
  }
}
