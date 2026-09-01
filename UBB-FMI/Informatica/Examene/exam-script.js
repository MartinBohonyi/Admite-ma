const resultCard = document.querySelector(".result-card");
const scoreText = document.querySelector(".score-text");
const progressText = document.querySelector(".progress-text");

const submitButton = document.querySelector(".submit-button");
const resetButton = document.querySelector(".reset-button");

let testCorectat = false;


// ======================================================
// PROGRES
// ======================================================

function updateProgress() {

    const questionCards =
        document.querySelectorAll(".question-card");

    let completed = 0;

    questionCards.forEach(card => {

        const selected =
            card.querySelectorAll(
                ".answer-letter.selected"
            );

        if (selected.length > 0) {
            completed++;
        }

    });

    progressText.textContent =
        `${completed}/${questionCards.length} grile completate`;
}


// ======================================================
// INITIALIZARE EXAMEN
// ======================================================

function initExam(data) {

    const questionCards =
        document.querySelectorAll(".question-card");


    // ==================================================
    // SELECTARE / DESELECTARE RĂSPUNSURI
    // ==================================================

    questionCards.forEach(card => {

        const options =
            card.querySelectorAll(".answer-option");


        options.forEach(option => {

            option.addEventListener("click", () => {

                const letter =
                    option.querySelector(".answer-letter");


                // Selectăm / deselectăm răspunsul

                letter.classList.toggle("selected");


                // Dacă examenul a fost deja corectat,
                // ștergem rezultatul vechi al întrebării

                if (testCorectat) {

                    options.forEach(opt => {

                        const l =
                            opt.querySelector(".answer-letter");

                        l.classList.remove("correct");
                        l.classList.remove("wrong");
                        l.classList.remove("correct-unselected");

                    });


                    // Verificăm dacă mai există
                    // vreun răspuns selectat

                    const selected =
                        card.querySelectorAll(
                            ".answer-letter.selected"
                        );


                    if (selected.length > 0) {

                        card.classList.remove("unanswered");

                    } else {

                        card.classList.add("unanswered");

                    }

                }


                updateProgress();

            });

        });

    });


    // ==================================================
    // CORECTARE EXAMEN
    // ==================================================

    submitButton.addEventListener("click", () => {

        testCorectat = true;

        resultCard.classList.remove("show");

        let scor = 0;


        questionCards.forEach((card, index) => {

            const questionData =
                data.questions[index];

            const correctAnswers =
                questionData.correctAnswer;

            const p =
                questionData.points;

            const options =
                card.querySelectorAll(".answer-option");


            // ------------------------------------------
            // Ștergem rezultatul precedent
            // ------------------------------------------

            card.classList.remove("unanswered");

            options.forEach(option => {

                const letter =
                    option.querySelector(".answer-letter");

                letter.classList.remove("correct");
                letter.classList.remove("wrong");
                letter.classList.remove("correct-unselected");

            });


            // ------------------------------------------
            // Luăm răspunsurile selectate
            // ------------------------------------------

            const selectedAnswers = [];


            options.forEach(option => {

                const letter =
                    option.querySelector(".answer-letter");


                if (
                    letter.classList.contains("selected")
                ) {

                    selectedAnswers.push(
                        option.dataset.answer
                    );

                }

            });


            // ------------------------------------------
            // VERIFICĂM DACĂ GRILA ESTE NEFINALIZATĂ
            // ------------------------------------------

            if (selectedAnswers.length === 0) {

                card.classList.add("unanswered");

            }


            // ------------------------------------------
            // DACĂ A RĂSPUNS, AFIȘĂM REZULTATUL
            // ------------------------------------------

            else {

                options.forEach(option => {

                    const letter =
                        option.querySelector(".answer-letter");

                    const answer =
                        option.dataset.answer;


                    // Răspuns corect

                    if (
                        correctAnswers.includes(answer)
                    ) {

                        // Corect și bifat

                        if (
                            letter.classList.contains("selected")
                        ) {

                            letter.classList.add("correct");

                        }

                        // Corect, dar nebifat

                        else {

                            letter.classList.add(
                                "correct-unselected"
                            );

                        }

                    }


                    // Răspuns greșit și bifat

                    else if (
                        letter.classList.contains("selected")
                    ) {

                        letter.classList.add("wrong");

                    }

                });

            }


            // ------------------------------------------
            // CALCULĂM PUNCTAJUL GRILEI
            // ------------------------------------------

            const t =
                correctAnswers.length;

            const pointsPerCorrect =
                p / t;

            const penaltyPerWrong =
                -0.66 * p / t;


            let questionScore = 0;


            selectedAnswers.forEach(answer => {

                if (
                    correctAnswers.includes(answer)
                ) {

                    questionScore +=
                        pointsPerCorrect;

                } else {

                    questionScore +=
                        penaltyPerWrong;

                }

            });


            // Punctajul unei grile nu poate fi negativ

            questionScore =
                Math.max(0, questionScore);


            scor += questionScore;

        });


        // ==================================================
        // REZULTAT FINAL
        // ==================================================

        // Trunchiem la două zecimale,
        // fără rotunjire

            const scorAfisat = 
            scor.toFixed(2);

        const nota = scor + 1;

        scoreText.textContent =
            `Nota finală: ${nota.toFixed(2)}`;

        resultCard.classList.remove("excellent");
        resultCard.classList.remove("good");
        resultCard.classList.remove("bad");

        if (nota >= 8) {

            resultCard.classList.add("excellent");

        }
        else if (nota >= 5) {

            resultCard.classList.add("good");

        }
        else {

            resultCard.classList.add("bad");

        }

        resultCard.style.display = "block";

        setTimeout(() => {

            resultCard.classList.add("show");

        }, 10);

        resultCard.scrollIntoView({
            behavior: "smooth"
        });

    });


    // ==================================================
    // RESETARE
    // ==================================================

    resetButton.addEventListener("click", () => {

        testCorectat = false;


        questionCards.forEach(card => {

            // Ștergem răspunsurile selectate

            const options =
                card.querySelectorAll(".answer-option");


            options.forEach(option => {

                const letter =
                    option.querySelector(".answer-letter");

                letter.classList.remove("selected");
                letter.classList.remove("correct");
                letter.classList.remove("wrong");
                letter.classList.remove("correct-unselected");

            });


            // Ștergem unanswered

            card.classList.remove("unanswered");

        });


        // Ascundem rezultatul

        resultCard.classList.remove("show");
        resultCard.style.display = "none";


        updateProgress();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // Actualizăm progresul la încărcare

    updateProgress();

}