// import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProcessList } from "./ProcessList";
import { AddProcessForm } from "./AddProcessForm";
import { NotificationPanel } from "./NotificationPanel";
import { SearchDocuments } from "./SearchDocuments";
import { FileText, Plus, Search, Bell, LogOut, User } from "lucide-react";

export const Dashboard = () => {
  // TODO: Replace with actual useAuth hook once Supabase is connected
  const user = { email: "usuario@exemplo.com" };
  const signOut = () => console.log("Sign out");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-foreground">
              Gestão Ambiental
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="processes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="processes" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Processos</span>
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Novo Processo</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Buscar Docs</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notificações</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="processes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Processos</CardTitle>
                <CardDescription>
                  Gerencie todos os seus processos ambientais e licenças
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProcessList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Novo Processo</CardTitle>
                <CardDescription>
                  Adicione um novo processo ambiental ao sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AddProcessForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Busca Inteligente</CardTitle>
                <CardDescription>
                  Encontre informações específicas nos documentos PDF
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SearchDocuments />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>
                  Alertas sobre vencimentos e renovações de licenças
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationPanel />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};