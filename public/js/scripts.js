// public/js/scripts.js
document.addEventListener("DOMContentLoaded", () => {
  const authorLinks = document.querySelectorAll("a.author-link");

  for (let link of authorLinks) {
    link.addEventListener("click", getAuthorInfo);
  }
});

async function getAuthorInfo(evt) {
  evt.preventDefault();

  const authorId = this.id;
  const url = `/api/author/${authorId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data[0]) return;

    const author = data[0];

    const authorInfo = document.querySelector("#authorInfo");
    authorInfo.innerHTML = `
      <h2>${author.firstName} ${author.lastName}</h2>
      <img
        src="${author.portrait}"
        alt="Portrait of ${author.firstName} ${author.lastName}"
        class="img-fluid mb-3">
      <p><strong>Born:</strong> ${author.dob}</p>
      ${author.dod ? `<p><strong>Died:</strong> ${author.dod}</p>` : ""}
      <p><strong>Profession:</strong> ${author.profession}</p>
      <p><strong>Country:</strong> ${author.country}</p>
      <p>${author.biography}</p>
    `;

    const modalEl = document.getElementById("authorModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  } catch (err) {
    console.error("Error loading author info:", err);
  }
}
