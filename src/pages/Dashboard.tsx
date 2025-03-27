
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedContainer } from "@/utils/animations";
import { ChevronRight, LayoutDashboard, ListChecks, Plus, ShoppingBag, User } from "lucide-react";

const Dashboard = () => {
  const recentLists = [
    { id: "1", name: "Supermercado", itemCount: 10, completedCount: 3, date: "2023-10-15" },
    { id: "2", name: "Farmácia", itemCount: 5, completedCount: 2, date: "2023-10-12" },
    { id: "3", name: "Material Escolar", itemCount: 8, completedCount: 0, date: "2023-10-10" },
  ];

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
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Lista
              </Button>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slideUp" delay={100}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Listas Recentes</CardTitle>
                    <CardDescription>
                      Suas últimas listas de compras criadas
                    </CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/shopping-lists">Ver Todas</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLists.map((list) => (
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
                            {list.completedCount} de {list.itemCount} itens comprados
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/shopping-lists/${list.id}`}>
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  ))}
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
