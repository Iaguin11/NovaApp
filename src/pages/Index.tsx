
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedContainer, StaggeredList } from "@/utils/animations";
import { CheckCircle, ListChecks, ShoppingBag, UserPlus } from "lucide-react";

const features = [
  {
    title: "Cadastro de Usuário",
    description: "Crie sua conta para acessar e gerenciar suas listas de compras.",
    icon: UserPlus,
  },
  {
    title: "Crie Listas de Compras",
    description: "Organize suas compras criando múltiplas listas para diferentes ocasiões.",
    icon: ListChecks,
  },
  {
    title: "Adicione Itens",
    description: "Adicione facilmente itens às suas listas com nome, quantidade e categoria.",
    icon: ShoppingBag,
  },
  {
    title: "Marque Itens Comprados",
    description: "Acompanhe seu progresso marcando os itens já comprados.",
    icon: CheckCircle,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <AnimatedContainer 
              animation="slideInLeft" 
              className="flex-1 text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Simplifique suas <span className="text-gradient">compras</span> com nossa plataforma
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                Uma plataforma simples e minimalista para organizar suas listas de compras. 
                Crie, gerencie e acompanhe tudo que você precisa comprar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg">
                  <Link to="/register">Começar Agora</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/login">Já tenho uma conta</Link>
                </Button>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer 
              animation="slideInRight" 
              className="flex-1"
            >
              <div className="relative bg-gradient-to-br from-background via-muted to-background p-1 rounded-2xl border shadow-lg">
                <div className="bg-card rounded-xl p-6 md:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <h3 className="text-xl font-medium">Lista de Supermercado</h3>
                      <span className="text-sm text-muted-foreground">10 itens</span>
                    </div>
                    
                    {[
                      { name: "Maçãs", quantity: "1kg", completed: true },
                      { name: "Arroz", quantity: "5kg", completed: true },
                      { name: "Leite", quantity: "2L", completed: false },
                      { name: "Pão", quantity: "1 pacote", completed: false },
                      { name: "Café", quantity: "500g", completed: false },
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          item.completed ? "bg-muted/50 text-muted-foreground" : "bg-accent"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            item.completed ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground"
                          }`}>
                            {item.completed && <CheckCircle className="w-4 h-4" />}
                          </div>
                          <span className={item.completed ? "line-through" : ""}>
                            {item.name}
                          </span>
                        </div>
                        <span className="text-sm">{item.quantity}</span>
                      </div>
                    ))}
                    
                    <Button className="w-full mt-2">Adicionar Item</Button>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-accent/50">
        <div className="container mx-auto max-w-6xl px-4">
          <AnimatedContainer animation="fadeIn" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Funcionalidades</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma oferece tudo que você precisa para organizar suas compras de forma eficiente.
            </p>
          </AnimatedContainer>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedContainer 
                key={index} 
                animation="slideUp" 
                delay={100 + index * 100}
                className="bg-card p-6 rounded-xl border shadow-sm card-transition hover:shadow-md"
              >
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="bg-gradient-to-br from-mentorRed/10 to-mentorRed-dark/10 rounded-2xl p-8 md:p-12 text-center">
            <AnimatedContainer animation="fadeIn" className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para simplificar suas compras?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Comece agora mesmo a usar nossa plataforma e nunca mais esqueça de comprar um item importante.
              </p>
              <Button asChild size="lg">
                <Link to="/register">Criar Conta Gratuita</Link>
              </Button>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t mt-auto">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2023 MentorLista. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Termos
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Privacidade
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
