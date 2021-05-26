require('../tailwind.css');

$(function () {
  require('./main.scss');
  
  var modalTpl = require('./modal.art');

  $(document).on('click', '.demo', function (e) {
    $(document.body).append(modalTpl);
  });


  console.log('$', $('.demo').hasClass('tw-text-lg'));

});
