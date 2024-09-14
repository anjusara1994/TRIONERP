import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {

  private ones: string[] = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  private tens: string[] = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  transform(value: number): string {
    if (value === 0) return 'zero AED';

    const [integerPart, fractionalPart] = value.toString().split('.');

    let words = this.convertToWords(parseInt(integerPart, 10)) + ' AED';

    if (fractionalPart) {
      words += ' and ' + this.convertFractionalPart(fractionalPart) + ' fils';
    }

    return words;
  }

  private convertToWords(num: number): string {
    if (num < 20) return this.ones[num];
    if (num < 100) return this.tens[Math.floor(num / 10)] + (num % 10 ? '-' + this.ones[num % 10] : '');
    if (num < 1000) return this.ones[Math.floor(num / 100)] + ' hundred' + (num % 100 ? ' and ' + this.convertToWords(num % 100) : '');
    if (num < 1000000) return this.convertToWords(Math.floor(num / 1000)) + ' thousand' + (num % 1000 ? ' ' + this.convertToWords(num % 1000) : '');
    if (num < 1000000000) return this.convertToWords(Math.floor(num / 1000000)) + ' million' + (num % 1000000 ? ' ' + this.convertToWords(num % 1000000) : '');
    return this.convertToWords(Math.floor(num / 1000000000)) + ' billion' + (num % 1000000000 ? ' ' + this.convertToWords(num % 1000000000) : '');
  }

  private convertFractionalPart(fraction: string): string {
    return fraction.split('').map(digit => this.ones[parseInt(digit, 10)]).join(' ');
  }
}
