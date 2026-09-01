const barem = [
  "E", // 1
  "A", // 2
  "A", // 3
  "D", // 4
  "D", // 5
  "E", // 6
  "A", // 7
  "E", // 8
  "D", // 9
  "E", // 10
  "E", // 11
  "E", // 12
  "C", // 13
  "B", // 14
  "D", // 15
  "D", // 16
  "B", // 17
  "D", // 18
  "D", // 19
  "A", // 20
  "A", // 21
  "B", // 22
  "E", // 23
  "E", // 24
  "D", // 25
  "B", // 26
  "B", // 27
  "C", // 28
  "E", // 29
  "E"  // 30
];


const convertButton = document.querySelector("#convertButton");
const statusText = document.querySelector("#status");


convertButton.addEventListener("click", async () => {

    try {

        statusText.textContent = "Se convertește...";


        // Citim examenul HTML
        const examResponse = await fetch("exam.html");

        if (!examResponse.ok) {
            throw new Error("Nu am putut încărca exam.html");
        }

        const examHTML = await examResponse.text();


        // Transformăm HTML-ul într-un document
        const parser = new DOMParser();

        const examDocument = parser.parseFromString(
            examHTML,
            "text/html"
        );


        // Titlul examenului
        const examTitle =
            examDocument.querySelector(".exam-title")?.textContent.trim()
            || "Admitere UTCN";


        // Toate întrebările
        const questionCards =
            examDocument.querySelectorAll(".question-card");


        const questions = [];

        let groupCounter = 0;


        questionCards.forEach(card => {

            /*
             * Verificăm dacă întrebarea aparține
             * unui question-group
             */

            const group = card.closest(".question-group");


            let groupId = null;
            let context = null;


            if (group) {

                /*
                 * Fiecare question-group primește
                 * un ID unic.
                 */

                if (!group.dataset.groupId) {

                    groupCounter++;

                    group.dataset.groupId =
                        groupCounter;

                }

                groupId =
                    Number(group.dataset.groupId);


                const contextElement =
                    group.querySelector(".question-context");


                if (contextElement) {

                    context =
                        contextElement.innerHTML.trim();

                }

            }


            // Numărul întrebării
            const questionNumberElement =
                card.querySelector(".question-number");


            const questionNumber =
                Number(
                    questionNumberElement.textContent.trim()
                );


            // Categoria
            const category =
                card.dataset.category || null;


            // Textul întrebării
            const questionElement =
                card.querySelector(".question-text");


            const question =
                questionElement?.innerHTML.trim() || "";


            // Variantele de răspuns
            const answerOptions =
                card.querySelectorAll(".answer-option");


            const answers = [];


            answerOptions.forEach(option => {

                const answer =
                    option.dataset.answer;


                const answerText =
                    option.querySelector(".answer-text");


                answers.push({

                    answer: answer,

                    text:
                        answerText?.innerHTML.trim() || ""

                });

            });


            /*
             * Baremul este indexat de la 0,
             * iar numărul întrebării începe de la 1.
             */

            const correctAnswer =
                barem[questionNumber - 1];


            questions.push({

                questionNumber: questionNumber,

                category: category,

                groupId: groupId,

                context: context,

                question: question,

                answers: answers,

                correctAnswer: correctAnswer,

                points: 0.2

            });

        });


        // Construim JSON-ul final
        const examData = {

            examTitle: examTitle,

            type: "single-choice",

            questions: questions

        };


        // Transformăm obiectul în JSON
        const json =
            JSON.stringify(
                examData,
                null,
                4
            );


        // Descărcăm exam.json
        const blob =
            new Blob(
                [json],
                {
                    type: "application/json"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const download =
            document.createElement("a");


        download.href = url;

        download.download = "exam.json";

        download.click();


        URL.revokeObjectURL(url);


        statusText.textContent =
            `Succes! Au fost convertite ${questions.length} întrebări.`;

    }
    catch (error) {

        console.error(error);

        statusText.textContent =
            "A apărut o eroare: " + error.message;

    }

});