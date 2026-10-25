
console.log("Wordly JavaScript is connected!");

// Find the HTML elements we need
const searchForm = document.querySelector("form");
const wordInput = document.getElementById("word");
const message = document.getElementById("message");
const searchedWord = document.getElementById("searched-word");
const pronunciation = document.getElementById("pronunciation");
const definitionsList = document.getElementById("definitions");
const synonymsList = document.getElementById("synonyms");

// Listen for a search
searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const word = wordInput.value.trim();

    // Check whether the user entered a word
    if (word === "") {
        message.textContent = "Please enter a word to search.";
        return;
    }

    // Clear previous results
    searchedWord.textContent = "";
    pronunciation.textContent = "";
    definitionsList.innerHTML = "";
    synonymsList.innerHTML = "";

    message.textContent = "Searching for your word...";

    try {
        // Request dictionary information from the API
        

        const data = await response.json();
        const wordData = data[0];

        // Display the searched word
        searchedWord.textContent = wordData.word;
const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
);

if (!response.ok) {
    throw new Error("Word not found");
}
        // Display pronunciation
        const phonetic = wordData.phonetics.find(
            item => item.text
        );

        pronunciation.textContent = phonetic
            ? `Pronunciation: ${phonetic.text}`
            : "Pronunciation is unavailable.";

        // Display definitions
        const allSynonyms = new Set();

        wordData.meanings.forEach(function (meaning) {
            meaning.definitions.forEach(function (definition) {
                const listItem = document.createElement("li");

                listItem.textContent =
                    `${meaning.partOfSpeech}: ${definition.definition}`;

                definitionsList.appendChild(listItem);

                // Collect synonyms from the meaning
                meaning.synonyms.forEach(synonym => {
                    allSynonyms.add(synonym);
                });

                // Collect synonyms from each definition
                definition.synonyms.forEach(synonym => {
                    allSynonyms.add(synonym);
                });
            });
        });

        // Display synonyms
        if (allSynonyms.size > 0) {
            allSynonyms.forEach(function (synonym) {
                const listItem = document.createElement("li");
                listItem.textContent = synonym;
                synonymsList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement("li");
            listItem.textContent = "No synonyms available.";
            synonymsList.appendChild(listItem);
        }

        message.textContent = `Here are the results for "${word}".`;

    } catch (error) {
        message.textContent =
            "Sorry, we couldn't find that word. Please check the spelling and try again.";

        console.error("Dictionary error:", error);
    }
});

