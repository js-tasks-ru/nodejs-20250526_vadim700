import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    if (isNaN(parseInt(value))) {
      throw new BadRequestException(`"${value}" не является числом`);
    }

    return parseInt(value);
  }
}
