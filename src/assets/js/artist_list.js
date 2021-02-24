
if (window.screen.width > 479) {
    function hover_arist_name(id_parent, id_child){
        var loading_speed = 100;
        var deloading_speed = 90;
        var kids_reverseds = [].reverse.call($(id_child).children());
        var kids = $(id_child).children();

        var isHovered = $(id_parent).is(':hover');
        if (isHovered == true) {
            //console.log('load');
            startLoadingImages();
        } else {
            //console.log('delete');
            stopLoadingImages();
        }

        function stopLoadingImages(){
            // var kits = kids.reverse();
            // console.log(kits);
            $.each(kids, function (i, kid) {
                setTimeout(function () {
                    $(kid).css('display', 'none');
                }, i * deloading_speed);
            })
        }

        function startLoadingImages(){
            $.each(kids_reverseds, function (i, kids_reversed) {
                setTimeout(function () {
                    var isHovered = $(id_parent).is(':hover'); // returns true or false
                    if (isHovered == true) {
                        //console.log('display i:' + i );
                        $(kids_reversed).css('display', 'inline-block');
                    } else {
                        //stopLoadingImages();
                        //console.log('stop loading:' + i );
                    }
                }, i * loading_speed);
            })
        }
    }
}