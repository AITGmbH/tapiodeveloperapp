import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr";

@Injectable()
export class SignalRService {
    private _hubConnection: signalR.HubConnection;

    public get hubConnection() {
        return this._hubConnection;
    }

    public get isConnected() {
        if (this._hubConnection == null) {
            return false;
        }
        return this._hubConnection.state === signalR.HubConnectionState.Connected;
    }

    public async startConnectionAsync(url: string): Promise<void> {
        if (url != null) {
            this._hubConnection = new signalR.HubConnectionBuilder().withUrl(url).build();

            await this._hubConnection
                .start()
                .then(() => console.log("Connection started"))
                .catch(err => {
                    console.log("Error while starting connection: " + err);
                    console.log(err);
                });
        }
    }

    public async stopConnectionAsync() {
        if (this._hubConnection != null && this.isConnected) {
            await this._hubConnection.stop();
        }
    }
}
