document.addEventListener('DOMContentLoaded', () => {

    $(document).on('click', '.yakar', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 0
        }, 800);
        $('.yakar-nav').addClass('is-disable');
        $('.yakar').removeClass('is-active');
        $(this).addClass('is-active');
        setTimeout(function () {
            $('.yakar-nav').removeClass('is-disable');
        }, 900);
        return false;
    });

    // Form ----------------------------------------

    $('.phone-mask').mask("+7 (999) 999-99-99");

    $(document).on('click', '.input', function () {
        $(this).removeClass('is-error');
        $(this).next('.error-text').fadeOut();
    });

    $('.input').focus(function () {
        $(this).removeClass('is-error')
        $(this).parent('.input-wrap').addClass('is-focus');
        $(this).parent('.input-wrap').removeClass('is-error');
        $(this).next('.error-text').fadeOut();
    });
    $('.input').bind('blur', function () {
        if ($(this).val() == 0) {
            $(this).parent('.input-wrap').removeClass('is-focus');
            $(this).parent('.input-wrap').removeClass('is-error');
            $(this).next('.error-text').fadeOut();
        }
    });
    $(document).on('is-focus', '.input', function () {
        $(this).removeClass('is-error')
        $(this).parent('.input-wrap').addClass('is-focus');
        $(this).parent('.input-wrap').removeClass('is-error');
        $(this).next('.error-text').fadeOut();
    });
    $(document).on('blur', '.input', function () {
        if ($(this).val() == 0) {
            $(this).parent('.input-wrap').removeClass('is-focus');
            $(this).parent('.input-wrap').removeClass('is-error');
            $(this).next('.error-text').fadeOut();
        }
    });
    $(document).on('keyup', '.input', function () {
        if (!$(this).val() == 0) {
            $(this).parent().find('.value-clear').show();
        }
    });

    $(document).on('click', '.form .checkbox--required', function (v) {
        if ($(this).children('.checkbox-input').is(':checked')) {
            $(this).children('.checkbox-inputcustom').addClass('checked').removeClass('is-error');
        } else {
            $(this).children('.checkbox-inputcustom').removeClass('checked');
        }
    });

    $(document).on('click', '.form .btn-submit', function (event) {
        event.preventDefault();
        var error = 0;

        $(this).closest('.form').find('.required').each(function () {
            if ($(this).val().length === 0) {
                $(this).addClass('is-error');
                $(this).closest('.select-input').addClass('is-error');
                $(this).parent('div').find('.error-text').fadeIn();
                error = 1;
            }
        });
        $(this).closest('.form').find('.checkbox--required').each(function () {
            if ($(this).find('.checkbox-inputcustom').hasClass('checked')) {
                $(this).find('.checkbox-inputcustom').removeClass('is-error')
            } else {
                $(this).find('.checkbox-inputcustom').addClass('is-error');
                error = 1;
            }
        });
        if (error == 0) {
            /*
            if ($(this).closest('form').data('suctitle') && $(this).closest('form').data('sucsubtitle')) {
                var title = $(this).closest('form').data('suctitle');
                var subtitle = $(this).closest('form').data('sucsubtitle');
            }
            else {
                var title = 'Заявка принята'
                var subtitle = 'Мы свяжемся с вами в самое ближайшее время для уточнения всех вопросов!';
            }
            $('.popup[data-popup="successfull"] .popup__modal-title').text(title);
            $('.popup[data-popup="successfull"] .popup__modal-subtitle').text(subtitle);
            */
            $(this).closest('form').submit();
        }
    });

    function successfullEvents() {
        // $('.popup').hide();
        $('.popup').removeClass('is-show');
        $('body').addClass('noscroll');
        $('.popup__mask').fadeIn();
        $('.popup[data-popup="successfull"').addClass('is-show');
        setTimeout(function () {
            $('.form .input-wrap').each(function () {
                $(this).removeClass('is-focus');
                $(this).find('.input').val('');
                $('.value-clear').hide();
            });
        }, 1000);
    }
    function errorEvents() {
        // $('.popup').hide();
        $('.popup').removeClass('is-show');
        $('body').addClass('noscroll');
        $('.popup__mask').fadeIn();
        $('.popup[data-popup="errorEvents"').addClass('is-show');
        setTimeout(function () {
            $('.form .input-wrap').each(function () {
                $(this).removeClass('is-focus');
                $(this).find('.input').val('');
                $('.value-clear').hide();
            });
        }, 1000);
    }

    $(document).on('submit', '.form[data-form="standartform"]', function () {
        $.ajax({
            type: "POST",
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function success(response) {
                if (response) {
                    successfullEvents();
                } else {
                    errorEvents();
                }
            },
            error: function error(response) {
                errorEvents();
            }
        });
        return false;
    });

    // Popup ---------------------------------------

    $(document).on('click', '.show-popup', function (event) {
        event.preventDefault();

        let dataAttributes = $(this).data();
        let typePopup = $(this).data('popup');
        if ($(this).data('action')) {
            $('.popup[data-popup= ' + typePopup + ']').find('form').attr('action', $(this).data('action'));
        }
        $('body').addClass('noscroll');
        $('.popup__mask').fadeIn();
        $('.popup[data-popup= ' + typePopup + ']').addClass('is-show');
    });

    $(document).on('click', '.play-video-popup', function (event) {
        let video = $(this).data('video');
        $('.popup__modal-video video').attr('src', video);
        $('.popup').removeClass('is-show');
        $('body').addClass('noscroll');
        $('.popup__mask').fadeIn();
        $('.popup[data-popup="video"').addClass('is-show');
        // $('.popup__modal-video video')[0].play();
    });

    $(document).on('click', '.popup__modal-video_playbtn', function (event) {
        $(this).closest('.popup__modal-video').find('video').attr('controls', true);
        $(this).closest('.popup__modal-video').find('video')[0].play();
        $(this).hide();
    });

    function closePopup() {
        $('popup__modal-video iframe').remove();
        $('.popup__modal-video video').prop("controls", false);
        $('.popup__modal-video video')[0].pause();
        $('body').removeClass('noscroll');
        $('.popup__mask').fadeOut();
        $('.popup').removeClass('is-show');
        $('.popup__modal-video_playbtn').show();
    }

    $(document).on('click', '.popup__mask, .popup__modal-close, .popup__modal-btnclose', function (event) {
        event.preventDefault();
        closePopup();
    });

    $(document).mouseup(function (e) {
        if (!$('body').find('.slick-lightbox').length) {
            var div = $('.popup__modal');
            if (!div.is(e.target) && div.has(e.target).length === 0) {
                if (div.closest('.popup').hasClass('is-show')) {
                    closePopup();
                }
            }
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.keyCode == 27) {
            closePopup();
        }
    });

    $('.slicklightbox-row').slickLightbox({
        itemSelector: '.slicklightbox-foto'
    });


});


