import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CatProvider } from "../../../context/catContext";
import CatGallery from "../../CatGallery/CatGallery";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CatProvider>
      <CatGallery />
    </CatProvider>
  </QueryClientProvider>
);

export default App;
