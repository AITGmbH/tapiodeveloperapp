import { AssignedMachine } from './assigned-machine.model';
import { License } from './license.model';

/***
 * Provides a single subscription.
 */
export class Subscription {
    licenses: License[];
    subscriptionId: string;
    name: string;
    tapioId: string;
    assignedMachines: AssignedMachine[];
    subscriptionTypes: string[];
}