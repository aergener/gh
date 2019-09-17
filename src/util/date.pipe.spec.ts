import { DatePipe } from './date.pipe';
import { BadRequestException } from '@nestjs/common';

describe('DatePipe', () => {
  const datePipe = new DatePipe();

  it('should create a date from MMDDYYYY date strings', () => {
    expect(
      datePipe.transform('01012019', { type: null }).toISOString(),
    ).toEqual('2019-01-01T00:00:00.000Z');
  });

  it('should throw an error for incorrect date formats', () => {
    expect(() => {
      datePipe.transform('2019-01-01', { type: null });
    }).toThrow(BadRequestException);
  });
});
