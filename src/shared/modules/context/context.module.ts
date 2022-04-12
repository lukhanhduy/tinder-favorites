import { Global, Module } from '@nestjs/common';
import { RequestContext } from '.';

@Global()
@Module({
  providers: [RequestContext],
  exports: [RequestContext],
})
export class ContextModule {}
