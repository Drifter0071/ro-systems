import PacketPlus from "shared/plugins/PacketPlus";
import { Players, Workspace } from "@rbxts/services";
import { Packet } from "shared/plugins/PacketPlus";

const packet = PacketPlus("PacketName", PacketPlus.NumberS8, PacketPlus.Vector3F32, PacketPlus.Instance) as Packet<
	[number, Vector3, Instance]
>;

const [player] = Players.PlayerAdded.Wait();
const spawnLocation = Workspace.FindFirstChild("SpawnLocation");

if (spawnLocation) {
	packet.FireClient(player, -12, Vector3.zero, spawnLocation);
} else {
	print("SpawnLocation not found");
}
