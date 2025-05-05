document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".buttons input");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = this.value;

            if (value === "C") {
                // Clear the display
                display.value = "";
            } else if (value === "=") {
                // Evaluate the expression
                try {
                    display.value = eval(display.value);
                } catch (error) {
                    display.value = "Error";
                }
            } else {
                // Append the button value to the display
                display.value += value;
            }
        });
    });
});