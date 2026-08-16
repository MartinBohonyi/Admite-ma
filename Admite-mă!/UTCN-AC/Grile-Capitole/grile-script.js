const examene = [
    {
        exam: "../../Examene/Admitere-2026/exam.html",
        barem: "../../Examene/Admitere-2026/barem.js"
    },
    {
        exam: "../../Examene/Admitere-2025/exam.html",
        barem: "../../Examene/Admitere-2025/barem.js"
    },
    {
        exam: "../../Examene/Admitere-2024/exam.html",
        barem: "../../Examene/Admitere-2024/barem.js"
    },
    {
        exam: "../../Examene/Admitere-2023/exam.html",
        barem: "../../Examene/Admitere-2023/barem.js"
    },
    {
        exam: "../../Examene/Admitere-2022/exam.html",
        barem: "../../Examene/Admitere-2022/barem.js"
    },
    {
        exam: "../../Examene/Admitere-2021/exam.html",
        barem: "../../Examene/Admitere-2021/barem.js"   
    },
    {
        exam: "../../Examene/Admitere-2019/exam.html",
        barem: "../../Examene/Admitere-2019/barem.js"
    },
    {
        exam: "../../Examene/Admitere-2018/exam.html",
        barem: "../../Examene/Admitere-2018/barem.js"
    },
    {
        exam: "../../Examene/Admitere-2017/exam.html",
        barem: "../../Examene/Admitere-2017/barem.js"
    },
    {
        exam: "../../Examene/Simulare-2026/exam.html",
        barem: "../../Examene/Simulare-2026/barem.js"
    },
    {
        exam: "../../Examene/Simulare-2025/exam.html",
        barem: "../../Examene/Simulare-2025/barem.js"
    },
    {
        exam: "../../Examene/Simulare-2024/exam.html",
        barem: "../../Examene/Simulare-2024/barem.js"
    },
    {
        exam: "../../Examene/Simulare-2023/exam.html",
        barem: "../../Examene/Simulare-2023/barem.js"
    },
    {
        exam: "../../Examene/Simulare-2022/exam.html",
        barem: "../../Examene/Simulare-2022/barem.js"
    },
    {
        exam: "../../Examene/Simulare-2021/exam.html",
        barem: "../../Examene/Simulare-2021/barem.js"
    },
    {
        exam: "../../Examene/Simulare-2019/exam.html",
        barem: "../../Examene/Simulare-2019/barem.js"
    },
    {
        exam: "../../Examene/Simulare-2018/exam.html",
        barem: "../../Examene/Simulare-2018/barem.js"
    },
    {
        exam: "../../Examene/Simulare-2017/exam.html",
        barem: "../../Examene/Simulare-2017/barem.js"
    },
];

Promise.all(

    examene.map(async examen => {

        const examResponse = await fetch(examen.exam);
        const examHtml = await examResponse.text();

        const baremResponse = await fetch(examen.barem);
        const baremText = await baremResponse.text();

        return {
            examHtml: examHtml,
            baremText: baremText
        };

    })

)

.then(exameneData => {
        const analysisQuestions = [];

        exameneData.forEach(examenData => {

            const parser = new DOMParser();

            const examDocument =
                parser.parseFromString(examenData.examHtml, "text/html");

            const category = document.body.dataset.category;

            const questions =
                examDocument.querySelectorAll(
                    `.question-card[data-category="${category}"]`
                );

            const examTitle =
                examDocument.querySelector(".exam-title");

            const barem = [
                ...examenData.baremText.matchAll(/["']([A-E])["']/g)
            ].map(match => match[1]);

            questions.forEach(question => {

                const questionNumber = Number(
                    question
                        .querySelector(".question-number")
                        .textContent
                        .trim()
                );

                analysisQuestions.push({
                    question: question,
                    source: examTitle.textContent.trim(),
                    correctAnswer: barem[questionNumber - 1]
                });

            });

        });

        let currentQuestion = 0;

        function showQuestion(index) {

            questionsList.innerHTML = "";

            const questionData = analysisQuestions[index];

            const question = questionData.question;

            const group = question.closest(".question-group");

            const context = group?.querySelector(".question-context");

            const source = document.createElement("p");
            source.classList.add("question-source");

            source.textContent = questionData.source;

            const questionGroup = document.createElement("div");
            questionGroup.classList.add("question-group");

            if (context) {
                questionGroup.appendChild(context.cloneNode(true));
            }

            questionGroup.appendChild(question.cloneNode(true));

            questionsList.appendChild(source);

            questionsList.appendChild(questionGroup);
            
            questionsList.appendChild(questionGroup);

            const buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("question-buttons");

            const checkButton = document.createElement("button");
            checkButton.textContent = "Verifică răspunsul";
            checkButton.classList.add("check-button");

            checkButton.addEventListener("click", function () {

                const selectedAnswer = questionGroup.dataset.selected;

                if (!selectedAnswer) {
                    questionGroup.classList.add("unanswered");
                    return;
                }

                questionGroup.classList.remove("unanswered");

                const questionNumber = Number(
                    question.querySelector(".question-number").textContent.trim()
                );

                const correctAnswer = questionData.correctAnswer;

                const answerOptions =
                    questionGroup.querySelectorAll(".answer-option");

                answerOptions.forEach(option => {

                    const letter = option.querySelector(".answer-letter");

                    letter.classList.remove("correct");
                    letter.classList.remove("wrong");

                    if (
                        option.dataset.answer === correctAnswer
                    ) {

                        letter.classList.add("correct");

                    }

                    if (
                        option.dataset.answer === selectedAnswer &&
                        selectedAnswer !== correctAnswer
                    ) {

                        letter.classList.add("wrong");

                    }

                });

            });

            const skipButton = document.createElement("button");
            skipButton.textContent = "Următoarea grilă →";
            skipButton.classList.add("skip-button");

            buttonsContainer.appendChild(checkButton);
            buttonsContainer.appendChild(skipButton);

            questionsList.appendChild(buttonsContainer);
            skipButton.addEventListener("click", function() {

                currentQuestion++;

                if (currentQuestion < analysisQuestions.length) {
                    showQuestion(currentQuestion);
                }
                else{
                    currentQuestion = 0;
                    showQuestion(currentQuestion);
                }

            });

            const answerOptions = questionGroup.querySelectorAll(".answer-option");

            answerOptions.forEach(option => {

            option.addEventListener("click", () => {

            const letter = option.querySelector(".answer-letter");

            const wasSelected =
                questionGroup.dataset.selected === option.dataset.answer;

                answerOptions.forEach(opt => {

                    const l = opt.querySelector(".answer-letter");

                    l.classList.remove("selected");
                    l.classList.remove("correct");
                    l.classList.remove("wrong");

                });

                if (wasSelected) {

                    delete questionGroup.dataset.selected;

                } else {

                    letter.classList.add("selected");

                    questionGroup.dataset.selected =
                        option.dataset.answer;

                }

            });

        });
            
        MathJax.typesetPromise([questionGroup]);

    }

        showQuestion(currentQuestion);

    });