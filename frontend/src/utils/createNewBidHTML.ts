import Bid from "../types/BidType";

export function createNewBidHTML(bid: Bid) {
  const li = document.createElement("li");
  const date = new Date(bid.newBid.createdAt).toLocaleString();

  li.className =
    "bid-item flex justify-between items-center border-b border-gray-200 pb-2";
  li.innerHTML = `
    <span class="bid-amount font-medium text-gray-700">${bid.newBid.amount} kr</span>
    <span class="bidder-name text-sm text-blue-500">${bid.newBid.bidder.name}</span>
    <span class="bid-time text-xs text-gray-400">${date}</span>
  `;

  return li;
}
