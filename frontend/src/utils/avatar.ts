export const displayAvatar = (name: string) => {
  const userNameDisplay = document.querySelector(
    "#username-display"
  ) as HTMLElement;
  if (userNameDisplay) {
    userNameDisplay.textContent = name.slice(0, 2).toUpperCase();
  }
};

export function checkLoggedInUser() {
  const name = localStorage.getItem("user");
  const userNameDisplay = document.querySelector(
    "#username-display"
  ) as HTMLElement;

  if (!name) {
    console.log("No user found in local storage");
    userNameDisplay.classList.add("hidden");
    return;
  }
  userNameDisplay.classList.remove("hidden");
  displayAvatar(name);
}
