$(document).ready(function() {
    $("#Department").on('click', function() {
        $.ajax({
            type: 'POST',
            url: '/dept',
            // data: data,
            contentType: "application/json",
            dataType: "json"
        }).done(function(data) {
            let options = '';
            //alert('1');
            $.each(data, function(i, d) {
                var x = document.getElementById("Department");
                var opt = document.createElement('option');
                opt.value = d.id;
                opt.id = "dept";

                opt.innerHTML = d.dept_full_name;
                x.appendChild(opt);
                // x.add(opt);


            });

        });
    });

});