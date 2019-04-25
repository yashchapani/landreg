
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
                $(".modal-title").html("Issued Transaction");
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
                $(".modal-title").html("Transaction Completed");
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
                $(".modal-title").html("Queried Result");
            },
            error: function (xhr, status) {
                console.log(xhr);
            }
        });
    }

});

// $("#search").click(function () {
//     var check = true;
//     if ($(pan).val().trim() == '' && $(name).val().trim() == '' &&
//         $(aadhaar).val().trim() == '' && $(address).val().trim() == '') {
//         showValidate(pan);
//         showValidate(name);
//         showValidate(address);
//         showValidate(aadhaar);
//         check = false;
//     }
//     var panNum = $("#pan").val();
//     var nameVal = $("#name").val();
//     var addressVal = $("#address").val();
//     var aadhaarVal = $("#aadhaar").val();
//     console.log(check);
//     var tim = 1;
//     if (check == true) {
//         $.post("process.jsp",
//             {
//                 pan: panNum,
//                 name: nameVal,
//                 address: addressVal,
//                 aadhaar: aadhaarVal

//             },
//             function (response, status) {
//                 if (status == "success") {
//                     //populating content row
//                     tim = response[1][0].time;
//                     response = response[0];
//                     var content = '';

//                     for (var i = 0; i < response.length; i++) {
//                         var trans_id = '<tr><td>' + response[i].transactionId + '</td>';
//                         var pdf_link = '<td><a href = "' + response[i].pdfLink + '" target="_blank">Click Here To Download Pdf</a></td></tr>';

//                         content += trans_id + pdf_link;
//                     }

//                     $("#content-tbody").html(content);
//                     $("#myModal").modal('show');
//                     $(".modal-title").html("Transaction details for the given parameters obtained in " + tim + "s ");
//                 }

//             }
//         );

//         // setting the header of modal

//     }



//     return check;
// });


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
