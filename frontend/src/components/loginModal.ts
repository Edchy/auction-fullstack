import { Login } from "../login";
import { Register } from "../register";

class CustomModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div
        popover
        class="bg-white p-8 rounded-xl shadow-xl h-1/2 w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/60 starting:open:opacity-0 opacity-100 transition-all duration-600 ease-in-out"
        id="login-dialog"
      >
        <h1 class="text-3xl font-bold text-center text-gray-800">le Auction</h1>
        <div class="flex justify-between mb-6">
          <button
            id="showLogin"
            class="text-blue-500 font-bold border-b-2 border-blue-500"
          >
            Logga in
          </button>
          <button id="showRegister" class="text-gray-500 font-bold">
            Registrera
          </button>
        </div>

        <form id="login-form" class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-700">Logga in</h2>
          <div>
            <label for="login-email" class="block text-sm text-gray-600 mb-1">E-post</label>
            <input id="login-email" type="text" class="w-full border p-2 rounded" />
          </div>
          <div>
            <label for="login-password" class="block text-sm text-gray-600 mb-1">Lösenord</label>
            <input id="login-password" type="password" class="w-full border p-2 rounded" />
          </div>
          <button class="w-full bg-blue-500 text-white py-2 rounded">Logga in</button>
          <p id="login-error" class="text-red-500 text-sm error-message"></p>
        </form>

        <form id="register-form" class="space-y-4 hidden">
          <h2 class="text-lg font-semibold text-gray-700">Registrera</h2>
          <div>
            <label for="register-name" class="block text-sm text-gray-600 mb-1">Namn</label>
            <input id="register-name" type="text" class="w-full border p-2 rounded" />
          </div>
          <div>
            <label for="register-email" class="block text-sm text-gray-600 mb-1">E-post</label>
            <input id="register-email" type="text" class="w-full border p-2 rounded" />
          </div>
          <div>
            <label for="register-password" class="block text-sm text-gray-600 mb-1">Lösenord</label>
            <input id="register-password" type="password" class="w-full border p-2 rounded" />
          </div>
          <button class="w-full bg-green-500 text-white py-2 rounded">Registrera</button>
          <p id="register-error" class="text-red-500 text-sm error-message"></p>
        </form>

        <button class="absolute right-2 top-2 text-2xl" popovertarget="login-dialog">✖︎</button>
      </div>
    `;

    const loginForm = this.querySelector("#login-form") as HTMLFormElement;
    const registerForm = this.querySelector("#register-form") as HTMLFormElement;

    loginForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = (this.querySelector("#login-email") as HTMLInputElement).value;
      const password = (this.querySelector("#login-password") as HTMLInputElement).value;
      await Login(email, password);
    });

    registerForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = (this.querySelector("#register-name") as HTMLInputElement).value;
      const email = (this.querySelector("#register-email") as HTMLInputElement).value;
      const password = (this.querySelector("#register-password") as HTMLInputElement).value;
      await Register(name, email, password);
    });

  
    const showLoginBtn = this.querySelector("#showLogin") as HTMLButtonElement;
    const showRegisterBtn = this.querySelector("#showRegister") as HTMLButtonElement;

    showLoginBtn?.addEventListener("click", () => {
      loginForm.classList.remove("hidden");
      registerForm.classList.add("hidden");

      showLoginBtn.classList.add("border-b-2", "border-blue-500", "text-blue-500");
      showRegisterBtn.classList.remove("border-b-2", "border-blue-500", "text-blue-500");
    });

    showRegisterBtn?.addEventListener("click", () => {
      registerForm.classList.remove("hidden");
      loginForm.classList.add("hidden");

      showRegisterBtn.classList.add("border-b-2", "border-blue-500", "text-blue-500");
      showLoginBtn.classList.remove("border-b-2", "border-blue-500", "text-blue-500");
    });
  }
}

customElements.define("login-modal", CustomModal);
