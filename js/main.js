
/*==================================================================
[ Focus Contact2 ]*/
$('.input2').each(function () {
    // console.log("yo");
    $(this).on('blur', function () {
        if ($(this).val().trim() != "") {
            $(this).addClass('has-val');
        }
        else {
            $(this).removeClass('has-val');
        }
    })
})



/*================================================================== */


$("#issue-paper").click(function () {
    var desc = $('#section1 .validate-input input[name="desc"]');
    var price = $('#section1 .validate-input input[name="price"]');
    var area = $('#section1 .validate-input input[name="area"]');

    var check = true;
    if ($(desc).val().trim() == '') {
        showValidate(desc);
        check = false;
    }
    if ($(price).val().trim() == '') {
        showValidate(price);
        check = false;
    }
    if ($(area).val().trim() == '') {
        showValidate(area);
        check = false;
    }
    console.log(check);

    if (check) {


        var descVal = desc.val().trim();
        var priceVal = price.val().trim();
        var areaVal = area.val().trim();

        var data = JSON.stringify({
            name: "issue",
            desc: descVal,
            price: priceVal,
            area: areaVal
        });

        $.ajax({
            url: "http://localhost:3000",
            type: "POST",
            data: data,
            dataType: "json",
            success: function (response) {
                var modalData = "";
                for (var key in response) {
                    modalData += key + " : " + response[key] + "<br>";
                }
                $(".modal-body").html(modalData);
                $("#myModal").modal('show');
                $(".modal-title").html("Issued Land in " + response["time"] + " ms");
            },
            error: function (xhr, status) {
                console.log(xhr);
            }
        });
    }

});


$("#sell").click(function () {
    var id = $('#section2 .validate-input input[name="id"]');
    var price = $('#section2 .validate-input input[name="price"]');
    var cowner = $('#section2 .validate-input input[name="cowner"]');
    var nowner = $('#section2 .validate-input input[name="nowner"]');

    var check = true;
    if ($(id).val().trim() == '') {
        showValidate(id);
        check = false;
    }
    if ($(price).val().trim() == '') {
        showValidate(price);
        check = false;
    }
    if ($(cowner).val().trim() == '') {
        showValidate(cowner);
        check = false;
    }
    if ($(nowner).val().trim() == '') {
        showValidate(nowner);
        check = false;
    }
    console.log(check);

    if (check) {


        var idVal = id.val().trim();
        var priceVal = price.val().trim();
        var cownerVal = cowner.val().trim();
        var nownerVal = nowner.val().trim();

        var data = JSON.stringify({
            name: "sell",
            id: idVal,
            price: priceVal,
            cowner: cownerVal,
            nowner: nownerVal
        });

        $.ajax({
            url: "http://localhost:3000",
            type: "POST",
            data: data,
            dataType: "json",
            success: function (response) {
                var modalData = "";
                for (var key in response) {
                    modalData += key + " : " + response[key] + "<br>";
                }
                $(".modal-body").html(modalData);
                $("#myModal").modal('show');
                $(".modal-title").html("Transaction Completed in " + response["time"] + " ms");
            },
            error: function (xhr, status) {
                console.log(xhr);
            }
        });
    }

});


$("#search").click(function () {
    var id = $('#section3 .validate-input input[name="id"]');
    var cowner = $('#section3 .validate-input input[name="cowner"]');
    var area = $('#section3 .validate-input input[name="area"]');

    var check = true;
    if ($(id).val().trim() == '' && $(cowner).val().trim() == '' && $(area).val().trim() == '') {
        showValidate(id);
        showValidate(cowner);
        showValidate(area);
        check = false;
    }
    console.log(check);

    if (check) {


        var idVal = id.val().trim();
        var cownerVal = cowner.val().trim();
        var areaVal = area.val().trim();

        var data = JSON.stringify({
            name: "query",
            id: idVal,
            cowner: cownerVal,
            area: areaVal
        });

        $.ajax({
            url: "http://localhost:3000",
            type: "POST",
            data: data,
            dataType: "json",
            success: function (response) {
                var modalData = "";
                for (var key in response) {
                    modalData += key + " : " + response[key] + "<br>";
                }
                $(".modal-body").html(modalData);
                $("#myModal").modal('show');
                $(".modal-title").html("Queried Result shown in " + response["time"] + " ms");
            },
            error: function (xhr, status) {
                console.log(xhr);
            }
        });
    }

});


$('.input2').each(function () {
    $(this).focus(function () {
        $('.input2').each(function () {
            hideValidate(this);
        });
    });
});

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}
