const navigationLinks = document.querySelectorAll(".navigation a");
const contentArea = document.querySelector(".content-area");

// Function to load content from separate HTML files
function loadContent(contentId) {
  const url = `${contentId}.html`; // Replace with actual file paths
  console.log("URL IS", url);
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      contentArea.innerHTML = data;
    })
    .catch((error) => {
      console.error("Error fetching content:", error);
      contentArea.innerHTML = "Error loading content"; // Handle errors gracefully
    });
}

navigationLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior

    const contentId = this.dataset.content;
    loadContent(contentId);
  });
});
