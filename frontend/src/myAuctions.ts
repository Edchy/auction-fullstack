import { getAuctionsByUserId } from "./api/auctionService";
import { getCurrentUser } from "./api/auth";
import { Auction } from "./types/auctionType";

const auctionContainer = document.getElementById("my-auctions-container")!;

async function loadMyAuctions() {
  try {
    auctionContainer.innerHTML =
      '<p class="text-center py-4">Loading your auctions...</p>';

    const userData = await getCurrentUser();

    if (!userData) {
      auctionContainer.innerHTML = `
        <div class="text-center p-8">
          <p class="mb-4">You need to be logged in to view your auctions.</p>
          <a href="login.html" class="bg-blue-500 text-white px-4 py-2 rounded">Log In</a>
        </div>
      `;
      return;
    }

    const userId = userData.user._id;
    console.log("Loading auctions for user:", userId);

    const userAuctions = await getAuctionsByUserId(userId);

    if (!userAuctions || userAuctions.length === 0) {
      auctionContainer.innerHTML = `
        <div class="text-center p-8">
          <p class="mb-4">You haven't created any auctions yet.</p>
          <a href="createAuction.html" class="bg-blue-500 text-white px-4 py-2 rounded">Create Your First Auction</a>
        </div>
      `;
      return;
    }

    // Display auctions
    auctionContainer.innerHTML = ""; // Clear loading message
    for (const auction of userAuctions) {
      auctionContainer.appendChild(createMyAuctionsHTML(auction));
    }
  } catch (error) {
    console.error("Failed to load auctions:", error);
    auctionContainer.innerHTML = `
      <div class="text-center p-8 text-red-600">
        <p>There was an error loading your auctions.</p>
        <button id="retry-button" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Try Again
        </button>
      </div>
    `;

    document.getElementById("retry-button")?.addEventListener("click", () => {
      loadMyAuctions();
    });
  }
}

// Call the function when the page loads
loadMyAuctions();

export function createMyAuctionsHTML(auction: Auction) {
  const article = document.createElement("article");
  article.className = "auction-item bg-white p-4 rounded shadow mb-4";
  article.innerHTML = `
        <div class="">
          <img class="max-w-[200px] max-h-[200px] object-contain" src="${auction.image}" alt="${auction.title}">
          <div>
            <h3 class="text-xl font-bold">${auction.title}</h3>
            <p class="text-gray-700 mb-2">${auction.description}</p>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <p>Starting Price: ${auction.startingPrice} kr</p>
              <p>Current Price: <span class="font-semibold">${auction.currentPrice} kr</span></p>
            </div>
            <div class="mt-3">
              <a href="auction.html?id=${auction._id}" class="bg-blue-500 text-white px-3 py-1 rounded text-sm">View Auction</a>
            </div>
          </div>
        </div>
      `;

  return article;
}
