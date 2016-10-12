<script type="text/javascript" language="JavaScript">

  function GoToSlide(num){
//    diaporama.scrollTo(0,Sladelist[num].offsetTop);
    var startY = diaporama.scrollTop;
    var stopY = Sladelist[num].offsetTop;
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 50) {
          scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if  (speed >= 20) speed = 20;
    var step = Math.round(distance / 50);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("diaporama.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("diaporama.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
  }

  function detectFocused(){
    var i=0;
    for (;(Sladelist[i].offsetTop+Sladelist[i].offsetHeight) < (diaporama.scrollTop+150);) i++;
    Buttonlist[SladeNumber].className = "round";
    Buttonlist[i].classList.add("selected");
    Buttonlist[SladeNumber].children[0].src = "diapo-nav/" + (i+1) + ".png";
    Buttonlist[i].children[0].src = "diapo-nav/sel-" + (i+1) + ".png";
    SladeNumber=i;
  }

  var diaporama = document.getElementById("diaporama");
  var Sladelist = document.getElementsByClassName("diapo");
  var Buttonlist = document.getElementById("scroll-bar-diapo").getElementsByClassName("round");
  var i = 0;
  var SladeNumber=0;
</script>
