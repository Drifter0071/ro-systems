export type Connection = {
	Connected: boolean;
	Disconnect: (connection: Connection) => void;
};

export type Signal<Parameters extends unknown[] = []> = {
	Connect: (callback: (...params: Parameters) => void) => Connection;
	Once: (callback: (...params: Parameters) => void) => Connection;
	Wait: () => Parameters;
	Fire: (...params: Parameters) => void;
	DisconnectAll: () => void;
	Destroy: () => void;
};

declare const Signal: () => Signal;
export default Signal;
