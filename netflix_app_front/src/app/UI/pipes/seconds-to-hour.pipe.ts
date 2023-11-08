import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToHour'
})
export class SecondsToHourPipe implements PipeTransform {
  transform(seconds: number): string {

    seconds = Math.floor( seconds )
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursString = (hours < 10) ? `0${hours}` : `${hours}`;
    const minutesString = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    const secondsString = (remainingSeconds < 10) ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${hoursString}:${minutesString}:${secondsString}`;
  }
}
