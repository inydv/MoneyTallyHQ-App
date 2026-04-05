import { Currency } from "./types";

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", countryCode: "us" },
  { code: "EUR", symbol: "€", name: "Euro", countryCode: "eu" },
  { code: "GBP", symbol: "£", name: "British Pound", countryCode: "gb" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar", countryCode: "ca" },
  { code: "AUD", symbol: "$", name: "Australian Dollar", countryCode: "au" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", countryCode: "jp" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", countryCode: "cn" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", countryCode: "in" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc", countryCode: "ch" },
  { code: "MXN", symbol: "$", name: "Mexican Peso", countryCode: "mx" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", countryCode: "br" },
  { code: "KRW", symbol: "₩", name: "South Korean Won", countryCode: "kr" },
  { code: "SGD", symbol: "$", name: "Singapore Dollar", countryCode: "sg" },
  { code: "HKD", symbol: "$", name: "Hong Kong Dollar", countryCode: "hk" },
  { code: "NZD", symbol: "$", name: "New Zealand Dollar", countryCode: "nz" },
  { code: "ZAR", symbol: "R", name: "South African Rand", countryCode: "za" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", countryCode: "ru" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona", countryCode: "se" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", countryCode: "no" },
  { code: "DKK", symbol: "kr", name: "Danish Krone", countryCode: "dk" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty", countryCode: "pl" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira", countryCode: "tr" },
  { code: "THB", symbol: "฿", name: "Thai Baht", countryCode: "th" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", countryCode: "id" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", countryCode: "my" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso", countryCode: "ph" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong", countryCode: "vn" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", countryCode: "ae" },
  { code: "SAR", symbol: "ر.س", name: "Saudi Riyal", countryCode: "sa" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", countryCode: "ng" },
  { code: "EGP", symbol: "£", name: "Egyptian Pound", countryCode: "eg" },
  { code: "KES", symbol: "Sh", name: "Kenyan Shilling", countryCode: "ke" },
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi", countryCode: "gh" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee", countryCode: "pk" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka", countryCode: "bd" },
  { code: "LKR", symbol: "Rs", name: "Sri Lankan Rupee", countryCode: "lk" },
  { code: "NPR", symbol: "Rs", name: "Nepalese Rupee", countryCode: "np" },
];

export function getCurrency(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
}

export function getCurrencySymbol(code: string): string {
  return getCurrency(code).symbol;
}

export function formatCurrency(
  amount: number,
  currencyCode: string = "USD",
): string {
  const currency = getCurrency(currencyCode);
  const formattedAmount = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${currency.symbol}${formattedAmount}`;
}

export function formatCurrencyCompact(
  amount: number,
  currencyCode: string = "USD",
): string {
  const currency = getCurrency(currencyCode);

  if (amount >= 1000000) {
    return `${currency.symbol}${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${currency.symbol}${(amount / 1000).toFixed(1)}K`;
  }

  return `${currency.symbol}${amount.toFixed(2)}`;
}

export function getFlagUrl(countryCode: string, size: number = 40): string {
  return `https://flagcdn.com/w${size}/${countryCode}.png`;
}
