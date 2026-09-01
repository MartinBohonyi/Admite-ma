const params = new URLSearchParams(window.location.search);
const exam = params.get("exam");

fetch(`${exam}/exam.json`)
    .then(response => response.json())
    .then(async data => {

        document.querySelector(".exam-title").textContent =
            data.examTitle;

        const questionsList =
            document.querySelector(".questions-list");


        // ==========================================
        // GENERĂM TOATE ÎNTREBĂRILE
        // ==========================================

        data.questions.forEach(questionData => {

            const questionCard =
                document.createElement("div");

            questionCard.classList.add("question-card");

            questionCard.dataset.category =
                questionData.category;

            if (questionData.context) {

                const context = document.createElement("div");

                context.classList.add("question-context");

                context.innerHTML = questionData.context;

                questionCard.appendChild(context);
            }

            const questionHeader =
                document.createElement("div");

            questionHeader.classList.add("question-header");


            const questionNumber =
                document.createElement("div");

            questionNumber.classList.add("question-number");

            questionNumber.textContent =
                questionData.questionNumber;


            const questionText =
                document.createElement("p");

            questionText.classList.add("question-text");

            questionText.innerHTML =
                questionData.question;


            questionHeader.appendChild(questionNumber);
            questionHeader.appendChild(questionText);

            questionCard.appendChild(questionHeader);


            const divider =
                document.createElement("div");

            divider.classList.add("question-divider");

            questionCard.appendChild(divider);


            const answers =
                document.createElement("div");

            answers.classList.add("answers");


            questionData.answers.forEach(answerData => {

                

                const answerOption =
                    document.createElement("div");

                answerOption.classList.add("answer-option");

                answerOption.dataset.answer =
                    answerData.answer;


                const answerLetter =
                    document.createElement("div");

                answerLetter.classList.add("answer-letter");

                answerLetter.textContent =
                    answerData.answer;


                const answerText =
                    document.createElement("p");

                answerText.classList.add("answer-text");

                answerText.innerHTML =
                    answerData.text;


                answerOption.appendChild(answerLetter);
                answerOption.appendChild(answerText);
                if (answerData.image) {

                    const answerImage =
                        document.createElement("img");

                    answerImage.classList.add("answer-image");

                    answerImage.src =
                        answerData.image;

                    answerOption.appendChild(answerImage);
                }

                answers.appendChild(answerOption);

            });


            questionCard.appendChild(answers);

            questionsList.appendChild(questionCard);

        });


        // ==========================================
        // AȘTEPTĂM CA MATHJAX SĂ TERMINE
        // ==========================================

        while (
            typeof MathJax === "undefined" ||
            typeof MathJax.typesetPromise !== "function"
        ) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        const elementsToTypeset = [
            ...document.querySelectorAll(".question-card"),
        ];

        await MathJax.typesetPromise(elementsToTypeset);

        initExam(data);


    });