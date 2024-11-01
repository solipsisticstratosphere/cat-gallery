import React from "react";
import { useCatContext } from "../../context/catContext";
import { Breed } from "../../types/types";

interface BreedFilterProps {
  breeds: Breed[];
}

const BreedFilter: React.FC<BreedFilterProps> = ({ breeds }) => {
  const { breed, setBreed } = useCatContext();

  return (
    <select
      className="h-12 px-4 border border-gray-300 rounded-lg text-gray-700"
      value={breed}
      onChange={(e) => setBreed(e.target.value)}
    >
      <option value="">All Breeds</option>
      {breeds.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))}
    </select>
  );
};

export default BreedFilter;
