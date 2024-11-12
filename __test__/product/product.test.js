const request = require('supertest');
const TestHelper = require('../testHelper');
const ProductPlugin = require('../../src/routes/ProductRoutes');
const JWTHelpers = require('../../src/helpers/jwtHelpers');

let server;

describe("Product", () => {
  
  beforeAll(() => {
    server = TestHelper.createTestServer('/products', ProductPlugin);
  });
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await server.close();
  });

  test("It should return status response 200: Successfully POST Products", async () => {
    const req = {
      body: {
        username: "delta"
      }
    }

    const payload = {
      name: "Kursi Kayu Mahoni",
      description: "Kursi kayu minimalis dengan desain ergonomis yang cocok untuk ruang tamu atau ruang makan.",
      price: 440000.50
    }    

    process.env.JWT_SECRET = '66556A586E327234753778214125442A472D4B615064536703373367638792F423F4528482B4D6251655468576D5A7134743777217A24432646294A40TunG4';

    const token = await JWTHelpers.generateToken(req.body);
    
    await request(server)
      .post('/products')
      .set('Authorization', `Bearer ${token.access_token}`)
      .send(payload)
      .expect(201)
      .then((res) => {
        expect(res.body.responseCode).toEqual(201);
      });
  });

  test("It should return status response 200: Successfully GET All Products", async () => {
    const req = {
      body: {
        username: "delta"
      }
    }
    process.env.JWT_SECRET = '66556A586E327234753778214125442A472D4B615064536703373367638792F423F4528482B4D6251655468576D5A7134743777217A24432646294A40TunG4';

    const token = await JWTHelpers.generateToken(req.body);
    
    await request(server)
      .get('/products')
      .set('Authorization', `Bearer ${token.access_token}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });
});
