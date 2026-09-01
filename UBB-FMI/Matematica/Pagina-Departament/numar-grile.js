const examene = [
    "../Examene/Admitere-2026(iulie)/exam.json",
    "../Examene/Concurs-2026/exam.json",
    "../Examene/Admitere-2025(septembrie)/exam.json",
    "../Examene/Admitere-2025(iulie)/exam.json",
    "../Examene/Concurs-2025/exam.json",
    "../Examene/Admitere-2024(septembrie)/exam.json",
    "../Examene/Admitere-2024(iulie)/exam.json",
    "../Examene/Concurs-2024/exam.json",
    "../Examene/Admitere-2023(septembrie)/exam.json",
    "../Examene/Admitere-2023(iulie)/exam.json",
    "../Examene/Concurs-2023/exam.json",
    "../Examene/Admitere-2022(septembrie)/exam.json",
    "../Examene/Admitere-2022(septembrie)/exam.json",
    "../Examene/Concurs-2022/exam.json",
    "../Examene/Admitere-2021(septembrie)/exam.json",
    "../Examene/Admitere-2021(septembrie)/exam.json",
    "../Examene/Concurs-2021/exam.json",
];

/// "../Examene/Admitere-2022(septembrie)/exam.json",
/// "../Examene/Admitere-2022(iulie)/exam.json",
/// "../Examene/Concurs-2022/exam.json",


Promise.all(

    examene.map(url =>
        fetch(url).then(response => {

            if (!response.ok) {
                throw new Error(
                    `Nu s-a putut încărca ${url}`
                );
            }

            return response.json();

        })
    )

)

.then(exameneData => {

    const counts = {};


    // ==========================================
    // NUMĂRĂM GRILELE DIN TOATE EXAMENELE
    // ==========================================

    exameneData.forEach(examen => {

        examen.questions.forEach(question => {

            const category = question.category;

            if (!category) {
                return;
            }

            counts[category] =
                (counts[category] || 0) + 1;

        });

    });


    // ==========================================
    // AFIȘĂM NUMĂRUL PE CAPITOLE
    // ==========================================

    const chapters =
        document.querySelectorAll(
            ".exam-info[data-category]"
        );


    chapters.forEach(chapter => {

        const category =
            chapter.dataset.category;

        const count =
            counts[category] || 0;

        const questionCount =
            chapter.querySelector("p");


        if (questionCount) {

            questionCount.textContent =
                `${count} de grile disponibile`;

        }

    });

})

.catch(error => {

    console.error(
        "EROARE LA NUMĂRAREA GRILELOR:",
        error
    );

});