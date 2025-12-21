import { useQuery } from "react-query";
import { productService } from "../services";

export default function useProduct() {
  const res = useQuery({
    queryKey: ["allProduct"],
    queryFn: productService.getAllProducts,
  });

  return res;
}
