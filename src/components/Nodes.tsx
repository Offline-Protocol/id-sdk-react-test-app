import { useEffect } from "react";
import { useLocation } from "@offline-protocol/id-react";

export default function Nodes() {
  const { nodes, getNodeLocations } = useLocation();
  useEffect(() => {
    getNodeLocations();
  }, []);
  return (
    <div>
      {nodes.map((node, index) => (
        <p key={index}>
          {node.lat} - {node.lon}
        </p>
      ))}
    </div>
  );
}
