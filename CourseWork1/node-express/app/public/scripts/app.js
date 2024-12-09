// js used in index.html to show the nav on smaller screens
const b = document.querySelector(".abc");
function showNav() {
  document.querySelector("nav ul").classList.toggle("shownav");
}
b.addEventListener("click", showNav);
//
document.addEventListener("DOMContentLoaded", () => {
  fetch("index.json")
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("header h1").textContent = data.headerTitle;
      const navList = document.querySelector(".ulnav");
      data.navItems.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${item.link}">${item.text}</a>`;
        navList.appendChild(li);
      });

      const mainContent = data.mainContent;
      const contentSection = document.querySelector("main .content");
      contentSection.querySelector("h1").textContent = mainContent.title;
      contentSection.querySelector("p").textContent = mainContent.description;

      const articlesContainer = document.querySelector(".articles-container");
      mainContent.articles.forEach((article) => {
        const articleElement = document.createElement("article");
        articleElement.className = article.className;

        articleElement.innerHTML = `
          <figure>
            <img src="${article.image}" alt="${article.altText}" />
            <figcaption>
              <h3>${article.title}</h3>
              <p>${article.content}</p>
            </figcaption>
          </figure>
        `;
        articlesContainer.appendChild(articleElement);
      });

      const footer = document.querySelector("footer");
      footer.innerHTML = `
        ${data.footer.text} <br />
        <a href="mailto:${data.footer.email}">Email Us</a>
      `;
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });
});
