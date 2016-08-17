<script type="text/javascript" language="JavaScript">

  function fadeIn(el){
    el.className = "fade-In";
    window.setTimeout(fadeOut,2000,el);
  }

  function fadeOut(el){
    el.className = "fade-Out";
    window.setTimeout(fadeNon,1000,el);
  }

  function fadeNon(el){
    el.className  = "fade-el";
    fadeTab(el);
  }

  function fadeTab(){
    i = (i+1)%(fadelist.length);
    fadeIn(fadelist[i]);
  }

  var fadelist = document.getElementsByClassName("fade-el");
  var i = 0;
  //Calls the init function on pageload.
  onload=fadeTab;

</script>
