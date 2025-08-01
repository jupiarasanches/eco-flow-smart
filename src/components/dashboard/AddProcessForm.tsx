import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const processSchema = z.object({
  process_number: z.string().min(1, "Número do processo é obrigatório"),
  protocol_date: z.string().min(1, "Data de protocolo é obrigatória"),
  process_type: z.string().min(1, "Tipo do processo é obrigatório"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  client_name: z.string().min(1, "Nome do cliente é obrigatório"),
  location: z.string().min(1, "Localização é obrigatória"),
  license_expiry_date: z.string().optional(),
  observations: z.string().optional(),
});

type ProcessFormData = z.infer<typeof processSchema>;

export const AddProcessForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProcessFormData>({
    resolver: zodResolver(processSchema),
    defaultValues: {
      process_number: "",
      protocol_date: "",
      process_type: "",
      description: "",
      client_name: "",
      location: "",
      license_expiry_date: "",
      observations: "",
    },
  });

  const onSubmit = async (data: ProcessFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement Supabase insertion once connected
      console.log("Process data:", data);
      
      toast({
        title: "Processo criado!",
        description: "O processo foi adicionado com sucesso.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar processo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="process_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número do Processo</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: LP-2024-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="protocol_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Protocolo</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="process_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo do Processo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="licenca_previa">Licença Prévia</SelectItem>
                    <SelectItem value="licenca_instalacao">Licença de Instalação</SelectItem>
                    <SelectItem value="licenca_operacao">Licença de Operação</SelectItem>
                    <SelectItem value="licenca_unica">Licença Única</SelectItem>
                    <SelectItem value="autorizacao">Autorização</SelectItem>
                    <SelectItem value="dispensa">Dispensa de Licenciamento</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="client_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da empresa ou pessoa física" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade, Estado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="license_expiry_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Vencimento (Opcional)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva os detalhes do processo..."
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações (Opcional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Observações adicionais..."
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Criar Processo"}
          </Button>
        </div>
      </form>
    </Form>
  );
};