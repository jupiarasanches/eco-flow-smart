import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, CheckCircle, Clock } from "lucide-react";

// Mock notifications data
const mockNotifications = [
  {
    id: "1",
    type: "expiry_warning",
    title: "Licença próxima ao vencimento",
    message: "A licença LP-2024-001 vence em 15 dias (15/12/2024)",
    is_read: false,
    created_at: "2024-11-30T10:00:00Z",
    process_number: "LP-2024-001",
  },
  {
    id: "2",
    type: "renewal_needed",
    title: "Renovação necessária",
    message: "A licença LI-2024-002 precisa ser renovada",
    is_read: false,
    created_at: "2024-11-29T14:30:00Z",
    process_number: "LI-2024-002",
  },
  {
    id: "3",
    type: "expired",
    title: "Licença expirada",
    message: "A licença LO-2023-010 expirou em 01/11/2024",
    is_read: true,
    created_at: "2024-11-01T09:00:00Z",
    process_number: "LO-2023-010",
  },
];

export const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "expiry_warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "expired":
        return <Clock className="h-5 w-5 text-red-500" />;
      case "renewal_needed":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationVariant = (type: string) => {
    switch (type) {
      case "expiry_warning":
        return "secondary";
      case "expired":
        return "destructive";
      case "renewal_needed":
        return "default";
      default:
        return "outline";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, is_read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, is_read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold">Notificações</h3>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} não lidas</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Marcar todas como lidas
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Nenhuma notificação pendente
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`cursor-pointer transition-colors ${
                !notification.is_read ? 'border-primary/50 bg-primary/5' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium truncate">
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={getNotificationVariant(notification.type)}
                          className="text-xs"
                        >
                          {notification.process_number}
                        </Badge>
                        {!notification.is_read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};