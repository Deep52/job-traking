// Department dynamically 
$(document).ready(function() {
    // $("#Department").on('click', function() {
    $.ajax({
        type: 'POST',
        url: '/dept',
        // data: data,
        contentType: "application/json",
        dataType: "json"
    }).done(function(data) {

        //x.removeChild();
        // x.innerHTML = '';
        var x = document.getElementById("Department");
        x.innerHTML = '';
        $.each(data, function(i, d) {
            // $('#Department').append('<option value="' + d.id + '" id="dept" onclick="course(' + d.id + ')">' + d.dept_full_name + '</option>');
            // var opt = '<option value="' + d.id + '" id="dept" onclick="course(' + d.id + ')">' + d.dept_full_name + '</option>';
            var opt = document.createElement('option');
            opt.value = d.dept_full_name;
            opt.id = "dept";
            opt.innerHTML = d.dept_full_name;
            x.append(opt);


            //x.add(opt);


        });


    });

    //});
    //$('#Department').on('change', function() {
    //  var val = $(this).val();

    //alert(value);
    // Course dynamically
    $.ajax({
        type: 'POST',
        url: '/course',
        //   data: {
        //    "value": val,
        // },
        //   contentType: "application/json",
        dataType: "json",
    }).done(function(data) {
        var x = document.getElementById("course");
        x.innerHTML = '';
        // alert(data);
        $.each(data, function(i, c) {
            var opt = document.createElement('option');
            opt.value = c.course_full_name;
            opt.id = "course";
            opt.innerHTML = c.course_full_name;
            x.append(opt);
            // alert(c.couse);

        });
        $("#confirm-password").focusout(function() {

            var p_val = $('#password').val();
            var c_val = $(this).val();
            if (p_val == c_val) {
                $('#error').text('Password is Match');
                $("#error").css({ 'color': 'green' });
                $("#error").css({ 'text-align': 'center' });
                return true;

            } else {
                $('#error').text('Password don`t Match');
                $("#error").css({ 'color': 'Red' });
                $("#error").css({ 'text-align': 'center' });
                return false;


            }
            // alert(val);
        });



    });


    //});
});