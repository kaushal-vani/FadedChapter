import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatter',
  standalone: true,
})
export class CurrencyFormatterPipe implements PipeTransform {
  transform(value: number, countryCode: string): string {
    if (isNaN(value)) {
      return '';
    }

    const currencyInfo = this.getCurrencyByCountry(countryCode);
    const locale = currencyInfo.locale;
    const currency = currencyInfo.currency;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  }

  // Mapping countries to their respective currency and locale
  private getCurrencyByCountry(countryCode: string): { currency: string, locale: string } {
    const countryMap: { [key: string]: { currency: string, locale: string } } = {
      'US': { currency: 'USD', locale: 'en-US' },
      'DE': { currency: 'EUR', locale: 'de-DE' },
      'IN': { currency: 'INR', locale: 'hi-IN' },
      'JP': { currency: 'JPY', locale: 'ja-JP' },
      'GB': { currency: 'GBP', locale: 'en-GB' },
      // Add more countries as needed
    };

    return countryMap[countryCode] || { currency: 'USD', locale: 'en-US' };  // Default to USD
  }
}