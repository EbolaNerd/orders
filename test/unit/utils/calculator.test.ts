import { validateAge } from "../../../src/utils/calculator";

describe("Calculator", () => {
   describe("Validate age", () => {
      it("should return true if age is above 18", () => {
         const age = 19;
         const result = validateAge(age);

         expect(result).toBe(true);
      });

      it("should return true if age is 18", () => {
         const age = 18;
         const result = validateAge(age);

         expect(result).toBe(true);
      });

      it("should return false if age is below 18", () => {
         const age = 17;
         const result = validateAge(age);

         expect(result).toBe(false);
      });
   });
});
