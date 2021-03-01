import {decreaseByOneSecond} from "./decreaseByOneSecond";
import {Time} from "../App";


test("when seconds are more than 0", () => {
  const time: Time = { minutes: 1, seconds: 10 }
  const expectedTime: Time = { minutes: 1, seconds: 9 }

  expect(decreaseByOneSecond(time)).toStrictEqual(expectedTime)
});

test("when seconds goes below 0", () => {
  const time: Time = { minutes: 1, seconds: 0 }
  const expectedTime: Time = { minutes: 0, seconds: 59 }

  expect(decreaseByOneSecond(time)).toStrictEqual(expectedTime)
});

test("when seconds and minutes are 0", () => {
  const time: Time = { minutes: 0, seconds: 0 }
  const expectedTime: Time = { minutes: 0, seconds: 0 }

  expect(decreaseByOneSecond(time)).toStrictEqual(expectedTime)
});