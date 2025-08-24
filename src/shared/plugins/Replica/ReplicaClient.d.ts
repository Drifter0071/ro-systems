// Define the Connection type first, as it's used by the Signal type.
export type Connection = {
	Disconnect: (self: Connection) => void;
	IsConnected: boolean;
};

// Define the Signal type with variadic generics.
// The T... in Luau is translated to a rest/spread parameter T extends any[] in TypeScript.
export type Signal<T extends unknown[] = []> = {
	Connect: (self: Signal<T>, fn: (...args: T) => void) => Connection;
	Wait: (self: Signal<T>) => T;
	Fire: (self: Signal<T>, ...args: T) => void;
	FireUntil: (self: Signal<T>, continue_callback: () => boolean, ...args: T) => void;
};

export type Replica = {
	// Properties
	Tags: Record<unknown, unknown>;
	Data: Record<unknown, unknown>;
	Id: number;
	Token: string;
	Parent: Replica | undefined; // 'Replica?' translates to Replica | undefined

	// {[Replica]: boolean?} translates to a Map where the key is a Replica object
	Children: Map<Replica, boolean | undefined>;

	BoundInstance: Instance | undefined; // 'Instance?' translates to Instance | undefined

	// Event Connect Function (Simplified Signal/Event object)
	// {Connect: (self: any, listener: (...any) -> ()) -> ({Disconnect: (self: any) -> ()})}
	OnClientEvent: {
		Connect: (
			self: unknown,
			listener: (...args: unknown[]) => void,
		) => {
			Disconnect: (self: unknown) => void;
		};
	};

	// Type of 'Maid' (assuming Maid is a class/constructor)
	Maid: typeof Maid;

	// Methods
	// Use the explicit `self: any` parameter as seen in the Luau code

	// Signal Methods
	OnSet: (self: unknown, path: unknown[], listener: () => void) => SignalConnection;
	OnWrite: (self: unknown, function_name: string, listener: (...args: unknown[]) => void) => SignalConnection;
	// The action type is a union of literal strings
	OnChange: (
		self: unknown,
		listener: (
			action: "Set" | "SetValues" | "TableInsert" | "TableRemove",
			path: unknown[], // {any} usually represents an array/tuple
			param1: unknown,
			param2: unknown | undefined,
		) => void,
	) => SignalConnection;

	// Utility Methods
	GetChild: (self: unknown, token: string) => Replica | undefined;
	FireServer: (self: unknown, ...args: unknown[]) => void;
	UFireServer: (self: unknown, ...args: unknown[]) => void;
	Identify: (self: unknown) => string;
	IsActive: (self: unknown) => boolean;
};
