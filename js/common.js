/**
 * Open the current clicked menu and close the other menus
 * @param {object} event - The DOM event
 */
function openMenu(event) {
    event.stopPropagation();
    event.preventDefault();

    var currentDropDownButton = event.target;
    var currentDropDownMenu =
        currentDropDownButton.parentNode.querySelector('.dropdown-menu');
    var isOpen = currentDropDownMenu.classList.contains('show');
    var dropDownMenus =
        document.querySelectorAll('#nav-bar-content .dropdown .dropdown-menu');
    for (var j = 0; j < dropDownMenus.length; j++) {
        dropDownMenus[j].classList.remove('show');
    }

    if (!isOpen) {
        currentDropDownMenu.classList.add('show');
    }
}

/**
 * Toggle the navigation content
 * @param {object} event - The DOM event
 */
function toggleNavigation(event) {
    event.stopPropagation();
    event.preventDefault();

    var content = document.getElementById('nav-bar-content');
    if (content.classList.contains('collapse')) {
        content.classList.remove('collapse');
    } else {
        content.classList.add('collapse');
    }
}

// increases the font size
function increaseFontSize() {
  var current = parseInt($('html').css("font-size"), 10);
  $('html').css("font-size", current + 1 + "px");
}

// decreases the font size
function decreaseFontSize() {
  var current = parseInt($('html').css("font-size"), 10);
  if (current >= 2) {
    $('html').css("font-size", current - 1 + "px");
  }
}

// Changes the aria-expanded attribute of a dropdown menu
function changeExpanded(id) {
  var current = $('#'+ id).attr("aria-expanded");
  if (current == "true") {
    $('#'+ id).attr("aria-expanded","false");
  } else {
    $('#'+ id).attr("aria-expanded","true");

    // Add EventListener to unfocus when not dropdown-item anymore
    document.addEventListener('focusin', function(e) {
      focusMenu(e, id);
    }, false);
  }
}

// Unfocuses as soon as focused element is not a dropdown-item anymore
function focusMenu(event, id){
    if(!event.target.classList.contains('dropdown-item')){
        $('#'+ id).attr("aria-expanded", "false");
        $("ul.dropdown-menu.show").each(function( index ) {
            $( this ).removeClass("show");
        });
        document.removeEventListener('focusin', focusMenu);
    }
}

// Closes dropdown menus on escape key and sets aria-expaned accordingly
document.addEventListener('keydown', (event) => {
       if (event.key === 'Escape') {
           const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
           if (isNotCombinedKey) {
               $("[aria-expanded='true']").each(function( index ) {
                   $( this ).attr("aria-expanded","false");
                });
                $("ul.dropdown-menu.show").each(function( index ) {
                    $( this ).removeClass("show");
                });
           }
       }
   });

// Function that let's every a-tag with role=button be activated using the spacebar. Also checks that dropdown menu is activated when neccessary
$(function() {
  $("a[role='button']").on('keyup', function(e) {
      if (e.which === 32) {
        console.log("here ");
        e.preventDefault();
        if($(this).hasClass( "dropdown-toggle" )){
          $(this).click();
          $(this).dropdown('toggle');
        }
        window.location = e.target.href;
      }
  });
});

// document.addEventListener('focusin', onFocus);
//
// function onFocus(e) {
//   if(!$('#nav-bar-faculties > .dropdown-menu').find(e.target).length) {
//     // $('.dropdown-menu').fadeToggle();
//     // $('.dropdown-menu').toggleClass("open");
//       alert();
//         document.removeEventListener('focusin', onFocus);
//   }
// }


document.addEventListener('DOMContentLoaded', function() {
    var dropDownToggles =
        document.querySelectorAll('#nav-bar-content .dropdown-toggle');

        for (var i = 0; i < dropDownToggles.length; i++) {
        dropDownToggles[i].addEventListener('click', openMenu, false);
    }

    document.querySelector('.navbar-toggler')
        .addEventListener('click', toggleNavigation, false);
}, false);
