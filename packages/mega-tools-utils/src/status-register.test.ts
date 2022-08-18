import { IdentifyConstant } from "./status-register";

test("Invalid constant", () => {
  expect(() => {
    IdentifyConstant(0xffff);
  }).toThrow();
});

test("valid constant", () => {
    expect(() => {
      IdentifyConstant(0x0);
    }).not.toThrow();
  });