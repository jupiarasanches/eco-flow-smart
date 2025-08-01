import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock search results
const mockSearchResults = [
  {
    document_id: "doc1",
    process_id: "proc1",
    process_number: "LP-2024-001",
    file_name: "relatorio_ambiental.pdf",
    file_type: "pdf",
    rank: 0.95,
    excerpt: "...análise da qualidade do ar conforme resolução CONAMA 491/2018...",
  },
  {
    document_id: "doc2",
    process_id: "proc2",
    process_number: "LI-2024-002",
    file_name: "estudo_impacto.pdf",
    file_type: "pdf",
    rank: 0.87,
    excerpt: "...avaliação dos impactos ambientais potenciais da atividade industrial...",
  },
];

export const SearchDocuments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast({
        title: "Termo de busca obrigatório",
        description: "Digite um termo para buscar nos documentos",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      // TODO: Implement actual Supabase search once connected
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, filter mock results based on search term
      const filtered = mockSearchResults.filter(result =>
        result.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.file_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(filtered);
      
      if (filtered.length === 0) {
        toast({
          title: "Nenhum resultado encontrado",
          description: "Tente usar termos diferentes ou verifique a ortografia",
        });
      }
    } catch (error) {
      toast({
        title: "Erro na busca",
        description: "Ocorreu um erro ao buscar documentos",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const downloadDocument = (documentId: string, fileName: string) => {
    // TODO: Implement document download from Supabase storage
    toast({
      title: "Download iniciado",
      description: `Baixando ${fileName}...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex space-x-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Digite termos para buscar nos documentos PDF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" disabled={isSearching}>
          <Search className="h-4 w-4 mr-2" />
          {isSearching ? "Buscando..." : "Buscar"}
        </Button>
      </form>

      {/* Search Tips */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Dicas de busca:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use palavras-chave específicas como "CONAMA", "licença", "impacto"</li>
            <li>• Combine termos relacionados como "qualidade água" ou "fauna flora"</li>
            <li>• A busca é realizada em todo o conteúdo extraído dos PDFs</li>
          </ul>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Resultados da busca
            </h3>
            {searchResults.length > 0 && (
              <Badge variant="secondary">
                {searchResults.length} {searchResults.length === 1 ? 'resultado' : 'resultados'}
              </Badge>
            )}
          </div>

          {searchResults.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Nenhum documento encontrado para "{searchTerm}"
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {searchResults.map((result) => (
                <Card key={result.document_id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-base">{result.file_name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{result.process_number}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadDocument(result.document_id, result.file_name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-2">
                      {result.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Relevância: {Math.round(result.rank * 100)}%</span>
                      <span className="uppercase">{result.file_type}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};