type Cursor = {
	Buffer: buffer;
	BufferLength: number;
	BufferOffset: number;
	Instances: Instance[];
	InstancesOffset: number;
};

type Connection = {
	Connected: boolean;
	Disconnect: (connection: Connection) => void;
};

export type Signal<Parameters extends unknown[] = []> = {
	Connect: (signal: Signal<Parameters>, callback: (...params: Parameters) => void) => Connection;
	Once: (signal: Signal<Parameters>, callback: (...params: Parameters) => void) => Connection;
	Wait: (signal: Signal<Parameters>) => Parameters;

	Fire: (signal: Signal<Parameters>, ...params: Parameters) => void;

	DisconnectAll: (signal: Signal<Parameters>) => void;
	Destroy: (signal: Signal<Parameters>) => void;
};

export type Packet<A extends unknown[] = [], B extends unknown[] = []> = {
	Type: "Packet";
	Id: number;
	Name: string;

	Reads: Record<string, () => unknown>;
	Writes: Record<string, (value: unknown) => void>;

	ResponseTimeout: number;
	ResponseTimeoutValue: unknown;
	ResponseReads: Record<string, () => unknown>;
	ResponseWrites: Record<string, (value: unknown) => void>;

	OnClientEvent: Signal<A>;

	OnServerInvoke: undefined | ((player: Player, ...args: A) => B);
	OnClientInvoke: undefined | ((...args: A) => B);

	Response: (self: Packet<A, B>, ...args: B) => Packet<A, B>;
	Fire: (self: Packet<A, B>, ...args: A) => B;
	FireClient: (self: Packet<A, B>, player: Player, ...args: A) => B;

	Serialize: (self: Packet<A, B>, ...args: A) => [buffer, Instance[]?];
	Deserialize: (self: Packet<A, B>, serializeBuffer: buffer, instances?: Instance[]) => A;
};
