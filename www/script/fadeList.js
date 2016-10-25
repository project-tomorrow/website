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
    inc = (inc+1)%(fadelist.length);
    fadeIn(fadelist[inc]);
  }

  var fadelist = document.getElementsByClassName("fade-el");
  var inc = 0;
</script>
