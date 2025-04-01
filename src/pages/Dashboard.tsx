
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedContainer } from "@/utils/animations";
import { ChevronRight, LayoutDashboard, ListChecks, Plus, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { calculateListStats, getShoppingLists, ShoppingList } from "@/utils/shoppingListsStorage";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";


const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen]= useState(false)
  const [recentLists, setRecentLists] = useState<ShoppingList[]>([])
  const [newListName, setNewListName] = useState("")

  useEffect(()=> {
    const storedList = getShoppingLists()
    if(storedList.length > 0){
      setRecentLists(storedList.slice(0, 3))
    }else {
      setRecentLists([
        {
          id:"example-1",
          name: "Supermercado",
          items: [
            { id: "item-1", name: "Arroz", quantity: "1 kg", checked: false },
            { id: "item-2", name: "Feijão", quantity: "1 kg", checked: false },
            { id: "item-3", name: "Leite", quantity: "1 L", checked: true }
          ],
          date: new Date().toISOString().split("T")[0]
        },
        { 
          id: "example-2", 
          name: "Farmácia", 
          items: [
            { id: "item-4", name: "Vitamina C", quantity: "1 caixa", checked: false },
            { id: "item-5", name: "Protetor Solar", quantity: "1 unidade", checked: true }
          ], 
          date: new Date().toISOString().split("T")[0] 
        }
      ])
    } 
  }, [])

  const handleCreateList = () => {
    if(newListName.trim()){
      const newList: ShoppingList = {
        id: uuidv4(),
        name: newListName,
        items: [],
        date: new Date().toISOString().split("T")[0]
      }
      toast({
        title: "Lista criada",
        description:`A lista ${newListName} foi criada com sucesso.`
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl page-transition">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <AnimatedContainer animation="slideInLeft">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Menu</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <nav className="space-y-1">
                  {[
                    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
                    { name: "Listas de Compras", icon: ListChecks, href: "/shopping-lists" },
                    { name: "Perfil", icon: User, href: "/profile" },
                  ].map((item) => (
                    <Link 
                      key={item.name}
                      to={item.href}
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent group"
                    >
                      <item.icon className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slideInLeft" delay={100}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Total de Listas</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Itens Pendentes</p>
                    <p className="text-2xl font-bold">18</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Itens Comprados</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <AnimatedContainer animation="fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Bem-vindo de volta!</p>
              </div>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Lista
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Nova Lista</DialogTitle>
                    <DialogDescription>
                      Dê um nome para sua nova lista de compra.
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
                    <Button variant="outline" onClick={()=> setIsAddModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateList}>
                      <Plus className="mr-2 h-4 w-4"/>
                      Criar lista
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slideUp" delay={100}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Listas Recentes</CardTitle>
                    <CardDescription>
                      {recentLists.length > 0
                        ? "Suas últimas listas de compras"
                        : "Você ainda não tem listas de compras"
                      }
                    </CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/shopping-lists">Ver Todas</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLists.map((list) => {
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
                          <h3 className="font-medium">{list.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {stats.completedItems} de {stats.totalItem} itens comprados
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/shopping-lists/${list.id}`}>
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slideUp" delay={200}>
            <Card>
              <CardHeader>
                <CardTitle>Dicas Rápidas</CardTitle>
                <CardDescription>
                  Sugestões para aproveitar ao máximo sua experiência
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-accent p-4 rounded-lg">
                    <h3 className="font-medium mb-1">Organize por Categorias</h3>
                    <p className="text-sm text-muted-foreground">
                      Agrupe seus itens em categorias para facilitar suas compras no mercado.
                    </p>
                  </div>
                  <div className="bg-accent p-4 rounded-lg">
                    <h3 className="font-medium mb-1">Compartilhe Suas Listas</h3>
                    <p className="text-sm text-muted-foreground">
                      Envie suas listas para amigos ou familiares quando precisar de ajuda nas compras.
                    </p>
                  </div>
                  <div className="bg-accent p-4 rounded-lg">
                    <h3 className="font-medium mb-1">Economize com Planejamento</h3>
                    <p className="text-sm text-muted-foreground">
                      Crie suas listas com antecedência para evitar compras por impulso.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
