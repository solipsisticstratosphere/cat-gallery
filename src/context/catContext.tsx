import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CatContextType {
  breed: string;
  setBreed: Dispatch<SetStateAction<string>>;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

interface CatProviderProps {
  children: ReactNode;
}

export const CatProvider: React.FC<CatProviderProps> = ({ children }) => {
  const [breed, setBreed] = useState<string>("");

  return (
    <CatContext.Provider value={{ breed, setBreed }}>
      {children}
    </CatContext.Provider>
  );
};

export const useCatContext = (): CatContextType => {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCatContext must be used within a CatProvider");
  }
  return context;
};
