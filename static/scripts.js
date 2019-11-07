(function() {
  // API URL
  const apiUrl = `${window.location.href}admin/api`;
  const urlDisplay = document.querySelector(".js-copy-url");
  urlDisplay.innerHTML = apiUrl;

  // Clipboard
  const button = document.querySelector(".js-copy-button");
  button.addEventListener("click", copyToClipboard);

  function copyToClipboard() {
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(urlDisplay);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand("copy");
      selection.removeAllRanges();

      button.textContent = "Copied!";
      button.classList.add("success");

      setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("success");
      }, 1500);
    } catch (e) {
      console.error(e);
      button.textContent = "Error!";
      button.classList.add("error");

      setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("error");
      }, 1500);
    }
  }
})();
