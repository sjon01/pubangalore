// _BEGIN HEADER JS
$(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
        $("header").addClass("fixed");
    } else {
        $("header").removeClass("fixed");
    }
});
// ENDS HEADER JS
// _BEGIN MOBILE MENU JS
$(document).ready(function() {
    $(".mobile-toggle-ico").click(function() {
        $(".mobile-sidebar-wrap").addClass("mobile-sidebar-wrap-show");
    });

    $(".close-ico").click(function() {
        $(".mobile-sidebar-wrap").removeClass("mobile-sidebar-wrap-show");
    });
    $(".mobile-sidebar-wrap").show();
});

$(document).mouseup(function(e) {
    var popup = $(".mobile-sidebar-wrap");
    if (!$(".mobile-toggle-ico").is(e.target) &&
        !popup.is(e.target) &&
        popup.has(e.target).length == 0
    ) {
        popup.removeClass("mobile-sidebar-wrap-show");
    }
});
$(document).ready(function() {
    $(".list-menu .link").click(function() {
        $(".mobile-sidebar-wrap").removeClass("mobile-sidebar-wrap-show");
    });
});
// _ENDS MOBILE MENU JS

jQuery(document).ready(function() {
    var nextdata = 'no';

    function getData(limit, start, cityname, country, lowcost, highcost) {
        jQuery.ajax({
            url: "moredata.php",
            method: "POST",
            data: {
                limit: limit,
                start: start,
                city: cityname,
                location: country,
                lowcost: lowcost,
                highcost: highcost
            },
            dataType: 'html',
            cache: false,
            async: true,
            success: function(html) {
                if (html == '') {
                    /*  jQuery('span#load-data-msg').html('<div class="text-muted" style="font-weight:bold; font-size:18px; text-align:center;">No more result yet!</div>'); */
                    nextdata = 'yes';
                } else {
                    jQuery('#card-grid .card-col:last').after(html);
                    jQuery("#nextdata").attr("data-curentp", start + 1);
                    postclone
                    nextdata = 'no';
                }
            }
        })
    }
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() >= $("#card-grid").height() && nextdata == 'no') {
            nextdata = 'yes';
            $limit = parseInt(jQuery("#nextdata").val());
            $nextpage = parseInt(jQuery("#nextdata").attr("data-curentp"));
            $cityname = jQuery("#nextdata").attr("data-cityname");

            $country = jQuery("#nextdata").attr("data-country");
            $lowcost = jQuery("#nextdata").attr("data-lowcost");
            $highcost = jQuery("#nextdata").attr("data-highcost");
            //getData($limit, $nextpage,$cityname,$country,$lowcost,$highcost)
            //alert(1)     
        }
    });

    setInterval(postadd, 10000);

    function postadd() {
        jQuery.ajax({
            url: "/postclone.php",
            method: "POST",
            dataType: 'html',
            cache: false,
            async: true,
            success: function(html) {

            }
        })
    }

    $('.filter_option').change(function() {

        let currentval = $(this).val();
        $(".filter_option").val('');
        $(this).val(currentval);

        $("#filter-form").submit();

    })
});