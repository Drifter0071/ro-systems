-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Iris = TS.import(script, script.Parent, "Iris")
local iris = Iris.Init()
--[[
	*
	 * Initializes the main UI loop. All UI elements must be defined within this callback.
	 * This function is called every frame to update the UI.
	 * @returns An empty function that can be used to disconnect the UI loop.
	 
]]
iris:Connect(function()
	-- Defines a state object to hold the window's size.
	-- The `State` function is used for values that will change and be referenced by UI elements.
	local windowSize = iris.State(Vector2.new(300, 400))
	--[[
		*
			 * Creates a new window.
			 * @param args An array containing a single string for the window's title.
			 * @param options A table of optional arguments to configure the window's behavior.
			 * @returns A `Window` widget instance.
			 *
			 * Note: The `size` property is a state of the window, not a direct argument of the `Window` function.
			 * The `IrisWindow` interface in the type declarations confirms that `size` is not a valid property for the
			 * `arguments` object.
			 
	]]
	iris.Window({ "My TS Window" }, {
		size = windowSize,
	})
	--[[
		*
			 * Renders a text label.
			 * @param args An array containing the text string to display.
			 *
			 * Note: The Lua `..` operator for string concatenation is replaced by TypeScript's template literals (`...${}`),
			 * which offer a more idiomatic way to embed expressions in strings.
			 
	]]
	iris.Text({ `The current time is: {time()}` })
	--[[
		*
			 * Creates a text input field.
			 * @param args An array containing the initial text string for the input field.
			 *
			 * Note: `InputText` requires a state object to manage the value of the text field. The `state` object for the
			 * `InputText` widget has a `text` property of type `State<string>`.
			 
	]]
	local textInputState = iris.State("Enter Text")
	iris.InputText({ textInputState.value })
	--[[
		*
			 * Creates a button widget.
			 * @returns A `Button` widget instance with a `clicked()` method.
			 *
			 * Note: The Lua demo uses `print` for output. In Roblox-ts, `print` is the standard global function for console output,
			 * replacing `console.log`.
			 
	]]
	if iris.Button({ "Click me" }).clicked() then
		print("button was clicked")
	end
	--[[
		*
			 * Creates a color input widget.
			 * @param args An array containing the initial color state to display.
			 *
			 * Note: The Lua demo uses `InputColor4`, but the `WidgetTypes.lua` file defines a `state` with `color: State<Color3>` and
			 * `transparency: State<number>`. The type `Vector4` is not recognized by Roblox-ts as a
			 * standard type. `Color4` is also not globally declared, so `Color3` is used instead, which is a globally available type in Roblox-ts.
			 
	]]
	iris.InputColor4({})
	--[[
		*
			 * Creates a collapsible tree widget.
			 * @param args An array containing the title of the tree.
			 * @returns A `Tree` widget instance.
			 *
			 * Note: `Tree` widgets, as defined in `WidgetTypes.lua`, require a title string as a parameter.
			 
	]]
	iris.Tree({ "Tree" })
	-- A standard for loop is used in TypeScript to iterate and create multiple widgets.
	for i = 1, 8 do
		-- Renders text inside the tree widget.
		iris.Text({ `Text in a loop: {i}` })
	end
	-- `End()` closes the last widget opened, in this case, the `Tree`.
	iris:End()
	-- The second `End()` call closes the main `Window`.
	iris:End()
end)
