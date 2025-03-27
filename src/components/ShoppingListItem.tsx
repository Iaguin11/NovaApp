
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShoppingListItemProps {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  onToggle: (id: string, checked: boolean) => void;
  onDelete: (id: string) => void;
}

export function ShoppingListItem({ 
  id, 
  name, 
  quantity, 
  checked, 
  onToggle, 
  onDelete 
}: ShoppingListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "flex items-center justify-between p-3 rounded-md transition-all duration-200",
        checked ? "bg-muted/50" : "bg-accent/50",
        isHovered && "bg-accent"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center flex-1 min-w-0">
        <Checkbox 
          checked={checked} 
          onCheckedChange={(checked) => onToggle(id, checked as boolean)}
          className="mr-3"
          id={`item-${id}`}
        />
        <div className="flex-1 min-w-0">
          <label 
            htmlFor={`item-${id}`}
            className={cn(
              "font-medium cursor-pointer",
              checked && "line-through text-muted-foreground"
            )}
          >
            {name}
          </label>
          <p className="text-xs text-muted-foreground truncate">
            {quantity}
          </p>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onDelete(id)}
        className={cn(
          "text-muted-foreground hover:text-destructive",
          !isHovered && "opacity-0 md:opacity-100"
        )}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
