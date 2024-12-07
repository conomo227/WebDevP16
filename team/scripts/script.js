let teamJSONFile = "team.json";
let contentJSONFile = "content.json";

document.addEventListener("DOMContentLoaded", () => {
    fetch(contentJSONFile)
    .then(response => response.json())
    .then(contentData => {
        console.log(contentData);
        renderHeader(contentData.header);
        renderFooter(contentData.footer);
    })
    .catch(error => console.error('Error fetching content data:', error));

    fetch(teamJSONFile)
    .then(response => response.json())
    .then(teamData => {
        console.log(teamData);
        renderTeam(teamData.team);
    })
    .catch(error => console.error('Error fetching team data:', error));
})

function renderHeader(headerData) {
    const header = document.getElementById('header');
    //add the content to the header
    header.innerHTML = `
        <img class='logo' src="${headerData.logo}" alt="${headerData.logoalt}">
        <nav>${headerData.links.map(link => `<a href="${link.href}">${link.name}</a>`).join('')}</nav>
        <button class="header-button">${headerData.button}</button>
    `;
    //2nd line .map iterates over each object in the links array and creates a string of html using the template listed after. the join method combines all the strings into one 
}  

function renderFooter(footerData) {
    const footer = document.getElementById('footer')
    footer.innerHTML = `
        <div class="footer-left">${footerData.left}</div>
        <div class="footer-right">${footerData.right.join(' | ')}</div>
    `;
}

function renderTeam(teamData) {
    const main = document.getElementById('main');
    main.innerHTML = `
        <section class="team-section">
            <h1>Our Team</h1></br></br>
            <div id="team-container">
                ${teamData.map(member => `
                    <div class="team-member">
                        <img src="${member.imageURL}" alt="${member.alt}" class="team-image">
                        <h2>${member.name}</h2>
                        <p><strong>Biography:</strong> ${member.bio}</p>
                        <p><strong>Role:</strong> ${member.role}</p>
                        <p><strong>Contributions:</strong> ${member.contributions}</p>
                        
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}
