class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    const currentYear = new Date().getFullYear();
    const footer = document.createElement("footer");
    footer.innerHTML = `
            <div class="wrapper flex flex-wrap justify-between items-center gap-4 py-6">
      <nav>
        <ul class="flex flex-wrap gap-6 text-sm font-medium">
          <li><a href="#about" class="hover:text-gray-300 transition-colors">About</a></li>
          <li><a href="#contact" class="hover:text-gray-300 transition-colors">Contact</a></li>
          <li><a href="#privacy" class="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
        </ul>
      </nav>

      <!-- Copyright Section -->
      <p class="text-sm text-gray-400">&copy; ${currentYear} The Auction</p>
    </div>
        `;
    document.body.appendChild(footer);
  }
}

customElements.define("custom-footer", CustomFooter);
