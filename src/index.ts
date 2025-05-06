import { createFSM, Any } from "./fsm.js";

const Red = 1;
const Yellow = 1 << 1;
const Green = 1 << 2;

const Blinking = 1 << 3;
const Solid = 1 << 4;

const Fast = 1 << 5;
const Slow = 1 << 6;

const TrafficLightFailure = {
  from: Any,
  to: [Yellow, Blinking, Fast],
};

const machine = createFSM({
  initial: [Yellow, Blinking, Fast],
  states: [
    Red,
    [Red, Blinking, Fast],
    [Yellow, Solid],
    [Yellow, Blinking, Fast],
    [Yellow, Blinking, Slow],
    Green,
  ],
  transitions: [TrafficLightFailure],
});

console.log("Any matches any state", machine.matches(Any)); // true
console.log(machine.matches(Yellow | Blinking | Fast)); // true
console.log(machine.matches(Yellow)); // true
console.log(machine.matches(Yellow | Solid | Fast)); // false
console.log(machine.matches(Yellow | Solid)); // false
console.log(machine.matches(Red | Blinking | Fast)); // false
