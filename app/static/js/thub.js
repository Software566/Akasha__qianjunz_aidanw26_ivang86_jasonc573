$(document).foundation();

document.addEventListener('DOMContentLoaded', function () {
    const pfpContainer = document.querySelector('.pfp-container');
    const dropdown = document.querySelector('.dropdown');

    pfpContainer.addEventListener('click', function () {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
        if (!pfpContainer.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });
});

// Tournament Creation Code

const topicsContainer = document.getElementById("topicsContainer");
const addTopicButton = document.getElementById("addTopic");
let topicCount = 0;

addTopicButton.addEventListener("click", () => {
    if (topicCount < 8) {
        addTopicButton.style.display = "inline-block";
        topicCount++;
        const topicField = document.createElement("div");
        topicField.classList.add("topic-field");
        topicField.innerHTML = `
            <div class="grid-x grid-padding-x align-middle">
                <div class="cell small-6">
                    <label>
                        Topic ${topicCount}
                        <input type="text" name="topic${topicCount}" required>
                    </label>
                </div>
                <div class="cell small-6">
                    <button type="button" class="button alert remove-topic">Delete</button>
                </div>
                <div class="cell small-6">
                    <label>
                        Image for Topic ${topicCount}
                        <input type="file" name="image${topicCount}" accept="image/*" required>
                    </label>
                </div>
            </div>
        `;
        topicsContainer.appendChild(topicField);

        topicField.querySelector(".remove-topic").addEventListener("click", () => {
            topicsContainer.removeChild(topicField); 
            topicCount--;
            updateSubmitButton();

            if (topicCount < 8) {
                addTopicButton.style.display = "inline-block";
            }
        });
    }

    if (topicCount === 8) {
        addTopicButton.style.display = "none";
    }

    updateSubmitButton();
})

const submitButton = document.querySelector("button[type='submit']");
const cancelButton = document.querySelector("button[data-close]");

function updateSubmitButton() {
    if (topicCount >= 2) {
        submitButton.disabled = false;
    }
    else {
        submitButton.disabled = true;
    }
}

cancelButton.addEventListener("click", () => {
    topicsContainer.innerHTML = ""
    topicCount = 0

    addTopicButton.style.display = "inline-block";
    updateSubmitButton();
})

updateSubmitButton();