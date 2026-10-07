export type Direction = 'north' | 'east' | 'south' | 'west';
export type Primitive = 'advance' | 'left' | 'right' | 'collect' | 'activate';
export type Command = { kind: Primitive } | { kind: 'repeat'; times: number; body: Primitive[] };
export interface Position { x: number; y: number }
export type MapObject = Position & { id: string } & (
  { kind: 'terminal' } | { kind: 'switch'; signal: 'A' | 'B' } | { kind: 'gate' }
);
export interface Signals { A: boolean; B: boolean }
export interface Level {
  id: string; title: string; concept: string; objective: string; hint: string; lesson: string;
  grid: string[]; start: Position & { direction: Direction }; goal: Position;
  maxBlocks: number; maxSteps: number; allowRepeat: boolean;
  initialProgram: Command[]; solution: Command[];
  objects: MapObject[]; requiredPackets: number; requiresCircuit: boolean;
  allowedActions: Primitive[]; hints: string[]; briefing: string;
}
export interface Execution { kind: Primitive; commandIndex: number; iteration?: number }
export type Failure = 'wall' | 'boundary' | 'exhausted' | 'limit' | 'gate' | 'interaction' | 'objectives';
export interface RunState extends Position {
  direction: Direction; status: 'running' | 'won' | 'failed'; reason?: Failure;
  steps: number; cursor: number; executions: Execution[]; trace: string[]; message: string;
  packets: string[]; signals: Signals; path: Position[]; from: Position; lastAction?: Primitive;
}
