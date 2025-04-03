const STORAGE_KEY = 'shopping-lists'

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
  date: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
}

// get all shopping lists
export const getShoppingLists = (): ShoppingList[] => {
  const storedLists = localStorage.getItem(STORAGE_KEY)
  if(!storedLists) return []
  try {
    return JSON.parse(storedLists)
  } catch (error) {
    console.error("Error parsing shopping list:", error)
    return []
  }
}

//obtenha uma única lista de compras por id 
export const getShoppingListById =(id: string): ShoppingList | undefined => {
  const lists = getShoppingLists()
  return lists.find(list => list.id === id)
}

//salvar uma lista de comprar (criar ou atualizar)
export const saveShoppingList = (list: ShoppingList): ShoppingList => {
 try {
  const lists = getShoppingLists();
  const existingIndex = lists.findIndex(l => l.id === list.id);

  if(existingIndex >= 0){  //update existing list
    list[existingIndex] = list
  }else {
    lists.unshift(list)   //add new list 
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
  console.log('List saved to localStorage:', list.name, 'with', list.items.length, 'items')
  return list
 } catch (error) {
  console.error("Error saving shopping list:", error)
  return list
 }
}

//Delete a shopping list 
export const deleteShoppingList = (id: string): void => {
  try {
    const lists = getShoppingLists()
    const updatedLists = lists.filter(list => list.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLists))
  } catch (error) {
    console.error("Error deleting shopping list", error)
  }
}
//calculate shopping list statists 
export const calculateListStats = (list: ShoppingList) => {
  const totalItem = list.items.length
  const completedItems = list.items.filter(item => item.checked).length
  const progress = totalItem ? (completedItems / totalItem) * 100 : 0

  return {
    totalItem,
    completedItems,
    progress
  }
}