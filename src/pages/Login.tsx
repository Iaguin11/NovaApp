
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedContainer } from "@/utils/animations";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import GoogleAccountsModal from "@/components/GoogleAccountsModal";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {
    login, 
    loginWithGoogle, 
    isLoading,
    showGoogleAccountsModal,
    setShowGoogleAccountsModal,
    handleGoogleAccountSelected
  } = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("")
  const navigate = useNavigate()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")

    try {
      await login(email, password)
      toast.success("Login realizado com sucesso.")
      navigate("/dashboard")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Erro ao fazer
      login. Verifique suas credencias.`
      console.error("Login error:", error)
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao iniciar login com Google.";
      console.error("Google login error:", error);
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleGoogleAccountSelect = async (account: any) => {
    try {
      await handleGoogleAccountSelected(account);
      toast.success("Login com Google realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao fazer login com Google.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 page-transition">
      <div className="w-full max-w-md">
        <AnimatedContainer animation="slideUp" className="w-full">
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Bem-vindo de volta</CardTitle>
              <CardDescription className="text-center">
                Entre com sua conta para acessar suas listas
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
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-xs text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
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
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Entrando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      Entrar
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Registre-se
                </Link>
              </div>
              
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    ou continue com
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
      <GoogleAccountsModal 
         isOpen={showGoogleAccountsModal}
         onClose={() => setShowGoogleAccountsModal(false)}
         onSelectAccount={handleGoogleAccountSelect}
      />
    </div>
  );
};

export default Login
