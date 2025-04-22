import "./loginModal.ts";
import { Login } from "../login";
// import { displayAvatar } from "../utils/avatar";
import { checkLoggedInUser } from "../utils/avatar";

class CustomHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEventListeners();
    // this.checkLoggedInUser();
  }

  render() {
    this.innerHTML = `<header class="bg-gray-800 text-white shadow-md">
  <div class="wrapper flex flex-wrap justify-between items-center py-4 gap-4">
    
    <div class="logo text-2xl font-bold">
      <a href="/" class="hover:text-gray-300 transition-colors">The Auction</a>
    </div>

    <div class="user flex items-center gap-6">
      <a href="createAuction.html" class="text-sm font-medium hover:text-gray-300 transition-colors">
        Create auction
      </a>
      <a href="myAuctions.html" class="text-sm font-medium hover:text-gray-300 transition-colors">
        My auctions
      </a>
      <span
        class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black font-bold text-lg"
        id="username-display"
        title="User Profile"
      >
        X
      </span>
      <button
        class="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm"
        popovertarget="login-dialog"
        id="login-btn"
      >
        Login
      </button>
      <login-modal></login-modal>
    </div>
  </div>
</header>`;
  }
  setupEventListeners() {
    // Login button click handler
    const loginBtn = this.querySelector("#login-btn");
    loginBtn?.addEventListener("click", () => {
      console.log("Login button clicked");
    });

    // Login form submission handler
    const loginForm = document.querySelector("#login-form");
    loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = (
        document.querySelector("#login-email") as HTMLInputElement
      ).value;
      const passwordInput = (
        document.querySelector("#login-password") as HTMLInputElement
      ).value;

      Login(emailInput, passwordInput);
    });

    checkLoggedInUser();
  }
}

customElements.define("custom-header", CustomHeader);
