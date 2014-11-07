//*********************** SCHEDULE CODE ******************************
//*******GET SCHEDULE*********************************

    getSchedule();

    function getSchedule() {
        var schedule_url = "http://deen.tv/schedule/?json=1";
        $.getJSON(schedule_url, function(json) {
            var content = json.page['content'];
            $("#schedule_content .scroller").html(content);
        }).fail(function() {
            $("#schedule_content .scroller").html("An error has occured. Please check your internet connection or if you are on airplane mode");
            console.log("error");
        });
    }

    $(document).on("pagecontainershow", function(event, ui) {
        if ($.mobile.activePage.attr('id') == "schedule") {
            displayTodaysSchedule();
        }
        //alert($.mobile.activePage.attr('id'));
    });


    var elements = new Array();

    function displayTodaysSchedule() {

        hideall();



        var day = new Date().getDay();

        switch (day)

        {

            case 0:

                document.getElementById("sun").style.display = "block";

                document.getElementById('selectOpt').options[0].selected = true;

                break;

            case 1:

                document.getElementById("mon").style.display = "block";

                document.getElementById('selectOpt').options[1].selected = true;

                break;

            case 2:

                document.getElementById("tue").style.display = "block";

                document.getElementById('selectOpt').options[2].selected = true;

                break;

            case 3:

                document.getElementById("wed").style.display = "block";

                document.getElementById('selectOpt').options[3].selected = true;

                break;

            case 4:

                document.getElementById("thu").style.display = "block";

                document.getElementById('selectOpt').options[4].selected = true;

                break;

            case 5:

                document.getElementById("fri").style.display = "block";

                document.getElementById('selectOpt').options[5].selected = true;

                break;

            case 6:

                document.getElementById("sat").style.display = "block";

                document.getElementById('selectOpt').options[6].selected = true;;

                break;

        }

    }



    function hideall() {

        elements = document.getElementsByClassName("2014schedule");

        for (var i = 0; i < elements.length; i++) {

            elements[i].style.display = "none";

        }

    }



    function jsFunction() {

        hideall();

        var myselect = document.getElementById("selectOpt");
        document.getElementById(myselect.options[myselect.selectedIndex].value).style.display = "block";

    }

    function refreshPage(page) {

        $.mobile.changePage(page, {
            allowSamePageTransition: true,
            transition: 'none',
            showLoadMsg: false,
            reloadPage: true
        });
        //alert("refresh");
    }
