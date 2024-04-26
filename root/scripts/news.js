const API_KEY = "bb30f5ffe6f54ae78d9b0a786066c9e2";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Dehradun"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    console.log(data);
}

var app = angular.module('myApp', []);

app.controller('SidebarController', function ($scope, $rootScope) {
    $rootScope.selectedCategory = 'Dehradun';
    $scope.onItemClick = function (id) {
        fetchNews(id);
        $scope.curSelectedNav = id;
        $rootScope.selectedCategory = id;
    };
});

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article, index = 1) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        cardClone.querySelector('article').classList.add(`article-${index + 1}`);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const dateElement = cardClone.querySelector(".date-and-time");

    const date = new Date(article.publishedAt);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    dateElement.textContent = formattedDate;

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;

    cardClone.firstElementChild.addEventListener("click", () => {
        showPopup(article);
    });
}

function showPopup(article) {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const popupContent = document.getElementById("popup-content");

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "America/New_York",
    });

    popupContent.innerHTML = `
                <img src="${article.urlToImage}" alt="Popup Image">
                <div>${article.title}</div>
                <div class="flex"><div class="dt-popup">${date}</div></div>
                <p>${article.description}</p>
            `;

    overlay.style.display = "block";
    popup.style.display = "block";

    overlay.addEventListener("click", () => {
        hidePopup(popup, overlay);
    });
}

function hidePopup(popup, overlay) {
    popup.style.display = "none";
    overlay.style.display = "none";
}
