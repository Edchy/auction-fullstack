import { Auction } from "../types/auctionType";

export const sortAuctions = (auctions: Auction[], sortBy: string) => {
  return [...auctions].sort((a, b) => {
    if (sortBy === "price") {
      return b.currentPrice - a.currentPrice;
    } else if (sortBy === "endDate") {
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    }
    return 0;
  });
};
