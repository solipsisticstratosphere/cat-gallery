import { useState } from "react";
import { Cat } from "../types/types";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Cat[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const isFavorite = (id: string): boolean =>
    favorites.some((fav) => fav.id === id);

  const toggleFavorite = (cat: Cat): void => {
    const updatedFavorites = isFavorite(cat.id)
      ? favorites.filter((fav) => fav.id !== cat.id)
      : [...favorites, cat];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return { favorites, isFavorite, toggleFavorite };
};
