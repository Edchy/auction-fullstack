import { Auction } from "../types/auctionType";

export const createAuctionHTML = (auction: Auction, container: HTMLElement) => {
  container.className =
    "fade-in-up flex flex-col md:flex-row gap-6 p-6 border border-gray-300 rounded-lg bg-white shadow-md max-w-[1000px] mx-auto my-10";
  container.innerHTML = `
    <div>
     <img class="max-w-[300px] max-h-[300px] object-contain" src=${
       auction.image
     }>
    </div>
    <div class="w-full">
      <div class="flex-grow space-y-4">
      <h3 class="text-2xl font-bold text-gray-800">${auction.title}</h3>
      <p class="text-sm text-gray-600">${auction.description}</p>
      <p class="text-sm text-gray-500"><span class="font-medium text-gray-700">Seller:</span> ${
        auction.seller.name
      }</p>
      <p class="text-sm text-gray-500"><span class="font-medium text-gray-700">Starting Price:</span> <span class="text-green-600">${
        auction.startingPrice
      } kr</span></p>
      <p id="current-price" class="text-sm text-gray-500"><span class="font-medium text-gray-700">Current Price:</span> <span class="text-red-600">${
        auction.currentPrice
      } kr</span></p>
    </div>
  
      <div>
        <h3 class="text-lg font-bold text-gray-800 mt-4 mb-2">Bid history</h3>
        <ul id="bid-list">
   ${
     auction.bids && auction.bids.length > 0
       ? auction.bids
           .map((bid) => {
             const date = new Date(bid.createdAt).toLocaleString();
             return `<li class="bid-item flex justify-between items-center border-b border-gray-200 pb-2">
            <span class="bid-amount font-medium text-gray-700">${bid.amount} kr</span>
              <span class="bidder-name text-sm text-blue-500">${bid.bidder.name}</span>
              <span class="bid-time text-xs text-gray-400">${date}</span>
          </li>`;
           })
           .join("")
       : `<li class="empty-bids-message">No bids yet</li>`
   }
        </ul>
      </div>
    </div>
    <div>
    `;
};
