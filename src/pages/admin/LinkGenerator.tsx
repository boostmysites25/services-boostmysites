import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ArrowLeft, Copy, ExternalLink, Info } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { SalespersonForm } from "@/components/admin/salesperson/SalespersonForm";
import { SalespersonList } from "@/components/admin/salesperson/SalespersonList";
import {
  SalespersonLink,
  salespersonLinkService,
  AVAILABLE_SERVICES,
} from "@/services/salespersonLinkService";
import { toast } from "sonner";

export const LinkGenerator = () => {
  const [salespersons, setSalespersons] = useState<SalespersonLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSalesperson, setEditingSalesperson] = useState<
    SalespersonLink | undefined
  >();

  const loadSalespersons = async () => {
    try {
      const data = await salespersonLinkService.getSalespersonLinks();
      setSalespersons(data);
    } catch (error) {
      console.error("Error loading salespersons:", error);
      toast.error("Failed to load salespersons");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSalespersons();
  }, []);

  const handleAdd = () => {
    setEditingSalesperson(undefined);
    setShowForm(true);
  };

  const handleEdit = (salesperson: SalespersonLink) => {
    setEditingSalesperson(salesperson);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingSalesperson(undefined);
    loadSalespersons();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSalesperson(undefined);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <p className="text-cyan-400">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link
                to="/admin"
                className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Link>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Smart Link Generator
            </h1>
            <p className="text-gray-200 mt-2 text-lg">
              Create personalized landing pages with automatic lead capture and
              routing
            </p>
          </div>
          <div className="flex gap-2">
            {!showForm && (
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Salesperson
              </Button>
            )}
          </div>
        </div>

        {showForm ? (
          <SalespersonForm
            salesperson={editingSalesperson}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* How it Works Card */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-white">
                    <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
                      <Info className="h-5 w-5 text-white" />
                    </div>
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Personalized URLs
                      </h4>
                      <p className="text-sm text-gray-200 mb-2">
                        Each salesperson gets unique landing pages:
                      </p>
                      <code className="block px-3 py-2 bg-gray-900 rounded text-cyan-300 text-xs font-mono">
                        boostmysites.com/[salesperson]/[service]
                      </code>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Smart Lead Capture
                      </h4>
                      <ul className="text-sm text-gray-200 space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          Auto-injected contact forms
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          Direct lead routing
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          Service-specific branding
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Card */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-white">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                      <div className="h-5 w-5 text-white font-bold">⚡</div>
                    </div>
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg">
                      <div className="p-1.5 bg-blue-500/20 rounded-full">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-400 text-sm">
                          Increased Conversion
                        </h5>
                        <p className="text-xs text-gray-300 mt-1">
                          Personalized experience drives higher engagement
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg">
                      <div className="p-1.5 bg-green-500/20 rounded-full">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-400 text-sm">
                          Lead Tracking
                        </h5>
                        <p className="text-xs text-gray-300 mt-1">
                          Automatic attribution and source tracking
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg">
                      <div className="p-1.5 bg-purple-500/20 rounded-full">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-400 text-sm">
                          Brand Consistency
                        </h5>
                        <p className="text-xs text-gray-300 mt-1">
                          Service-specific colors and branding
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services Card */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-orange-500/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-white">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                      <div className="h-5 w-5 text-white font-bold">🎯</div>
                    </div>
                    Available Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                    {AVAILABLE_SERVICES.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                        <span className="text-gray-200 text-sm font-medium">
                          {service.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <SalespersonList
              salespersons={salespersons}
              onEdit={handleEdit}
              onRefresh={loadSalespersons}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
};
