
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatedContainer, StaggeredList } from "@/utils/animations";
import { ArrowLeft, CheckCircle, Edit2, Plus, Save, Search, ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddItemModal } from "@/components/AddItemModal";
import { cn } from "@/lib/utils";
import { deleteShoppingList, getShoppingListById, saveShoppingList, ShoppingListItem } from "@/utils/shoppingListsStorage";
import { ShoppingListItem as ShoppingListItemComponent} from "@/components/ShoppingListItem";
import { useToast } from "@/hooks/use-toast";


const ShoppingListDetail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [list, setList] = useState<{
    id: string,
    name: string,
    items: ShoppingListItem[]
    date: string
  } | null>(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [listName, setListName] = useState("");
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(()=> {
    const storedList = getShoppingListById(id)
    if(storedList) {
      setList(storedList)
      setListName(storedList.name)
    }
  }, [id])
  
  if (!list) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Lista não encontrada</h1>
        <Button asChild variant="outline">
          <Link to="/shopping-lists">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para listas
          </Link>
        </Button>
      </div>
    );
  }
  
  const completedItems = list.items.filter(item => item.checked).length;
  const totalItems = list.items.length;
  const progress = totalItems ? (completedItems / totalItems) * 100 : 0;
  
  const filteredItems = list.items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleToggleItem = (id: string, checked: boolean) => {
    const updateList = {
      ...list,
      items: list.items.map(item =>
        item.id === id ? { ...item, checked } : item
      ),
    };
    saveShoppingList(updateList)
    setList(updateList)
  };
  
  const handleDeleteItem = (id: string) => {
    const updatedList = {
      ...list,
      items: list.items.filter(item => item.id !== id),
    };
    saveShoppingList(updatedList)
    setList(updatedList)
    toast({
      description: "Item removido da lista."
    })
  };
  
  const handleAddItem = (name: string, quantity: string) => {
    const newItem: ShoppingListItem = {
      id: `${list.id}-${Date.now()}`,
      name,
      quantity,
      checked: false,
    };
    
    const updatedList = {
      ...list,
      items: [...list.items, newItem],
    };
    saveShoppingList(updatedList)
    setList(updatedList)
    toast({
      description: `${name} adicionado à lista.`
    })
  };
  
  const handleSaveListName = () => {
    if (listName.trim()) {
      const updatedList = {
        ...list,
        name: listName,
      };
      saveShoppingList(updatedList)
      setList(updatedList)
      setIsEditing(false)

      toast({
        description: "Nome da lista atualizado."
      }); 
    }
  };
  const handleDeleteList = () => {
    deleteShoppingList(list.id)

    toast({
      title: "Lista excluída",
      description: `A lista ${list.name} foi excluída.`
    })
    navigate("/shopping-lists")
  }
  
  const handleClearCheckedItems = () => {
    const updatedList = {
      ...list,
      items: list.items.filter(item => !item.checked)
    };
    saveShoppingList(updatedList)
    setList(updatedList)
    
    toast({
      description: "Itens comprados removidos da lista."
    })
  }
  
  const pendingItems = filteredItems.filter(item => !item.checked);
  const checkedItems = filteredItems.filter(item => item.checked);
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl page-transition">
      <AnimatedContainer animation="fadeIn">
        <div className="flex items-center mb-2">
          <Button asChild variant="ghost" className="mr-2 -ml-2">
            <Link to="/shopping-lists">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          
          {isEditing ? (
            <div className="flex items-center flex-1">
              <Input
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="mr-2"
                autoFocus
              />
              <Button size="sm" onClick={handleSaveListName}>
                <Save className="h-4 w-4 mr-1" />
                Salvar
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between flex-1">
              <h1 className="text-2xl font-bold">{list.name}</h1>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-primary/10 text-primary p-2 rounded-md mr-3">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  {completedItems} de {totalItems} itens
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% concluído
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full mt-2">
                <div
                  className="h-2 bg-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDeleteList} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2"/>
              Excluir lista
            </Button>
            <Button onClick={()=> setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4"/>
              Adicionar Item
            </Button>
          </div>
        </div>
      </AnimatedContainer>
      
      <AnimatedContainer animation="slideUp" delay={100}>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar itens..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </AnimatedContainer>
      
      <div className="space-y-6">
        {/* Pending Items */}
        <AnimatedContainer animation="slideUp" delay={200}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Itens Pendentes</CardTitle>
                  <CardDescription>
                    {pendingItems.length
                      ? `${pendingItems.length} item${pendingItems.length !== 1 ? "ns" : ""} a comprar`
                      : "Nenhum item pendente"}
                  </CardDescription>
                </div>
                {completedItems > 0 && pendingItems.length === 0 && (
                  <div className="flex items-center text-primary">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Tudo comprado!</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {pendingItems.length > 0 ? (
                <StaggeredList animation="fadeIn" baseDelay={0} staggerAmount={50}>
                  {pendingItems.map(item => (
                    <ShoppingListItemComponent
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      checked={item.checked}
                      onToggle={handleToggleItem}
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </StaggeredList>
              ) : searchTerm ? (
                <p className="text-center py-4 text-muted-foreground">
                  Nenhum item pendente encontrado para "{searchTerm}"
                </p>
              ) : null}
            </CardContent>
          </Card>
        </AnimatedContainer>
        
        {checkedItems.length > 0 && (
          <AnimatedContainer animation="slideUp" delay={300}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Itens Comprados</CardTitle>
                    <CardDescription>
                      {checkedItems.length} item{checkedItems.length !== 1 ? "ns" : ""} comprado{checkedItems.length !== 1 ? "s" : ""}
                    </CardDescription>
                  </div>
                  {checkedItems.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                      onClick={handleClearCheckedItems}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Limpar comprados
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className={cn("space-y-2", checkedItems.length > 5 && "max-h-60 overflow-y-auto pr-2")}>
                  <StaggeredList animation="fadeIn" baseDelay={0} staggerAmount={50}>
                    {checkedItems.map(item => (
                      <ShoppingListItemComponent
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        checked={item.checked}
                        onToggle={handleToggleItem}
                        onDelete={handleDeleteItem}
                      />
                    ))}
                  </StaggeredList>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
        )}
      </div>
      
      <AddItemModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddItem={handleAddItem}
      />
    </div>
  );
};

export default ShoppingListDetail;
