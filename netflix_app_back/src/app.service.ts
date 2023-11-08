import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getServerPort(): string {
    return `Server is running on port ${ process.env.PORT }`;
  }
}