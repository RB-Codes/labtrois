'use strict';
let hornsArr = [];


// constructor attempt
function Horn(hornObj) {
  for (const key in hornObj) {
    this[key] = hornObj[key];
  }
}




Horn.prototype.render = function () {
  let template = $('#musTem').html();
  let html = Mustache.render(template, this);
  return html;
}




const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};


$.ajax('data/page-2.json', ajaxSettings).then((data) => {
  let list = [];
  data.forEach((getKeyword) => {
    if (list.indexOf(getKeyword.keyword) === -1) {
      list.push(getKeyword.keyword);
      $('#menu').append(
        $('<option/>')
          .attr('value', getKeyword.keyword)
          .text(getKeyword.keyword)
      );
    }
  });
  $('select').change(function () {
    $('div').hide();
    let str = [];
    $('select option:selected').each(function () {
      str.push($(this).val());
      for (let i = 0; i < hornsArr.length; i++) {
        console.log(hornsArr[i].keyword)
        if ($(this).val() === hornsArr[i].keyword) {
          $(`.${$(this).val()}`).show();
        } else {
          console.log('what the');
        }
      }
    });
  });
});

$.ajax('data/page-2.json', ajaxSettings).then((data) => {


  data.forEach(hornObj => {
    hornsArr.push(new Horn(hornObj));

    // console.log(hornObj);
  });

  hornsArr.forEach((hornObj,index) => {
    index=index+2;
    
    $('#horn-main').append(hornObj.render());
    $(`#horn-main div:first`).attr('class', 'jackalope');
  });


  for (let i=1;i<hornsArr.length;i++){
    console.log(i,hornsArr[i].keyword);
    console.log($(`#horn-main div:nth-child(${i})`));

     $(`#horn-main div:nth-child(${i+3})`).attr('class', (hornsArr[i].keyword));

  }


});

