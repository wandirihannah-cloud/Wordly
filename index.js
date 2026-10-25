
console.log("Wordly JavaScript is connected!");

const searchForm = document.querySelector("form");
const wordInput = document.getElementById("word");

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const word = wordInput.value.trim();

    console.log("You searched for:", word);
});
