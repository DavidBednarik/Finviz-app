import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should return tree data (GET /imagenet/tree)', async () => {
    const response = await request(app.getHttpServer())
      .get('/imagenet/tree')
      .expect(200);

    // Check response structure (adjust based on real API)
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);

    // Validate first item structure (adjust keys as needed)
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('size');
    expect(response.body[0]).toHaveProperty('children');
  }, 15000);

  it('should return 404 for non-existing routes (GET /invalid-route)', async () => {
    await request(app.getHttpServer()).get('/invalid-route').expect(404);
  });
});
