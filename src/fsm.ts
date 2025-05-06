type State = number | number[];

type Transition = number;

type FSM = {

}
function createState(state: State): number {
  if (!state) throw new Error('State is required');
  if (Array.isArray(state)) {
    let s = 0;
    for (let i = 0; i < state.length; i++) {
      s = (s | state[i]);
    }
    return s;
  }
  return state;
}

export function createFSM(states: State[], initial: State) {
  if (!initial) throw new Error('Initial state is required');
  let currentState = createState(initial);

  const fsm: number[] = [];
  while (states.length > 0) {
    const state = createState(states.pop()!);
    fsm.push(state);
  }
  console.log(`States: [`)
  for (const state of fsm) {
    console.log(`  ${state.toString(2).padStart(8, '0')},`)
  }
  console.log(`]`)

  function matches(s: State) {
    const mask = createState(s);
    console.log(`State: ${currentState.toString(2).padStart(8, '0')}`);
    console.log(` mask: ${mask.toString(2).padStart(8, '0')}`);
    return (currentState & mask) === mask;
  }
  function send() {}

  return {
    matches,
    send
  }
}
