"use client";
import { useState } from "react";
import {
  OfflineAppProvider,
  useAuth,
  useConnections,
  useProfiles,
} from "@offline-protocol/id-react";
import { Mail, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Connections from "@/components/Connections";
import Profiles from "@/components/Profiles";
// import Nodes from "@/components/Nodes";

function LoginForm() {
  const { sendCode, verifyCode, user } = useAuth();
  const { connections } = useConnections();
  const { profiles } = useProfiles();
  const [email, setEmail] = useState("aditipolkam@gmail.com");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const handleSendCode = async () => {
    const ok = await sendCode(email);
    if (ok) setStep(2);
  };

  const handleVerify = async () => {
    const ok = await verifyCode(email, otp);
    if (ok) {
      // Success handled by state change
    }
  };

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
              <Button variant="ghost" size="sm">
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
                  <p className="text-slate-600 text-sm">{email}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
            Welcome to Social Hub
          </CardTitle>
          <p className="text-slate-600">
            {step === 1
              ? "Enter your email to get started"
              : "Check your email for the verification code"}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500"
                  />
                </div>
              </div>
              <Button
                onClick={handleSendCode}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
              >
                Send Verification Code
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Verification Code
                </label>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="h-12 text-center text-lg font-mono border-slate-200 focus:border-blue-500"
                  maxLength={6}
                />
              </div>
              <Button
                onClick={handleVerify}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
              >
                Verify & Sign In
              </Button>
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="w-full text-slate-600 hover:text-slate-900"
              >
                Back to Email
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <OfflineAppProvider apiKey="7b9bdb1d-6115-4efa-9538-64b0ca19a707">
      <LoginForm />
    </OfflineAppProvider>
  );
}
