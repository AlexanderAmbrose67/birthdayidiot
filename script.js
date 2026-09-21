/* =========================================================
   BIRTHDAY EMBER
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const opening = document.getElementById("opening");
const poem = document.getElementById("poem");
const emberButton = document.getElementById("emberButton");
const beginButton = document.getElementById("beginButton");
const ashField = document.getElementById("ashField");
const friendButton = document.getElementById("friendButton");
const friendResponse = document.getElementById("friendResponse");


/* =========================================================
   ASH PARTICLES
   ========================================================= */

function createAsh() {

    const amount =
        window.innerWidth < 600
            ? 28
            : 45;

    for (let i = 0; i < amount; i++) {

        const ash = document.createElement("div");

        ash.className = "ash";

        const size =
            Math.random() * 2 + 1;

        const left =
            Math.random() * 100;

        const duration =
            Math.random() * 14 + 12;

        const delay =
            Math.random() * -20;

        const drift =
            (Math.random() * 160 - 80) + "px";

        ash.style.width = `${size}px`;
        ash.style.height = `${size}px`;

        ash.style.left = `${left}%`;

        ash.style.animationDuration =
            `${duration}s`;

        ash.style.animationDelay =
            `${delay}s`;

        ash.style.setProperty(
            "--drift",
            drift
        );

        ashField.appendChild(ash);
    }
}

createAsh();


/* =========================================================
   START EXPERIENCE
   ========================================================= */

let started = false;

function startExperience() {

    if (started) return;

    started = true;

    document.body.classList.add("awake");

    opening.classList.add("leaving");

    setTimeout(() => {

        opening.style.display = "none";

        poem.classList.add("visible");

        document.body.classList.add("poem-active");

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });

    }, 1100);
}


beginButton.addEventListener(
    "click",
    startExperience
);


emberButton.addEventListener(
    "click",
    startExperience
);


emberButton.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();

            startExperience();
        }

    }
);


/* =========================================================
   STANZA REVEAL
   ========================================================= */

const stanzas =
    document.querySelectorAll(".stanza");


const stanzaObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px"
        }
    );


stanzas.forEach(
    stanza => stanzaObserver.observe(stanza)
);


/* =========================================================
   SCROLL-BASED EMBER ATMOSPHERE
   ========================================================= */

let ticking = false;

function updateScrollAtmosphere() {

    if (!started) return;

    const scrollTop =
        window.scrollY;

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (maxScroll <= 0) return;

    const progress =
        Math.min(
            1,
            Math.max(
                0,
                scrollTop / maxScroll
            )
        );


    /*
        The further through the poem she gets,
        the warmer the background becomes.
    */

    const warmth =
        progress * 0.075;

    document.documentElement.style.setProperty(
        "--scroll-warmth",
        warmth
    );


    /*
        A very subtle increase in the page's
        atmospheric glow.
    */

    const glow =
        0.02 + progress * 0.13;

    document.querySelector(
        ".glow"
    ).style.opacity = glow;


    ticking = false;
}


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateScrollAtmosphere
            );

            ticking = true;
        }

    },
    {
        passive: true
    }
);


/* =========================================================
   FRIEND JOKE
   ========================================================= */

let friendClicks = 0;

const responses = [
    "Correct. Obviously.",
    "Yeah. That's why I made you a website.",
    "Absolutely. Completely normal behaviour.",
    "We're definitely not friends.",
    "This is getting suspicious.",
    "Stop clicking the button.",
    "You are, unfortunately, still not my friend.",
    "Fine. Happy birthday."
];


friendButton.addEventListener(
    "click",
    () => {

        friendClicks++;

        const index =
            Math.min(
                friendClicks - 1,
                responses.length - 1
            );

        friendResponse.textContent =
            responses[index];

        friendResponse.classList.remove(
            "show"
        );

        /*
            Force the browser to recognize
            the animation restarting.
        */

        void friendResponse.offsetWidth;

        friendResponse.classList.add(
            "show"
        );


        /*
            After enough clicks, change the
            button text.
        */

        if (friendClicks === 4) {

            friendButton.textContent =
                "okay fine, one more time";

        }

        if (friendClicks >= 7) {

            friendButton.textContent =
                "happy birthday, menace";

        }

    }
);


/* =========================================================
   RANDOMIZED EMBER MOVEMENT
   ========================================================= */

const openingEmber =
    document.querySelector(".ember");

const finalEmber =
    document.querySelector(".final-ember-core");

const endingEmber =
    document.querySelector(".ending-core");


function addTinyVariation(element) {

    if (!element) return;

    const rotation =
        43 + Math.random() * 4;

    const duration =
        1.8 + Math.random() * 1.5;

    element.style.animationDuration =
        `${duration}s`;

    element.style.transform =
        `rotate(${rotation}deg)`;
}


setInterval(() => {

    addTinyVariation(openingEmber);
    addTinyVariation(finalEmber);
    addTinyVariation(endingEmber);

}, 2500);


/* =========================================================
   KEEP MOBILE HEIGHT CORRECT
   ========================================================= */

function updateViewportHeight() {

    document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
    );
}

updateViewportHeight();

window.addEventListener(
    "resize",
    updateViewportHeight
);


/* =========================================================
   PREVENT ACCIDENTAL DOUBLE-TAP ZOOM
   ON THE INTERACTIVE EMBER
   ========================================================= */

emberButton.addEventListener(
    "touchend",
    (event) => {

        event.preventDefault();

        startExperience();

    },
    {
        passive: false
    }
);