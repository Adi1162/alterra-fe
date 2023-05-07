/* eslint-disable no-undef */
import { beforeEach, describe, vi } from "vitest";

async function convertCurrency(amount, fromCurrency, toCurrency) {
  let convertedAmount;
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
  const data = await response.json();
  convertedAmount = amount * data.rates[toCurrency];
  return convertedAmount;
}

describe("convertCurrency", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            rates: {
              USD: 1.0,
              EUR: 0.8,
              GBP: 0.7,
            },
          }),
      });
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("should convert currency correctly", async () => {
    const fromCurrency = "USD";
    const toCurrency = "EUR";
    const amount = 100;

    const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);
    expect(convertedAmount).toBe(amount * 0.8);
  });

  test("should call fetch with correct url", async () => {
    const fromCurrency = "USD";
    const toCurrency = "EUR";
    const amount = 100;

    await convertCurrency(amount, fromCurrency, toCurrency);
    expect(fetch).toHaveBeenCalledWith(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
  });
});
