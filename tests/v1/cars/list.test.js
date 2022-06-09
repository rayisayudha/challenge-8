const request = require("supertest");
const app = require("../../../app");

describe("GET /v1/cars", () => {
  jest.setTimeout(10000);
  it("should response with 201 as status code", async () => {
    return request(app)
      .get("/v1/cars")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            cars: expect.arrayContaining([expect.any(Object)]),
            meta: expect.objectContaining({
              pagination: expect.any(Object),
            }),
          })
        );
      });
  });
});
