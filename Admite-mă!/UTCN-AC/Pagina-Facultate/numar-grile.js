                    const examene = [
                        "../Examene/Admitere-2026/exam.html",
                        "../Examene/Admitere-2025/exam.html",
                        "../Examene/Admitere-2024/exam.html",
                        "../Examene/Admitere-2023/exam.html",
                        "../Examene/Admitere-2022/exam.html",
                        "../Examene/Admitere-2021/exam.html",
                        "../Examene/Admitere-2019/exam.html",
                        "../Examene/Admitere-2018/exam.html",
                        "../Examene/Admitere-2017/exam.html",
                        "../Examene/Simulare-2026/exam.html",
                        "../Examene/Simulare-2025/exam.html",
                        "../Examene/Simulare-2024/exam.html",
                        "../Examene/Simulare-2023/exam.html",
                        "../Examene/Simulare-2022/exam.html",
                        "../Examene/Simulare-2021/exam.html",
                        "../Examene/Simulare-2019/exam.html",
                        "../Examene/Simulare-2018/exam.html",
                        "../Examene/Simulare-2017/exam.html"
                    ];

                    Promise.all(
                        examene.map(url =>
                            fetch(url).then(response => response.text())
                        )
                    )
                    .then(htmls => {

                        const counts = {};

                        htmls.forEach(html => {

                            const parser = new DOMParser();

                            const examDocument =
                                parser.parseFromString(html, "text/html");

                            const questions =
                                examDocument.querySelectorAll(".question-card");

                            questions.forEach(question => {

                                const category = question.dataset.category;

                                if (!category) {
                                    return;
                                }

                                counts[category] =
                                    (counts[category] || 0) + 1;

                            });

                        });

                        const chapters =
                            document.querySelectorAll(".exam-info[data-category]");

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

                    });