<script type="text/javascript" language="JavaScript">
function checkVoid(el) {
  if(el.value==""){
    el.classList.add('false');
  } else {
    el.classList.add('true');
  }
}

function checkMail() {
  var mail = document.contactForm.mail.value;
  var regMail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

  if (!regMail.test(mail)) {
    document.contactForm.mail.classList.add('false');
    return false;
  }
  else {
    document.contactForm.mail.classList.add('true');
    return true;
  }
}
</script>
