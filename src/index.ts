import { createFSM } from "./fsm.js";

const Red = 1;
const Yellow = 1 << 1;
const Green = 1 << 2;

const Blinking = 1 << 3;
const Solid = 1 << 4;

const Fast = 1 << 5;
const Slow = 1 << 6;

const machine = createFSM(
  [
    Red,
    [Red, Blinking, Fast],
    [Yellow, Solid],
    [Yellow, Blinking, Fast],
    [Yellow, Blinking, Slow],
    Green,
  ],
  [Yellow, Blinking, Fast],
);

console.log(machine.matches(Yellow | Blinking | Fast)); // true
console.log(machine.matches(Yellow)); // true
console.log(machine.matches(Yellow | Solid | Fast)); // false
console.log(machine.matches(Yellow | Solid)); // false
console.log(machine.matches(Red | Blinking | Fast)); // false
