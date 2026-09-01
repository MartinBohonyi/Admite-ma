
// ==================================================
// EXAMENE JSON
// ==================================================

const examene = [
    "../../Examene/Admitere-2026/exam.json",
    "../../Examene/Admitere-2025/exam.json",
    "../../Examene/Admitere-2024/exam.json",
    "../../Examene/Admitere-2023/exam.json",
    "../../Examene/Admitere-2022/exam.json",
    "../../Examene/Admitere-2021/exam.json",
    "../../Examene/Admitere-2019/exam.json",
    "../../Examene/Admitere-2018/exam.json",
    "../../Examene/Admitere-2017/exam.json",

    "../../Examene/Simulare-2026/exam.json",
    "../../Examene/Simulare-2025/exam.json",
    "../../Examene/Simulare-2024/exam.json",
    "../../Examene/Simulare-2023/exam.json",
    "../../Examene/Simulare-2022/exam.json",
    "../../Examene/Simulare-2021/exam.json",
    "../../Examene/Simulare-2019/exam.json",
    "../../Examene/Simulare-2018/exam.json",
    "../../Examene/Simulare-2017/exam.json"
];


// ==================================================
// CATEGORIA SELECTATĂ
// ==================================================

const category =
    document.body.dataset.category;

console.log("Categoria selectată:", category);


// ==================================================
// ÎNCĂRCĂM TOATE JSON-URILE
// ==================================================

Promise.all(

    examene.map(async path => {

        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(
                `Nu s-a putut încărca ${path}: ${response.status}`
            );
        }

        return await response.json();

    })

)

.then(exameneData => {

    const analysisQuestions = [];


    // ==================================================
    // EXTRAGEM GRILELE DIN TOATE EXAMENELE
    // ==================================================

    exameneData.forEach(examenData => {

        examenData.questions.forEach(questionData => {

            // Luăm doar categoria selectată

            if (questionData.category !== category) {
                return;
            }


            analysisQuestions.push({

                question: questionData,

                source: examenData.examTitle,

                correctAnswer:
                    questionData.correctAnswer

            });

        });

    });


    console.log(
        "Număr total grile:",
        analysisQuestions.length
    );


    // ==================================================
    // RANDOMIZARE
    // ==================================================

    function shuffle(array) {

        for (
            let i = array.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [array[i], array[j]] =
                [array[j], array[i]];

        }

    }


    shuffle(analysisQuestions);


    // ==================================================
    // INDEX GRILĂ
    // ==================================================

    let currentQuestion = 0;


    // ==================================================
    // AFIȘARE GRILĂ
    // ==================================================

    function showQuestion(index) {

        questionsList.innerHTML = "";


        const questionData =
            analysisQuestions[index];


        const question =
            questionData.question;


        // ==================================================
        // SOURCE
        // ==================================================

        const source =
            document.createElement("p");

        source.classList.add(
            "question-source"
        );

        source.textContent =
            questionData.source;


        questionsList.appendChild(source);


        // ==================================================
        // QUESTION GROUP
        // ==================================================

        const questionGroup =
            document.createElement("div");

        questionGroup.classList.add(
            "question-group"
        );


        // ==================================================
        // CONTEXT
        // ==================================================

        if (question.context) {

            const context =
                document.createElement("div");

            context.classList.add(
                "question-context"
            );

            context.innerHTML =
                question.context;

            questionGroup.appendChild(context);

        }


        // ==================================================
        // QUESTION CARD
        // ==================================================

        const questionCard =
            document.createElement("div");

        questionCard.classList.add(
            "question-card"
        );

        questionCard.dataset.category =
            question.category;


        // ==================================================
        // QUESTION HEADER
        // ==================================================

        const questionHeader =
            document.createElement("div");

        questionHeader.classList.add(
            "question-header"
        );


        // NUMĂR

        const questionNumber =
            document.createElement("div");

        questionNumber.classList.add(
            "question-number"
        );

        questionNumber.textContent =
            question.questionNumber;


        // TEXT

        const questionText =
            document.createElement("p");

        questionText.classList.add(
            "question-text"
        );

        questionText.innerHTML =
            question.question;


        questionHeader.appendChild(
            questionNumber
        );

        questionHeader.appendChild(
            questionText
        );


        questionCard.appendChild(
            questionHeader
        );


        // ==================================================
        // DIVIDER
        // ==================================================

        const divider =
            document.createElement("div");

        divider.classList.add(
            "question-divider"
        );

        questionCard.appendChild(
            divider
        );


        // ==================================================
        // ANSWERS
        // ==================================================

        const answers =
            document.createElement("div");

        answers.classList.add(
            "answers"
        );


        question.answers.forEach(answerData => {

            const answerOption =
                document.createElement("div");

            answerOption.classList.add(
                "answer-option"
            );

            answerOption.dataset.answer =
                answerData.answer;


            const answerLetter =
                document.createElement("div");

            answerLetter.classList.add(
                "answer-letter"
            );

            answerLetter.textContent =
                answerData.answer;


            const answerText =
                document.createElement("p");

            answerText.classList.add(
                "answer-text"
            );

            answerText.innerHTML =
                answerData.text;


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


        questionCard.appendChild(
            answers
        );


        questionGroup.appendChild(
            questionCard
        );


        questionsList.appendChild(
            questionGroup
        );


        // ==================================================
        // BUTOANE
        // ==================================================

        const buttonsContainer =
            document.createElement("div");

        buttonsContainer.classList.add(
            "question-buttons"
        );


        const previousButton =
            document.createElement("button");

        previousButton.textContent =
            "← Grila anterioară";

        previousButton.classList.add(
            "previous-button"
        );


        const checkButton =
            document.createElement("button");

        checkButton.textContent =
            "Verifică răspunsul";

        checkButton.classList.add(
            "check-button"
        );


        const skipButton =
            document.createElement("button");

        skipButton.textContent =
            "Grila următoare →";

        skipButton.classList.add(
            "skip-button"
        );


        buttonsContainer.appendChild(
            previousButton
        );

        buttonsContainer.appendChild(
            checkButton
        );

        buttonsContainer.appendChild(
            skipButton
        );


        questionsList.appendChild(
            buttonsContainer
        );


        // ==================================================
        // SELECTARE / DESELECTARE
        // ==================================================

        const answerOptions =
            questionCard.querySelectorAll(
                ".answer-option"
            );


        answerOptions.forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    const letter =
                        option.querySelector(
                            ".answer-letter"
                        );


                    const wasSelected =
                        questionCard.dataset.selected ===
                        option.dataset.answer;


                    answerOptions.forEach(opt => {

                        const l =
                            opt.querySelector(
                                ".answer-letter"
                            );

                        l.classList.remove(
                            "selected"
                        );

                        l.classList.remove(
                            "correct"
                        );

                        l.classList.remove(
                            "wrong"
                        );

                    });


                    if (wasSelected) {

                        delete questionCard.dataset.selected;

                    }

                    else {

                        letter.classList.add(
                            "selected"
                        );

                        questionCard.dataset.selected =
                            option.dataset.answer;

                    }

                }
            );

        });


        // ==================================================
        // VERIFICARE
        // ==================================================

        checkButton.addEventListener(
            "click",
            () => {

                const selectedAnswer =
                    questionCard.dataset.selected;


                if (!selectedAnswer) {

                    return;

                }


                questionCard.classList.remove(
                    "unanswered"
                );


                const correctAnswer =
                    questionData.correctAnswer;


                answerOptions.forEach(option => {

                    const letter =
                        option.querySelector(
                            ".answer-letter"
                        );


                    letter.classList.remove(
                        "correct"
                    );

                    letter.classList.remove(
                        "wrong"
                    );


                    if (
                        option.dataset.answer ===
                        correctAnswer
                    ) {

                        letter.classList.add(
                            "correct"
                        );

                    }


                    if (
                        option.dataset.answer ===
                        selectedAnswer &&
                        selectedAnswer !==
                        correctAnswer
                    ) {

                        letter.classList.add(
                            "wrong"
                        );

                    }

                });

            }
        );


        // ==================================================
        // URMĂTOAREA GRILĂ
        // ==================================================

        skipButton.addEventListener(
            "click",
            () => {

                currentQuestion++;


                if (
                    currentQuestion >=
                    analysisQuestions.length
                ) {

                    currentQuestion = 0;

                }


                showQuestion(
                    currentQuestion
                );

            }
        );


        // ==================================================
        // GRILA ANTERIOARĂ
        // ==================================================

        previousButton.addEventListener(
            "click",
            () => {

                currentQuestion--;


                if (
                    currentQuestion < 0
                ) {

                    currentQuestion =
                        analysisQuestions.length - 1;

                }


                showQuestion(
                    currentQuestion
                );

            }
        );


        // ==================================================
        // MATHJAX
        // ==================================================

        typesetMath(questionGroup);

    }


    // ==================================================
    // AȘTEPTĂM MATHJAX
    // ==================================================

    async function typesetMath(element) {

        while (
            typeof MathJax === "undefined" ||
            typeof MathJax.typesetPromise !== "function"
        ) {

            await new Promise(
                resolve =>
                    setTimeout(resolve, 50)
            );

        }


        await MathJax.typesetPromise([
            element
        ]);

    }


    // ==================================================
    // PORNIM CU PRIMA GRILĂ
    // ==================================================

    if (analysisQuestions.length > 0) {

        showQuestion(0);

    }

    else {

        questionsList.innerHTML =
            "<p>Nu există grile pentru acest capitol.</p>";

    }

})

.catch(error => {

    console.error(
        "EROARE LA ÎNCĂRCAREA GRILELOR:",
        error
    );

});

