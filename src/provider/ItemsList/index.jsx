import { createContext, useContext, useState } from "react";

export const ItemsListContext = createContext();

export const ItemsListProvider = ({ children }) => {
  const [itemsList, setItemsList] = useState([]);

  const genItemId = () => {
    let maxId = 0;
    itemsList.forEach((item) => {
      if (item.id > maxId) maxId = item.id;
    });
    return maxId + 1;
  };

  const handleNewItem = (data) => {
    const itemId = genItemId();
    const item = { ...data, itemId };
    setItemsList([...itemsList, item]);
  };

  const handleEditItem = (itemId, key, newValue) => {
    if (!!newValue !== false) {
      const item = itemsList.find(({ id }) => id === itemId);
      return (item[key] = newValue);
    }
  };

  const handleDeleteItem = (itemId) => {
    setItemsList(itemsList.filter(({ id }) => id !== itemId));
  };

  return(
      <ItemsListContext.Provider value={{itemsList, handleNewItem, handleDeleteItem, handleEditItem}}>
         {children}
      </ItemsListContext.Provider>
  )
};

export const useItemsList = () => useContext(ItemsListContext)