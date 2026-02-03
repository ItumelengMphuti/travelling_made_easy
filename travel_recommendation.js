let travelData = [];

fetch("travel_recommendation_api.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch travel data");
        }
        return response.json();
    })
    .then(data => {
        travelData = data;
        console.log("Fetched travel data:", travelData);
    })
    .catch(error => {
        console.error("Error:", error);
    });


const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const clearBtn = document.getElementById("clearBtn");


searchBtn.addEventListener("click", () => {
  const keyword = searchInput.value.toLowerCase().trim();
  resultsDiv.innerHTML = "";

  if (!keyword) return;

  let results = [];

  if (keyword.includes("beach")) {
    results = travelData.beaches;
  } else if (keyword.includes("temple")) {
    results = travelData.temples;
  } else if (travelData.countries[keyword]) {
    results = travelData.countries[keyword];
  }

  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>No recommendations found.</p>";
    return;
  }

  results.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("recommendation");

    card.innerHTML = `
      <h3>${item.name}</h3>
      <img src="${item.imageUrl}" alt="${item.name}" width="300">
      <p>${item.description}</p>
    `;

    resultsDiv.appendChild(card);
  });
});

clearBtn.addEventListener("click", () => {
  resultsDiv.innerHTML = "";
  searchInput.value = "";
});