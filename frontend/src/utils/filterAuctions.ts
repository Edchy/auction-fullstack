export function filterAuctionsByCategory(category: string) {
  const items = Array.from(
    document.querySelectorAll("#auctions-container > article")
  ) as HTMLElement[];

  items.forEach((item) => {
    if (!category || item.dataset.category === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
