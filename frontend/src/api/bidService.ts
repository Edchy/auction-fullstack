import { BASE_URL } from "./serviceBase";
import { postData } from "./serviceBase";

interface Bid {
  auctionId: string;
  // bidder: string;
  amount: number;
}

export async function createBid(bidData: Bid) {
  return await postData(`${BASE_URL}/bid`, bidData);
}
