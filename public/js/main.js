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
            // $('#Department_course').append('<option value="' + d.id + '" id="dept" onclick="course(' + d.id + ')">' + d.dept_full_name + '</option>');
            // var opt = '<option value="' + d.id + '" id="dept" onclick="course(' + d.id + ')">' + d.dept_full_name + '</option>';
            var opt = document.createElement('option');
            opt.value = d.dept_full_name;
            opt.id = "dept";
            opt.innerHTML = d.dept_full_name;
            x.append(opt);


            //x.add(opt);


        });


    });




    $.ajax({
        type: 'POST',
        url: '/dept',
        // data: data,
        contentType: "application/json",
        dataType: "json"
    }).done(function(data) {

        //x.removeChild();
        // x.innerHTML = '';
        var x1 = document.getElementById("Department_course");
        x1.innerHTML = '';

        $.each(data, function(i, d) {
            // $('#Department_course').append('<option value="' + d.id + '" id="dept" onclick="course(' + d.id + ')">' + d.dept_full_name + '</option>');
            // var opt = '<option value="' + d.id + '" id="dept" onclick="course(' + d.id + ')">' + d.dept_full_name + '</option>';
            var opt1 = document.createElement('option');
            opt1.value = d.id;
            opt1.id = "dept1";
            opt1.innerHTML = d.dept_full_name;
            x1.append(opt1);


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
        var x_c = document.getElementById("course");
        x_c.innerHTML = '';
        // alert(data);
        $.each(data, function(i, c) {
            var opt_c = document.createElement('option');
            opt_c.value = c.course_full_name;
            opt_c.id = "course";
            opt_c.innerHTML = c.course_full_name;
            x_c.append(opt_c);
            // alert(c.couse);

        });
        $("#password").click(function() {
            $('#error_display').text('');

        });
        $("#confirm-password").focusout(function() {

            var p_val = $('#password').val();
            var c_val = $(this).val();
            if (p_val == c_val) {
                $('#error').text('Password is Match');
                $("#error").css({ 'color': 'green' });
                $("#error").css({ 'text-align': 'center' });
                //return true;

            } else {
                $('#error').text('Password don`t Match');
                $("#error").css({ 'color': 'Red' });
                $("#error").css({ 'text-align': 'center' });
                // return false;


            }
            // alert(val);
        });



    });
    $(".adminacces").click(function() {
        var id = $(this).attr("id");
        let access = $(this).val();
        type = id.split("-");
        //alert(dd[0]);
        $.ajax({
            type: 'POST',
            url: '/accesbyadmin',
            data: {
                "id": type[1],
                "access": access,
                "type": type[0],
            },
            // contentType: "application/json",
            dataType: "json"
        }).done(function(data) {
            $.each(data, function(i, u) {
                $('.' + id).val(u.typebyadmin);
                //alert(u.typebyadmin);
                // alert(id);
            });





        });
    });
});