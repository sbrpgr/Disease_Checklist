import type { Cancer } from "@/types/cancer";
import { allCancers } from "./all-cancers";

export { allCancers };

export function getAllCancers(): Cancer[] {
  return allCancers;
}

export function getCancerBySlug(slug: string): Cancer | undefined {
  return allCancers.find((cancer) => cancer.slug === slug);
}

export function getCancerById(id: string): Cancer | undefined {
  return allCancers.find((cancer) => cancer.id === id);
}
