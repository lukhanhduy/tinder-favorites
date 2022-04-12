import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get epicAPIUrl() {
    return this.configService.get<string>('EPIC_API_URL')
  }

  get jwtConfig() {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
      ttl: this.configService.get<string>('JWT_TTL'),
    };
  }

  get elasticConfig() {
    return {
      node: this.configService.get('ELASTIC_URL'),
      auth: {
        username: this.configService.get('ELASTIC_USER'),
        password: this.configService.get('ELASTIC_PASSWORD'),
      }
    }
  }
}
