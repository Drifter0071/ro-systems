import PacketPlus from "shared/plugins/PacketPlus";
import Iris from "./Iris"; // Adjust path as needed
import { Packet } from "shared/plugins/PacketPlus";

const packet = PacketPlus("PacketName", PacketPlus.NumberS8, PacketPlus.Vector3F32, PacketPlus.Instance) as Packet<
	[number, Vector3, Instance]
>;

const iris = Iris.Init();
packet.OnClientEvent.Connect((number: number, vector: Vector3, instance: Instance) => {
	iris.Connect(() => {
		iris.Window(["Packet Data"]);
		iris.Text([`Number: ${number}`]);
		iris.Text([`Vector: ${vector}`]);
		iris.Text([`Instance: ${instance.Name}`]);
		iris.End();
	});
});
