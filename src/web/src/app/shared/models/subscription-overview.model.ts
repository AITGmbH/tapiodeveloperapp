import { Subscription } from './subscription.model';

/***
 * Provides an overview of the subscriptions
 */
export class SubscriptionsOverview {
    totalCount: number;
    subscriptions: Subscription[];
}