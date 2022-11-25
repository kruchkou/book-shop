document.addEventListener("DOMContentLoaded", () => {
    let body = document.querySelector("#mainDiv");

    let dateInput = document.querySelector("#delivery-date-input");

    let date = new Date();
    date.setDate(date.getDate() + 1);
    dateInput.setAttribute("min", date.toJSON().slice(0, 10))

    let nameInput = document.querySelector("#name-input");
    let surnameInput = document.querySelector("#surname-input");
    let streetInput = document.querySelector("#street-input");
    let houseInput = document.querySelector("#house-input");
    let flatInput = document.querySelector("#flat-input");

    let submitButton = document.querySelector(".btn-submit");
    submitButton.addEventListener("click", (e) => {
        if (!validation()) {
            return;
        } else {
            e.preventDefault();
            console.log(nameInput);
            let successDialog = getSuccessDialog(`${nameInput.value} ${surnameInput.value}`, dateInput.value, `${streetInput.value} ${houseInput.value}-${flatInput.value}`, () => {
                body.removeChild(successDialog);
            });
            body.appendChild(successDialog);
        }
    })

    let checkboxes = Array.from(document.querySelectorAll("input[type=checkbox"));
    checkboxes.forEach(input => {
        input.addEventListener("change", () => {
            if (checkboxes.filter(item => item.checked).length > 2) {
                input.checked = false;
            }
        })
    });

    let inputs = Array.from(document.getElementsByTagName("input"));
    inputs.forEach(input => input.addEventListener("input", validation));

    function validation() {
        let isValid = inputs.every(input => {
            return input.checkValidity();
        });
        isValid ? submitButton.classList.remove("disabled") : submitButton.classList.add("disabled");
        return isValid;
    }

    function getSuccessDialog(clientName, deliveryDate, deliveryAdress, onClose) {
        let dialog = document.createElement("div");
        dialog.className = "modal-group";

        let dialogCard = document.createElement("div");
        dialogCard.className = "modal-popup card";

        let dialogTitleGroup = document.createElement("div");
        dialogTitleGroup.className = "modal-popup-title-group";

        let dialogTitle = document.createElement("h3");
        dialogTitle.className = "modal-popup-title";
        dialogTitle.textContent = "Order completed!";

        let dialogCloseIcon = document.createElement("img");
        dialogCloseIcon.className = "modal-popup-close-icon";
        dialogCloseIcon.setAttribute("src", "../../assets/images/icons/close.svg");
        dialogCloseIcon.addEventListener("click", onClose);

        dialogTitleGroup.appendChild(dialogTitle);
        dialogTitleGroup.appendChild(dialogCloseIcon);

        dialogCard.appendChild(dialogTitleGroup);

        let dialogDescriptionTitle = document.createElement("p");
        dialogDescriptionTitle.className = "modal-popup-description";
        dialogDescriptionTitle.textContent = `Thanks for your order, ${clientName}!`;

        let dialogDescription = document.createElement("p");
        dialogDescription.className = "modal-popup-description";
        dialogDescription.textContent = `  The courier will call you on ${deliveryDate} to confirm your
        avialibility at '${deliveryAdress}'`;

        dialogCard.appendChild(dialogDescriptionTitle);
        dialogCard.appendChild(dialogDescription);

        dialog.appendChild(dialogCard);
        return dialog;
    }
});
