(function ($) {
    $(document).ready(function () {

        initHeader();
        imgToBg();
        initHomeSlider();
        initProjectSlider();
        initFilters();
        smoothScroll();

        $('textarea').autoResizeTextarea();



        //dev2

        //dev3
    }); // ready
    $(window).on('resize', function () {

    }); // resize
    $(window).on('load', function () {

    }); // resize

    function initHeader() {
        var $header = $('#header'),
            $btnMenu = $header.find('.navbar-toggle'),
            $mainNav = $('#main-nav');

        $btnMenu.on('click', function (e) {
            e.preventDefault();
            toggleMainMenu();
        });

        $('<span class="fader"/>').appendTo('#header');
        $('.fader').click(function () {
            toggleMainMenu();
        });

        $("#navigation a").click(function (event) {
            if (!$(this).siblings('.sub-menu').length) {
                $('body').removeClass('opened-menu');
            }
        });
    }

    function toggleMainMenu() {
        $('body').toggleClass('opened-menu');
    }

    function imgToBg() {
        $('.bg-img').each(function () {
            var $img = $(this).find('> img');

            if ($img.length) {
                $(this).css('background-image', 'url(' + $img.attr('src') + ')');
                $img.addClass('hidden');
            }
        });
    }

    function initHomeSlider() {
        var $status = $('.pagingInfo');
        var $slider = $('.home-slideshow');

        $slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.html('<span class="current">' + numberFormat(i) + '</span><span class="sep"></span><span class="total">' + numberFormat(slick.slideCount) + '</span>');
        });
        $('.home-slideshow').slick({
            autoplay: true,
            autoplaySpeed: 6000,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false,
            arrows: true,
            dots: true,
            fade: true,
            appendDots: $('.controls-bar'),
            appendArrows: $('.controls-bar')
        });
    }

    function initProjectSlider() {
        var $status = $('.pagingInfo');
        var $slider = $('.project-slideshow');

        $slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.html('<span class="current">' + numberFormat(i) + '</span><span class="sep"></span><span class="total">' + numberFormat(slick.slideCount) + '</span>');
        });
        if ($slider.length) {
            $slider.slick({
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: true,
                dots: true,
                fade: true,
                appendDots: $('.controls-bar'),
                appendArrows: $('.controls-bar')
            });
        }
    }

    function smoothScroll() {
        // Add smooth scrolling to all links in navbar + footer link
        $("#main-nav a").on('click', function (event) {

            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {

                // Prevent default anchor click behavior
                event.preventDefault();

                // Store hash
                var hash = this.hash;

                if ($(hash).length) {
                    // Using jQuery's animate() method to add smooth page scroll
                    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top
                    }, 600, function () {

                        // Add hash (#) to URL when done scrolling (default click behavior)
                        window.location.hash = hash;
                    });
                } else {

                    var base_url = '';
                    var lang = $('.lang .active').text().toLowerCase();
                    if (lang == 'pt') {
                        lang = '';
                    }

                    // similar behavior as clicking on a link
                    window.location.href = window.location.protocol + '//' + window.location.host + '/' + base_url + '/' + lang + '/' + hash;
                }

            } // End if

        });
    }

    function numberFormat(num) {
        return (num < 10) ? '0' + num : num;
    }

    function initFilters() {
        var $gridElem = $('.grid');
        var gridElemItems = $gridElem.find('.grid-item');
        var itemsPerPage = 12;
        var loadMoreBtn = $('.btn-download-more > .btn');
        var $buttonGroup = $('.filter-nav');

        if ($gridElem.length) {
            // Inicializa o Isotope
            var $grid = $gridElem.isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: getColumnWidth()
                }
            });

            var gData = $grid.data('isotope');

            // Carrega mais itens conforme necessário
            loadMore(itemsPerPage);

            // Ajusta o layout do Isotope quando a janela é redimensionada
            $(window).resize(function () {
                $grid.isotope({
                    masonry: {
                        columnWidth: getColumnWidth()
                    }
                });
            });

            function loadMore(toShow) {
                $grid.find('.hidden').removeClass('hidden');

                var hiddenElems = gData.filteredItems.slice(toShow, gData.filteredItems.length).map(function (item) {
                    return item.element;
                });
                var showedElems = gData.filteredItems.slice(0, toShow).map(function (item) {
                    return item.element;
                });

                $(hiddenElems).addClass('hidden');
                $(showedElems).find('.bg-img').each(function () {
                    var $img = $(this).find('> img');
                    if ($img.length) {
                        $(this).css('background-image', 'url(' + $img.attr('data-src') + ')');
                        $img.addClass('hidden');
                    }
                });

                if (hiddenElems.length == 0) {
                    loadMoreBtn.parent().hide();
                } else {
                    loadMoreBtn.parent().show();
                };
                $grid.isotope('layout');
            }

            var counter = itemsPerPage;

            loadMoreBtn.on('click', function (event) {
                event.preventDefault();
                if ($buttonGroup.data('clicked')) {
                    counter = itemsPerPage;
                    $buttonGroup.data('clicked', false);
                } else {
                    counter = counter;
                };
                counter = counter + itemsPerPage;
                loadMore(counter);
            });

            $buttonGroup.on('click', 'a', function (event) {
                $buttonGroup.find('.active').removeClass('active');
                var $button = $(event.currentTarget);
                $button.parent().addClass('active');
                var filterValue = $button.attr('data-filter');
                $grid.isotope({ filter: filterValue });
                $buttonGroup.data('clicked', true);

                loadMore(counter);

                return false;
            });
        }

        // Calcula a largura da coluna com base na largura do container
        function getColumnWidth() {
            var windowWidth = $(window).width();
            var columnWidth = 100;

            // Ajusta para duas colunas em dispositivos com largura até 1200px
            if (windowWidth <= 1200) {
                var gridWidth = $gridElem.width();
                columnWidth = gridWidth / 2 - 10;
            }

            return columnWidth;
        }
    }

    initFilters();


    function showTarget(target) {
        var target;
        if (target) {
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 600, function () {
                window.location.hash = target;
            });
        }
    }
    $(window).load(function (e) {
        showTarget(window.location.hash);
    });

    //dev2


    //dev3
})(this.jQuery);
document.addEventListener('DOMContentLoaded', function () {
    // Check if the device is mobile
    function isMobile() {
        return window.matchMedia("(max-width: 1024px)").matches;
    }

    // Toggle sub-menu on click for mobile devices
    document.querySelectorAll('.menu-item-has-children > a').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            if (isMobile()) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('open');
                const subMenu = parent.querySelector('.sub-menu');
                if (subMenu.style.display === 'block' || subMenu.style.display === '') {
                    subMenu.style.display = 'none';
                } else {
                    subMenu.style.display = 'block';
                }
            }
        });
    });

    // Close sub-menu if clicked outside
    document.addEventListener('click', function (e) {
        if (isMobile() && !e.target.closest('.menu-item-has-children')) {
            document.querySelectorAll('.sub-menu').forEach(function (subMenu) {
                subMenu.style.display = 'none';
            });
            document.querySelectorAll('.menu-item-has-children').forEach(function (menuItem) {
                menuItem.classList.remove('open');
            });
        }
    });
});