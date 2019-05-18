// function sum(a, b) {
//   return a + b;
// }

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });
import reducer, { increase, decrease } from "./counter";

it("returns previus state if uknown action", () => {
  let newState = reducer(undefined, { type: "unmnowm" });
  expect(newState).toEqual({ count: 0 });
});

describe("action increase", () => {
  it("increases count inside of the state", () => {
    let newState = reducer(undefined, increase());
    expect(newState).toEqual({
      count: 1
    });
  });
  it("allow to increase by other values", () => {
    expect(reducer({ count: 5 }, increase(10))).toEqual({
      count: 15
    });
  });
});
describe("action decrease", () => {
  it("decreases count inside of the state", () => {
    let newState = reducer({ count: 1 }, decrease());
    expect(newState).toEqual({
      count: 0
    });
  });
  it("allow to decrease by other values", () => {
    expect(reducer(undefined, decrease(10))).toEqual({
      count: -10
    });
  });
});
