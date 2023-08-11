$("#kwh_btn").click(function(){
    $("kwh_btn").hide();
  });
  
  
  function changeContent(contentType) {
    const cardContent = document.getElementById('card-content');
  
    if (contentType === 'content-phone') {
      cardContent.innerHTML = 'This is phone ';
    } else if (contentType === 'content-shower') {
      cardContent.innerHTML = 'This is shower ';
    } else if (contentType === 'content-bulb') {
        cardContent.innerHTML = 'This is bulb ';
    } else if (contentType === 'content-washer') {
        cardContent.innerHTML = 'This is washer ';
    } 
  }
  
  function updateSliderValue(value) {
    const sliderValueSpan = document.getElementById('slider-value');
    sliderValueSpan.textContent = value;
  }