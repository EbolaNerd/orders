import * as calculator from "../../../src/utils/calculator";
import { Server } from "http";

import request from "supertest";

let server: Server;
let name: string | null;
let phone: number | null;
let age: number | null;

let calculatorMock: jest.SpyInstance;

const exec = () => {
   return request(server).post("/api/order").send({ name, phone, age });
};

describe("POST /order", () => {
   beforeEach(() => {
      server = require("../../../src/index");
      name = "Lars Wolter";
      phone = 12345678;
      age = 22;
      calculatorMock = jest.spyOn(calculator, "validateAge").mockReturnValue(true);
   });

   afterEach(async () => {
      calculatorMock.mockClear();
      await server.close();
   });

   describe("Create order", () => {
      it("should return status code 201", async () => {
         const response = await exec();
         expect(response.status).toEqual(201);

         expect(calculatorMock).toHaveBeenCalledWith(age);
      });

      it("should return the created order", async () => {
         const response = await exec();
         expect(response.body).toHaveProperty("id");
         expect(response.body).toHaveProperty("name", name);
         expect(response.body).toHaveProperty("phone", phone);
         expect(response.body).toHaveProperty("age", age);

         expect(calculatorMock).toHaveBeenCalledWith(age);
      });

      it("should return status code 401 if age is under 18", async () => {
         age = 17;
         calculatorMock = jest.spyOn(calculator, "validateAge").mockReturnValue(false);
         const response = await exec();

         expect(response.status).toEqual(401);
         expect(calculatorMock).toHaveBeenCalledWith(age);
      });

      it("should return an error message if age is under 18", async () => {
         age = 17;
         calculatorMock = jest.spyOn(calculator, "validateAge").mockReturnValue(false);
         const response = await exec();

         expect(response.text).toEqual("Order must be of age 18 or above");
         expect(calculatorMock).toHaveBeenCalledWith(age);
      });
   });

   describe("Invalid input", () => {
      it("should return 401 if name is not provided", async () => {
         name = "";
         const response = await exec();
         expect(response.statusCode).toBe(401);

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });

      it("should return an error message if name is not provided", async () => {
         name = "";
         const response = await exec();
         expect(response.text).toBe("Please provide name");

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });

      it("should return 401 if phone is not provided", async () => {
         phone = null;
         const response = await exec();
         expect(response.statusCode).toBe(401);

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });

      it("should return an error message if phone is not provided", async () => {
         phone = null;
         const response = await exec();
         expect(response.text).toBe("Please provide phone number");

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });

      it("should return 401 if age is not provided", async () => {
         age = null;
         const response = await exec();
         expect(response.statusCode).toBe(401);

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });

      it("should return an error message if age is not provided", async () => {
         age = null;
         const response = await exec();
         expect(response.text).toBe("Please provide age");

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });
   });
});
