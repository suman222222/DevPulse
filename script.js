// =========================
// DOM Elements
// =========================

const searchForm =
  document.getElementById("searchForm");

const searchInput =
  document.getElementById("searchInput");

const profileSection =
  document.getElementById("profileSection");

const repositoriesSection =
  document.getElementById("repositoriesSection");

const loadingState =
  document.getElementById("loadingState");

const errorState =
  document.getElementById("errorState");

const errorMessage =
  document.getElementById("errorMessage");

// =========================
// Profile Elements
// =========================

const profileAvatar =
  document.getElementById("profileAvatar");

const profileName =
  document.getElementById("profileName");

const profileUsername =
  document.getElementById("profileUsername");

const profileBio =
  document.getElementById("profileBio");

const profileLocation =
  document.getElementById("profileLocation");

const profileLink =
  document.getElementById("profileLink");

const repoCount =
  document.getElementById("repoCount");

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
// Search Form
// =========================

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

const searchValue =
  searchInput.value.trim();

  if (searchValue === "") {
  return;
}

console.log(searchValue);
});

