import { useQuery } from "react-query";
import { productService } from "../services";

export default function useCategories() {
  const res = useQuery({
    queryKey: ["getCategories"],
    queryFn: productService.getAllCategories,
  });

  return res;
}
