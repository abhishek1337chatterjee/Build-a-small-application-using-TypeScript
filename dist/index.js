"use strict";
const getUsername = document.querySelector("#text");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
// reusable function
async function myCustomfetcher(url, option) {
    const response = await fetch(url, option);
    if (!response.ok) {
        throw new Error(`Network response was not ok:${response.ok}`);
    }
    const data = await response.json();
    return data;
}
const showResultUI = (singleUser) => {
    const { avatar_url, login, url } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `<div class='card'> 
    <img src=${avatar_url} alt=${login} />
    <hr />
    <div class="card-footer">
      <img src="${avatar_url}" alt="${login}" /> 
      <a href="${url}"> Github </a>
    </div>
    </div>
    `);
};
function fetchUserData(user) {
    myCustomfetcher(user, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
        }
    });
}
// default fun call
fetchUserData("https://api.github.com/users");
// search functationality
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLocaleLowerCase();
    try {
        const url = `https://api.github.com/users`;
        const allUserData = await myCustomfetcher(url, {});
        const matchingUser = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        main_container.innerHTML = "";
        if (matchingUser.length === 0) {
            main_container?.insertAdjacentHTML("beforeend", `<p class='empty-msg'>
    No matching users found.
    </p>`);
        }
        else {
            for (const singleUser of matchingUser) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
