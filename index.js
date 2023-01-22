$(document).ready(() => {
    const buttons = document.querySelectorAll(".block__button");
    const iconsBlock = document.getElementsByClassName('block-icons__item');

    for (let button of buttons) {
        $(button).on('click', () => {
            $('#myModal').modal('toggle')
            iconsFunc(button.getAttribute("id"));
        })
        $('.close').on('click', () => {
            $('#myModal').modal('toggle')
        })
    }

    fetch('http://82.142.87.102/extAPI/api/icon/read.php?parent=2')
    .then((response) => response.json())
    .then((data) => (data.map((item) => (
        $(".block-icons").append(`<div class='block-icons__item'>
                                    <img class='block-icons__icon' data-id='${item.id}' src='https://eletak.oresi.cz/files/Icons/CZ/${item.filename}' />
                                    <span class='block-icons__name'>${item.name}</span>
                                </div>`)))));

    function iconsFunc(numButton) {
        for (let icon of iconsBlock) {
            $(icon).click(() => {
                const newIconSrc = icon.children[0].getAttribute("src");
                const newIconId = icon.children[0].getAttribute("data-id");
                $(`#${numButton}`).html(`<img class='block-icons__icon' data-id='${newIconId}' src='${newIconSrc}' />`)
                $(`#${numButton}`).attr('data-icon', newIconId);
                $("#search-input").text("")
                $('#myModal').modal('toggle')
                numButton = 0
            });
        }
    }


    $("#search-input").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        let selectedOption = $(".form-select").val();
    
        if (selectedOption === "1") {
            $(".block-icons__item").filter(function() {
            $(this).toggle($(this).find(".block-icons__name").text().toLowerCase().indexOf(value) > -1);
          });
        } else if (selectedOption === "energie") {
            $(".block-icons__item").filter(function() {
            $(this).toggle($(this).find(".block-icons__name").text().toLowerCase().indexOf(value) > -1 && $(this).find(".block-icons__name").text().toLowerCase().indexOf("energie") > -1);
          });
        }
      });

      $(".form-select").on("change", function() {
        let value = $("#search-input").val().toLowerCase();
        let selectedOption = $(this).val();
        
        if (selectedOption === "1") {
            $(".block-icons__item").filter(function() {
            $(this).toggle($(this).find(".block-icons__name").text().toLowerCase().indexOf(value) > -1);
          });
        } else if (selectedOption === "energie") {
            $(".block-icons__item").filter(function() {
                $(this).toggle($(this).find(".block-icons__name").text().toLowerCase().indexOf(value) > -1 && $(this).find(".block-icons__name").text().toLowerCase().indexOf("energie") > -1);
          });
        }
      });
});

