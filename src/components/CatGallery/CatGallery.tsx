import React, { useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchCats, fetchBreeds } from "../../API/catApi";
import { useCatContext } from "../../context/catContext";
import BreedFilter from "../BreedFilter/BreedFilter";
import CatCard from "../CatCard/CatCard";
import { useFavorites } from "../../hooks/useFavorites";
import { Cat, Breed } from "../../types/types";

const CatGallery: React.FC = () => {
  const { breed } = useCatContext();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);

  // Запрос для получения котов
  const catsQuery: UseQueryResult<Cat[], Error> = useQuery({
    queryKey: ["cats", breed] as const,
    queryFn: () => fetchCats(breed),
    staleTime: 60000,
  });

  // Запрос для получения пород
  const breedsQuery: UseQueryResult<Breed[], Error> = useQuery({
    queryKey: ["breeds"] as const,
    queryFn: fetchBreeds,
    initialData: [],
  });

  // Проверка на наличие ошибок
  if (catsQuery.isError) return <p>Failed to load cats.</p>;
  if (catsQuery.isLoading || breedsQuery.isLoading) return <p>Loading...</p>;

  // Фильтрация котов по избранным
  const favoriteCats = favorites.filter((fav) => fav.id); // Извлекаем избранные коты из локального хранилища
  const displayedCats = showFavorites ? favoriteCats : catsQuery.data;

  return (
    <div className="p-4">
      <BreedFilter breeds={breedsQuery.data} />
      <button
        onClick={() => setShowFavorites(!showFavorites)}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        {showFavorites ? "Show All Cats" : "Show Favorites"}
      </button>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedCats?.length ? (
          displayedCats.map((cat) => (
            <CatCard
              key={cat.id}
              cat={cat}
              toggleFavorite={() => toggleFavorite(cat)} // Передаем весь объект кота
              isFavorite={isFavorite(cat.id)}
            />
          ))
        ) : (
          <p>No cats to display.</p>
        )}
      </div>
    </div>
  );
};

export default CatGallery;
