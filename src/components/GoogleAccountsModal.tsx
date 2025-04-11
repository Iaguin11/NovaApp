import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Avatar } from "./ui/avatar"




interface GoogleAccount {
  id: string
  name: string
  email: string
  photoUrl?: string
}

interface GoogleAccountsModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectAccount: (account: GoogleAccount) => void
}

const GoogleAccountsModal = ({isOpen, onClose, onSelectAccount}: GoogleAccountsModalProps) => {
  const [ isAdding, setIsAdding]= useState(false)
  const [ accounts ] = useState<GoogleAccount[]>([
    {
      id: "google-account-1",
      name: "João Silva",
      email: "joao.silva@gmail.com",
      photoUrl: "https://ui-avatars.com/api/?name=João+Silva&background=random"
    },
    {
      id: "google-account-2",
      name: "Maria Souza",
      email: "maria.souza@gmail.com",
      photoUrl: "https://ui-avatars.com/api/?name=Maria+Souza&background=random"
    },
    {
      id: "google-account-3",
      name: "Pedro Santos",
      email: "pedro.santos@gmail.com",
      photoUrl: "https://ui-avatars.com/api/?name=Pedro+Santos&background=random"
    }
  ])

  const handleSelectAccount = (account: GoogleAccount) => {
    setIsAdding(true)
    setTimeout(()=> {
      onSelectAccount(account)
      setIsAdding(false)
    }, 500)
  }

  return(
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <span>Google</span>
          </div>
          <DialogTitle className="text-center">Escolha uma conta Google</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            {accounts.map((account) => (
              <Button
                key={account.id}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => handleSelectAccount(account)}
                disabled={isAdding}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <img 
                      src={account.photoUrl} 
                      alt={account.name} 
                    />
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{account.name}</span>
                    <span className="text-sm text-muted-foreground">{account.email}</span>
                  </div>
                </div>
              </Button>
            ))}
            <Button
              variant="outline"
              className="w-full justify-start text-primary"
              onClick={onClose}
            >
              <span>Usar outra conta</span>
            </Button>
          </div>
        </div>
        {isAdding && (
          <div className="flex justify-center items-center gap-2 py-2">
            <div className="animate-spin h-4 w-4 border-primary border-t-transparent rounded-full"/>
            <span>Fazendo login...</span>
          </div>
        )}
        <div className="border-t pt-4 text-center text-xs text-muted-foreground">
          Para continuar, o Google compartilhará seu nome, endereço de e-mail 
          e foto do perfil com este aplicativo.
        </div>
      </DialogContent>
    </Dialog>
  )


}
export default GoogleAccountsModal


