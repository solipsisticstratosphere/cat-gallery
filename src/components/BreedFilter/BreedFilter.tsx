import React from "react";
import { useCatContext } from "../../context/catContext";
import { Breed } from "../../types/types";

interface BreedFilterProps {
  breeds: Breed[]; // Делает `breeds` обязательным
}

const BreedFilter: React.FC<BreedFilterProps> = ({ breeds }) => {
  const { breed, setBreed } = useCatContext();

  return (
    <select
      className="p-2 mb-4 border"
      value={breed}
      onChange={(e) => setBreed?.(e.target.value)} // Безопасная проверка для `setBreed`
    >
      <option value="">All Breeds</option>
      {breeds?.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))}
    </select>
  );
};

export default BreedFilter;
