import { getAuctionById } from "./api/auctionService";
import { createBid } from "./api/bidService";
import Bid from "./types/BidType";
import { createNewBidHTML } from "./utils/createNewBidHTML";
import { createAuctionHTML } from "./utils/auctionHTML";
import { BASE_URL } from "./api/serviceBase";
import { socketInit } from "./utils/socketInit";

// let auction: any = null;
const urlParams = new URLSearchParams(window.location.search);
const auctionId = urlParams.get("id") || "";
const bidForm = document.getElementById("bid-form") as HTMLFormElement;
const bidInput = document.getElementById("bid-amount") as HTMLInputElement;

bidForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Submitting bid");
  try {
    const bid = await createBid({
      auctionId: auctionId,
      amount: parseFloat(bidInput.value),
    });
    console.log(bid);
  } catch (err) {
    console.error("Error creating bid:", err);
  }
});

const socket = socketInit(BASE_URL, {
  name: "joinAuction",
  id: auctionId,
});

socket.on("newBid", handleNewBid);

const displayAuction = async () => {
  if (!auctionId) {
    console.error("No auction ID found in URL");
    return;
  }
  const auction = await getAuctionById(auctionId);
  if (!auction) {
    console.error("No auction found");
    return;
  }
  const auctionContainer = document.getElementById("auction-container");
  if (!auctionContainer) {
    console.error("Auction container not found");
    return;
  }
  bidInput.value = auction.currentPrice + 10;

  createAuctionHTML(auction, auctionContainer);
};

function handleNewBid(bid: Bid) {
  console.log("New bid received:", bid);

  const bidList = document.getElementById("bid-list");

  if (!bidList) {
    console.error("Bid list not found");
    return;
  }
  const emtypBidsListMessage = bidList.querySelector(".empty-bids-message");

  if (emtypBidsListMessage) bidList.innerHTML = "";
  bidList.prepend(createNewBidHTML(bid));

  // Update current price display
  const priceElement = document.getElementById("current-price");
  if (priceElement) {
    priceElement.textContent = `Current price: ${bid.currentPrice} kr`;
  }

  // Update bid input value
  if (bidInput) {
    bidInput.value = String(bid.currentPrice + 10);
    bidInput.min = String(bid.currentPrice + 1);
  }

  // Add a highlight animation to the price
  if (priceElement) {
    priceElement.classList.add("price-updated");
    setTimeout(() => priceElement.classList.remove("price-updated"), 2000);
  }
}

displayAuction();
