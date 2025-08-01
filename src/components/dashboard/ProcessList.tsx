import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for now - will be replaced with Supabase queries once connected
const mockProcesses = [
  {
    id: "1",
    process_number: "LP-2024-001",
    protocol_date: "2024-01-15",
    process_type: "Licença Prévia",
    description: "Licença para instalação de indústria alimentícia",
    status: "active",
    license_expiry_date: "2024-12-15",
    client_name: "Empresa ABC Ltda",
    location: "São Paulo, SP",
  },
  {
    id: "2",
    process_number: "LI-2024-002",
    protocol_date: "2024-02-10",
    process_type: "Licença de Instalação",
    description: "Licença para construção de ETE",
    status: "pending",
    license_expiry_date: "2024-08-10",
    client_name: "Construtora XYZ",
    location: "Rio de Janeiro, RJ",
  },
];

export const ProcessList = () => {
  const [processes] = useState(mockProcesses);
  const { toast } = useToast();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "pending":
        return "secondary";
      case "expired":
        return "destructive";
      case "canceled":
        return "outline";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "pending":
        return "Pendente";
      case "expired":
        return "Expirado";
      case "canceled":
        return "Cancelado";
      default:
        return status;
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
  };

  return (
    <div className="space-y-4">
      {processes.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Nenhum processo encontrado. Adicione seu primeiro processo.
          </p>
        </div>
      ) : (
        processes.map((process) => (
          <Card key={process.id} className="relative">
            {isExpiringSoon(process.license_expiry_date) && (
              <div className="absolute top-2 right-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
            )}
            {isExpired(process.license_expiry_date) && (
              <div className="absolute top-2 right-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{process.process_number}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {process.description}
                  </p>
                </div>
                <Badge variant={getStatusVariant(process.status)}>
                  {getStatusText(process.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Protocolo: {new Date(process.protocol_date).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{process.location}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium">Cliente:</span>
                    <span>{process.client_name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium">Vencimento:</span>
                    <span className={
                      isExpired(process.license_expiry_date) 
                        ? "text-red-600" 
                        : isExpiringSoon(process.license_expiry_date) 
                        ? "text-orange-600" 
                        : ""
                    }>
                      {new Date(process.license_expiry_date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  Documentos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};