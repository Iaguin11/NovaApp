
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedContainer } from "@/utils/animations";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("")
  const {register, isLoading} = useAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password.length < 6){
      setError("A senha deve ter pelo menos 6 caracteres")
      toast.error("A senha deve ter pelo menos 6 caracteres.")
      return
    }
    try {
      await register(name, email, password)
      toast.success("Cadastro realizado com sucesso.")
      navigate("/dashboard")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao realizar cadastro. Tente novamente."
      console.log("Registration error:", error)
      setError(errorMessage)
      toast.error(errorMessage)
    }
    
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 page-transition">
      <div className="w-full max-w-md">
        <AnimatedContainer animation="slideUp" className="w-full">
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Criar uma conta</CardTitle>
              <CardDescription className="text-center">
                Registre-se para começar a usar nossas ferramentas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name" 
                    placeholder="Seu nome completo" 
                    required 
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    required 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      required 
                      value={password}
                      onChange={(e)=> setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Esconder senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    A senha deve ter pelo menos 6 caracteres
                  </p>
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Registrando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Registrar
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Faça login
                </Link>
              </div>
              
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    ou registre-se com
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  Google
                </Button>
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  Facebook
                </Button>
              </div>
            </CardFooter>
          </Card>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default Register;
