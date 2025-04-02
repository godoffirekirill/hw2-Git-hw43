import {getRandomNumber} from "./src/utils/tools";

test("getRandomNumber return number in range 1-10", () => {
    const result = getRandomNumber(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
    expect(Number.isInteger(result)).toBe(true);
})