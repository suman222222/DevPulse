console.log("DevPulse JavaScript is connected!");

// =========================
// DOM Elements
// =========================

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const profileSection = document.getElementById("profileSection");
const repositoriesSection = document.getElementById(
  "repositoriesSection"
);

const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");


// =========================
// Profile Elements
// =========================

const profileAvatar = document.getElementById("profileAvatar");
const profileName = document.getElementById("profileName");

const profileUsername =
  document.getElementById("profileUsername");

const profileBio = document.getElementById("profileBio");

const profileLocation =
  document.getElementById("profileLocation");

const profileLink = document.getElementById("profileLink");

const repoCount = document.getElementById("repoCount");

const followerCount =
  document.getElementById("followerCount");

const followingCount =
  document.getElementById("followingCount");


// =========================
// Repository Elements
// =========================

const repositoryCount =
  document.getElementById("repositoryCount");

const repositoriesGrid =
  document.getElementById("repositoriesGrid");


// =========================
// UI State Functions
// =========================

function showLoading() {
  loadingState.style.display = "block";

  errorState.style.display = "none";

  profileSection.style.display = "none";

  repositoriesSection.style.display = "none";
}


function hideLoading() {
  loadingState.style.display = "none";
}


function showError(message) {
  errorMessage.textContent = message;

  errorState.style.display = "block";

  profileSection.style.display = "none";

  repositoriesSection.style.display = "none";
}


function hideError() {
  errorState.style.display = "none";
}


// =========================
// Search Form
// =========================

searchForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const searchValue =
    searchInput.value.trim();

  if (searchValue === "") {

    showError(
      "Please enter a GitHub username."
    );

    return;
  }

  fetchUser(searchValue);

});


// =========================
// Example User Buttons
// =========================

const exampleUsers =
  document.querySelectorAll(".example-user");


exampleUsers.forEach((button) => {

  button.addEventListener("click", () => {

    const username =
      button.textContent.trim();

    searchInput.value = username;

    fetchUser(username);

  });

});


// =========================
// GitHub User API
// =========================

async function fetchUser(username) {

  try {

    showLoading();

    hideError();

    console.log(
      "Fetching GitHub user:",
      username
    );


    const response = await fetch(
      `https://api.github.com/users/${username}`
    );


    if (!response.ok) {

      if (response.status === 404) {

        throw new Error(
          "GitHub user not found. Please check the username."
        );

      }

      throw new Error(
        "Something went wrong while fetching GitHub data."
      );

    }


    const userData =
      await response.json();


    console.log(
      "User Data:",
      userData
    );


    displayUser(userData);


    await fetchRepositories(username);


    hideLoading();

    profileSection.style.display = "block";

    repositoriesSection.style.display = "block";


  } catch (error) {

    console.error(
      "Error:",
      error.message
    );

    hideLoading();

    showError(error.message);

  }

}


// =========================
// Display User Profile
// =========================

function displayUser(user) {

  profileAvatar.src =
    user.avatar_url;

  profileAvatar.alt =
    `${user.login}'s avatar`;


  profileName.textContent =
    user.name || user.login;


  profileUsername.textContent =
    `@${user.login}`;


  profileBio.textContent =
    user.bio ||
    "No biography available.";


  profileLocation.textContent =
    user.location
      ? `📍 ${user.location}`
      : "📍 Location not available";


  profileLink.href =
    user.html_url;


  repoCount.textContent =
    user.public_repos;


  followerCount.textContent =
    user.followers;


  followingCount.textContent =
    user.following;

}


// =========================
// GitHub Repositories API
// =========================

async function fetchRepositories(username) {

  const response = await fetch(

    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`

  );


  if (!response.ok) {

    throw new Error(
      "Unable to fetch repositories."
    );

  }


  const repositories =
    await response.json();


  console.log(
    "Repositories:",
    repositories
  );


  displayRepositories(repositories);

}


// =========================
// Display Repositories
// =========================

function displayRepositories(repositories) {

  repositoriesGrid.innerHTML = "";


  repositoryCount.textContent =
    `${repositories.length} repositories`;


  repositories.forEach((repository) => {

    const repositoryCard =
      document.createElement("article");


    repositoryCard.className =
      "repository-card";


    repositoryCard.innerHTML = `

      <a
        href="${repository.html_url}"
        target="_blank"
        rel="noopener noreferrer"
      >

        <h3 class="repository-name">
          ${repository.name}
        </h3>

      </a>


      <p class="repository-description">

        ${
          repository.description ||
          "No description available for this repository."
        }

      </p>


      <div class="repository-meta">

        <span>
          ${repository.language || "Unknown"}
        </span>


        <span>
           ${repository.stargazers_count}
        </span>


        <span>
           ${repository.forks_count}
        </span>

      </div>

    `;


    repositoriesGrid.appendChild(
      repositoryCard
    );

  });

}