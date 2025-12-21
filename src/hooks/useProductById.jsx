import { useQuery } from "react-query";
import { productService } from "../services";

export default function useProductById(productId) {
  const res = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProductById(productId),
    enabled: !!productId, // Only run query if productId exists
  });

  return res;
} 