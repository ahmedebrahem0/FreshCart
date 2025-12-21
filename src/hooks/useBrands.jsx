import { useQuery } from "react-query";
import { productService } from "../services";

export default function useBrands() {
  const res = useQuery({
    queryKey: ["brands"],
    queryFn: productService.getAllBrands,
  });

  return res;
} 