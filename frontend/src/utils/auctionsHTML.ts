import { Auction } from "../types/auctionType";
import { calculateTimeLeft } from "./timeUtils";

export const createAuctionsHTML = (auction: Auction) => {
  const { daysLeft, hoursLeft, minutesLeft } = calculateTimeLeft(
    auction.endDate
  );

  const currentTime = new Date().getTime();
  const auctionEndTime = new Date(auction.endDate).getTime();

  if (auctionEndTime < currentTime) {
    return `
      <article data-category="${auction.category}" class="relative fade-in-up border border-gray-300 p-4 rounded-lg shadow-sm bg-gray-100 max-w-[500px]">
        <div class="absolute top-2 right-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          Auction Ended
        </div>
        <img src="${auction.image}"  alt="${auction.title}" class="max-h-72 h-100 w-full object-cover rounded-lg mb-4 opacity-60">
        <h3 class="text-xl font-bold text-gray-800 mb-2">${auction.title}</h3>
        <p class="text-sm text-gray-600 mb-4">${auction.description}</p>
        <div class="text-sm text-gray-500 space-y-1">
      <p class="font-medium text-gray-700">Category: <span class="text-gray-600">${auction.category}</span></p>
      <p class="font-medium text-gray-700">Seller: <span class="text-gray-600">${auction.seller.name}</span></p>
      <p class="font-medium text-gray-700">Start Price: <span class="text-green-600">${auction.startingPrice} kr</span></p>
      <p class="font-medium text-gray-700">Current Price: <span class="text-red-600">${auction.currentPrice} kr</span></p>
    </div>
      </article>
    `;
  }

  return `
    <article data-category="${auction.category}" class="relative fade-in-up border border-gray-300 p-4 rounded-lg shadow-sm bg-white max-w-[500px]">
  <div id="timeLeftBadge" class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
    ${daysLeft}d ${hoursLeft}h ${minutesLeft}m
  </div>
  <a href="auction.html?id=${auction._id}" class="block">
    <img src="${auction.image}" alt="${auction.title}" class="max-h-72 h-100 w-full object-cover rounded-lg mb-4" />
    <h3 class="text-xl font-bold text-gray-800 mb-2">${auction.title}</h3>
    <p class="text-sm text-gray-600 mb-4">${auction.description}</p>
    <div class="text-sm text-gray-500 space-y-1">
      <p class="font-medium text-gray-700">Category: <span class="text-gray-600">${auction.category}</span></p>
      <p class="font-medium text-gray-700">Seller: <span class="text-gray-600">${auction.seller.name}</span></p>
      <p class="font-medium text-gray-700">Start Price: <span class="text-green-600">${auction.startingPrice} kr</span></p>
      <p class="font-medium text-gray-700">Current Price: <span class="text-red-600">${auction.currentPrice} kr</span></p>
    </div>
  </a>
</article>
  `;
};
