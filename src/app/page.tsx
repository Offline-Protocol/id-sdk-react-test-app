"use client";
import {
  OfflineAppProvider,
  useAuth,
  useConnections,
  useProfiles,
} from "@offline-protocol/id-react";
import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Connections from "@/components/Connections";
import Profiles from "@/components/Profiles";

function LoginForm() {
  const { user, loginWithModal, logout } = useAuth();
  const { connections } = useConnections();
  const { profiles } = useProfiles();

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Social Hub</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Profile Section */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-sm border-slate-200">
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-lg">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                      />
                      <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        {user.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-1">
                    {user.username}
                  </CardTitle>
                  <p className="text-slate-600 text-sm">{user.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    Active Profile
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">
                        {profiles.length}
                      </div>
                      <div className="text-sm text-slate-600">Profiles</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">
                        {connections.length}
                      </div>
                      <div className="text-sm text-slate-600">Connections</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Switcher */}
              <Profiles />
              <Connections />
              {/* <Nodes /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-3xl text-center bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl p-10 border border-white/40">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Offline Protocol</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Seamless login and profile management made simple — secure, fast, and
          beautiful.
        </p>
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          onClick={loginWithModal}
        >
          Get Started
        </button>

        <div className="mt-10 flex justify-center gap-6 text-sm text-gray-500">
          <a
            href="https://docs.offlineprotocol.com"
            className="hover:text-blue-600"
          >
            Docs
          </a>
          <a
            href="https://github.com/Offline-Protocol"
            className="hover:text-blue-600"
          >
            GitHub
          </a>
          <a
            href="mailto:support@offlineprotocol.com"
            className="hover:text-blue-600"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <OfflineAppProvider
      projectId={process.env.NEXT_PUBLIC_PROJECT_ID as string}
    >
      <LoginForm />
    </OfflineAppProvider>
  );
}
