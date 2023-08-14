document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.btn-content-change');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            changeContent(this.getAttribute('data-content-type'));
        });
    });
    const slider = document.getElementById('slider');

    if (slider) {
        slider.addEventListener('input', function() {
            updateSliderValue(this.value);
        });
    }
});


function changeContent(contentType) {
    const cardContent = document.getElementById('utility-description');

    if (contentType === 'content-phone') {
        cardContent.innerHTML = '<strong> How much energy does it take to charge a phone? </strong> <br>Charging your phone one time requires <strong>5 W</strong>.<br><br>If you were to charge your phone once a day for a month, you would use <strong>0.15 kWh</strong>.<br><br> If you charge your phone once a day for a year, you would use <strong>1.83 kWh</strong>.';
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