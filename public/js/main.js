$(document).ready(function() {
    $("#Department").on('click', function() {
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

                opt.value = d.id;
                opt.id = "dept";
                opt.innerHTML = d.dept_full_name;
                x.append(opt);


                //x.add(opt);


            });


        });

    });
    $('#Department').on('change', function() {
        var value = $(this).val();
        // alert(value);
    });
});