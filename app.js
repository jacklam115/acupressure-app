document.addEventListener('DOMContentLoaded', function(){
  var page = document.body.getAttribute('data-page');
  document.querySelectorAll('.tab').forEach(function(t){
    if (t.getAttribute('data-tab') === page) t.classList.add('on');
  });
});
