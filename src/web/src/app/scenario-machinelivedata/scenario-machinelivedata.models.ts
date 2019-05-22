import * as moment from "moment";

export enum MessageTypes {
    ItemData = "itd",
    Condition = "cond",
    ConditionRefreshStart = "conds",
    ConditionRefreshEnd = "conde",
    OfflineMessage = "gooffline"
}

export class MachineLiveDataContainer {
    public tmid: string;
    public msgid: string;
    public msgts: moment.Moment | string;
    public msgt = "";
    public msg: Message;

    public get isItemData(): boolean {
        return this.msgt === MessageTypes.ItemData;
    }

    public get isCondition(): boolean {
        return this.msgt === MessageTypes.Condition;
    }
}
export class Message {
    public k: string;
    public s: string;
}
