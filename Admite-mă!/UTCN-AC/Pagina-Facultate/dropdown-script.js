                    const header = document.getElementById("header");

                    function setupDropdown(toggle, list, firstElement, storageKey) {

                        if (sessionStorage.getItem(storageKey) === "true") {
                            list.classList.add("open");
                            toggle.classList.add("open");
                        }

                        toggle.addEventListener("click", function() {

                            const isOpening = !list.classList.contains("open");

                            if (isOpening) {

                                list.classList.add("open");
                                toggle.classList.add("open");

                                sessionStorage.setItem(storageKey, "true");

                                setTimeout(() => {
                                    firstElement.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start"
                                    });
                                }, 50);

                            } else {

                                list.classList.remove("open");
                                toggle.classList.remove("open");

                                sessionStorage.setItem(storageKey, "false");

                                header.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });

                            }

                        });
                    }

                    const examsToggle = document.getElementById("examsToggle");
                    const examsList = document.getElementById("examsList");
                    const firstExam = document.getElementById("firstExam");

                    const grileToggle = document.getElementById("grileToggle");
                    const grileList = document.getElementById("grileList");
                    const firstGrila = document.getElementById("firstGrila");

                    setupDropdown(
                        examsToggle,
                        examsList,
                        firstExam,
                        "examsOpen"
                    );

                    setupDropdown(
                        grileToggle,
                        grileList,
                        firstGrila,
                        "grileOpen"
                    );