import React from "react";
import { Cat } from "../../types/types";

interface CatCardProps {
  cat: Cat;
  toggleFavorite: () => void;
  isFavorite: boolean;
}

const CatCard: React.FC<CatCardProps> = ({
  cat,
  toggleFavorite,
  isFavorite,
}) => {
  const breedName =
    cat.breeds.length > 0 ? cat.breeds[0].name : "Unknown Breed";

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <img
        src={cat.url}
        alt={`Cat ${cat.id}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-center font-semibold">{breedName}</p>
        <div className="flex justify-center mt-2">
          {" "}
          <button
            onClick={toggleFavorite}
            className={`px-3 py-1 rounded ${
              isFavorite ? "bg-red-500" : "bg-blue-500"
            } text-white`}
          >
            {isFavorite ? "Unfavorite" : "Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
