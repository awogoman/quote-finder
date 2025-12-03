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

    // --- Format dates nicely ---
    const options = { year: "numeric", month: "long", day: "numeric" };

    let dobFormatted = author.dob
      ? new Date(author.dob).toLocaleDateString("en-US", options)
      : "";

    let dodFormatted = author.dod
      ? new Date(author.dod).toLocaleDateString("en-US", options)
      : "";

    const authorInfo = document.querySelector("#authorInfo");
    authorInfo.innerHTML = `
      <h2>${author.firstName} ${author.lastName}</h2>
      <img
        src="${author.portrait}"
        alt="Portrait of ${author.firstName} ${author.lastName}"
        class="img-fluid mb-3">
      ${dobFormatted ? `<p><strong>Born:</strong> ${dobFormatted}</p>` : ""}
      ${
        dodFormatted
          ? `<p><strong>Died:</strong> ${dodFormatted}</p>`
          : ""
      }
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
