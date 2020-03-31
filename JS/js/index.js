$(document).ready(function() {

  //  animation d'écriture
  (function($) {
    $.fn.writeText = function(content) {
        var contentArray = content.split(""),
            current = 0,
            elem = this;
        setInterval(function() {
            if(current < contentArray.length) {
                elem.text(elem.text() + contentArray[current++]);
            }
        }, 80);
    };
    
  })(jQuery);

  // texte pour l'animation d'écriture
  $("#holder").writeText("LUNA LOISEL--RAMEL");

  // initialisation de wow.js
  new WOW().init();    

  
  // initialisation page plein écran

  $('#fullpage').fullpage({
    scrollBar: true,
    responsiveWidth: 400,
    navigation: true,
    navigationTooltips: ['HOME', 'PARCOURS', 'COMPETENCES','PROJET','CONTACT','RESEAUX SOCIAUX'],
    anchors: ['home', 'parcours', 'competences','projet','contact'],
    menu: '#myMenu',
    fitToSection: false,

    afterLoad: function ( anchorLink, index){
      var loadedSection = $(this);


      //using index
      if(index==1){
        /* add opacity to arrow */
        $('.fa-chevron-down').each(function(){
          $(this).css('opacity','1')
        });
        $('.header-links a').each(function(){
          $(this).css('color','black')
        });
        $('.header-links').css("background-color","transparent");
      }

      else if(index!=1){
        $('.header-links a').each(function(){
          $(this).css('color','black')
        });
        $('.header-links').css('background-color', 'rgba(255,255,255, 0.80)');
      }

      //using index
      if(index == 2){

        /* animation barres de compétences */
        $('.skillbar').each(function(){
          $(this).find('.skillbar-bar').animate({
            width:jQuery(this).attr('data-percent')
          },2500);
        });
      }
    }
  });
 

  // Faire descendre la section
  $(document).on('click', '#moveDown', function(){
    $.fn.fullpage.moveSectionDown();
  });
  // fullpage.js link navigation
  $(document).on('click', '#home', function(){
    $.fn.fullpage.moveTo(1);
  });

  $(document).on('click', '#parcours', function(){
    $.fn.fullpage.moveTo(2);
  });

  $(document).on('click', '#competences', function(){
    $.fn.fullpage.moveTo(3);
  });

  $(document).on('click', '#projet', function(){
    $.fn.fullpage.moveTo(4);
  });

  $(document).on('click', '#contact', function(){
    $.fn.fullpage.moveTo(5);
  });

  // animation page qui défile à chaque coup de souris
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 700);
          return false;
        }
      }
    });
  });



});

// CIRCLE //


let rid = null;
const spring = 0.09;
const friction = 0.8;
let divs = Array.from(document.querySelectorAll(".innerdiv"));

class Chart {
  constructor(path,text,target) {
    this.path = path;
    this.text = text;
    this.text.textContent = target+"%";
    this.R = 10;
    this.start = .01;
    this.divisions = 100;
    this.vel = 0;    
    this.stylePath(target)    
  }
  
  stylePath(target) {
    let d = `M${this.R},0  A${this.R},${this.R} 0 1,1 ${this.R},-.01z`;
    this.path.setAttributeNS(null,"d",d);
    this.pathLength = this.path.getTotalLength();
    this.unit = this.pathLength / this.divisions;
    this.strokeLength = this.start*this.unit;
    this.target = target*this.unit;
    this.path.style.strokeDasharray = `${this.strokeLength},${this.pathLength -
      this.strokeLength}`;
    }
  
    updateStrokeLength() {
    this.dist = this.target - this.strokeLength;
    this.acc = this.dist * spring;
    this.vel += this.acc;
    this.vel *= friction;
    this.strokeLength += this.vel;
    this.path.style.strokeDasharray = `${this.strokeLength},${this.pathLength -
      this.strokeLength}`;
  }  
}

let charts = [];

charts.push(new Chart(aPath,aText,90));
charts.push(new Chart(bPath,bText,80));
charts.push(new Chart(gPath,gText,80));

function Frame() {
  rid = window.requestAnimationFrame(Frame);
  charts.map((c) => c.updateStrokeLength() )
}
Frame();

divs.map((div) =>{
  div.addEventListener("input", function(){  
charts.map((c) => {
 if(isNaN(parseInt(c.text.textContent))){c.text.textContent = 0+"%";}
  if(parseInt(c.text.textContent) > 100) {c.text.textContent = 100+"%";}
  if(rid){window.cancelAnimationFrame(rid)}
  c.target = (parseInt(c.text.textContent) || 0 ) * c.unit;
  if(!c.text.textContent.match("%"))
    {c.text.textContent += "%";}
  Frame();  
});  
});
});