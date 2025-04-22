interface Bid {
  auctionId: string;
  currentPrice: number;
  newBid: {
    amount: number;
    bidder: {
      name: string;
      _id: string;
    };
    createdAt: string;
    _id: string;
  };
}
export default Bid;
