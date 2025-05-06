type State = number;
type StateWithName = {
  state: State;
  name: string;
};
type StateDefinition = StateWithName | StateWithName[];
export function state(state: State, name: string): StateWithName {
  return { state, name };
}

type Transition = {
  from: State;
  to: State;
};

function createState(state: StateDefinition | State): number {
  if (
    state === null ||
    state === undefined ||
    (typeof state === "number" && state < 0)
  )
    throw new Error("State is required");
  if (Array.isArray(state)) {
    let s = 0;
    for (let i = 0; i < state.length; i++) {
      s = s | state[i].state;
    }
    return s;
  }
  return getState(state);
}

function getState(state: StateWithName | State): State {
  return typeof state === "number" ? state : state.state;
}

type Event = number;
type FSM = {
  matches: (s: StateDefinition | State) => boolean;
  send: (e: Transition) => void;
};
type FSMDefinition = {
  initial: StateDefinition;
  states: StateDefinition[];
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

  const trans: Transition[] = [];
  while (transitions.length > 0) {
    const transition = transitions.pop()!;
  }

  function matches(s: StateDefinition | State) {
    const mask = createState(s);
    console.log(`State: ${currentState.toString(2).padStart(8, "0")}`);
    console.log(` mask: ${mask.toString(2).padStart(8, "0")}`);
    return (currentState & mask) === mask;
  }

  function send(e: Transition) {}

  return {
    matches,
    send,
  };
}
export const Any = 0;
