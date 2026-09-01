
const params = new URLSearchParams(window.location.search);
const exam = params.get("exam");


// ==========================================
// VERIFICĂM DACĂ EXISTĂ EXAMENUL
// ==========================================

if (!exam) {
    console.error("Nu a fost specificat niciun examen.");
}


// ==========================================
// ÎNCĂRCĂM JSON-UL
// ==========================================

fetch(`Examene/${exam}/exam.json`)
    .then(response => {

        if (!response.ok) {
            throw new Error(
                `Nu s-a putut încărca examenul: ${response.status}`
            );
        }

        return response.json();
    })

    .then(async data => {

        // ==========================================
        // TITLUL EXAMENULUI
        // ==========================================

        document.querySelector(".exam-title").textContent =
            data.examTitle;


        const questionsList =
            document.querySelector(".questions-list");


        // ==========================================
        // GENERĂM TOATE ÎNTREBĂRILE
        // ==========================================

        let currentGroup = null;
        let currentGroupId = null;


        data.questions.forEach(questionData => {


            // ==========================================
            // ÎNTREBARE INDEPENDENTĂ
            // ==========================================

            if (questionData.groupId === null) {

                currentGroup = null;
                currentGroupId = null;

                createQuestion(
                    questionData,
                    questionsList
                );

                return;
            }


            // ==========================================
            // ÎNTREBARE DINTR-UN GROUP NOU
            // ==========================================

            if (questionData.groupId !== currentGroupId) {

                currentGroupId = questionData.groupId;

                currentGroup =
                    document.createElement("div");

                currentGroup.classList.add(
                    "question-group"
                );


                // Contextul grupului

                if (questionData.context) {

                    const context =
                        document.createElement("div");

                    context.classList.add(
                        "question-context"
                    );

                    context.innerHTML =
                        questionData.context;

                    currentGroup.appendChild(context);
                }


                questionsList.appendChild(
                    currentGroup
                );
            }


            // ==========================================
            // ADAUGĂM ÎNTREBAREA ÎN GROUP
            // ==========================================

            createQuestion(
                questionData,
                currentGroup
            );

        });


        // ==========================================
        // AȘTEPTĂM CA MATHJAX SĂ TERMINE
        // ==========================================

        const questionCards =
            document.querySelectorAll(
                ".question-card"
            );


        await MathJax.typesetPromise(
            [...questionCards]
        );


        // ==========================================
        // PORNIM LOGICA EXAMENULUI
        // ==========================================

        initExam(data);

    })

    .catch(error => {
        console.error(error);
    });


// ==================================================
// FUNCȚIE PENTRU CREAREA UNEI ÎNTREBĂRI
// ==================================================

function createQuestion(questionData, container) {


    // ==========================================
    // QUESTION CARD
    // ==========================================

    const questionCard =
        document.createElement("div");

    questionCard.classList.add(
        "question-card"
    );


    questionCard.dataset.category =
        questionData.category;


    // ==========================================
    // QUESTION HEADER
    // ==========================================

    const questionHeader =
        document.createElement("div");

    questionHeader.classList.add(
        "question-header"
    );


    // ==========================================
    // NUMĂRUL ÎNTREBĂRII
    // ==========================================

    const questionNumber =
        document.createElement("div");

    questionNumber.classList.add(
        "question-number"
    );

    questionNumber.textContent =
        questionData.questionNumber;


    // ==========================================
    // TEXTUL ÎNTREBĂRII
    // ==========================================

    const questionText =
        document.createElement("p");

    questionText.classList.add(
        "question-text"
    );

    questionText.innerHTML =
        questionData.question;


    questionHeader.appendChild(
        questionNumber
    );

    questionHeader.appendChild(
        questionText
    );


    questionCard.appendChild(
        questionHeader
    );


    // ==========================================
    // DIVIDER
    // ==========================================

    const divider =
        document.createElement("div");

    divider.classList.add(
        "question-divider"
    );

    questionCard.appendChild(
        divider
    );


    // ==========================================
    // ANSWERS
    // ==========================================

    const answers =
        document.createElement("div");

    answers.classList.add(
        "answers"
    );


    questionData.answers.forEach(answerData => {


        // ==========================================
        // ANSWER OPTION
        // ==========================================

        const answerOption =
            document.createElement("div");

        answerOption.classList.add(
            "answer-option"
        );


        answerOption.dataset.answer =
            answerData.answer;


        // ==========================================
        // LITERA RĂSPUNSULUI
        // ==========================================

        const answerLetter =
            document.createElement("div");

        answerLetter.classList.add(
            "answer-letter"
        );

        answerLetter.textContent =
            answerData.answer;


        // ==========================================
        // TEXTUL RĂSPUNSULUI
        // ==========================================

        const answerText =
            document.createElement("p");

        answerText.classList.add(
            "answer-text"
        );

        answerText.innerHTML =
            answerData.text;


        // ==========================================
        // ASAMBLĂM RĂSPUNSUL
        // ==========================================

        answerOption.appendChild(
            answerLetter
        );

        answerOption.appendChild(
            answerText
        );


        answers.appendChild(
            answerOption
        );

    });


    // ==========================================
    // ASAMBLĂM QUESTION CARD
    // ==========================================

    questionCard.appendChild(
        answers
    );


    container.appendChild(
        questionCard
    );
}

