const STORAGE_KEY_PREFIX = 'shopping-lists'

const getUserStorageKey = (userId: string | undefined): string => {
  if(!userId){
    return STORAGE_KEY_PREFIX
  }
  return `${STORAGE_KEY_PREFIX}-${userId}`
}

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
export const getShoppingLists = (userId?: string): ShoppingList[] => {
  const storageKey = getUserStorageKey(userId)
  const storedLists = localStorage.getItem(storageKey)
  if(!storedLists) return []
  try {
    return JSON.parse(storedLists)
  } catch (error) {
    console.error("Error parsing shopping list:", error)
    return []
  }
}

//obtenha uma única lista de compras por id 
export const getShoppingListById =(id: string, userId?: string): ShoppingList | undefined => {
  const lists = getShoppingLists(userId)
  return lists.find(list => list.id === id)
}

//salvar uma lista de comprar (criar ou atualizar)
export const saveShoppingList = (list: ShoppingList, userId?: string): ShoppingList => {
 try {
  const storageKey = getUserStorageKey(userId)
  const lists = getShoppingLists(userId);
  const existingIndex = lists.findIndex(l => l.id === list.id);

  if(existingIndex >= 0){  //update existing list
    list[existingIndex] = list
  }else {
    lists.unshift(list)   //add new list 
  }

  localStorage.setItem(storageKey, JSON.stringify(lists))
  console.log('List saved to localStorage:', list.name, 'with', list.items.length, 'items', 'for user', userId || 'anonymous')
  return list
 } catch (error) {
  console.error("Error saving shopping list:", error)
  return list
 }
}

//Delete a shopping list 
export const deleteShoppingList = (id: string, userId?: string): void => {
  try {
    const storageKey = getUserStorageKey(userId)
    const lists = getShoppingLists(userId)
    const updatedLists = lists.filter(list => list.id !== id)
    localStorage.setItem(storageKey, JSON.stringify(updatedLists))
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