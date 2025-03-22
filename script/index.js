function api1data() {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then(info => dianamicbutton(info.data))

}

function dianamicbutton(values) {
    const btndianamically = document.getElementById('btn-dianamically')
    values.forEach(element => {
        const newbtn = document.createElement('div')
        newbtn.innerHTML = `  <button id="btn-${element.level_no}" onclick="lessoninfoapi2(${element.level_no})" class="border-2 border-blue-800 py-2 px-4 flex items-center justify-center rounded-md gap-2 font-semibold text-blue-800 hover:bg-blue-400 hover:text-white">
        <img class="h-4 " src="assets/fa-book-open.png" alt=""> Lesson-${element.level_no}</button>
            
        `
        btndianamically.appendChild(newbtn)
        // console.log(element.level_no)
    });

}

function lessoninfoapi2(id) {
    showloader()
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then((res) => res.json())
        .then(info => {
            removeactiveclass();
            const btnactive = document.getElementById(`btn-${id}`);
            btnactive.classList.add("active")
            // console.log(btnactive);
            displaylessoninfo(info.data)
        });


}

function displaylessoninfo(lessondata) {


    const lessoncard = document.getElementById('lessoncard')

    lessoncard.classList.remove(...lessoncard.classList);

    lessoncard.innerHTML = "";

    if (lessondata.length === 0) {

        lessoncard.innerHTML = `
        <div class="flex flex-col justify-center items-center w-full">
         <div  class="w-full card-section bg-gray-100 py-10 rounded-md flex flex-col justify-center items-center ">
            <div>
                 <img src="assets/alert-error.png" alt="">
            </div>
            <h1 class="text-center pt-5 pb-3 text-xl "> এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
            <h1 class="text-3xl text-center  pb-5"> নেক্সট Lesson এ যান । </h1>
        </div>
        </div>
       

        `
        removeloader();
        return;
    }

    lessoncard.classList.add('grid', 'grid-cols-3', 'gap-8', 'p-8', 'bg-gray-100', 'rounded-md');


    for (let i of lessondata) {
        const newelement = document.createElement("div");


        newelement.innerHTML = `
        <div class="bg-white shadow-sm rounded-md py-2 px-2">                              
            <div class="flex flex-col justify-center items-center py-8 gap-2   bg-white hover:bg-blue-50 shadow-sm rounded-md border-1 border-gray-50 m-2 ">
                <p class="font-bold text-xl">${i.word}</p>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <p class="font-bold text-xl text-[#18181B90]">${i.meaning ? i.meaning : "অর্থ নেই"} / ${i.pronunciation}</p>
                <div class="flex  gap-56 pt-4">
                    <div onclick="wordinfoapi3(${i.id})" class="p-3 bg-gray-200 rounded-md ">
                        <img class="h-4 w-4" src="assets/info.png" alt="">
                    </div>
                    <div class="p-3 bg-gray-200 rounded-md">
                        <img class="h-4 w-4" src="assets/sound small.png" alt="">

                    </div>
                </div>
            </div>
            
        </div>


`
        lessoncard.appendChild(newelement);

    }

    removeloader()


}

function wordinfoapi3(wordid) {
    console.log(wordid)
    fetch(`https://openapi.programming-hero.com/api/word/${wordid}`)
        .then(res => res.json())
        .then(wordinfo => showmodalwordinfo(wordinfo.data));
    // console.log(wordinfo.data)

}

function showmodalwordinfo(wordinfo) {
    console.log(wordinfo)
    const modalelement = document.getElementById("flashcard_modal").showModal()

    const wordname = document.getElementById("wordname")
    wordname.innerHTML = ` ${wordinfo.word} `;

    const Pronounciation1 = document.getElementById("Pronounciation1")
    Pronounciation1.innerHTML = ` ${wordinfo.pronunciation} `;

    const wordmeaning = document.getElementById("wordmeaning")
    wordmeaning.innerHTML = ` ${wordinfo.meaning ? wordinfo.meaning : "অর্থ নেই"} `;

    const wordexample = document.getElementById("wordexample")
    wordexample.innerHTML = ` ${wordinfo.sentence} `;

    const synoname = document.getElementById("synoname");

    const lengthofsynoname = wordinfo.synonyms.length
    // console.log(lengthofsynoname)

    synoname.innerHTML = ""

    if (lengthofsynoname > 0) {
        for (let j of wordinfo.synonyms) {
            // console.log(j)
            const newvalue = document.createElement("span")
            newvalue.innerHTML = ` <span class="bg-gray-200 rounded-md px-3 py-2  text-sm font-semibold">${j}</span> `;
            synoname.appendChild(newvalue);
        }
    }
    else {
        synoname.innerHTML = "";
    }


}


function removeactiveclass() {
    const btnallactive = document.getElementsByClassName("active");
    for (let b of btnallactive) {
        b.classList.remove("active")
    }
}

function showloader() {
    document.getElementById("loader").classList.remove("hidden")
    document.getElementById("lessoncard").classList.add("hidden")

}
function removeloader() {
    document.getElementById("loader").classList.add("hidden")
    document.getElementById("lessoncard").classList.remove("hidden")
}

api1data();

// making the login or get started portion
document.getElementById("btn-login").addEventListener("click", function () {
    let name = document.getElementById("name").value.trim();
    let password = document.getElementById("pass").value.trim();
    //    console.log(password.value)
    if (name === "") {
        // alert("Please enter your name!");
        swal("Please enter your name!");

        return;
    }
    if (password !== "123456") {
        // alert("Incorrect password! Try again.");
        swal("Incorrect password! Try again . ");
        return;
    }
    // alert("Login Successful!");
    // alert(`Welcome, ${name}!`)
    swal(`Welcome, ${name}!`, " Let's Learn English ", "success");

    document.getElementById("navsection").classList.remove("hidden")
    document.getElementById("banner").classList.add("hidden")
    document.getElementById("Vocabularies-section").classList.remove("hidden")
    document.getElementById("faq-section").classList.remove("hidden")

})

function logout() {
    document.getElementById("navsection").classList.add("hidden")
    document.getElementById("banner").classList.remove("hidden")
    document.getElementById("Vocabularies-section").classList.add("hidden")
    document.getElementById("faq-section").classList.add("hidden")
}

// smooth scrolling in faq learn button to section 
// document.getElementById("faq-btn").addEventListener("click", function () {
//     document.getElementById("faq-section").scrollIntoView({ behavior: "smooth" });
// });

// document.getElementById("learn-btn").addEventListener("click", function () {
//     document.getElementById("Vocabularies-section").scrollIntoView({ behavior: "smooth" });
//     document.getElementById("Vocabularies-section").classList.add('mt-56')
// });





// smooth scrolling in faq learn button to section 


    function slowSmoothScroll(targetId, duration, offset = 80) { // offset = navbar height in px
        const target = document.getElementById(targetId);

        // Calculate the position minus the navbar height (offset)
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;

            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // FAQ button click event
    document.getElementById("faq-btn").addEventListener("click", function () {
        slowSmoothScroll("faq-section", 1300, 80); // 80px offset for navbar
    });

    // Learn button click event
    document.getElementById("learn-btn").addEventListener("click", function () {
        slowSmoothScroll("Vocabularies-section", 1300, 80); // 80px offset for navbar
    });


