$(function () {
    'use strict';

    function animatePreloader() {
        var preloader1 = $('.preload_item:nth-child(1)'),
            preloader2 = $('.preload_item:nth-child(2)'),
            preloader3 = $('.preload_item:nth-child(3)'),
            preloader4 = $('.preload_item:nth-child(4)'),
            preloader5 = $('.preload_item:nth-child(5)'),
            preloader6 = $('.preload_item:nth-child(6)'),
            preloader7 = $('.preload_item:nth-child(7)'),
            preloader8 = $('.preload_item:nth-child(8)'),
            preloader9 = $('.preload_item:nth-child(9)'),
            preloader10 = $('.preload_item:nth-child(10)'),
            preloader11 = $('.preload_item:nth-child(11)'),
            preloader12 = $('.preload_item:nth-child(12)');

        animate();

        function animate() {
            preloader1.animate({'opacity': 1}, 1000, function () {
                preloader1.animate({'opacity': .05}, 1000);
            });

            setTimeout(function () {
                preloader2.animate({'opacity': 1}, 1000, function () {
                    preloader2.animate({'opacity': .05}, 1000);
                });
            }, 100);

            setTimeout(function () {
                preloader3.animate({'opacity': 1}, 1000, function () {
                    preloader3.animate({'opacity': .05}, 1000);
                });
            }, 200);

            setTimeout(function () {
                preloader4.animate({'opacity': 1}, 1000, function () {
                    preloader4.animate({'opacity': .05}, 1000);
                });
            }, 300);

            setTimeout(function () {
                preloader5.animate({'opacity': 1}, 1000, function () {
                    preloader5.animate({'opacity': .05}, 1000);
                });
            }, 400);
            setTimeout(function () {
                preloader6.animate({'opacity': 1}, 1000, function () {
                    preloader6.animate({'opacity': .05}, 1000);
                });
            }, 600);
            setTimeout(function () {
                preloader7.animate({'opacity': 1}, 1000, function () {
                    preloader7.animate({'opacity': .05}, 1000);
                });
            }, 700);
            setTimeout(function () {
                preloader8.animate({'opacity': 1}, 1000, function () {
                    preloader8.animate({'opacity': .05}, 1000);
                });
            }, 800);
            setTimeout(function () {
                preloader9.animate({'opacity': 1}, 1000, function () {
                    preloader9.animate({'opacity': .05}, 1000);
                });
            }, 900);
            setTimeout(function () {
                preloader10.animate({'opacity': 1}, 1000, function () {
                    preloader10.animate({'opacity': .05}, 1000);
                });
            }, 1000);
            setTimeout(function () {
                preloader11.animate({'opacity': 1}, 1000, function () {
                    preloader11.animate({'opacity': .05}, 1000);
                });
            }, 1100);
            setTimeout(function () {
                preloader12.animate({'opacity': 1}, 900, function () {
                    preloader12.animate({'opacity': .05}, 900);
                    animate();
                });
            }, 1200);
        }
    }

    // prevent storing checkboxes state between page reload (for Firefox)
    document.forms.globalform.reset();

    $("html, body").animate({
        scrollTop: 0
    });

    $(window).on("scroll", function () {
        var currentYScrollOffset = $(window).scrollLeft();
        $('.main-menu, .sidemenu-upper-block').css('left', -currentYScrollOffset);
    });

    var ie_upto10 = /MSIE \d/.test(navigator.userAgent),
        ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),
        isIe = ie_upto10 || ie_11up,
        isSafari = /Apple Computer/.test(navigator.vendor),
        isFirefox = navigator.userAgent.indexOf("Firefox") !== -1,
        $currentPage;

    if (isIe) {
        $('html').addClass('IE');
    } else if (isFirefox) {
        $('html').addClass('firefox');
    } else if (isSafari) {
        $('html').addClass('safari');
        animatePreloader();
    }

    $(window).on('load resize', onWindowResize);

    function onWindowResize() {
        resizeMainMenu();
        hideSidemenuCopyrightFast();
    }

    function hideSidemenuCopyrightFast() {
        var $copyrightMenu = $('.sidemenu-copyright'),
            $copyrightIco = $('.copyright_ico');

        $copyrightIco.removeClass('expanded');
        $copyrightMenu.hide();
    }

    function resizeMainMenu(e) {
        var windowHeight = window.innerHeight - 68;
        $('.main-menu__content').css({height: windowHeight});
    }

    !(function handlePanesDragging() {
        var $panesContainer = $('.content-items'),
            $widgets = $panesContainer.find('.content-item_action__settings, .content-item_action__eject, .jelect, .checkbox-small_label, .tab_label, .back-btn');

        $widgets.hover(onMouseOver, onMouseOut).on('dragstart selectstart', function () {
            return false;
        });

        function onMouseOver(e) {
            var $widget = $(this),
                $pane = $widget.closest('.content-item');


            $pane.addClass('disabled');
        }

        function onMouseOut(e) {
            var $widget = $(this),
                $pane = $widget.closest('.content-item');

            $pane.removeClass('disabled');
        }
    })();

    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    function makeBtnsFixed() {
        getCurrentPage();

        if (!$currentPage) return;

        var fixedHeaderName = $currentPage.data('fixed-header'),
            $fixedHeader = $('[class*=' + fixedHeaderName + ']');

        var $el = $currentPage.find('.section-header'),
            isVisible = isScrolledIntoView($el),
            currentYScrollOffset = $(window).scrollLeft();

        if ($(window).width() < 1205) {
            var leftOffset = -193;
        } else {
            leftOffset = 0;
        }

        if (!isVisible) {
            $(window).on('load resize', repositionFixedHeader);
            $('.sidemenu-upper-block').css('visibility', 'visible');
            $fixedHeader.addClass('fixed-header_container').css('left', leftOffset - currentYScrollOffset);
            $('.header').css('visibility', 'hidden');
        } else if (isVisible) {
            $('.header').css('visibility', 'visible');
            $('.fixed-header_container').removeClass('fixed-header_container');
            $(window).off('load resize', repositionFixedHeader);
            $('.sidemenu-upper-block').css('visibility', 'hidden');
        }

        function repositionFixedHeader() {
            var currentYScrollOffset = $(window).scrollLeft(),
                leftOffset;

            if ($(window).width() < 1205) {
                leftOffset = -193;
            } else {
                leftOffset = 0;
            }

            $fixedHeader.css('left', leftOffset - currentYScrollOffset);
        }
    }

    function getCurrentPage() {
        $currentPage = $('.nav-wrapper').find('.wrapper').filter(function (item) {
            return !!Math.round($(this).css('opacity'));
        });
    }

    $(window).on('scroll', onWindowScroll);

    function onWindowScroll() {
        makeBtnsFixed();
        hideSidemenuCopyright();
    }

    function onMainMenuScroll() {
        hideSidemenuCopyright();
    }

    function hideSidemenuCopyright() {
        var $copyrightMenu = $('.sidemenu-copyright'),
            $copyrightIco = $('.copyright_ico'),
            isCopyrightMenuVisible = $copyrightIco.hasClass('expanded');

        if (!isCopyrightMenuVisible) return;

        $copyrightIco.removeClass('expanded');
        $copyrightMenu.animate({opacity: 'toggle', height: 'toggle'});
    }

    $('.main-menu').on('mouseup', '.main-menu__item', function (e) {
        setTimeout(function () {
            getCurrentPage();
        }, 500);
    }).on('mousewheel', onMainMenuScroll);

    $('.internet_item__dns-mode').on('click', 'label', function () {
        var id = $(this).prop('for'),
            $tab = $(this).closest('[data-tab]'),
            $section = $tab.find('.extend-item__dns'),
            isSectionVisible = $section.is(':visible');

        if (isSectionVisible && id == 'dns-auto' || id == 'dns-auto2') {
            toggleSection($section);
        }

        if (!isSectionVisible && id == 'dns-byhand' || id == 'dns-byhand2') {
            toggleSection($section);
        }

        function toggleSection($section) {
            $section.animate({
                'height': 'toggle',
                'opacity': 'toggle',
                'padding': 'toggle',
                'margin': 'toggle'
            });
        }
    });

    $('[for="authentication-state"]').on('click', function () {
        $('[data-section="authentication"] .internet_item__eap').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    $('[for="authentication-state2"]').on('click', function () {
        $('[data-section="authentication2"] .internet_item__eap').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    $('.usb_item__netdrive-delete').on('click', function (e) {
        $('.page-usb .access-table tr').not(':first-child').remove();
    });

    $('.page-usb .button__add-drive').on('click', function (e) {
        var row = $('.page-usb .template-table tr').clone(true);

        row.appendTo('.page-usb .access-table');
    });

    $('[for="netdrive-access"]').on('click', function () {
        $('.access-table, .button__add-drive, .usb_item__netdrive-delete').animate({
            height: 'toggle',
            opacity: 'toggle'
        });
    });

    $('[for="netdrive-switch"]').on('click', function () {
        $('.usb_item__access, .usb_item__netdrive-memory, .usb_item__netdrive-buttons').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    $('.flip-container_second').jScrollPane({autoReinitialise: true});

    $('.item__admin-syslog, .item__admin-pinglog, .item__admin-tracertlog, .item__admin-netstatlog').jScrollPane({autoReinitialise: true});

    $('.internet-content-tabs, .wifi-content-tabs').on('click', onTabClick);

    function onTabClick(e) {
        var tab = $(e.target),
            tabName = tab.data('tab-name');

        if (!tabName) return;

        var tabContainer = tab.closest('li'),
            tabWindow = tabContainer.find('[data-tab=' + tabName + ']'),
            tabs = tabContainer.find('[data-tab]');

        tabs.hide();
        tabWindow.show();

        tab.parent()
            .find('.content-tabs_selected')
            .removeClass('content-tabs_selected');

        tab.addClass('content-tabs_selected');
    }

    $('.jelect').jelect();

    // disable main page scroll while scrolling elements
    $('.flip-container_second, pre').mousewheel(function (e) {
        var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;

        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;

        e.preventDefault();
    });

    $('.main-menu__content').on('mousewheel DOMMouseScroll', function (e) {
        var $html = $('html'),
            isFirefox = $html.hasClass('firefox'),
            isIe = $html.hasClass('IE');

        if (isFirefox || isIe) return;

        var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;

        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;

        hideSidemenuCopyright();

        e.preventDefault();
    });

    $('.copyright_ico').on('mouseenter', onCopyrightBtnMouseenter)
        .on('click', onCopyrightBtnClick);
    $('.main-menu__scrollable').on('mouseenter', onMainMenuHover);
    $('.wrapper').on('mouseenter', onWrapperHover);
    $('.sidemenu-copyright').on('mouseleave', onSidemenuCopyrightMouseleave);

    function onWrapperHover() {
        var $copyrightMenu = $('.sidemenu-copyright'),
            $copyrightIco = $('.copyright_ico'),
            isCopyrightMenuVisible = $copyrightIco.hasClass('expanded');

        if (!isCopyrightMenuVisible) return;

        $copyrightIco.removeClass('expanded');
        $copyrightMenu.animate({opacity: 'toggle', height: 'toggle'});
    }

    function onCopyrightBtnClick(e) {
        var $copyrightMenu = $('.sidemenu-copyright'),
            isCopyrightMenuVisible = $copyrightMenu.is(':visible');

        if (isCopyrightMenuVisible) {
            $('.copyright_ico').removeClass('expanded');
            $copyrightMenu.animate({opacity: 'toggle', height: 'toggle'});
        } else if (!isCopyrightMenuVisible) {
            $('.copyright_ico').addClass('expanded');
            $copyrightMenu.animate({opacity: 'toggle', height: 'toggle'});
        }

        e.preventDefault();
    }

    function onMainMenuHover() {
        var $copyrightMenu = $('.sidemenu-copyright'),
            $copyrightIco = $('.copyright_ico'),
            isCopyrightMenuVisible = $copyrightIco.hasClass('expanded');

        if (!isCopyrightMenuVisible) return;

        $copyrightIco.removeClass('expanded');
        $copyrightMenu.animate({opacity: 'toggle', height: 'toggle'});
    }

    function onSidemenuCopyrightMouseleave(e) {
        var $relatedTarget = $(e.relatedTarget);
        if ($relatedTarget.is('.sidemenu-copyright-wrapper, .main-menu__copyright-year')) return;

        var $copyrightMenu = $('.sidemenu-copyright');
        $copyrightMenu.animate({opacity: 'toggle', height: 'toggle'});
        $('.copyright_ico').removeClass('expanded');
    }

    function onCopyrightBtnMouseenter(e) {
        var $copyrightMenu = $('.sidemenu-copyright'),
            $copyrightIco = $('.copyright_ico'),
            isCopyrightMenuVisible = $copyrightIco.hasClass('expanded');

        if (isCopyrightMenuVisible) return;

        $(this).addClass('expanded');
        $copyrightMenu.animate({opacity: 'toggle', height: 'toggle'});

        // copyright sidemenu dynamic positioning
        var $mainMenuCopyright = $('.main-menu__copyright'),
            mainMenuCopyrightHeight = $mainMenuCopyright.height(),
            $mainMenuWrapper = $(".main-menu__content"),
            visiblePartHeight = $mainMenuWrapper.height() - $mainMenuCopyright.offset().top + $mainMenuWrapper.offset().top,
            hiddenPartHeight = mainMenuCopyrightHeight - visiblePartHeight,
            scrollBarHeight = getScrollBarHeight(),
            offset = 71 - scrollBarHeight - hiddenPartHeight;

        $copyrightMenu.css('bottom', offset);

        function getScrollBarHeight() {
            var outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.width = "100px";
            outer.style.msOverflowStyle = "scrollbar";

            document.body.appendChild(outer);

            var widthNoScroll = outer.offsetWidth;
            outer.style.overflow = "scroll";

            var inner = document.createElement("div");
            inner.style.width = "100%";
            outer.appendChild(inner);

            var widthWithScroll = inner.offsetWidth;

            outer.parentNode.removeChild(outer);

            return widthNoScroll - widthWithScroll;
        }

    }

});

//==================================================================================================

$(function () {

    var updateTimerId,
        preloaderTimerId,
        settingsPageUsed = false,
        $html = $('html'),
        isTransformsSupported = $html.hasClass('csstransforms3d'),
        isIe = $html.hasClass('IE');

    var $tabs = $('.tab');
    if (!$tabs.length) return;

    $tabs.on('click', onTabClick);

    function onTabClick(e) {
        var $tab = $(this),
            tabName = $tab.data('tab-name'),
            $currentPage = $tab.closest('.wrapper');

        $currentPage.find('.tab').removeClass('content-tabs_selected');
        $tab.addClass('content-tabs_selected');

        $currentPage.find('[data-tab]').hide();
        $('[data-tab=' + tabName + ']').show();
    }

    $('.accordion').on('click', onAccordionClick);

    function onAccordionClick(e) {

        var $accordion = $(this),
            $sectionName = $accordion.data('section-name');

        $accordion.toggleClass('accordion__visible');
        $('[data-section=' + $sectionName + ']').slideToggle();
    }

    $('.item__admin-time').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $ntpSection = $('.admin_item-ntp-options'),
            $manualSection = $('.admin_item-manual-options'),
            isNtpSectionVisible = $ntpSection.is(':visible'),
            isManualSectionVisible = $manualSection.is(':visible');

        if (id == 'pc-time') {
            if (isNtpSectionVisible) toggleSection($ntpSection);
            if (isManualSectionVisible) toggleSection($manualSection);
        }

        if (!isNtpSectionVisible && id == 'ntp-sync') {
            if (isManualSectionVisible) toggleSection($manualSection);
            toggleSection($ntpSection);
        }

        if (!isManualSectionVisible && id == 'manual-sync') {
            if (isNtpSectionVisible) toggleSection($ntpSection);
            toggleSection($manualSection);
        }
    });

    $('.internet_item__ip-version').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $tab = $(this).closest('[data-tab]'),
            $hybridSection = $tab.find('.hidden_item__ip-version-hybrid'),
            isHybridSectionVisible = $hybridSection.is(':visible'),
            $ipv6Section = $tab.find('.internet_item__ip-version6'),
            isIpv6SectionVisible = $ipv6Section.is(':visible'),
            dhcpModeSelected = $tab.find('#connect_type-dhcp, #connect_type-dhcp2').prop('checked');

        if (id == 'hybrid' || id == 'hybrid2') {
            if (!isHybridSectionVisible) {
                if (dhcpModeSelected) toggleSection($hybridSection);
            }

            if (isIpv6SectionVisible) toggleSection($ipv6Section);
        }

        if (id == 'ipv4' || id == 'ipv4-2') {
            if (isHybridSectionVisible) toggleSection($hybridSection);
            if (isIpv6SectionVisible) toggleSection($ipv6Section);
        }

        if (id == 'ipv6' || id == 'ipv6-2') {
            if (isHybridSectionVisible) toggleSection($hybridSection);
            if (!isIpv6SectionVisible) toggleSection($ipv6Section);
        }
    });

    $('.settings_item__connect-type__second').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $section = $(this).closest('.settings_section-manual'),
            $staticIpSection = $section.find('.internet_item__static-ip'),
            $pppoeSection = $section.find('.internet_item__pppoe'),
            $pppoeSelectedSection = $section.find('.pppoe-selected'),
            $staticIpSelectedSection = $section.find('.static-ip-selected'),
            $pptpSection = $section.find('.internet_item__pptp'),
            isStaticIpSectionVisible = $staticIpSection.is(':visible'),
            isPppoeSectionVisible = $pppoeSection.is(':visible'),
            isPptpSectionVisible = $pptpSection.is(':visible'),
            isPppoeSelectedSectionVisible = $pppoeSelectedSection.is(':visible'),
            isStaticIpSelectedSectionVisible = $staticIpSelectedSection.is(':visible');

        if (id == 'settings-conntype-dhcp') {
            if (isStaticIpSectionVisible) toggleSection($staticIpSection);
            if (isPppoeSectionVisible) toggleSection($pppoeSection);
            if (isPptpSectionVisible) toggleSection($pptpSection);
            if (isPppoeSelectedSectionVisible) toggleSection($pppoeSelectedSection);
            if (isStaticIpSelectedSectionVisible) toggleSection($staticIpSelectedSection);
        }

        if (!isStaticIpSectionVisible && id == 'settings-conntype-static') {
            if (isPppoeSectionVisible) toggleSection($pppoeSection);
            if (isPptpSectionVisible) toggleSection($pptpSection);
            if (isPppoeSelectedSectionVisible) toggleSection($pppoeSelectedSection);
            if (!isStaticIpSelectedSectionVisible) toggleSection($staticIpSelectedSection);
            toggleSection($staticIpSection);
        }

        if (!isPppoeSectionVisible && id == 'settings-conntype-pppoe') {
            if (isStaticIpSectionVisible) toggleSection($staticIpSection);
            if (isPptpSectionVisible) toggleSection($pptpSection);
            if (!isPppoeSelectedSectionVisible) toggleSection($pppoeSelectedSection);
            if (isStaticIpSelectedSectionVisible) toggleSection($staticIpSelectedSection);
            toggleSection($pppoeSection);
        }

        if (!isPptpSectionVisible && id == 'settings-conntype-pptp') {
            if (isPppoeSectionVisible) toggleSection($pppoeSection);
            if (isStaticIpSectionVisible) toggleSection($staticIpSection);
            if (isPppoeSelectedSectionVisible) toggleSection($pppoeSelectedSection);
            if (isStaticIpSelectedSectionVisible) toggleSection($staticIpSelectedSection);
            toggleSection($pptpSection);
        }
    });


    $('[data-tab="internet-tab1"] .internet_item__connect-type__second').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $tab = $(this).closest('[data-tab]'),
            $staticIpSection = $tab.find('.internet_item__static-ip'),
            $pppoeSection = $tab.find('.internet_item__pppoe'),
            $pppoeSelectedSection = $tab.find('.pppoe-selected'),
            $staticIpSelectedSection = $tab.find('.static-ip-selected'),
            $pptpSection = $tab.find('.internet_item__pptp'),
            isStaticIpSectionVisible = $staticIpSection.is(':visible'),
            isPppoeSectionVisible = $pppoeSection.is(':visible'),
            isPptpSectionVisible = $pptpSection.is(':visible'),
            isPppoeSelectedSectionVisible = $pppoeSelectedSection.is(':visible'),
            isStaticIpSelectedSectionVisible = $staticIpSelectedSection.is(':visible');

        if (id == 'connect_type-dhcp') {
            if (isStaticIpSectionVisible) toggleSection($staticIpSection);
            if (isPppoeSectionVisible) toggleSection($pppoeSection);
            if (isPptpSectionVisible) toggleSection($pptpSection);
            if (isPppoeSelectedSectionVisible) toggleSection($pppoeSelectedSection);
            if (isStaticIpSelectedSectionVisible) toggleSection($staticIpSelectedSection);
        }

        if (!isStaticIpSectionVisible && id == 'connect_type-static') {
            if (isPppoeSectionVisible) toggleSection($pppoeSection);
            if (isPptpSectionVisible) toggleSection($pptpSection);
            if (isPppoeSelectedSectionVisible) toggleSection($pppoeSelectedSection);
            if (!isStaticIpSelectedSectionVisible) toggleSection($staticIpSelectedSection);
            toggleSection($staticIpSection);
        }

        if (!isPppoeSectionVisible && id == 'connect_type-ppoe') {
            if (isStaticIpSectionVisible) toggleSection($staticIpSection);
            if (isPptpSectionVisible) toggleSection($pptpSection);
            if (!isPppoeSelectedSectionVisible) toggleSection($pppoeSelectedSection);
            if (isStaticIpSelectedSectionVisible) toggleSection($staticIpSelectedSection);
            toggleSection($pppoeSection);
        }

        if (!isPptpSectionVisible && id == 'connect_type-pptp') {
            if (isPppoeSectionVisible) toggleSection($pppoeSection);
            if (isStaticIpSectionVisible) toggleSection($staticIpSection);
            if (isPppoeSelectedSectionVisible) toggleSection($pppoeSelectedSection);
            if (isStaticIpSelectedSectionVisible) toggleSection($staticIpSelectedSection);
            toggleSection($pptpSection);
        }
    });

    $('[data-tab="internet-tab1"] .internet_item__connect-type').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $tab = $(this).closest('[data-tab]'),
            $adslSection = $tab.find('.internet-settings__adsl'),
            $modemSection = $tab.find('.settings__modem'),
            isAdslSectionVisible = $adslSection.is(':visible'),
            isModemSectionVisible = $modemSection.is(':visible');

        if (id == 'connect_type-adsl') {
            if (!isAdslSectionVisible) toggleSection($adslSection);
            if (isModemSectionVisible) toggleSection($modemSection);
        } else if (id == 'connect_type-lte') {
            if (isAdslSectionVisible) toggleSection($adslSection);
            if (!isModemSectionVisible) toggleSection($modemSection);
        } else if (id == 'connect_type-ethernet') {
            if (isAdslSectionVisible) toggleSection($adslSection);
            if (isModemSectionVisible) toggleSection($modemSection);
        }
    });

    $('[data-tab="internet-tab2"] .internet_item__connect-type').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $tab = $(this).closest('[data-tab]'),
            $adslSection = $tab.find('.internet-settings__adsl'),
            $modemSection = $tab.find('.settings__modem'),
            isAdslSectionVisible = $adslSection.is(':visible'),
            isModemSectionVisible = $modemSection.is(':visible');

        if (id == 'connect_type-adsl2') {
            if (!isAdslSectionVisible) toggleSection($adslSection);
            if (isModemSectionVisible) toggleSection($modemSection);
        } else if (id == 'connect_type-lte2') {
            if (isAdslSectionVisible) toggleSection($adslSection);
            if (!isModemSectionVisible) toggleSection($modemSection);
        } else if (id == 'connect_type-ethernet2') {
            if (isAdslSectionVisible) toggleSection($adslSection);
            if (isModemSectionVisible) toggleSection($modemSection);
        }
    });

    $('[data-tab="internet-tab2"] .internet_item__connect-type__second').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $tab = $(this).closest('[data-tab]'),
            $staticIpSection = $tab.find('.internet_item__static-ip'),
            $pppoeSection = $tab.find('.internet_item__pppoe'),
            $pptpSection = $tab.find('.internet_item__pptp'),
            isStaticIpSectionVisible = $staticIpSection.is(':visible'),
            isPppoeSectionVisible = $pppoeSection.is(':visible'),
            isPptpSectionVisible = $pptpSection.is(':visible');

        if (id == 'connect_type-dhcp2') {
            if (isStaticIpSectionVisible) toggleSection($staticIpSection);
            if (isPppoeSectionVisible) toggleSection($pppoeSection);
            if (isPptpSectionVisible) toggleSection($pptpSection);
        }

        if (!isStaticIpSectionVisible && id == 'connect_type-static2') {
            if (isPppoeSectionVisible) toggleSection($pppoeSection);
            if (isPptpSectionVisible) toggleSection($pptpSection);
            toggleSection($staticIpSection);
        }

        if (!isPppoeSectionVisible && id == 'connect_type-ppoe2') {
            if (isStaticIpSectionVisible) toggleSection($staticIpSection);
            if (isPptpSectionVisible) toggleSection($pptpSection);
            toggleSection($pppoeSection);
        }

        if (!isPptpSectionVisible && id == 'connect_type-pptp2') {
            if (isPppoeSectionVisible) toggleSection($pppoeSection);
            if (isStaticIpSectionVisible) toggleSection($staticIpSection);
            toggleSection($pptpSection);
        }

    });


    $('.internet-page__connection').on('click', 'input', function (e) {
        var $selectedOption = $(this),
            $optionsContainer = $selectedOption.closest('.internet-page__connection'),
            optionSectionName = $selectedOption.data('option-name'),
            $optionSection = $('[data-option-section=' + '"' + optionSectionName + '"' + ']'),
            $optionSections = $optionsContainer.find('[data-option-section]');

        $optionSections.fadeOut('fast');

        $optionSection.animate({
            height: "toggle",
            opacity: "toggle"
        });
    });

    $('#wifi-tab_main + label').on('click', function () {
        $('.content-item__wifi .tab-content_section__second').fadeOut(function () {
            $('.content-item__wifi .tab-content_section__main').fadeIn();
        });
    });

    $('#wifi-tab_second + label').on('click', function () {
        $('.content-item__wifi .tab-content_section__main').fadeOut(function () {
            $('.content-item__wifi .tab-content_section__second').fadeIn();
        });
    });

    $('#internet-tab_main + label').on('click', function () {
        $('.content-item__internet .tab-content_section__second').fadeOut(function () {
            $('.content-item__internet .tab-content_section__main').fadeIn();
        });
    });

    $('#internet-tab_second + label').on('click', function () {
        $('.content-item__internet .tab-content_section__main').fadeOut(function () {
            $('.content-item__internet .tab-content_section__second').fadeIn();
        });
    });

    var $contentItems = $('.content-items');

    $contentItems.sortable({
        cursor: 'move',
        cancel: '.disabled',
        containment: $('.nav-wrapper'),
        revert: true,
        scroll: false,
        start: function (e) {
            $('.content-item').off('click', onContentItemClick);
            $('.flipping').off('click');
        },
        stop: function (e) {
            $('.content-item').on('click', onContentItemClick);

            var getSection = $('.flipping'),
                flipContainer = getSection.find('.flip-container');

            getSection.on('click', function (e) {
                var $target = $(e.target),
                    isButtonClicked = $target.hasClass('content-item_action__settings') || $target.hasClass('content-item_action__sortable') || $target.hasClass('jspVerticalBar') || $target.hasClass('jspDrag') || $target.hasClass('jspVerticalBar') || $target.hasClass('jspTrack');

                if (isButtonClicked) return;

                if (isTransformsSupported && !isIe) {
                    flipContainer.toggleClass('transformed');
                    $('.back-btn').fadeToggle();
                } else {
                    var $frontSide = $('.flip-container_main'),
                        $backSide = $('.flip-container_second');

                    if ($frontSide.is(':visible')) {
                        $frontSide.fadeToggle(function () {
                            $backSide.fadeToggle();
                        });
                    } else {
                        $backSide.fadeToggle(function () {
                            $frontSide.fadeToggle();
                        });
                    }
                }

            });
        }
    });

    $('.content-item').on('click', onContentItemClick);

    function onContentItemClick(e) {
        var $pane = $(this),
            $clickedElem = $(e.target),
            $isWidget = $clickedElem.hasClass('content-item_action') || $clickedElem.hasClass('back-btn') || ~$clickedElem.prop('class').indexOf('tab') || ~$clickedElem.prop('class').indexOf('jelect') || ~$clickedElem.prop('class').indexOf('checkbox');

        if ($isWidget) return;


        if ($pane.hasClass('content-item__lan')) return;

        window.location.hash = $pane.data('hash');
    }

    $('.button__prev, .button__next').on('click', function () {
        $('body').scrollTop(0);
    });

    $('.main-menu__item, .content-item_action__settings, .button__action, .brand').on('click', onPageChange);

    function onPageChange(e) {
        $('body').scrollTop(0);
        clearTimeout(preloaderTimerId);

        if (settingsPageUsed) {
            $('.settings_section-preloader, .settings_section-fail, .settings_section-manual, .settings_section-wifi, .settings_section-timezone, .settings_section-password').hide();
            $('.settings_section-conntype').show();
        }
    }

    // on\off switch text fade
    $('.checkbox-small_label, .checkbox-medium_label, .checkbox-large_label').on('click', function (e) {
        var $switch = $(this);

        $switch.removeClass('flipswitch-fade');
        setTimeout(function () {
            $switch.addClass('flipswitch-fade');
        }, 1);
    });

    function toggleBackgroundBlur() {
        var windowWidthBefore,
            windowWidthAfter,
            $background = $('.header, .main-menu, .nav-wrapper, .fixed-header_container');

        if ($background.eq(0).hasClass('blur-filter')) {
            windowWidthBefore = $(window).width();
            $background.removeClass('blur-filter');
            $('body').removeClass('modal-open');
            windowWidthAfter = $(window).width();

            if (windowWidthBefore != windowWidthAfter) {
                $('body, .header, .fixed-header_container').css('padding-right', '');
            }
        } else {
            windowWidthBefore = $(window).width();
            $background.addClass('blur-filter');
            $('body').addClass('modal-open');
            windowWidthAfter = $(window).width();

            if (windowWidthBefore != windowWidthAfter) {
                $('body, .header, .fixed-header_container').css('padding-right', getScrollBarWidth());
            }
        }

        function getScrollBarWidth() {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);

            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;

            document.body.removeChild(outer);

            return (w1 - w2);
        }
    }

    $('#popup-confirm').on('click', function (e) {
        $(this).closest('.popup_item').hide();

        var $progressBar = $('.popup_progress-current'),
            $progressValue = $('.popup_progress-value'),
            startVal = 0,
            $popup = $('.popup_item__progress');

        $popup.show();

        $progressBar.css('width', 0);
        $progressValue.html(0);

        updateTimerId = setInterval(function () {
            ++startVal;

            if (startVal == 100) {
                clearInterval(updateTimerId);
                $popup.hide();
                $('.popup__reboot').show();
            }

            $progressBar.css('width', startVal + '%');
            $progressValue.html(startVal);
        }, 100);
    });

    $('#update-firmware').on('click', function (e) {
        toggleBackgroundBlur();
        $('.popup_overlay').show();
        $('.popup__confirm').show();
    });

    $('#export-settings, #import-settings').on('click', function (e) {
        toggleBackgroundBlur();
        $('.popup_overlay').show();
        $('.popup__save').show();
    });

    $('.popup_close, .popup_close-window').on('click', function (e) {
        clearInterval(updateTimerId);
        $(this).closest('.popup_item').hide();
        $('.popup_overlay').hide();
        toggleBackgroundBlur();
    });

    $('.item-help').on('click', function (e) {
        var definitionName = $(this).data('definition-name');

        if (!definitionName) return;

        var $definitionPopup = $('[data-definition=' + definitionName + ']');

        toggleBackgroundBlur();
        $('.popup_overlay').show();
        $definitionPopup.show();
    });

//    ================================================================================================
//    SETTINGS PAGE SCRIPTS
    function showFail() {
        preloaderTimerId = setTimeout(function () {
            $('.settings_section-preloader').hide();
            $('.settings_section-fail').show();
        }, 5000);
    }

    $('#step1-next').on('click', function (e) {
        settingsPageUsed = true;

        if ($('#settings-auto').prop('checked')) {
            $('.settings_section-conntype').hide();
            $('.settings_section-preloader').show();

            showFail();

        } else if ($('#settings-manual')) {
            $('.settings_section-conntype').hide();
            $('.settings_section-manual').show();
        }
    });

    $('#fail-repeat').on('click', function (e) {
        $('.settings_section-conntype').hide();
        $('.settings_section-fail').hide();
        $('.settings_section-preloader').show();

        showFail();
    });

    $('#fail-manual').on('click', function (e) {
        $('.settings_section-fail').hide();
        $('.settings_section-manual').show();
    });

    $('#preloader-prev, #fail-prev, #manual-prev').on('click', function (e) {
        clearTimeout(preloaderTimerId);
        $('.settings_section-conntype').show();
        $('.settings_section-preloader').hide();
        $('.settings_section-fail').hide();
        $('.settings_section-manual').hide();
        $('.settings_section-wifi').hide();
    });

    $('#wifi-prev').on('click', function (e) {
        $('.settings_section-wifi').hide();
        $('.settings_section-manual').show();
    });

    $('#wifi-next').on('click', function (e) {
        $('.settings_section-wifi').hide();
        $('.settings_section-timezone').show();
    });

    $('#timezone-prev').on('click', function (e) {
        $('.settings_section-timezone').hide();
        $('.settings_section-wifi').show();
    });

    $('#timezone-next').on('click', function (e) {
        $('.settings_section-timezone').hide();
        $('.settings_section-password').show();
    });

    $('#manual-next').on('click', function (e) {
        $('.settings_section-manual').hide();
        $('.settings_section-wifi').show();
    });

    $('#password-prev').on('click', function (e) {
        $('.settings_section-password').hide();
        $('.settings_section-timezone').show();
    });


    $('.settings_section-conntype').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $providerSelect = $('.provider-select'),
            isVisible = $providerSelect.is(':visible'),
            $prevBtn = $('#step1-prev');

        function toggleSection($section) {
            $section.animate({
                'height': 'toggle',
                'opacity': 'toggle',
                'padding': 'toggle',
                'margin': 'toggle'
            });
        }

        if (!isVisible && id == 'settings-provider') {
            toggleSection($providerSelect);
            toggleSection($prevBtn);
        } else if (isVisible && id != 'settings-provider') {
            toggleSection($providerSelect);
            toggleSection($prevBtn);
        }
    });

    $('.settings_item__dns-mode').on('click', 'label', function (e) {
        var switchId = $(this).prop('for'),
            $options = $('.settings-dnsmode-options'),
            isDhcpOptionsVisible = $options.is(':visible');

        if (switchId == 'settings-dns-auto' && isDhcpOptionsVisible) {
            $options.animate({height: 'toggle', opacity: 'toggle'});
        } else if (switchId == 'settings-dns-manual' && !isDhcpOptionsVisible) {
            $options.animate({height: 'toggle', opacity: 'toggle'});
        }
    });

    $('.settings-wifi-access').on('click', 'label', function (e) {
        var switchId = $(this).prop('for'),
            $options = $('.settings-wifi-options'),
            isDhcpOptionsVisible = $options.is(':visible');

        if (switchId == 'settings-wifi-open' && isDhcpOptionsVisible) {
            $options.animate({height: 'toggle', opacity: 'toggle'});
        } else if (switchId == 'settings-wifi-closed' && !isDhcpOptionsVisible) {
            $options.animate({height: 'toggle', opacity: 'toggle'});
        }
    });

    $('.homelan_item__reserve-delete').on('click', function (e) {
        $('.page-homelan .reserve-table tr').not(':first-child').remove();
    });

    $('.page-homelan .button__add-address').on('click', function (e) {
        var row = $('.page-homelan .template-table tr').clone(true);

        row.appendTo('.page-homelan .reserve-table');

        $('.page-homelan .reserve-table tr:last-child .input-text__ip-mask').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
            translation: {
                'Z': {
                    pattern: /[0-9]/,
                    optional: true
                }
            }
        }).on('blur', function (e) {
            var $input = $(this),
                values = $input.val().split('.'),
                validatedValues = [];

            values.forEach(function (item, index) {
                validatedValues[index] = +item;
            });

            validatedValues = validatedValues.join(' . ');

            if (validatedValues != 0) {
                $input.val(validatedValues);
            }
        });

    });

    $('.delete-item').on('click', function (e) {
        $(this).closest('tr').remove();
    });

    $('.homelan_item__dhcp').on('click', 'label', function (e) {
        var switchId = $(this).prop('for'),
            $options = $('.homelan-dhcp-options'),
            $relayOptions = $('.homelan-dhcp-options-relay'),
            isDhcpOptionsVisible = $options.is(':visible'),
            isRelayOptionsVisible = $relayOptions.is(':visible');


        if (switchId == 'dhcp-off') {
            if (isDhcpOptionsVisible) {
                $options.animate({height: 'toggle', opacity: 'toggle'});
            }

            if (isRelayOptionsVisible) {
                $relayOptions.animate({height: 'toggle', opacity: 'toggle'});
            }
        } else if ((switchId == 'dhcp-server')) {
            if (!isDhcpOptionsVisible) {
                $options.animate({height: 'toggle', opacity: 'toggle'});
            }

            if (isRelayOptionsVisible) {
                $relayOptions.animate({height: 'toggle', opacity: 'toggle'});
            }
        } else if ((switchId == 'dhcp-relay')) {
            if (isDhcpOptionsVisible) {
                $options.animate({height: 'toggle', opacity: 'toggle'});
            }

            if (!isRelayOptionsVisible) {
                $relayOptions.animate({height: 'toggle', opacity: 'toggle'});
            }
        }
    });

    $('.homelan_item__dhcpv6-mode').on('click', 'label', function (e) {
        var switchId = $(this).prop('for'),
            $options = $('.homelan-dhcpv6-options'),
            isDhcpOptionsVisible = $options.is(':visible');

        if (switchId == 'homelan-dhcpv6-auto' && isDhcpOptionsVisible) {
            $options.animate({height: 'toggle', opacity: 'toggle'});
        } else if ((switchId == 'homelan-dhcpv6-manual' || switchId == 'dhcp-relay') && !isDhcpOptionsVisible) {
            $options.animate({height: 'toggle', opacity: 'toggle'});
        }
    });

    $('.homelan_item__dnsrelay').on('click', 'label', function (e) {
        var switchId = $(this).prop('for'),
            $options = $('.homelan-dnsrelay-options'),
            isOptionsVisible = $options.is(':visible');

        if (switchId == 'dns-relay-auto' && isOptionsVisible) {
            $options.animate({height: 'toggle', opacity: 'toggle', padding: 'toggle'});
        } else if (switchId == 'dns-relay-manual' && !isOptionsVisible) {
            $options.animate({height: 'toggle', opacity: 'toggle', padding: 'toggle'});
        }
    });

    $('.homelan_item__radvdmode').on('click', 'label', function (e) {
        var switchId = $(this).prop('for'),
            $options = $('.homelan-radvd-options'),
            isOptionsVisible = $options.is(':visible');

        if (switchId == 'radvd-auto' && isOptionsVisible) {
            $options.animate({height: 'toggle', opacity: 'toggle'});
        } else if (switchId == 'radvd-manual' && !isOptionsVisible) {
            $options.animate({height: 'toggle', opacity: 'toggle'});
        }
    });

    $('[for="dhcp-reserve"]').on('click', function (e) {
        $('.reserve-table').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });

        $('.button__add-address, .homelan_item__reserve-delete').animate({
            height: 'toggle',
            opacity: 'toggle'
        });
    });

    $('[for="radvd"]').on('click', function (e) {
        $('.homelan_item__radvdmode').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    $('[for="homelan-dhcpv6"]').on('click', function (e) {
        $('.homelan_item__dhcpv6-mode').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    $('[for="tunnel"]').on('click', function (e) {
        $('.homelan-tunnel-options').animate({height: 'toggle', opacity: 'toggle'});
    });

    $('[for="modem-switch"], [for="internet-modem-switch"], [for="internet-modem-switch2"]').on('click', function (e) {
        $('.settings_item__modem-buttons').animate({height: 'toggle', opacity: 'toggle'});
    });

    $('[for="settings-vlan-status"]').on('click', function (e) {
        $('.settings-vlan-options').animate({height: 'toggle', opacity: 'toggle'});
    });


    $('#settings-default-password').on('click', function () {
        $('.settings-password__inputs').animate({height: 'toggle', opacity: 'toggle'});

        if (isIe) {
            $('.settings-password-warning').animate({opacity: 'toggle'});
        }
    });

    $('.settings_section-manual').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $page = $('.settings_section-manual'),
            $ethernetSection = $('.settings__ethernet'),
            $adslSection = $('.settings__adsl'),
            $modemSection = $page.find('.settings__modem'),
            $vlan = $('.settings_item__vlan '),
            $dnsMode = $('.settings_item__dns-mode'),
            isEthernetSectionVisible = $ethernetSection.is(':visible'),
            isAdslSectionVisible = $adslSection.is(':visible'),
            isModemSectionVisible = $modemSection.is(':visible'),
            isVlanVisible = $vlan.is(':visible');

        if (id == 'settings-manual-ethernet') {
            if (!isEthernetSectionVisible) toggleSection($ethernetSection);
            if (!isVlanVisible) toggleSection($vlan);
            $dnsMode.removeClass('adsl');

            setTimeout(function () {
                if (isModemSectionVisible) toggleSection($modemSection);
                if (isAdslSectionVisible) toggleSection($adslSection);
            }, 100);
        }

        if (!isAdslSectionVisible && id == 'settings-manual-adsl') {
            if (!isEthernetSectionVisible) toggleSection($ethernetSection);
            toggleSection($adslSection);
            $dnsMode.addClass('adsl');

            setTimeout(function () {
                if (isModemSectionVisible) toggleSection($modemSection);
                if (isVlanVisible) toggleSection($vlan);
            }, 100);
        }

        if (!isModemSectionVisible && id == 'settings-manual-3g') {
            toggleSection($modemSection);
            $dnsMode.removeClass('adsl');

            setTimeout(function () {
                if (isAdslSectionVisible) toggleSection($adslSection);
                if (isEthernetSectionVisible) toggleSection($ethernetSection);
                if (isVlanVisible) toggleSection($vlan);
            }, 100);
        }
    });

    $('[for="provider-settings__main"]').on('click', function (e) {
        $('.internet_item__provider-options').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    $('[for="provider-settings__main2"]').on('click', function (e) {
        $('.internet_item__provider-options2').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    $('[for="cabinet"]').on('click', function (e) {
        $('[data-tab="internet-tab1"] .internet_item__cabinet .extend-item').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    $('[for="cabinet2"]').on('click', function (e) {
        $('[data-tab="internet-tab2"] .internet_item__cabinet .extend-item').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    $('[for="vlan-status"]').on('click', function (e) {
        $('.internet-vlan-status').animate({height: 'toggle', opacity: 'toggle', padding: 'toggle', margin: 'toggle'});
    });

    $('[for="vlan-status2"]').on('click', function (e) {
        $('.internet-vlan-status2').animate({height: 'toggle', opacity: 'toggle', padding: 'toggle', margin: 'toggle'});
    });

    $('.page-internet .internet_item__mtu').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $tab = $(this).closest('[data-tab]'),
            $mtuSection = $tab.find('.internet_item__mtu .extend-item'),
            isMtuVisible = $mtuSection.is(':visible');

        if (isMtuVisible && id == 'mtu-auto' || id == 'mtu-auto2') {
            toggleSection($mtuSection);
        }

        if (!isMtuVisible && id == 'mtu-hand' || id == 'mtu-hand2') {
            toggleSection($mtuSection);
        }
    });

    //        wifi page js ===========================================

    $('.radiomodule-activity').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $section = $('.page-wifi .table__timepicker'),
            isSectionVisible = $section.is(':visible');

        if (isSectionVisible && id == 'radiomodule-activity-allways') {
            toggleSection($section);
        }

        if (!isSectionVisible && id == 'radiomodule-activity-time') {
            toggleSection($section);
        }

    });

    $('[for="wifi-connection-limit"]').on('click', function (e) {
        $('.wifi-connection-limit').animate({height: 'toggle', opacity: 'toggle'});
    });


    $('[for="mac-filter"]').on('click', function (e) {
        $('.extend-item__mac-filter').animate({height: 'toggle', opacity: 'toggle'});
    });

    $('.wifi').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $tab = $(this).closest('[data-tab]'),
            $section = $tab.find('.extend-item__encryption-type'),
            isSectionVisible = $section.is(':visible'),
            $section2 = $tab.find('.hz5-access'),
            isSection2Visible = $section2.is(':visible'),
            $section3 = $tab.find('.hz24-access'),
            isSection3Visible = $section3.is(':visible');

        if (isSectionVisible && id == 'wifi-open') {
            toggleSection($section);
        }

        if (!isSectionVisible && id == 'wifi-closed') {
            toggleSection($section);
        }

        if (isSection2Visible && id == 'wifi-guest-freq-max-open') {
            toggleSection($section2);
        }

        if (!isSection2Visible && id == 'wifi-guest-freq-max-closed') {
            toggleSection($section2);
        }

        if (isSection3Visible && id == 'wifi-guest-freq-medium-open') {
            toggleSection($section3);
        }

        if (!isSection3Visible && id == 'wifi-guest-freq-medium-closed') {
            toggleSection($section3);
        }
    });

    //        iptv page js =============================================
    $('[for="iptv-vlan"]').on('click', function (e) {
        $('[data-tab="iptv-tab1"] .iptv-vlan-extend').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    $('[for="sip-iptv-vlan"]').on('click', function (e) {
        $('[data-tab="iptv-tab2"] .iptv-vlan-extend').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    $('#iptv-vlan-id, #sip-iptv-vlan-id, #vlan-id, #reserve-vlan-id, #settings-vlan-id').on('keypress', function (e) {
        var char = String.fromCharCode(e.keyCode);

        if (!isNumeric(char)) {
            e.preventDefault();
        }
    }).on('keyup', function (e) {

        if (this.value > 4095) {
            this.value = 4095;
        }

        if (this.value) {
            this.value = +this.value;
        }

    });

    //      wifi js
    $('#wifi-connection-limit_input').on('keypress', function (e) {
        var char = String.fromCharCode(e.keyCode);

        if (!isNumeric(char)) {
            e.preventDefault();
        }
    }).on('keyup', function (e) {

        if (this.value > 30) {
            this.value = 30;
        }

        if (this.value) {
            this.value = +this.value;
        }

    });

    $('#wifi-fragment').on('keypress', function (e) {
        var char = String.fromCharCode(e.keyCode);

        if (!isNumeric(char)) {
            e.preventDefault();
        }
    }).on('blur', function (e) {

        if (this.value > 2346) {
            this.value = 2346;
        }

        if (this.value && this.value < 256) {
            this.value = 256;
        }
    });

    $('#wifi-rts').on('keypress', function (e) {
        var char = String.fromCharCode(e.keyCode);

        if (!isNumeric(char)) {
            e.preventDefault();
        }
    }).on('blur', function (e) {

        if (this.value > 2347) {
            this.value = 2347;
        }

        if (this.value && this.value < 1500) {
            this.value = 1500;
        }
    });

    $('#wifi-beacon').on('keypress', function (e) {
        var char = String.fromCharCode(e.keyCode);

        if (!isNumeric(char)) {
            e.preventDefault();
        }
    }).on('blur', function (e) {

        if (this.value > 1000) {
            this.value = 1000;
        }

        if (this.value && this.value < 20) {
            this.value = 20;
        }
    });

    //     access js
    $('[data-tab="access-settings-tab2"] .access-settings_filter-type').on('click', 'label', function () {
        var id = $(this).prop('for'),
            $ipSection = $('.filter-ip'),
            $macSection = $('.filter-mac'),
            $urlSection = $('.filter-url'),
            $portSection = $('.filter-port'),
            $ipTable = $('.access-table-ip'),
            $macTable = $('.access-table-mac'),
            $urlTable = $('.access-table-url'),
            $portTable = $('.access-table-port'),
            $ipButton = $('.add-filter-ip'),
            $macButton = $('.add-filter-mac'),
            $urlButton = $('.add-filter-url'),
            $portButton = $('.add-filter-port'),
            isIpButtonVisible = $ipButton.is(':visible'),
            isMacButtonVisible = $macButton.is(':visible'),
            isUrlButtonVisible = $urlButton.is(':visible'),
            isPortButtonVisible = $portButton.is(':visible'),
            isIpTableVisible = $ipTable.is(':visible'),
            isMacTableVisible = $macTable.is(':visible'),
            isUrlTableVisible = $urlTable.is(':visible'),
            isPortTableVisible = $portTable.is(':visible'),
            isIpSectionVisible = $ipSection.is(':visible'),
            isMacSectionVisible = $macSection.is(':visible'),
            isUrlSectionVisible = $urlSection.is(':visible'),
            isPortSectionVisible = $portSection.is(':visible'),
            isIpFiltersActive = $('#filter-activity-status').is(':checked'),
            isMacFiltersActive = $('#filter-activity-status-mac').is(':checked'),
            isUrlFiltersActive = $('#filter-activity-status-url').is(':checked'),
            isPortFiltersActive = $('#filter-activity-status-port').is(':checked');

        function toggleSection($section) {
            $section.toggle();
        }

        if (id == 'filter-ip') {
            if (!isIpSectionVisible) toggleSection($ipSection);
            if (isMacSectionVisible) toggleSection($macSection);
            if (isUrlSectionVisible) toggleSection($urlSection);
            if (isPortSectionVisible) toggleSection($portSection);

            if (!isIpTableVisible && isIpFiltersActive) toggleSection($ipTable);
            if (isMacTableVisible) toggleSection($macTable);
            if (isUrlTableVisible) toggleSection($urlTable);
            if (isPortTableVisible) toggleSection($portTable);

            if (isIpFiltersActive) toggleSection($ipButton);
            if (isMacButtonVisible) toggleSection($macButton);
            if (isUrlButtonVisible) toggleSection($urlButton);
            if (isPortButtonVisible) toggleSection($portButton);
        }

        if (id == 'filter-mac') {
            if (isIpSectionVisible) toggleSection($ipSection);
            if (!isMacSectionVisible) toggleSection($macSection);
            if (isUrlSectionVisible) toggleSection($urlSection);
            if (isPortSectionVisible) toggleSection($portSection);

            if (isIpTableVisible) toggleSection($ipTable);
            if (!isMacTableVisible && isMacFiltersActive) toggleSection($macTable);
            if (isUrlTableVisible) toggleSection($urlTable);
            if (isPortTableVisible) toggleSection($portTable);

            if (isIpButtonVisible) toggleSection($ipButton);
            if (isMacFiltersActive) toggleSection($macButton);
            if (isUrlButtonVisible) toggleSection($urlButton);
            if (isPortButtonVisible) toggleSection($portButton);
        }

        if (id == 'filter-url') {
            if (isIpSectionVisible) toggleSection($ipSection);
            if (isMacSectionVisible) toggleSection($macSection);
            if (!isUrlSectionVisible) toggleSection($urlSection);
            if (isPortSectionVisible) toggleSection($portSection);

            if (isIpTableVisible) toggleSection($ipTable);
            if (isMacTableVisible) toggleSection($macTable);
            if (!isUrlTableVisible && isUrlFiltersActive) toggleSection($urlTable);
            if (isPortTableVisible) toggleSection($portTable);

            if (isIpButtonVisible) toggleSection($ipButton);
            if (isMacButtonVisible) toggleSection($macButton);
            if (isUrlFiltersActive) toggleSection($urlButton);
            if (isPortButtonVisible) toggleSection($portButton);
        }

        if (id == 'filter-port') {
            if (isIpSectionVisible) toggleSection($ipSection);
            if (isMacSectionVisible) toggleSection($macSection);
            if (isUrlSectionVisible) toggleSection($urlSection);
            if (!isPortSectionVisible) toggleSection($portSection);

            if (isIpTableVisible) toggleSection($ipTable);
            if (isMacTableVisible) toggleSection($macTable);
            if (isUrlTableVisible) toggleSection($urlTable);
            if (!isPortTableVisible && isPortFiltersActive) toggleSection($portTable);

            if (isIpButtonVisible) toggleSection($ipButton);
            if (isMacButtonVisible) toggleSection($macButton);
            if (isUrlButtonVisible) toggleSection($urlButton);
            if (isPortFiltersActive) toggleSection($portButton);
        }
    });

    $('.jelect').on('click', function () {
        var $currentJelect = $(this),
            $currentPageJelects = $currentJelect.closest('.wrapper').find('.jelect-options');

        $currentPageJelects.each(function (i, item) {
            if (!$currentJelect.find(item).length) {
                $(item).removeClass('jelect-options_state_active').closest('.jelect').removeClass('jelect_state_active');
            }
        });
    });

    $('[for="parrent-control-clients"]').on('click', function () {
        $('[data-tab=access-settings-tab5] .access-table__filter-activity, [data-tab=access-settings-tab5] .button__add-filter, [data-tab=access-settings-tab5] .button_remove-filters').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });

    $('[for="filter-activity-status"]').on('click', function () {
        var $table = $('.access-table-ip'),
            animateOptions = {
                height: 'toggle',
                opacity: 'toggle',
                padding: 'toggle',
                margin: 'toggle'
            };

        $('.add-filter-ip, .filter-ip .button_remove-filters').animate(animateOptions);
        $table.animate(animateOptions);
    });

    $('[for="filter-activity-status-mac"]').on('click', function () {
        var $table = $('.access-table-mac'),
            animateOptions = {
                height: 'toggle',
                opacity: 'toggle',
                padding: 'toggle',
                margin: 'toggle'
            };

        $('.add-filter-mac, .filter-mac .button_remove-filters').animate(animateOptions);
        $table.animate(animateOptions);
    });

    $('[for="filter-activity-status-url"]').on('click', function () {
        var $table = $('.access-table-url'),
            animateOptions = {
                height: 'toggle',
                opacity: 'toggle',
                padding: 'toggle',
                margin: 'toggle'
            };

        $('.add-filter-url, .filter-url .button_remove-filters').animate(animateOptions);
        $table.animate(animateOptions);
    });

    $('[for="filter-activity-status-port"]').on('click', function () {
        var $table = $('.access-table-port'),
            animateOptions = {
                height: 'toggle',
                opacity: 'toggle',
                padding: 'toggle',
                margin: 'toggle'
            };

        $('.add-filter-port, .filter-port .button_remove-filters').animate(animateOptions);
        $table.animate(animateOptions);
    });

    $('[for="nat-status"]').on('click', function () {
        var $section = $('[data-tab="access-settings-tab3"] .nat-ports-item'),
            isSectionVisible = $section.is(':visible');

        $section.animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        }, function () {
            if (!isSectionVisible) {
                $('[data-tab="access-settings-tab3"] .access-settings_nat-add-filter').animate({
                    height: 'toggle',
                    opacity: 'toggle'
                });
            }
        });

        if (isSectionVisible) {
            $('[data-tab="access-settings-tab3"] .access-settings_nat-add-filter').animate({
                height: 'toggle',
                opacity: 'toggle'
            });
        }
    });

    $('[for="dmz-status"]').on('click', function () {
        $('[data-tab="access-settings-tab3"] .dmz-table').animate({
            height: 'toggle',
            opacity: 'toggle',
            padding: 'toggle',
            margin: 'toggle'
        });
    });


    $('.parent-control-options').on('click', 'label', function (e) {
        var id = $(this).prop('for'),
            $section = $('[data-tab="access-settings-tab5"] .table__timepicker'),
            isSectionVisible = $section.is(':visible');

        if (isSectionVisible && id == 'parrent-control-allway') {
            toggleSection($section);
        }

        if (!isSectionVisible && id == 'parrent-control-time') {
            toggleSection($section);
        }
    });

    $('.filter-activity-status .button_remove-filters').on('click', function (e) {
        var tableName = $('.access-settings_filter-type input:checked').data('filter-table'),
            $table = $('[class*=' + tableName + ']');
        $table.find('tr').not(':first-child').remove();
    });

    $('[data-tab="access-settings-tab2"] .button__add-filter').on('click', function (e) {
        var tableName = $('.access-settings_filter-type input:checked').data('filter-table'),
            $table = $('[class*=' + tableName + ']'),
            templateTableName = $('.access-settings_filter-type input:checked').data('template'),
            $templateTable = $('[class*=' + templateTableName + ']'),
            row = $templateTable.find('tr').clone(true);

        row.appendTo($table);

        $table.find('tr:last-child .input-text__mac').mask('FF : FF : FF : FF : FF : FF', {
            translation: {
                "F": {pattern: /[0-9a-f]/}
            }
        });

        $table.find('tr:last-child .input-text__ip-mask').mask('0ZZ . 0ZZ . 0ZZ . 0ZZ', {
            translation: {
                'Z': {
                    pattern: /[0-9]/,
                    optional: true
                }
            }
        }).on('blur', function (e) {
            var $input = $(this),
                values = $input.val().split('.'),
                validatedValues = [];

            values.forEach(function (item, index) {
                validatedValues[index] = +item;
            });

            validatedValues = validatedValues.join(' . ');

            if (validatedValues != 0) {
                $input.val(validatedValues);
            }
        });
    });

    $('[data-tab="access-settings-tab5"] .button__add-filter').on('click', function (e) {
        var $tab = $('[data-tab="access-settings-tab5"]'),
            row = $tab.find('.template-table tr').clone(true);

        row.appendTo($tab.find('.access-table'));

        $tab.find('.access-table__filter-activity .input-text__mac').mask('FF : FF : FF : FF : FF : FF', {
            translation: {
                "F": {pattern: /[0-9a-f]/}
            }
        });
    });

    $('[data-tab="access-settings-tab3"] .button_remove-filters').on('click', function (e) {
        $('[data-tab="access-settings-tab3"] .access-table.nat-ports tr').not(':first-child').remove();
        $('[data-tab="access-settings-tab3"] .nat-ports-item').addClass('collapsed');
        $('.nat-ports, .jspContainer').height(180);
    });

    $('[data-tab="access-settings-tab3"] .delete-item').on('click', function (e) {
        var height = $('.nat-ports').height();
        $('.nat-ports, .jspContainer').height(height - 36);

        $(this).closest('tr').remove();
    });

    $('.access-settings_nat-add-filter .button__add-filter').on('click', function (e) {
        $('.jspHorizontalBar').show();

        var trs = $('.access-table.nat-ports tr').size();
        if (trs == 1) {
            $('.jspContainer, .nat-ports').height(75);
        }

        $('[data-tab="access-settings-tab3"] .nat-ports-item').removeClass('collapsed');

        var row = $('[data-tab="access-settings-tab3"] .template-table tr').clone(true);

        row.appendTo('[data-tab="access-settings-tab3"] .nat-ports');

        $('[data-tab="access-settings-tab3"] .nat-ports tr:last-child .input-text__ip-mask').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
            translation: {
                'Z': {
                    pattern: /[0-9]/,
                    optional: true
                }
            }
        }).on('blur', function (e) {
            var $input = $(this),
                values = $input.val().split('.'),
                validatedValues = [];

            values.forEach(function (item, index) {
                validatedValues[index] = +item;
            });

            validatedValues = validatedValues.join(' . ');

            if (validatedValues != 0) {
                $input.val(validatedValues);
            }
        });

        var height = $('.nat-ports').height();
        $('.nat-ports').css('height', height + 36);
        $('.jspContainer').height(height + 36);

        $('.jspTrack').hide();
        setTimeout(function () {
            $('.jspTrack').show();
        }, 500);
    });

    $('[data-tab="access-settings-tab5"] .button_remove-filters').on('click', function (e) {
        $('[data-tab="access-settings-tab5"] .access-table tr').not(':first-child').remove();

        $('.jspHorizontalBar').hide();
    });

    $('#high-wrr, #big-wrr, #medium-wrr, #low-wrr').on('keypress', function (e) {
        var char = String.fromCharCode(e.keyCode);

        if (!isNumeric(char)) {
            e.preventDefault();
        }
    }).on('blur', function (e) {

        if (this.value > 15) {
            this.value = 15;
        }

        if (this.value && this.value < 1) {
            this.value = 1;
        }
    });


    //      homelan js
    $('#ip-rent-time').on('keypress', function (e) {
        var char = String.fromCharCode(e.keyCode);

        if (!isNumeric(char)) {
            e.preventDefault();
        }
    }).on('keyup', function (e) {

        if (this.value > 259200) {
            this.value = 259200;
        }

        if (this.value) {
            this.value = +this.value;
        }

    });


    //        settings page js
    $('#vpi, #internet-vpi, #internet-vpi2').on('keypress', function (e) {
        var char = String.fromCharCode(e.keyCode);

        if (!isNumeric(char)) {
            e.preventDefault();
        }
    }).on('keyup', function (e) {

        if (this.value > 255) {
            this.value = 255;
        }

        if (this.value) {
            this.value = +this.value;
        }
    });

    $('#vci, #internet-vci, #internet-vci2').on('keypress', function (e) {
        var char = String.fromCharCode(e.keyCode);

        if (!isNumeric(char)) {
            e.preventDefault();
        }
    }).on('blur', function (e) {

        if (this.value > 65535) {
            this.value = 65535;
        }

        if (this.value && this.value < 32) {
            this.value = 32;
        }
    });


    //        access page js

    $('[for="parrent-control-status"]').on('click', function (e) {
        $('.parent-control-options').animate({height: 'toggle', opacity: 'toggle'});
    });

    function toggleSection($section) {
        $section.animate({
            'height': 'toggle',
            'opacity': 'toggle',
            'padding': 'toggle',
            'margin': 'toggle'
        });
    }

    function checkIpv4(value) {
        return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(value);
    }

    var ValidIpAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
        ValidHostnameRegex = /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i,
        ValidIpV6AddressRegex = /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i,
        ValidMacAddressRegex = /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/;

    function checkIpAndDomain(value) {
        return ValidIpAddressRegex.test(value) || ValidHostnameRegex.test(value);
    }

    function checkDomain(value) {
        return ValidHostnameRegex.test(value);
    }

    $('#primarry-dns, #alternate-dns, #primarry-dns2, #alternate-dns2').on('blur', function (e) {
        var value = $(this).val().split(' . ').join('.');

        if (!value.trim()) {
            $(this).val('');

            $(this).closest('.internet_item').find('label').css({
                'visibility': 'hidden',
                'opacity': 0
            });

            return;
        }

        if (checkIpv4(value)) {

            $(this).closest('.internet_item').find('label').css({
                'visibility': 'hidden',
                'opacity': 0
            });
        } else {
            $(this).closest('.internet_item').find('label').css(
                {
                    'visibility': 'visible',
                    'opacity': 1
                }
            );
        }
    });

    $('#ping-ip').on('blur', function (e) {
        var value = $(this).val().split(' . ').join('.');

        if (!value.trim()) {
            $(this).val('');

            $('#ping-ip + label').css({
                'visibility': 'hidden',
                'opacity': 0
            });

            return;
        }

        if (checkIpAndDomain(value)) {
            $('#ping-ip + label').css({
                'visibility': 'hidden',
                'opacity': 0
            });
        } else {
            $('#ping-ip + label').css(
                {
                    'visibility': 'visible',
                    'opacity': 1
                }
            );
        }
    });


    $('#tracert-ip').on('blur', function (e) {
        var value = $(this).val().split(' . ').join('.');

        if (!value.trim()) {
            $(this).val('');

            $('#tracert-ip + label').css({
                'visibility': 'hidden',
                'opacity': 0
            });

            return;
        }

        if (checkIpAndDomain(value)) {
            $('#tracert-ip + label').css({
                'visibility': 'hidden',
                'opacity': 0
            });
        } else {
            $('#tracert-ip + label').css(
                {
                    'visibility': 'visible',
                    'opacity': 1
                }
            );
        }
    });

});

//==================================================================================================

$(function () {
    init();
});


;
function init() {
    var $html = $('html'),
        isTransformsSupported = $html.hasClass('csstransforms3d'),
        isIe = $html.hasClass('IE');

    if (isIe) {
        $('.flip-container_second').addClass('ie-fix');
    }

    transformSection(isTransformsSupported, isIe);
    wifiPage();
    tableSelect();
    tableScroll();
};


;
function tableScroll() {

    $('table.nat-ports').jScrollPane({autoReinitialise: true});

};

function transformSection(isTransformsSupported, isIe) {
    var getSection = $('.flipping'),
        flipContainer = getSection.find('.flip-container');

    getSection.on('click', function (e) {
        var $target = $(e.target),
            isButtonClicked = $target.hasClass('content-item_action__settings') || $target.hasClass('content-item_action__sortable') || $target.hasClass('jspVerticalBar') || $target.hasClass('jspDrag') || $target.hasClass('jspVerticalBar') || $target.hasClass('jspTrack');

        if (isButtonClicked) return;

        if (isTransformsSupported && !isIe) {
            flipContainer.toggleClass('transformed');
            $('.back-btn').fadeToggle();
        } else {
            var $frontSide = $('.flip-container_main'),
                $backSide = $('.flip-container_second');

            if ($frontSide.is(':visible')) {
                $frontSide.fadeToggle(function () {
                    $backSide.fadeToggle();
                });
            } else {
                $backSide.fadeToggle(function () {
                    $frontSide.fadeToggle();
                });
            }
        }

    });
}


;
function wifiPage() {

    $('.extend-item__mac-filter').on('click', '.remove-text__dns', function () {
        $(this).closest('.item_input-text__dns').remove();
    });

    // mac mask
    $('.input-text__mac, #mac, #mac2, #access-mac').mask('FF : FF : FF : FF : FF : FF', {
        translation: {
            "F": {pattern: /[0-9a-f]/}
        }
    });


    // ipv6 mask
    $('#global-ipv6, #tunnel-ipv6, #internet-ipv6, #internet-ipv6-gateway, #internet-ipv6-dns, #internet-ipv6-dns-alt, #internet-ipv6-2, #internet-ipv6-gateway-2, #internet-ipv6-dns2, #internet-ipv6-dns-alt2').mask('FFFF:FFFF:FFFF:FFFF:FFFF:FFFF', {
        translation: {
            "F": {pattern: /[0-9a-f]/}
        }
    });

    $('.input-text__ip-mask, #homelan-primary-dns, #homelan-secondary-dns, #homelan-dhcpv6-dns, #homelan-dhcpv6-dns2, #tunnel-ipv4, #ip-start, #ip-end, #alternate-dns2, #primarry-dns2, #settings-alternate-dns, #settings-primary-dns, #alias-ip, #alias-mask').mask('0ZZ . 0ZZ . 0ZZ . 0ZZ', {
        translation: {
            'Z': {
                pattern: /[0-9]/,
                optional: true
            }
        }
    }).on('blur', function (e) {
        var $input = $(this),
            values = $input.val().split('.'),
            validatedValues = [];

        values.forEach(function (item, index) {
            validatedValues[index] = +item;
        });

        validatedValues = validatedValues.join(' . ');

        if (validatedValues != 0) {
            $input.val(validatedValues);
        }
    });

    // add mac item
    $('.button__add-mac').on('click', function () {
        // get mac value
        var currentMac = $('.dns-section .item_input-text__dns').size() + 1;
        var macItem = $('<div class="internet_item-value item_input-text__dns"><input type="text" id="wifi-mac-' + currentMac + '" class="input-text input-text__mac"><svg viewBox="0 0 16 16" class="remove-text remove-text__dns"><path d="M9.207,8.5l2.768-2.768c0.195-0.195,0.195-0.512,0-0.707c-0.195-0.195-0.512-0.195-0.707,0L8.5,7.793L5.732,5.025  c-0.195-0.195-0.512-0.195-0.707,0c-0.195,0.195-0.195,0.512,0,0.707L7.793,8.5l-2.768,2.768c-0.195,0.195-0.195,0.512,0,0.707  c0.195,0.195,0.512,0.195,0.707,0L8.5,9.207l2.768,2.768c0.195,0.195,0.512,0.195,0.707,0s0.195-0.512,0-0.707L9.207,8.5z"></path></svg></div>');

        $(".dns-section").append(macItem);

        var macItemId = '#' + 'wifi-mac-' + currentMac;

        $(macItemId).mask('FF : FF : FF : FF : FF : FF', {
            translation: {
                "F": {pattern: /[0-9a-f]/}
            }
        })
    });
}

;
function tableSelect() {
    var isMouseDown = false,
        isHighlighted;
    $(".timepicker_days_item span")
        .mousedown(function () {
            isMouseDown = true;
            $(this).toggleClass("highlighted");
            isHighlighted = $(this).hasClass("highlighted");
            return false; // prevent text selection
        })
        .mouseover(function () {
            if (isMouseDown) {
                $(this).toggleClass("highlighted", isHighlighted);
            }
        })
        .bind("selectstart", function () {
            return false;
        });

    $(document)
        .mouseup(function () {
            isMouseDown = false;
        });
};
