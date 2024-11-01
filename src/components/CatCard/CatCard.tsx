import React from "react";
import { Cat } from "../../types/types";

interface CatCardProps {
  cat: Cat;
  toggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

const CatCard: React.FC<CatCardProps> = ({
  cat,
  toggleFavorite,
  isFavorite,
}) => {
  return (
    <div className="border p-4">
      <img src={cat.url} alt={`Cat ${cat.id}`} className="w-full h-auto" />
      <button onClick={() => toggleFavorite(cat.id)} className="mt-2">
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default CatCard;
