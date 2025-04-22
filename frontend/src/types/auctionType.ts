export interface Auction {
  _id: string | null;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  endDate: string;
  seller: {
    name: string;
  };
  category: string;
  image: string;
  bids?: Array<{
    amount: number;
    bidder: {
      name: string;
    };
    createdAt: string;
  }>;
  status?: string;
}
