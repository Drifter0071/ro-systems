// index.d.ts
// type decleration for Iris

type ID = number;

interface State<T> {
	ID: ID;
	value: T;
	lastChangeTick: number;
	ConnectedWidget: Record<ID, Widget>;
	ConnectedFunctions: ((newValue: T) => void)[];

	get(): T;
	set(newValue: T, force?: boolean): void;
	onChange(funcToConnect: (newValue: T) => void): () => void;
	changed(): boolean;
}

interface Widget {
	ID: ID;
	type: string;
	lastCycleTick: number;
	trackedEvents: Record<string, unknown>;
	parentWidget: ParentWidget;

	arguments: Record<string, unknown>;
	providedArguments: Record<string, unknown>;

	Instance: GuiObject;
	ZIndex: number;
}

interface ParentWidget extends Widget {
	ChildContainer: GuiObject;
	ZOffset: number;
	ZUpdate: boolean;
}

interface StateWidget extends Widget {
	state: Record<string, State<unknown>>;
}

// Event types
interface Hovered {
	isHoveredEvent: boolean;
	hovered: () => boolean;
}

interface Clicked {
	lastClickedTick: number;
	clicked: () => boolean;
}

interface RightClicked {
	lastRightClickedTick: number;
	rightClicked: () => boolean;
}

interface DoubleClicked {
	lastClickedTime: number;
	lastClickedPosition: Vector2;
	lastDoubleClickedTick: number;
	doubleClicked: () => boolean;
}

interface CtrlClicked {
	lastCtrlClickedTick: number;
	ctrlClicked: () => boolean;
}

interface Active {
	active: () => boolean;
}

interface Checked {
	lastCheckedTick: number;
	checked: () => boolean;
}

interface Unchecked {
	lastUncheckedTick: number;
	unchecked: () => boolean;
}

interface Opened {
	lastOpenedTick: number;
	opened: () => boolean;
}

interface Closed {
	lastClosedTick: number;
	closed: () => boolean;
}

interface Collapsed {
	lastCollapsedTick: number;
	collapsed: () => boolean;
}

interface Uncollapsed {
	lastUncollapsedTick: number;
	uncollapsed: () => boolean;
}

interface Selected {
	lastSelectedTick: number;
	selected: () => boolean;
}

interface Unselected {
	lastUnselectedTick: number;
	unselected: () => boolean;
}

interface Changed {
	lastChangedTick: number;
	changed: () => boolean;
}

interface NumberChanged {
	lastNumberChangedTick: number;
	numberChanged: () => boolean;
}

interface TextChanged {
	lastTextChangedTick: number;
	textChanged: () => boolean;
}

// Window
type Root = ParentWidget;

interface IrisWindow extends ParentWidget, Opened, Closed, Collapsed, Uncollapsed, Hovered {
	usesScreenGuis: boolean;
	arguments: {
		Title?: string;
		NoTitleBar?: boolean;
		NoBackground?: boolean;
		NoCollapse?: boolean;
		NoClose?: boolean;
		NoMove?: boolean;
		NoScrollbar?: boolean;
		NoResize?: boolean;
		NoNav?: boolean;
		NoMenu?: boolean;
		size?: State<Vector2>;
	};
	state: {
		size: State<Vector2>;
		position: State<Vector2>;
		isUncollapsed: State<boolean>;
		isOpened: State<boolean>;
		scrollDistance: State<number>;
	};
}

interface IrisTooltip extends Widget {
	arguments: {
		Text: string;
	};
}

// Menu
type MenuBar = ParentWidget;

interface IrisMenu extends ParentWidget, Clicked, Opened, Closed, Hovered {
	ButtonColors: Color3;

	arguments: {
		Text?: string;
	};

	state: {
		isOpened: State<boolean>;
	};
}

interface IrisMenuItem extends Widget, Clicked, Hovered {
	arguments: {
		Text: string;
		KeyCode?: Enum.KeyCode;
		ModifierKey?: Enum.ModifierKey;
	};
}

interface IrisMenuToggle extends Widget, Checked, Unchecked, Hovered {
	arguments: {
		Text: string;
		KeyCode?: Enum.KeyCode;
		ModifierKey?: Enum.ModifierKey;
	};
}

// Format
type Separator = Widget;

interface IrisIndent extends ParentWidget {
	arguments: {
		Width?: number;
	};
}

interface IrisSameLine extends ParentWidget {
	arguments: {
		Width?: number;
		VerticalAlignment?: Enum.VerticalAlignment;
		HorizontalAlignment?: Enum.HorizontalAlignment;
	};
}

type Group = ParentWidget;

// Text
interface IrisText extends Widget, Hovered {
	arguments: {
		Text?: string;
		Wrapped?: boolean;
		Color?: Color3;
		RichText?: boolean;
	};
}

interface IrisSeparatorText extends Widget, Hovered {
	arguments: {
		Text: string;
	};
}

// Basic
interface IrisButton extends Widget, Clicked, RightClicked, DoubleClicked, CtrlClicked, Hovered {
	arguments: {
		Text?: string;
		Size?: UDim2;
	};
}

interface IrisCheckbox extends Widget, Unchecked, Checked, Hovered {
	arguments: {
		Text?: string;
	};
	state: {
		isChecked: State<boolean>;
	};
}

interface IrisRadioButton extends Widget, Selected, Unselected, Active, Hovered {
	arguments: {
		Text?: string;
		Index: unknown;
	};

	state: {
		index: State<unknown>;
	};

	active: () => boolean;
}

// Image
interface IrisImage extends Widget, Hovered {
	arguments: {
		Image: string;
		Size: UDim2;
		Rect?: Rect;
		ScaleType?: Enum.ScaleType;
		TileSize?: UDim2;
		SliceCenter?: Rect;
		SliceScale?: number;
		ResampleMode?: Enum.ResamplerMode;
	};
}

type ImageButton = IrisImage & Clicked & RightClicked & DoubleClicked & CtrlClicked;

// Tree
interface IrisCollapsingHeader extends ParentWidget, Collapsed, Uncollapsed, Hovered {
	arguments: {
		Text?: string;
		DefaultOpen?: true;
	};

	state: {
		isUncollapsed: State<boolean>;
	};
}

interface IrisTree extends IrisCollapsingHeader {
	arguments: {
		Text: string;
		SpanAvailWidth?: boolean;
		NoIndent?: boolean;
		DefaultOpen?: true;
	};
}

// Tabs
interface IrisTabBar extends ParentWidget {
	Tabs: [IrisTab];

	state: {
		index: State<number>;
	};
}

interface IrisTab extends ParentWidget, Clicked, Opened, Selected, Unselected, Active, Closed, Hovered {
	parentWidget: IrisTabBar;
	Index: number;
	ButtonColors: Color3;

	arguments: {
		Text: string;
		Hideable: boolean;
	};

	state: {
		index: State<number>;
		isOpened: State<number>;
	};
}

// input
interface IrisInput<T> {
	arguments: {
		Text?: string;
		Increment: T;
		Min: T;
		Max: T;
		Format: [string];
		Prefix: [string];
		NoButtons?: boolean;
	};

	state: {
		number: State<T>;
		editingText: State<number>;
	};
}

interface IrisInputColor3
	extends Omit<IrisInput<[number]>, "state">, // Omit the 'state' property from IrisInput<[number]>
		NumberChanged,
		Hovered {
	arguments: IrisInput<[number]>["arguments"] & {
		UseFloats?: boolean;
		UseHSV?: boolean;
	};

	state: {
		color: State<Color3>;
		editingText: State<boolean>;
	};
}

interface IrisInputColor4 extends Omit<IrisInputColor3, "state"> {
	state: {
		transparency: State<number>;
	};
}

interface IrisInputEnum extends Omit<IrisInput<number>, "state"> {
	state: {
		enumItem: State<EnumItem>;
	};
}

interface IrisInputText extends Widget, TextChanged, Hovered {
	arguments: {
		Text?: string;
		TextHint?: string;
		ReadOnly?: boolean;
		MultiLine?: boolean;
	};

	state: {
		text: State<string>;
	};
}

// Combo
interface IrisSelectable
	extends Widget,
		Selected,
		Unselected,
		Clicked,
		RightClicked,
		DoubleClicked,
		CtrlClicked,
		Hovered {
	ButtonColors: Color3;

	arguments: {
		Text?: string;
		Index?: unknown;
		NoClick?: boolean;
	};

	state: {
		index: State<unknown>;
	};
}

interface IrisCombo extends ParentWidget, Opened, Closed, Changed, Clicked, Hovered {
	arguments: {
		Text?: string;
		NoButton?: boolean;
		NoPreview?: boolean;
	};

	state: {
		index: State<unknown>;
		isOpened: State<boolean>;
	};

	UIListLayout: UIListLayout;
}

// Plot
interface IrisProgressBar extends Widget, Changed, Hovered {
	arguments: {
		Text?: string;
		Format?: string;
	};

	state: {
		progress: State<number>;
	};
}

interface IrisPlotLines extends Widget, Hovered {
	Lines: [Frame];
	HoveredLine: Frame | false;
	Tooltip: TextLabel;

	arguments: {
		Text: string;
		Height: number;
		Min: number;
		Max: number;
		TextOverlay: string;
	};

	state: {
		values: State<[number]>;
		hovered: State<[number?]>;
	};
}

interface IrisPlotHistogram extends Widget, Hovered {
	Blocks: [Frame];
	HoveredBlock: Frame | false;
	Tooltip: TextLabel;

	arguments: {
		Text: string;
		Height: number;
		Min: number;
		Max: number;
		TextOverlay: string;
		BaseLine: number;
	};

	state: {
		values: State<[number]>;
		hovered: State<number | undefined>;
	};
}

interface IrisTable extends ParentWidget, Hovered {
	_columnIndex: number;
	_rowIndex: number;
	_rowContainer: Frame;
	_rowInstances: [Frame];
	_cellInstances: [[Frame]];
	_rowBorders: [Frame];
	_columnBorders: [GuiButton];
	_rowCycles: [number];
	_widths: [UDim];
	_minWidths: [number];

	arguments: {
		NumColumns: number;
		Header: boolean;
		RowBackground: boolean;
		OuterBorders: boolean;
		InnerBorders: boolean;
		Resizable: boolean;
		FixedWidth: boolean;
		ProportionalWidth: boolean;
		LimitTableWidth: boolean;
	};

	state: {
		widths: State<[number]>;
	};
}

// Core API
interface IrisAPI {
	Root: Root;

	Connect(callback: () => void): void;

	State: <T>(value: T) => State<T>;

	Window: (args: [string?], options?: IrisWindow["arguments"]) => IrisWindow;

	Tooltip: (args: [string?], options?: IrisTooltip["arguments"]) => IrisTooltip;

	Menubar(): MenuBar;

	Menu: (args: [string?], options?: IrisMenu["arguments"]) => IrisMenu;

	MenuItem: (args: [string?], options?: IrisMenuItem["arguments"]) => IrisMenuItem;

	MenuToggle: (args: [string?], options?: IrisMenuToggle["arguments"]) => IrisMenuToggle;

	Separator(): Separator;

	Indent: (args: [string?], options?: IrisIndent["arguments"]) => IrisIndent;

	SameLine: (args: [string?], options?: IrisSameLine["arguments"]) => IrisSameLine;

	Group(): Group;

	Text: (args: [string?], options?: IrisText["arguments"]) => IrisText;

	SeparatorText: (args: [string?], options?: IrisSeparatorText["arguments"]) => IrisSeparatorText;

	RadioButton: (args: [string?], options?: IrisRadioButton["arguments"]) => IrisRadioButton;

	Image: (args: [string?], options?: IrisImage["arguments"]) => IrisImage;

	ImageButton(): ImageButton;

	CollapsingHeader: (args: [string?], options?: IrisCollapsingHeader["arguments"]) => IrisCollapsingHeader;

	Tree: (args: [string?], options?: IrisTree["arguments"]) => IrisTree;

	TabBar: (args: [string?], options?: IrisTabBar["arguments"]) => IrisTabBar;

	Tab: (args: [string?], options?: IrisTab["arguments"]) => IrisTab;

	Input: <T>(value: T, options?: IrisInput<T>["arguments"]) => IrisInput<T>;

	InputColor3: (args: [string?], options?: IrisInputColor3["arguments"]) => IrisInputColor3;

	InputColor4: (args: [string?], options?: IrisInputColor4["arguments"]) => IrisInputColor4;

	InputEnum: (args: [string?], options?: IrisInputEnum["arguments"]) => IrisInputEnum;

	InputText: (args: [string?], options?: IrisInputText["arguments"]) => IrisInputText;

	End(): void;

	Button: (args: [string?], options?: IrisButton["arguments"]) => IrisButton;

	Checkbox: (args: [string?], options?: IrisCheckbox["arguments"]) => IrisCheckbox;

	Selectable: (args: [string?], options?: IrisSelectable["arguments"]) => IrisSelectable;

	Combo: (args: [string?], options?: IrisCombo["arguments"]) => IrisCombo;

	ProgressBar: (args: [string?], options?: IrisProgressBar["arguments"]) => IrisProgressBar;

	PlotLines: (args: [string?], options?: IrisPlotLines["arguments"]) => IrisPlotLines;

	PlotHistogram: (args: [string?], options?: IrisPlotHistogram["arguments"]) => IrisPlotHistogram;

	Table: (args: [string?], options?: IrisTable["arguments"]) => IrisTable;
}

interface IrisModule {
	Init: () => IrisAPI;
}

declare const Iris: IrisModule;
export = Iris;
