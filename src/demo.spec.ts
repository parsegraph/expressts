import expect from "expect";
import app from "./server";

describe("expressts", () => {
  it("can create a router", () => {
    expect(app("/")).toBeTruthy();
  });
  it("can use empty string for root path", () => {
    expect(app("")).toBeTruthy();
  });
  it("needs a root path", () => {
    expect(() => app(null)).toThrow();
  });
});
