export class AssignedMachine {
    tmid: string;
    displayName: string;
    machineState: MachineState;
}

export enum MachineState {
    Running,
    Offline
}
