import { HighlightErrorFilter, HighlightLogger } from '@highlight-run/nest';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const highlightOpts = { projectID: env.HIGHLIGHTID }
  app.useLogger(new HighlightLogger(highlightOpts))
  app.useGlobalFilters(
    new HighlightErrorFilter(app.get(HttpAdapterHost), highlightOpts),
  )
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(3000);
}
bootstrap();