import { formatMinsAndSeconds, secondsToMinsAndSeconds } from "./utils";

describe("library tests", () => {
  describe("formatMinsAndSeconds", () => {
    const cases: Array<[number, { mins: number; seconds: number }]> = [
      [64, { mins: 1, seconds: 4 }],
      [4, { mins: 0, seconds: 4 }],
      [183, { mins: 3, seconds: 3 }],
      [2002, { mins: 33, seconds: 22 }],
      [60, { mins: 1, seconds: 0 }],
    ];
    it.each(cases)(
      "given $p as seconds returns $p",
      (seconds, expectedResult) => {
        const result = secondsToMinsAndSeconds(seconds);
        expect(result).toEqual(expectedResult);
      }
    );
  });
  describe("secondsToMinsAndSeconds", () => {
    const cases: Array<[number, number, string]> = [
      [1, 1, "1:01"],
      [0, 10, "0:10"],
      [59, 33, "59:33"],
    ];
    it.each(cases)(
      "given $p minutes and $p seconds returns $p",
      (mins, seconds, expectedResult) => {
        const result = formatMinsAndSeconds(mins, seconds);
        expect(result).toBe(expectedResult);
      }
    );
  });
});
