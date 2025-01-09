const request = require('supertest');
const app = require('../index'); // Import aplikacji
let server;

beforeAll(() => {
    server = app.listen(3001);
});

afterAll(() => {
    server.close();
});

describe('Performance test for endpoint /', () => {
    const numberOfRequests = 50;

    test(`Should handle ${numberOfRequests} concurrent requests`, async () => {
        const start = Date.now();

        const requests = Array.from({ length: numberOfRequests }, () =>
            request(app).get('/')
        );

        const responses = await Promise.all(requests);

        const end = Date.now();

        responses.forEach((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toBeInstanceOf(Array);
        });

        const totalTime = end - start; // Całkowity czas odpowiedzi
        console.log(`${numberOfRequests} requests were handled in ${totalTime} ms`);
    });
});
