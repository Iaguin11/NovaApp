
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AnimatedContainer } from "@/utils/animations";
import { ChevronRight, ListPlus, Plus, Search, ShoppingBag, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data - would come from a database in a real app
const MOCK_LISTS = [
  { id: "1", name: "Supermercado", items: 10, completed: 3, date: "2023-10-15" },
  { id: "2", name: "Farmácia", items: 5, completed: 2, date: "2023-10-12" },
  { id: "3", name: "Material Escolar", items: 8, completed: 0, date: "2023-10-10" },
  { id: "4", name: "Casa e Jardim", items: 12, completed: 6, date: "2023-10-05" },
  { id: "5", name: "Eletrônicos", items: 3, completed: 1, date: "2023-10-01" },
];

const ShoppingLists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lists, setLists] = useState(MOCK_LISTS);
  const [newListName, setNewListName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredLists = lists.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now().toString(),
        name: newListName,
        items: 0,
        completed: 0,
        date: new Date().toISOString().split("T")[0]
      };
      
      setLists([newList, ...lists]);
      setNewListName("");
      setIsDialogOpen(false);
    }
  };
  
  const handleDeleteList = (id: string) => {
    setLists(lists.filter(list => list.id !== id));
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl page-transition">
      <AnimatedContainer animation="fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Listas de Compras</h1>
            <p className="text-muted-foreground">Gerencie suas listas de compras</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 sm:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                Nova Lista
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Lista</DialogTitle>
                <DialogDescription>
                  Dê um nome para sua nova lista de compras.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Nome da lista"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateList}>
                  <ListPlus className="mr-2 h-4 w-4" />
                  Criar Lista
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </AnimatedContainer>
      
      <AnimatedContainer animation="slideUp" delay={100}>
        <div className="flex mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar listas..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </AnimatedContainer>
      
      <AnimatedContainer animation="slideUp" delay={200}>
        <Card>
          <CardHeader>
            <CardTitle>Suas Listas</CardTitle>
            <CardDescription>
              {filteredLists.length
                ? `${filteredLists.length} lista${filteredLists.length !== 1 ? "s" : ""} encontrada${filteredLists.length !== 1 ? "s" : ""}`
                : "Nenhuma lista encontrada"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredLists.length > 0 ? (
              <div className="space-y-3">
                {filteredLists.map((list) => (
                  <div 
                    key={list.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="bg-primary/10 text-primary p-2 rounded-md mr-4">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium mr-2">{list.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {list.items} {list.items === 1 ? "item" : "itens"}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="h-2 bg-muted rounded-full w-32 mr-2">
                            <div 
                              className="h-2 bg-primary rounded-full" 
                              style={{ width: `${(list.completed / list.items) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {list.completed} de {list.items} comprados
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteList(list.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/shopping-lists/${list.id}`}>
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-25 mb-3" />
                <h3 className="text-lg font-medium mb-1">Nenhuma lista encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Tente buscar com outros termos ou"
                    : "Você ainda não possui listas de compras,"}
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Lista
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default ShoppingLists;
