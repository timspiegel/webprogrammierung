document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const pageStart = document.getElementById("page-start");
    const pageList = document.getElementById("page-list");
    const pageDetails = document.getElementById("page-details");
    const pageComments = document.getElementById("page-comments");
    const userList = document.getElementById("userList");
    const tryAgainLink = document.getElementById("tryAgainLink");
    const backToSearchLink = document.getElementById("backToSearchLink");
    const backToDetailsLink = document.getElementById("backToDetailsLink");
    const commentsLink = document.getElementById("commentsLink");
    const commentList = document.getElementById("commentList");

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== "") {
            fetchDataAndDisplayResults(searchTerm);
        } else {
            alert("Bitte geben Sie einen Suchbegriff ein.");
        }
    });

    function fetchDataAndDisplayResults(searchTerm) {
        // Daten vom JSON-Endpunkt abrufen
        fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Ergebnisse löschen, falls bereits vorhanden
                userList.innerHTML = "";

                if (data.users.length > 0) {
                    // Anzeige der Suchergebnisse
                    data.users.forEach(user => {
                        const userLink = document.createElement("a");
                        userLink.href = `#${user.id}`;
                        userLink.textContent = `${user.username} (${user.firstName} ${user.lastName})`;
                        userLink.addEventListener("click", function (event) {
                            event.preventDefault();
                            showUserPage(user);
                        });

                        const userContainer = document.createElement("div");
                        userContainer.classList.add("user-container");
                        userContainer.appendChild(userLink);

                        userList.appendChild(userContainer);
                    });

                    // Zeige die Übersichtsseite an
                    showListPage();
                } else {
                    // Keine Ergebnisse gefunden
                    showNoResultsPage();
                }
            })
            .catch(error => {
                console.error('Fehler beim Abrufen der Daten:', error);
            });
    }

    function showListPage() {
        pageStart.style.display = "none";
        pageList.style.display = "block";
        pageDetails.style.display = "none";
        pageComments.style.display = "none";
    }

    function showNoResultsPage() {
        pageStart.style.display = "none";
        pageList.style.display = "none";
        pageDetails.style.display = "none";
        pageComments.style.display = "none"; 
        document.getElementById("NoResult").style.display = "block";
    }

    function showUserPage(user) {
        const userName = document.getElementById("userTitle");
        const userPassword = document.getElementById("userPassword");
        const userFirstName = document.getElementById("userFirstName");
        const userLastName = document.getElementById("userLastName");
        const userAge = document.getElementById("userAge");
        const userGender = document.getElementById("userGender");
        const useremail = document.getElementById("useremail");
        const userPhone = document.getElementById("userPhone");

        userName.textContent = user.username;
        userPassword.textContent = user.password;
        userFirstName.textContent = user.firstName;
        userLastName.textContent = user.lastName;
        userAge.textContent = user.age;
        userGender.textContent = user.gender;
        useremail.textContent = user.email;
        userPhone.textContent = user.phone;

        commentsLink.addEventListener("click", function () {
            showCommentsPage(user.id);
        });

        pageStart.style.display = "none";
        pageList.style.display = "none";
        pageDetails.style.display = "block";
        pageComments.style.display = "none"; 
    }

    function showCommentsPage(userId) {
        pageStart.style.display = "none";
        pageList.style.display = "none";
        pageDetails.style.display = "none";
        pageComments.style.display = "block";
        commentList.innerHTML = "";

        fetch(`https://dummyjson.com/posts/user/${userId}`)

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.posts.length > 0) {
                    // Kommentare in die Liste einfügen
                    data.posts.forEach(post => {
                        const commentItem = document.createElement("li");
                        commentItem.textContent = post.title;
                        commentList.appendChild(commentItem);
                    });
                } else {
                    // Wenn keine Kommentare gefunden wurden
                    const noComments = document.createElement("p");
                    noComments.textContent = "Es gibt keine Kommentare für diesen Benutzer.";
                    commentList.appendChild(noComments);
                }
            })
            .catch(error => {
                console.error('Fehler beim Abrufen der Kommentare:', error);
            });
    
        function showCommentsPage(userId) {
        pageStart.style.display = "none";
        pageList.style.display = "none";
        pageDetails.style.display = "none";
        pageComments.style.display = "block";
        commentList.innerHTML = "";

        }

    }  
});