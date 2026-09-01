function initExam(data) {


const resultCard = document.querySelector(".result-card");
const scoreText = document.querySelector(".score-text");
const progressText = document.querySelector(".progress-text");

const submitButton = document.querySelector(".submit-button");
const resetButton = document.querySelector(".reset-button");

const questionCards =
    document.querySelectorAll(".question-card");

let testCorectat = false;


// ==========================================
// PROGRES
// ==========================================

function updateProgress() {

    let completed = 0;

    questionCards.forEach(card => {

        if (card.dataset.selected) {
            completed++;
        }

    });

    progressText.textContent =
        `${completed}/${questionCards.length} grile completate`;
}


// ==========================================
// SELECTARE / DESELECTARE
// ==========================================

questionCards.forEach(card => {

    const options =
        card.querySelectorAll(".answer-option");

    options.forEach(option => {

        option.addEventListener("click", () => {

            const letter =
                option.querySelector(".answer-letter");

            const wasSelected =
                card.dataset.selected === option.dataset.answer;


            // Scoatem selectarea precedentă

            options.forEach(opt => {

                const l =
                    opt.querySelector(".answer-letter");

                l.classList.remove("selected");

                if (testCorectat) {

                    l.classList.remove("correct");
                    l.classList.remove("wrong");

                }

            });


            // Deselectare

            if (wasSelected) {

                delete card.dataset.selected;

            }

            // Selectare

            else {

                letter.classList.add("selected");

                card.dataset.selected =
                    option.dataset.answer;

            }


            updateProgress();


            // Dacă testul a fost deja corectat

            if (testCorectat) {

                if (card.dataset.selected) {

                    card.classList.remove("unanswered");

                } else {

                    card.classList.add("unanswered");

                }

            }

        });

    });

});


// ==========================================
// CORECTARE
// ==========================================

submitButton.addEventListener("click", () => {

    testCorectat = true;

    resultCard.classList.remove("show");

    let scor = 0;


    questionCards.forEach((card, index) => {

        card.classList.remove("unanswered");


        // Luăm întrebarea din JSON

        const questionData =
            data.questions[index];


        // Răspunsul corect din JSON

        const correctAnswer =
            questionData.correctAnswer;


        const options =
            card.querySelectorAll(".answer-option");


        options.forEach(option => {

            const letter =
                option.querySelector(".answer-letter");


            letter.classList.remove("correct");
            letter.classList.remove("wrong");

        if (card.dataset.selected){
            // Răspuns corect

            if (
                option.dataset.answer === correctAnswer
            ) {

                letter.classList.add("correct");

            }


            // Răspuns ales greșit

            if (
                option.dataset.answer === card.dataset.selected &&
                card.dataset.selected !== correctAnswer
            ) {

                letter.classList.add("wrong");

            }
        }
        });


        // Întrebare fără răspuns

        if (!card.dataset.selected){

            card.classList.add("unanswered");

        }


        // Calculăm scorul

        if (
            card.dataset.selected === correctAnswer
        ) {

            scor++;

        }

    });


    // ==========================================
    // REZULTAT
    // ==========================================

    scoreText.textContent =
        `Ai răspuns corect la ${scor} din ${data.questions.length} grile.`;


    const gradeText =
        document.querySelector(".grade-text");


    const nota =
        4 + 0.2 * scor;


    gradeText.textContent =
        `Nota finală: ${nota.toFixed(2)}`;


    // Resetăm clasele rezultatului

    resultCard.classList.remove("excellent");
    resultCard.classList.remove("good");
    resultCard.classList.remove("bad");


    // Alegem clasa în funcție de notă

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


// ==========================================
// RESET
// ==========================================

resetButton.addEventListener("click", () => {

    testCorectat = false;


    questionCards.forEach(card => {

        delete card.dataset.selected;

        card.classList.remove("unanswered");


        const options =
            card.querySelectorAll(".answer-option");


        options.forEach(option => {

            const letter =
                option.querySelector(".answer-letter");

            letter.classList.remove("selected");
            letter.classList.remove("correct");
            letter.classList.remove("wrong");

        });

    });


    resultCard.classList.remove("show");

    resultCard.style.display = "none";


    updateProgress();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ==========================================
// PORNIM PROGRESUL
// ==========================================

updateProgress();

}
