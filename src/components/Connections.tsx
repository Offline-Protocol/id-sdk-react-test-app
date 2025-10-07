import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useConnections } from "@offline-protocol/id-react";

export default function Connections() {
  const { connections } = useConnections();
  return (
    <Card className="bg-white shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
          <Users className="w-5 h-5 mr-2 text-green-500" />
          Your Connections
        </CardTitle>
        <Badge variant="outline">{connections.length} Connected</Badge>
      </CardHeader>
      <CardContent>
        {connections.length > 0 ? (
          <div className="space-y-4">
            {connections.map((connection) => (
              <div
                key={connection.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${connection.peer}`}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold">
                      {connection.peer?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {connection.peer}
                    </h4>
                    <p className="text-sm text-slate-600">Connected</p>
                  </div>
                </div>
                {/* <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-slate-600">
                              Online
                            </span>
                          </div> */}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No connections yet</p>
            <p className="text-sm text-slate-500 mt-1">
              Start connecting with others to build your network
            </p>
            <Button className="mt-4 bg-transparent" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Find Connections
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
