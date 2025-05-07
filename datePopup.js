const startInput = document.getElementById("startInput");
const endInput = document.getElementById("endInput");

const startPopup = document.getElementById("startPopup");
const endPopup = document.getElementById("endPopup");

function showPopup(input, popup) {
    const rect = input.getBoundingClientRect();
    popup.style.left = rect.left + "px";
    popup.style.top = rect.bottom + window.scrollY + "px";
    popup.style.display = "block";
}

startInput.addEventListener("click", () => {
    showPopup(startInput, startPopup);
});

endInput.addEventListener("click", () => {
    showPopup(endInput, endPopup);
});

document.addEventListener("click", (e) => {
    if (!startPopup.contains(e.target) && e.target !== startInput) {
        startPopup.style.display = "none";
    }
    if (!endPopup.contains(e.target) && e.target !== endInput) {
        endPopup.style.display = "none";
    }
});