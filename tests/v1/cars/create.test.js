const request = require("supertest");
const app = require("../../../app");

describe("POST /v1/cars", () => {
  it("should response with 201 as status code", async () => {
    const accessToken = await request(app).post("/v1/auth/login").send({
      email: "echa@gmail.com",
      password: "123",
    });

    const name = "Mazda RX4";
    const price = 300000;
    const size = "SMALL";
    const image = "https://source.unsplash.com/500x500";

    return request(app)
      .post("/v1/cars")
      .set("Authorization", `Bearer ${accessToken.body.accessToken}`)
      .set("Content-Type", "application/json")
      .send({ name, price, size, image, isCurrentlyRented: false })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            ...res.body,
            name,
            price,
            size,
            image,
            isCurrentlyRented: false,
          })
        );
      });
  });
});
