import { createFSM, Any, state } from "./fsm.js";

const Red = state(1, "Red");
const Yellow = state(1 << 1, "Yellow");
const Green = state(1 << 2, "Green");

const Blinking = state(1 << 3, "Blinking");
const Solid = state(1 << 4, "Solid");

const Fast = state(1 << 5, "Fast");
const Slow = state(1 << 6, "Slow");

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
  transitions: [],
});

console.log("Any matches any state", machine.matches(Any)); // true
console.log("Slow is ", Slow); // true

console.log("Send 'TrafficLightFailure' to machine");
// machine.send(TrafficLightFailure);

console.log(machine.matches([Yellow, Blinking, Fast])); // true
console.log(machine.matches(Yellow)); // true
console.log(machine.matches([Yellow, Solid, Fast])); // false
console.log(machine.matches([Yellow, Solid])); // false
console.log(machine.matches([Red, Blinking, Fast])); // false
