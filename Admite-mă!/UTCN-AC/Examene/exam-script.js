const resultCard = document.querySelector(".result-card");
const scoreText = document.querySelector(".score-text");

const questionCards = document.querySelectorAll(".question-card");
const progressText = document.querySelector(".progress-text");
let testCorectat = false;

function updateProgress(){

    let completed = 0;

    questionCards.forEach(card => {

        if(card.dataset.selected){
            completed++;
        }

    });

    progressText.textContent =
    `${completed}/${questionCards.length} grile completate`;

}

questionCards.forEach(card => {

    const options = card.querySelectorAll(".answer-option");

    options.forEach(option => {

        option.addEventListener("click", () => {

            const letter = option.querySelector(".answer-letter");
            const wasSelected = card.dataset.selected === option.dataset.answer;

            options.forEach(opt => {

                const l = opt.querySelector(".answer-letter");

                l.classList.remove("selected");

                if(testCorectat){

                    l.classList.remove("correct");
                    l.classList.remove("wrong");

                }

            });

            if (wasSelected) {

                delete card.dataset.selected;

            } else {

                letter.classList.add("selected");
                card.dataset.selected = option.dataset.answer;

            }

            updateProgress();

            if(testCorectat){

                if(card.dataset.selected){

                    card.classList.remove("unanswered");

                }else{

                    card.classList.add("unanswered");

                }

            }

        });

    });

});

const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", () => {
    testCorectat = true;

    resultCard.classList.remove("show");

    let scor = 0;

    questionCards.forEach((card, index) => {

        card.classList.remove("unanswered");

        const options = card.querySelectorAll(".answer-option");

        options.forEach(option => {

            const letter = option.querySelector(".answer-letter");

            letter.classList.remove("correct");
            letter.classList.remove("wrong");

            if(
                card.dataset.selected &&
                option.dataset.answer === barem[index]
            ){

                letter.classList.add("correct");

            }

            if(
                option.dataset.answer === card.dataset.selected &&
                card.dataset.selected !== barem[index]
            ){

                letter.classList.add("wrong");

            }

        });

        if(!card.dataset.selected){

            card.classList.add("unanswered");

        }

        if(card.dataset.selected === barem[index]){

            scor++;

        }

    });

    scoreText.textContent =
    `Ai răspuns corect la ${scor} din ${barem.length} grile.`;

    const gradeText = document.querySelector(".grade-text");

    const nota = 4 + 0.2 * scor;

    gradeText.textContent =
    `Nota finală: ${nota.toFixed(2)}`;

    resultCard.classList.remove("excellent");
    resultCard.classList.remove("good");
    resultCard.classList.remove("bad");

    if(nota >= 8){

        resultCard.classList.add("excellent");

    }
    else if(nota >= 5){

        resultCard.classList.add("good");

    }
    else{

        resultCard.classList.add("bad");

    }

    resultCard.style.display = "block";

    setTimeout(() => {

        resultCard.classList.add("show");

    },10);

    resultCard.scrollIntoView({
        behavior:"smooth"
    });

});

updateProgress();