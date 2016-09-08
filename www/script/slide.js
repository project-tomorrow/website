<script type="text/javascript" language="JavaScript">

  function GoToSlide(num){
    el1 = Sladelist[i],
    el2 = Sladelist[num];
    if(el1.classList.contains("right")) el1.className = "diapo left";
    else if(el1.classList.contains("left")) el1.className = "diapo right";
    el2.classList.add("in");
    Buttonlist[i].className = "round";
    Buttonlist[num].classList.add("selected");
    i=num;
  }

  function PreviousSlide(){
    j=Math.abs(i-1)%Sladelist.length;
    GoToSlide(j);
  }

  function NextSlide(){
    j=(i+1)%Sladelist.length;
    GoToSlide(j);
  }

  function SlidePlay(){
    if(i<Sladelist.length){
      NextSlide();
    }
  }

  function SlideStop(){
    window.clearInterval(play);
  }

  function SlideStart(){
    Sladelist[0].classList.add("in");
    Buttonlist[0].classList.add("selected");
    window.setTimeout(function(){
      play = window.setInterval(SlidePlay,tempo);
    },tempo);
  }

  var Sladelist = document.getElementsByClassName("diapo");
  var Buttonlist = document.getElementById("scroll-bar-diapo").getElementsByClassName("round");
  var i = 0;
  var tempo = 2000;
  var play;
  //Calls the init function on pageload.
  onload=SlideStart;

</script>
