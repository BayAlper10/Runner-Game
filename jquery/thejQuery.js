
$(function () {

    //attributes --------------------------------------------------------------
    var $player = $("#player");
    var $playerPosition = $player.position();
    var $enemy = $(".enemy");
    var $enemyLeft = $("#enemyLeft");
    var $enemyRight = $("#enemyRight");
    var $enemyPosition = $enemy.position();
    var $gameStart = false;
    var $gameEnd = false;
    var $screenSize = $("#screen").width();
    var $eSpeed = 16;
    var $eBaseSpeed = 16;
    var $score = $("span");
    var $count = 0;
    var $pSpeed = 25;
    var $pBaseSpeed = 25;
    var $speed = $("#speed > span");
    var $wSpeed = $("#eSpeed > span");
    var $instructions = $("#instructions");
    var timeout;

    //-------------------------------------------------------------------------

    $instructions.delay(500).fadeIn(1000);
    //Move Player -------------------------------------------------------------
    $("#left").on("mousedown touchstart", function(){
        $gameStart = true;
        timeout = setInterval(function(){
            moveLeft();
        }, 65);
    });

    $("#right").on("mousedown touchstart", function(){
        $gameStart = true;
        timeout = setInterval(function(){
            moveRight();
        }, 65);
    });
    /*
    $("#left").click(function(){
        $gameStart = true;
        if(!mouseDown){
            moveLeft();
        }
    });

    $("#right").click(function(){
        $gameStart = true;
        if(!mouseDown){
            moveRight();
        }
    });
    */
    function moveLeft(){
        if ($playerPosition.left >= 1 && $gameEnd === false) {
                $player.css("left", "-=" + $pSpeed);
        }
    }

    function moveRight(){
        $playerPosition = $player.position();
        if ($playerPosition.left + $player.width() <= ($screenSize - 1)
                        && $gameEnd === false) {
                $player.css("left", "+=" + $pSpeed);
        }
    }

    $(document).on("mouseup touchend", function(){
        clearInterval(timeout);
    });

    $(document).keydown(function (e) {
        $gameStart = true;
        $instructions.delay(500).fadeOut(1000);
        $playerPosition = $player.position();
        switch (e.which) {
            case 37: //left
                moveLeft();
                break;

            case 39: //right
                moveRight();
                break;
        }
    });
    //-------------------------------------------------------------------------


    //Move Enemy --------------------------------------------------------------
    function moveEnemy() {
        $enemyPosition = $enemy.position();
        detectCollision();
        $enemy.css("top", "+=" + $eSpeed);
        if ($enemyPosition.top >= 480) {
            $enemy.css("top", "-100px");
            $count += 1;
            $score.html($count);
            $speed.html($pSpeed);
            $wSpeed.html($eSpeed);
            createNewEnemy();
        }
    }
    //-------------------------------------------------------------------------


    //Create Enemy ------------------------------------------------------------
    function createNewEnemy() {
        var $enemyLeftWidth = Math.floor(Math.random() * $screenSize);
        while ($enemyLeftWidth < 75 || $enemyLeftWidth > $screenSize - 75) {
            $enemyLeftWidth = Math.floor(Math.random() * $screenSize);
        }
        var $enemyRightWidth = $screenSize - $enemyLeftWidth;
        $enemyLeft.css("width", $enemyLeftWidth - 51);
        $enemyRight.css("width", $enemyRightWidth - 51);
    }
    // ------------------------------------------------------------------------


    // Detect Collisions ------------------------------------------------------
    function detectCollision() {
        var enemyLeftLoc = $enemyLeft.offset();
        var enemyRightLoc = $enemyRight.offset();
        if (
                (enemyLeftLoc.left + $enemyLeft.width() >= $player.offset().left &&
                        enemyLeftLoc.top + $enemyLeft.height() >= $player.offset().top &&
                        enemyLeftLoc.top <= $player.offset().top + $player.height()) ||
                (enemyRightLoc.left <= $player.offset().left + $player.width() &&
                        enemyRightLoc.top + $enemyRight.height() >= $player.offset().top &&
                        enemyRightLoc.top <= $player.offset().top + $player.height())) {
            $gameEnd = true;
            $player.css("box-shadow", "0px 0px 30px 20px red");
            $player.css("transition", "box-shadow 1s");
        }
    }
    // ------------------------------------------------------------------------

    function reset() {
            $gameStart = false;
            $gameEnd = false;
            $eSpeed = 16.0;
            $eBaseSpeed = 16.0;
            $count = 0;
            $pSpeed = 25.0;
            $pBaseSpeed = 25.0;
            $score.html($count);
            $speed.html($pSpeed);
            $wSpeed.html($eSpeed);
            $enemyLeft.css("left", "0");
            $enemyLeft.css("width", "30%");
            $enemyRight.css("right", "0");
            $enemyRight.css("width", "30%");
            $player.css("left", "45%");
            $enemy.css("top", "0");
            $player.css("box-shadow", "0px 0px 0px 0px red");
            $player.css("background-color", "black");
            $player.css("outline", "0px solid black");
            $("#screen").css("background-color", "white");
            $("body").css("background-color", "white");
            $("#name").css("color", "white");
            $("#rights").css("color", "white");
            $("main > h1").css("color", "black");
            $enemyLeft.css("background-color", "black");
            $enemyRight.css("background-color", "black");
    }
    //Game Loop ---------------------------------------------------------------
    window.setInterval(function () {
        if ($gameStart === true && $gameEnd === false) {
            moveEnemy();
            $eSpeed = ($eBaseSpeed + ($count / 5)).toFixed(1);
            $pSpeed = ($pBaseSpeed + ($count / 10)).toFixed(1);
            if ($count >= 5) {
                $("body").css("background-color", "black");
                $("main > h1").css("color", "white");
                $("#name").css("color", "white");
                $("#rights").css("color", "white");
            }
            if ($count >= 10) {
                $("#screen").css("background-color", "black");
                $player.css("background-color", "white");
                $enemyLeft.css("background-color", "white");
                $enemyRight.css("background-color", "white");
            }
            if ($count >= 20) {
                $player.css("background-color", "black");
                $player.css("outline", "3px solid white");
            }
            if ($count >= 30) {
                $("main > h1").css("color", "rgb(255,215,0)");
                $player.css("outline", "3px solid rgb(255,215,0)");
                $player.css("background-color", "rgb(255,215,0)");
                $enemyLeft.css("background-color", "rgb(255,215,0)");
                $enemyRight.css("background-color", "rgb(255,215,0)");
            }
            if ($count >= 40) {
                $player.css("background-color", "black");
            }
            if($gameEnd){
               setTimeout(reset, 1000);
            }
        }
    }, 50);
    //-------------------------------------------------------------------------
});
