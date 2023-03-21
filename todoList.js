let myIIFE = (function () {
    let totalTask = document.getElementById("totalTask");
    let completed = document.getElementById("completed");
    let remaining = document.getElementById("notCompleted");
    let add = document.getElementById("add-btn");
    let input = document.getElementById("input");
    let listContainer = document.querySelector(".list-container");
    let lists = [];
    let totalCount = 0;
    let compCount = 0;
    let remCount = 0;

    //adding placeholder to input text box
    input.setAttribute("placeholder", "Add someThing to your todo list");
    setTimeout(() => {
        input.removeAttribute("placeholder");
    }, 7000)

    function notify(msg) {
        alert(msg);
    }

    function addList(list) {
        lists.push(list);
        totalCount++;
        remCount++;
        totalTask.innerHTML = `Total ${totalCount}`;
        remaining.innerHTML = `Remaining ${remCount}`;
        listContainer.innerHTML +=
            `<li id="list" data-id="${list.id}">
    <input type="radio" data-id="${list.id}" id="radio" class="radio">
    <label id="title">${list.title}</label>
    <img src="trash-solid.svg" class="delete" data-id="${list.id}">
    <p id="add-to-complete" data-id="${list.id}" class="completeList">added to complete list</p>
    <p id="remove-from-complete" data-id="${list.id}" class="completeList">removed from complete list</p>
</li>`

        function animation() {

            let tar = document.getElementById("added");
            let leftOffset = tar.offsetLeft;
            let count = 2;

            tar.style.opacity = '1';
            tar.style.zIndex = '0';
            let move = setInterval(() => {
                tar.style.left = tar.offsetLeft - count + "px";
                count++;
                console.log(count);
                if (count > 15) {
                    clearInterval(move);
                }
            }, 30)
            setTimeout(() => {
                tar.style.opacity = '0';
                tar.style.left = leftOffset + 'px';
                tar.style.zIndex = '-1';
            }, 1300);



        }
        animation();
    }
    //adding evenlistener on add btn
    add.addEventListener("click", addHandler);

    function addHandler() {
        const text = input.value;
        if (text != '') {
            const obj = {
                title: text,
                id: Date.now().toString(),
                completed: false
            }
            input.value = '';
            addList(obj);
        } else {
            notify("please enter you subject")
        }
    }

    //toogle functionality
    function toggleChecked(e, listId) {
        const newlist = lists.filter(function (list) {
            return list.id == listId;

        });
        if (newlist.length > 0) {
            newlist[0].completed = !newlist[0].completed;
        }
        e.preventDefault();
        let tar = document.querySelector(`[data-id="${listId}"]`).children[0];
        tar.toggleAttribute("abc");
        completeOrNon(tar, listId);
    }

    function completeOrNon(tar, listId) {
        if (tar.hasAttribute("abc")) {
            let count = 0;
            let interval = setInterval(() => {
                let myTar = document.querySelector(`[data-id="${listId}"]`).children[3];
                myTar.style.zIndex = 1;
                count++;
                if (count > 3) {
                    clearInterval(interval);
                    myTar.style.zIndex = '-1';
                }
            }, 500);
            document.querySelector(`[data-id="${listId}"]`).style.backgroundColor = "#ffc8dd";
            compCount++;
            remCount = totalCount - compCount;
            completed.innerHTML = `Completed ${compCount}`;
            remaining.innerHTML = `Remaining ${remCount}`;

        } else {
            let count = 0;
            let interval = setInterval(() => {
                let myTar = document.querySelector(`[data-id="${listId}"]`).children[4];
                myTar.style.zIndex = 1;
                count++;
                if (count > 3) {
                    clearInterval(interval);
                    myTar.style.zIndex = '-1';
                }
            }, 500);
            document.querySelector(`[data-id="${listId}"]`).style.backgroundColor = "";
            compCount--;
            remCount = totalCount - compCount;
            completed.innerHTML = `Completed ${compCount}`;
            remaining.innerHTML = `Remaining ${remCount}`;
        }
    }
    //eventlistener on document for event delegation
    document.addEventListener("click", (e) => {

        let target = e.target;
        if (target.className == 'radio') {
            let listId = target.dataset.id;
            console.log(listId);
            toggleChecked(e, listId);
        } else if (target.className == 'delete') {
            let listId = target.dataset.id;
            deletion(listId);
        }

    });


    //function to delete list from todo
    function deletion(listId) {
        const newlists = lists.filter((list) => {
            list.id != listId;
        });
        lists = newlists;
        let tar = document.querySelector(`[data-id="${listId}"]`);
        notify("Sure, you want to remove your task");
        tar.style.display = "none";
        let delTarget = document.getElementById("delete");
        setTimeout(() => {
            delTarget.style.trasition = `all 1s`;
            delTarget.style.zIndex = '1';
            delTarget.style.transform = `scale(1.5)`;
        }, 300);

        setTimeout(() => {
            delTarget.style.zIndex = '-1';
        }, 1000)
        if (tar.children[0].hasAttribute("abc")) {
            compCount--;
            completed.innerHTML = `Completed ${compCount}`;
        } else {
            remCount--;
            remaining.innerHTML = `Remaining ${remCount}`;
        }
        totalCount--;
        totalTask.innerHTML = `Total ${totalCount}`;


    }
})();