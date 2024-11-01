import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  useInfiniteQuery,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchCats, fetchBreeds } from "../../API/catApi";
import { useCatContext } from "../../context/catContext";
import BreedFilter from "../BreedFilter/BreedFilter";
import CatCard from "../CatCard/CatCard";
import { useFavorites } from "../../hooks/useFavorites";
import { Cat, Breed } from "../../types/types";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CatGallery: React.FC = () => {
  const { breed } = useCatContext();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const [allCatsLoaded, setAllCatsLoaded] = useState(false);

  const resetData = () => {
    queryClient.removeQueries({ queryKey: ["cats"] });
    setAllCatsLoaded(false);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["cats", breed],
    queryFn: ({ pageParam = 0 }) => fetchCats(breed, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        setAllCatsLoaded(true);
        return undefined;
      }
      return allPages.length;
    },
    staleTime: 60000,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (!showFavorites) {
      resetData();
      refetch();
    }
  }, [breed]);

  const observer = useRef<IntersectionObserver>();

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage().catch((err) =>
          console.error("Error fetching next page:", err)
        );
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(handleObserver);
    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);
  }, [handleObserver]);

  const breedsQuery: UseQueryResult<Breed[], Error> = useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
    initialData: [],
  });

  if (isError) {
    toast.error("Failed to load cats.");
    return <p className="text-center text-red-500">Failed to load cats.</p>;
  }
  if (isLoading || breedsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3498db" size={50} />
      </div>
    );
  }

  const favoriteCats = favorites.filter((fav) => fav.id);
  const displayedCats = showFavorites
    ? favoriteCats
    : Array.from(new Set(data?.pages.flat().map((cat) => cat.id)))
        .map((id) => data?.pages.flat().find((cat) => cat.id === id))
        .filter((cat): cat is Cat => cat !== undefined);

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="max-w-screen-lg mx-auto flex items-center justify-between mb-4">
        <div className="flex-1">
          <BreedFilter breeds={breedsQuery.data} />
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => {
              setShowFavorites(!showFavorites);
              resetData();
            }}
            className="px-4 py-2 h-12 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-colors ml-4"
          >
            {showFavorites ? "Show All Cats" : "Show Favorites"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-lg mx-auto mt-6">
        {displayedCats.length ? (
          displayedCats.map((cat) => (
            <CatCard
              key={cat.id}
              cat={cat}
              toggleFavorite={() => toggleFavorite(cat)}
              isFavorite={isFavorite(cat.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No cats to display.
          </p>
        )}
      </div>
      <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
        {hasNextPage &&
        isFetchingNextPage &&
        !allCatsLoaded &&
        !showFavorites ? (
          <ClipLoader color="#3498db" size={30} />
        ) : null}
      </div>
    </div>
  );
};

export default CatGallery;
