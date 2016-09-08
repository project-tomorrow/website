<script type="text/javascript" language="JavaScript">

  function SlideIn(el){
    el.classList.add("in");
    window.setTimeout(SlideOut,2000,el);
  }

  function SlideOut(el){
    if(el.classList.contains("right")) el.className = "diapo left";
    else if(el.classList.contains("left")) el.className = "diapo right";
    SlideTab();
    //window.setTimeout(SlideT,1000,el);
  }

  function GoToSlide(num){

  }

  function PreviousSlide(dir){
    j=(i-1)%Sladelist.length;
    GoToSlide(j);
  }

  function NextSlide(dir){
    j=(i+1)%Sladelist.length;
    GoToSlide(j);
  }

  function SlideTab(){
    if(i<Sladelist.length)  SlideIn(Sladelist[i++]);
  }

  var Sladelist = document.getElementsByClassName("diapo");
  var i = 0;
  //Calls the init function on pageload.
  onload=SlideTab;

</script>
