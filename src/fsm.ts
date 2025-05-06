type State = number | number[];

type Transition = {
  from: State;
  to: State;
};

function createState(state: State): number {
  if (
    state === null ||
    state === undefined ||
    (typeof state === "number" && state < 0)
  )
    throw new Error("State is required");
  if (Array.isArray(state)) {
    let s = 0;
    for (let i = 0; i < state.length; i++) {
      s = s | state[i];
    }
    return s;
  }
  return state;
}

type Event = number;
type FSM = {
  matches: (s: State) => boolean;
  send: (e: Event) => void;
};
type FSMDefinition = {
  initial: State;
  states: State[];
  transitions: Transition[];
};
export function createFSM({
  initial,
  states,
  transitions,
}: FSMDefinition): FSM {
  if (!initial) throw new Error("Initial state is required");
  let currentState = createState(initial);

  const fsm: number[] = [];
  while (states.length > 0) {
    const state = createState(states.pop()!);
    fsm.push(state);
  }
  console.log(`States: [`);
  for (const state of fsm) {
    console.log(`  ${state.toString(2).padStart(8, "0")},`);
  }
  console.log(`]`);

  function matches(s: State) {
    const mask = createState(s);
    console.log(`State: ${currentState.toString(2).padStart(8, "0")}`);
    console.log(` mask: ${mask.toString(2).padStart(8, "0")}`);
    return (currentState & mask) === mask;
  }

  function send(e: Event) {}

  return {
    matches,
    send,
  };
}
export const Any = 0;
