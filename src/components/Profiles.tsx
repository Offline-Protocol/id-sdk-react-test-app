import { useProfiles } from "@offline-protocol/id-react";
import { User, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function Profiles() {
  const { profiles } = useProfiles();
  const [activeProfile, setActiveProfile] = useState(0);

  return (
    <Card className="bg-white shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-500" />
          Your Profiles
        </CardTitle>
      </CardHeader>
      <CardContent>
        {profiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profiles.map((profile, index) => (
              <div
                key={profile.username}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  activeProfile === index
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
                onClick={() => setActiveProfile(index)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                      {profile.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {profile.username}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {profile.createdAt.toString()}
                    </p>
                  </div>
                  {activeProfile === index && (
                    <Check className="w-5 h-5 text-blue-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No additional profiles yet</p>
            <p className="text-sm text-slate-500 mt-1">
              Create multiple profiles to switch between different identities
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
