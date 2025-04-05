
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AnimatedContainer } from "@/utils/animations";
import { ChevronRight, ListPlus, Plus, Search, ShoppingBag, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useToast } from "@/hooks/use-toast";
import { calculateListStats, deleteShoppingList, getShoppingLists, saveShoppingList, ShoppingList } from "@/utils/shoppingListsStorage";
import { useAuth } from "@/contexts/AuthContext";



const ShoppingLists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newListName, setNewListName] = useState("");
  const [lists, setLists] = useState<ShoppingList[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth()
  const {toast} = useToast()

  useEffect(() => {
    const storedList = getShoppingLists(user?.id)
    setLists(storedList)
  }, [user])
  
  const filteredLists = lists.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateList = () => {
    if (newListName.trim()) {
      const newList: ShoppingList = {
        id: Date.now().toString(),
        name: newListName,
        items: [],
        date: new Date().toISOString().split("T")[0]
      };

      //save to storage
      saveShoppingList(newList, user?.id)
      
      //update state
      setLists([newList, ...lists]);
      setNewListName("");
      setIsDialogOpen(false);

      toast({
        title: "Lista criada",
        description: `A lista ${newListName} foi criada com sucesso.`,
      })
    }
  };
  
  const handleDeleteList = (id: string, name: string) => {
    //delete from storage
    deleteShoppingList(id, user?.id)
    //update state
    setLists(lists.filter(list => list.id !== id));

    toast({
      title: "Lista excluída",
      description:` A lista ${name} foi excluída.`,
      variant: "destructive",
    })
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
                  autoFocus
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
                {filteredLists.map((list) => {
                  const stats = calculateListStats(list)
                  
                  return ( 
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
                              {stats.totalItem} {stats.totalItem === 1 ? "item" : "itens"}
                            </Badge>
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="h-2 bg-muted rounded-full w-32 mr-2">
                              <div 
                                className="h-2 bg-primary rounded-full" 
                                style={{ width: `${stats.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {stats.completedItems} de {stats.totalItem} comprados
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteList(list.id, list.name)}
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
                  )
              })}
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
