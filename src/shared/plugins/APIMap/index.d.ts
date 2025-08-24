type APIMapType = Record<
	string,
	Record<
		string,
		{
			Type: string;
			Writable: boolean;
		}
	>
>;

interface APIMap {
	APIMap: APIMapType;
}

export = APIMap;
