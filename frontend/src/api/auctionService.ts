import { Auction } from "../types/auctionType";
import { fetchData, postData } from "./serviceBase";
import { BASE_URL } from "./serviceBase";

const API_URL = `${BASE_URL}/auctions`;

export async function getAuctions() {
  const auctions = await fetchData<Auction[]>(`${API_URL}`);
  return auctions;
}

export async function getAuctionById(id: string) {
  return await fetchData(`${API_URL}/${id}`);
}
export async function getAuctionsByUserId(id: string) {
  return await fetchData<Auction[]>(`${API_URL}/user/${id}`);
}

export async function createAuction(auction: Auction) {
  return await postData(`${API_URL}`, auction);
}
