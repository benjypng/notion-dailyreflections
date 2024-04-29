import { describe, it, expect } from "vitest";
import { main } from ".";

describe("main function", () => {
  it("should insert a page in notion", async () => {
    try {
      const result = await main();
      expect(result).toBe("Reflection successfully sent to Notion");
    } catch (error) {
      expect(error.message).toBe("Reflection not sent to Notion");
    }
  }, 30000);
});
