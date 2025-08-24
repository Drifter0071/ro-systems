// index.d.ts
// Type declarations for PacketPlus

export type Cursor = {
	Buffer: buffer;
	BufferLength: number;
	BufferOffset: number;
	Instances: Instance[];
	InstancesOffset: number;
};

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
	OnServerEvent: Signal<[Player, ...A]>;

	OnServerInvoke: undefined | ((player: Player, ...args: A) => B);
	OnClientInvoke: undefined | ((...args: A) => B);

	Response: (self: Packet<A, B>, ...args: B) => Packet<A, B>;
	Fire: (...args: A) => B;
	FireClient: (player: Player, ...args: A) => B;

	Serialize: (self: Packet<A, B>, ...args: A) => [buffer, Instance[]?];
	Deserialize: (self: Packet<A, B>, serializeBuffer: buffer, instances?: Instance[]) => A;
};

export interface PacketTypes {
	Any: "Any";
	Nil: "Nil";
	NumberS8: "NumberS8";
	NumberS16: "NumberS16";
	NumberS24: "NumberS24";
	NumberS32: "NumberS32";
	NumberU8: "NumberU8";
	NumberU16: "NumberU16";
	NumberU24: "NumberU24";
	NumberU32: "NumberU32";
	NumberF16: "NumberF16";
	NumberF24: "NumberF24";
	NumberF32: "NumberF32";
	NumberF64: "NumberF64";
	StringU8: "StringU8";
	StringU16: "StringU16";
	StringU24: "StringU24";
	StringU32: "StringU32";
	BufferU8: "BufferU8";
	BufferU16: "BufferU16";
	BufferU24: "BufferU24";
	BufferU32: "BufferU32";
	Instance: "Instance";
	Boolean: "Boolean";
	NumberRangeF32: "NumberRangeF32";
	BrickColorU16: "BrickColorU16";
	Color3U8: "Color3U8";
	UDimS16: "UDimS16";
	UDim2S16: "UDim2S16";
	RectF32: "RectF32";
	Vector2F32: "Vector2F32";
	Vector3F32: "Vector3F32";
	CFrameF32: "CFrameF32";
	Region3F32: "Region3F32";
	NumberSequenceU8: "NumberSequenceU8";
	ColorSequenceU8: "ColorSequenceU8";
	EnumItemU8U16: "EnumItemU8U16";
	Static1U8: "Static1U8";
	Static2U8: "Static2U8";
	Static3U8: "Static3U8";
	CharactersU8: "CharactersU8";
}

interface PacketPlusCallable {
	<A extends unknown[] = [], B extends unknown[] = []>(name: string, ...types: string[]): Packet<A, B>;
}

declare const PacketPlus: PacketPlusCallable & PacketTypes;

export default PacketPlus;
