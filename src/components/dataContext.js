import React, { createContext, useState } from "react";

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [dataContext, setDataContext] = useState([]);

  return (
    <DataContext.Provider value={[dataContext, setDataContext]}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
