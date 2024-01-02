(
    () => {
        const documentElment = document.documentElement

        const toggleButton = document.querySelector("button.toggle")
        const searchInput = document.querySelector(".search input")
        const searchSubmit = document.querySelector(".search .submit")

        const allSew = document.querySelectorAll(".sew a")
        const sewUl = document.querySelector(".sew ul")

        let selectedSew = []

        function visibility() { // Control search engines and websites (sew) section visibility
            function toggle() {
                if (documentElment.dataset.sewVisibility !== "visible") {
                    documentElment.dataset.sewVisibility = "visible"
                    documentElment.classList.add("hidden-overflow")
                    toggleButton.ariaExpanded = true // Just for a11y
                    localStorage.setItem("sewVisibility", "visible")
                } else {
                    delete documentElment.dataset.sewVisibility
                    documentElment.classList.remove("hidden-overflow")
                    toggleButton.ariaExpanded = false // Just for a11y
                    localStorage.setItem("sewVisibility", "hidden")
                }

                documentElment.scrollTo({
                    top: 0
                })
            }

            function toggleOntoggleButtonClick() {
                toggleButton.addEventListener("click", toggle)
            }

            function hideOnEscapeKeyup() {
                window.addEventListener(
                    "keyup",
                    (e) => {
                        if (localStorage.getItem("sewVisibility") === "visible" && e.key === "Escape") {
                            toggle()
                        }
                    }
                )
            }

            function restore() {
                if (localStorage.getItem("sewVisibility") === "visible") {
                    toggle()
                }
            }

            toggleOntoggleButtonClick()
            hideOnEscapeKeyup()
            restore()
        }

        function manage() { // Manage search engines and websites (select, unselect, ...)
            function selectOrUnselect() {
                allSew.forEach(
                    (element, index) => {
                        element.addEventListener(
                            "click",
                            (e) => {
                                e.preventDefault()

                                if (element.dataset.selected === undefined) {
                                    element.dataset.selected = true
                                    selectedSew.push(index)
                                    toggleButton.childElementCount !== 2 ? toggleButton.insertAdjacentHTML("afterbegin", allSew[selectedSew.at(-1)].innerHTML) : toggleButton.firstElementChild.outerHTML = allSew[selectedSew.at(-1)].innerHTML
                                } else {
                                    delete element.dataset.selected
                                    selectedSew = selectedSew.filter(all => all !== index)
                                    selectedSew.length !== 0 ? toggleButton.firstElementChild.outerHTML = allSew[selectedSew.at(-1)].innerHTML : toggleButton.firstElementChild.remove()
                                }

                                selectedSew.length !== 0 ? toggleButton.dataset.selectedSewElementsLength = selectedSew.length : delete toggleButton.dataset.selectedSewElementsLength

                                localStorage.setItem("selectedSew", JSON.stringify(selectedSew))
                            }
                        )
                    }
                )
            }

            function restore() {
                if (localStorage.getItem("selectedSew") !== null && localStorage.getItem("selectedSew").length !== 0) {
                    JSON.parse(localStorage.getItem("selectedSew")).forEach(index => allSew[index].click())
                }
            }

            selectOrUnselect()
            restore()
        }

        function search() { // Search in selected search engine(s) and/or website(s)
            function searchOnSubmitClick() {
                searchSubmit.addEventListener(
                    "click",
                    (e) => {
                        e.preventDefault()

                        if (selectedSew.length !== 0) {
                            selectedSew.forEach(
                                index => {
                                    if (searchInput.value.trim().length !== 0) {
                                        window.open(
                                            `${allSew[index].href}${allSew[index].dataset.search}${searchInput.value}`,
                                            "_blank",
                                            "noopener, noreferrer"
                                        )
                                    } else {
                                        searchInput.focus()
                                    }
                                }
                            )
                        } else {
                            if (new RegExp("^\\S+[.]\\S{2,}$", "i").test(searchInput.value) === true) {
                                window.open(
                                    searchInput.value.match(new RegExp("https?:\/\/")) === null ? `http://${searchInput.value}` : searchInput.value,
                                    "_blank",
                                    "noopener, noreferrer"
                                )
                            } else {
                                if (localStorage.getItem("sewVisibility") !== "visible") {
                                    toggleButton.classList.add("shake")
                                    toggleButton.addEventListener("animationend", () => toggleButton.classList.remove("shake"))
                                } else {
                                    sewUl.classList.add("shake")
                                    sewUl.addEventListener("animationend", () => sewUl.classList.remove("shake"))
                                }
                            }
                        }
                    }
                )
            }

            function searchOnEnterKeyup() {
                searchInput.addEventListener(
                    "keyup",
                    (e) => {
                        if (e.which === 13) {
                            searchSubmit.click()
                        }
                    }
                )
            }

            searchOnSubmitClick()
            searchOnEnterKeyup()
        }

        visibility()
        manage()
        search()
    }
)()