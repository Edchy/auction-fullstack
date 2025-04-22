import { getAuctions } from "./api/auctionService";
import { createAuctionsHTML } from "./utils/auctionsHTML";
import { filterAuctionsByCategory } from "./utils/filterAuctions";
import { sortAuctions } from "./utils/sortAuctions";

async function displayAuctions(sortBy: string = "endDate") {
  const auctionsContainer = document.getElementById("auctions-container");

  if (!auctionsContainer) return;

  const auctions = await getAuctions();
  const sortedAuctions = sortAuctions(auctions, sortBy);

  auctionsContainer.innerHTML = "";
  for (const auction of sortedAuctions) {
    auctionsContainer.innerHTML += createAuctionsHTML(auction);
  }
}

displayAuctions();

const priceFilter = document.getElementById("price-filter") as HTMLInputElement;
priceFilter?.addEventListener("change", () => {
  const sortBy = priceFilter.checked ? "price" : "endDate";
  displayAuctions(sortBy);
});

document.getElementById("category-filter")?.addEventListener("change", (e) => {
  const category = (e.target as HTMLSelectElement).value;
  filterAuctionsByCategory(category);
});
