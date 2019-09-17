import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class DatePipe implements PipeTransform {
  transform(dateString: any, metadata: ArgumentMetadata): Date {
    const date = moment.utc(dateString, 'MMDDYYYY');
    if (!date.isValid()) {
      throw new BadRequestException(
        `${dateString} is not a valid date. Dates must be in the format MMMDDYYYY.`);
    }
    return date.toDate();
  }
}
