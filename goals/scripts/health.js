let localJsonFile = "health.json";
document.addEventListener('DOMContentLoaded', () => {
    const contentSection = document.getElementById('health-content');
    fetch(localJsonFile)
        .then(response => response.json())
        .then(data => {
            document.title = data.title;

            data.sections.forEach(section => {
                const article = document.createElement('article');
                article.className = 'services';

                const figure = document.createElement('figure');
                const img = document.createElement('img');
                img.src = section.image;
                img.alt = section.alt;

                const figcaption = document.createElement('figcaption');
                const heading = document.createElement('h3');
                heading.textContent = section.heading;

                figcaption.appendChild(heading);

                if (Array.isArray(section.text)) {
                    section.text.forEach(paragraph => {
                        const p = document.createElement('p');
                        p.textContent = paragraph;
                        figcaption.appendChild(p);
                    });
                } else {
                    const p = document.createElement('p');
                    p.textContent = section.text;
                    figcaption.appendChild(p);
                }

                figure.appendChild(img);
                figure.appendChild(figcaption);
                article.appendChild(figure);
                contentSection.appendChild(article);
            });
        })
        .catch(error => console.error('Error loading content:', error));
});
