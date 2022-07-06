$(document).ready(function() {
    $("#Department").on('click', function() {
        $.ajax({
            type: 'POST',
            url: '/dept',
            // data: data,
            dataType: 'text'
        }).done(function(data) {
            alert(data)
                // document.getElementById("fill").innerHTML = data;

        });
    });
});