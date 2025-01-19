const request = require('supertest');
const app = require('../index');
let server;

beforeAll(() => {
    server = app.listen(3001);
});

afterAll(() => {
    server.close();
});

describe('Performance test for endpoint "/"', () => {
    const numberOfDemands = 50;

    test(`Should handle ${numberOfDemands} simultaneous requests`, async () => {
        const timerStart = Date.now();

        const requests = Array.from({ length: numberOfDemands }, () =>
            request(app).get('/')
        );

        const responses = await Promise.all(requests);

        const timerEnd = Date.now();

        responses.forEach((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toBeInstanceOf(Array);
        });

        const timerTotalTime = timerEnd - timerStart;
        console.log(`${numberOfDemands} requests were handled in ${timerTotalTime} ms`);
    });
});
