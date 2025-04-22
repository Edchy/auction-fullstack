import { createAuction } from "./api/auctionService";
import { Auction } from "./types/auctionType";

const form = document.getElementById("createAuctionForm") as HTMLFormElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  //Get all input values
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const description = (
    document.getElementById("description") as HTMLInputElement
  ).value;
  const startingPrice = (
    document.getElementById("startingPrice") as HTMLInputElement
  ).value;
  const endDate = (document.getElementById("endDate") as HTMLInputElement)
    .value;
  const category = (document.getElementById("category") as HTMLInputElement)
    .value;
  const image = (document.getElementById("image") as HTMLInputElement).value;

  const loggedInUser = localStorage.getItem("user");
  if (!loggedInUser) {
    alert("You must be logged in to create an auction.");
    return;
  }

  //Create auctoin object - fix the id.....
  const auction: Auction = {
    title,
    seller: {
      name: loggedInUser,
    },
    _id: null,
    description,
    startingPrice: parseFloat(startingPrice),
    currentPrice: parseFloat(startingPrice),
    endDate: new Date(endDate).toISOString(),
    category,
    image,
  };

  createAuction(auction);
});
