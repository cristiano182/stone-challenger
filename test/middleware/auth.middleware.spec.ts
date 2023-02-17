import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/common/app.module';

jest.setTimeout(100000);

const customer = {
  name: 'any_name',
  document: 41233439880,
};

describe('AuthMiddleware', () => {
  let app: INestApplication;
  let mockAxios: MockAdapter;

  beforeAll(async () => {
    mockAxios = new MockAdapter(axios);

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`should return 200 if SSO is available`, async () => {
    mockAxios.onPost(process.env.SSO_HOST).reply(200, { active: true });

    return await request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .set('Authorization', `Bearer any_token`)
      .expect(201);
  });

  it(`should return 401 if token is not active`, async () => {
    mockAxios.onPost(process.env.SSO_HOST).reply(200, { active: false });

    return await request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .set('Authorization', 'Bearer any_token')
      .expect(401);
  });

  it(`should return 502 if SSO is not available`, async () => {
    mockAxios.onPost(process.env.SSO_HOST).reply(500);

    return await request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .set('Authorization', 'Bearer any_token')
      .expect(502);
  });
});
