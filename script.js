(function () {
    'use strict';

    /* =========================
       MENU / BURGER
    ========================= */
    var burger = document.getElementById('burger');
    var menu = document.getElementById('menu');

    if (burger && menu) {
        burger.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('open');
            burger.setAttribute(
                'aria-expanded',
                String(isOpen)
            );
        });
        menu.addEventListener('click', function (e) {
            var link = e.target.closest('a');
            if (link) {
                menu.classList.remove('open');
                burger.setAttribute(
                    'aria-expanded',
                    'false'
                );
            }
        });
    }


    /* =========================
       ACTIVE NAVIGATION LINK
    ========================= */
    if (menu) {
        var links = Array.prototype.slice.call(
            menu.querySelectorAll('a')
        );
        var sections = document.querySelectorAll(
            'main section'
        );
        if (
            links.length > 0 &&
            sections.length > 0 &&
            'IntersectionObserver' in window
        ) {
            var observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) {
                            return;
                        }
                        var targetId =
                            '#' + entry.target.id;
                        links.forEach(function (link) {
                            link.classList.toggle(
                                'on',
                                link.getAttribute('href') === targetId
                            );
                        });
                    });
                },
                {
                    rootMargin: '-45% 0px -50% 0px',
                    threshold: 0
                }
            );
            sections.forEach(function (section) {
                if (section.id) {
                    observer.observe(section);
                }
            });
        }
    }


    /* =========================
       PROGRESS BAR + COUNTER
    ========================= */
    var counter = document.getElementById('count');
    if (counter) {
        var target = parseInt(
            counter.dataset.to,
            10
        );
        if (isNaN(target)) {
            target = 0;
        }
        var reduceMotion = false;
        if (window.matchMedia) {
            reduceMotion = window
                .matchMedia(
                    '(prefers-reduced-motion: reduce)'
                )
                .matches;
        }

        function runProgress() {
            /* Progress bar */
            var bars = document.querySelectorAll(
                '.bar i'
            );
            bars.forEach(function (bar) {
                var width = parseFloat(
                    bar.dataset.w
                );
                if (isNaN(width)) {
                    width = 0;
                }
                width = Math.max(
                    0,
                    Math.min(100, width)
                );
                bar.style.width = width + '%';
            });
            /* Reduced motion */
            if (reduceMotion) {
                counter.textContent = target;
                return;
            }

            /* Counter animation */
            var startTime = null;
            var duration = 1400;

            function animate(timestamp) {
                if (startTime === null) {
                    startTime = timestamp;
                }
                var progress =
                    (timestamp - startTime) /
                    duration;
                progress = Math.min(
                    progress,
                    1
                );
                /* Ease-out cubic */
                var eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );
                counter.textContent =
                    Math.round(
                        target * eased
                    );
                if (progress < 1) {
                    requestAnimationFrame(
                        animate
                    );
                }

            }
            requestAnimationFrame(
                animate
            );
        }
        /* Jalankan setelah halaman siap */
        setTimeout(
            runProgress,
            300
        );
    }

    /* =========================
       CONTACT FORM
    ========================= */
    var form = document.getElementById('form');
    var successMessage = document.getElementById('ok');

    if (form && successMessage) {
        form.addEventListener(
            'submit',
            function (e) {
                e.preventDefault();
                successMessage.textContent =
                    'Pesan terkirim. Terima kasih, kami akan membalas segera.';
                form.reset();
            }
        );
    }

    /* =========================
       CURRENT YEAR
    ========================= */
    var yearElement =
        document.getElementById('yr');
    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }
})();