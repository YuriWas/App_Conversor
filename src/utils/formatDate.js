export function formatExchangeDate(timestamp) {
  if (!timestamp) return null;

  const date = new Date(timestamp);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return isToday ? `Hoje às ${time}` : date.toLocaleString();
}
