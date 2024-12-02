$(document).ready(function () {
    const boardUrl = "https://6550e0cc7d203ab6626e476a.mockapi.io/api/v1/SudokuBoard/1";
    const solutionUrl = "https://6550e0cc7d203ab6626e476a.mockapi.io/api/v1/SudokuSolutions/1";

    let solution = [];
    let initialBoard = "";

    // 4. Komunikavimas su nutolusiu serveriu:
    function loadSudokuBoard() {
        // a. Duomenų (JSON formatu) išsitraukimas iš aukščiau nurodytų sistemų: gauti lentelę ir teisingą atsakymą;
        $.getJSON(boardUrl, function (data) {
            initialBoard = data.board;
            renderBoard(initialBoard);
        });
        $.getJSON(solutionUrl, function (data) {
            solution = data.solution.split("");
        });
    }

    // b. Gautų duomenų atvaizdavimas HTML puslapio lentelėje: atvaizduoti lentelę ir patvirtinus formą, atvaizduoti teisingą atsakymą,
    function renderBoard(boardString) {
        const board = boardString.split("");
        let tableHtml = "";
        for (let i = 0; i < 9; i++) {
            tableHtml += "<tr>";
            for (let j = 0; j < 9; j++) {
                const index = i * 9 + j;
                const value = board[index];
                if (value !== "x") {
                    tableHtml += `<td><input type="text" value="${value}" disabled></td>`;
                } else {
                    tableHtml += `<td><input type="text" maxlength="1"></td>`;
                }
            }
            tableHtml += "</tr>";
        }
        $("#sudoku-board").html(tableHtml);
    }

    function autofillBoard() {
        $("input").each(function (index) {
            if (!$(this).attr("disabled")) {
                $(this).val(solution[index]);
            }
        });
        showMessage("#success-message", "Lenta buvo automatiškai užpildyta teisingais atsakymais.");
    }

    function validateBoard() {
        let isComplete = true;
        let userSolution = [];

        $("input").each(function (index) {
            const value = $(this).val();
            // 1.Formos laukų validavimas
            // a. Turi būti patikrinimas ar į laukus įvesti teigiami sveikieji skaičiai
            // b. Turi būti patikrinta ar visi laukai yra užpildyti;
            if (value === "" || !/^[1-9]$/.test(value)) {
                isComplete = false;
                return false;
            }
            userSolution.push(value);
        });

        if (!isComplete) {
            showMessage("#error-message", "Klaida: Užpildykite visus langelius teisingais skaičiais!");
            return;
        }

        if (userSolution.join("") === solution.join("")) {
            highlightCorrectCells()
            showMessage("#success-message", "Sveikiname! Jūsų sprendimas yra teisingas!");
        } else {
            highlightCorrectCells()
            showMessage("#error-message", "Klaida: Sprendimas yra neteisingas.");
        }
    }


    // 3. HTML puslapio dinaminis turinio modifikavimas
    // b. Egzistuojančių žymių stiliaus pakeitimas (atributui style priskiriant naują reikšmę)
    function highlightCorrectCells() {
        $("input").each(function (index) {
            const value = $(this).val();
            const correctValue = solution[index];

            if (value === correctValue) {
                $(this).css({
                    "background-color": "#e2ffea",
                    "border": ""
                });
                $(this).prop("disabled", true);
            }
            else if (value !== "" && value !== correctValue) {
                $(this).css({
                    "background-color": "",
                    "border": "2px solid red"
                });
            }
            else {
                $(this).css({
                    "background-color": "",
                    "border": "1px solid black"
                });
            }
        });
    }

    // 2. HTML puslapio elementų paslėpimas/parodymas
    function showMessage(selector, customMessage) {
        $(".hidden").hide();
        if (customMessage) {
            // 3. HTML puslapio dinaminis turinio modifikavimas
            //a . Egzistuojančių HTML dokumento žymių tekstinio turinio pakeitimas (pvz. paragrafo teksto pakeitimas)
            $(selector).text(customMessage);
        }
        $(selector).show();
    }

    function resetBoard() {
        renderBoard(initialBoard);
        $(".hidden").hide();
    }

    $("#validate").click(validateBoard);
    $("#reset").click(resetBoard);
    $("#autofill").click(autofillBoard);

    loadSudokuBoard();
});
