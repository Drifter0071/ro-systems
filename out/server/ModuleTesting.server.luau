-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local PacketPlus = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "plugins", "PacketPlus").default
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local Workspace = _services.Workspace
local packet = PacketPlus("PacketName", PacketPlus.NumberS8, PacketPlus.Vector3F32, PacketPlus.Instance)
local player = Players.PlayerAdded:Wait()
local spawnLocation = Workspace:FindFirstChild("SpawnLocation")
if spawnLocation then
	packet.FireClient(player, -12, Vector3.zero, spawnLocation)
else
	print("SpawnLocation not found")
end
