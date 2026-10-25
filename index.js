
console.log("Wordly JavaScript is connected!");

const searchForm = document.querySelector("form");
const wordInput = document.getElementById("word");
const message = document.getElementById("message");
const searchedWord = document.getElementById("searched-word");
const pronunciation = document.getElementById("pronunciation");
const definitionsList = document.getElementById("definitions");
const synonymsList = document.getElementById("synonyms");

searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const word = wordInput.value.trim();

    if (word === "") {
        message.textContent = "Please enter a word to search!";
        return;
    }

    message.textContent = "Searching...";
    searchedWord.textContent = "";
    pronunciation.textContent = "";
    definitionsList.innerHTML = "";
    synonymsList.innerHTML = "";

    try {
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
        );

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const data = await response.json();
        const wordData = data[0];

        searchedWord.textContent = wordData.word;

        const phonetic = wordData.phonetics.find(
            item => item.text
        );

        pronunciation.textContent = phonetic
            ? `Pronunciation: ${phonetic.text}`
            : "Pronunciation is unavailable.";

        const allSynonyms = new Set();

        wordData.meanings.forEach(function(meaning) {
            meaning.definitions.forEach(function(definition) {
                const listItem = document.createElement("li");

                listItem.textContent =
                    `${meaning.partOfSpeech}: ${definition.definition}`;

                definitionsList.appendChild(listItem);

                (meaning.synonyms || []).forEach(function(synonym) {
                    allSynonyms.add(synonym);
                });

                (definition.synonyms || []).forEach(function(synonym) {
                    allSynonyms.add(synonym);
                });
            });
        });

        if (allSynonyms.size > 0) {
            allSynonyms.forEach(function(synonym) {
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
        console.error("Dictionary error:", error);

        message.textContent = error.message === "Word not found"
            ? "Word not found. Please check the spelling and try again."
            : "Something went wrong. Please check your internet connection.";
    }
});

