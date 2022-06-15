//Random quote generator function
let quote = "";
let apiUrl = "https://type.fit/api/quotes";
const api_key = "c_XkgSCIgq34agYtWGjpx-33g5-UuBLT5awrCmguk2g"
async function getJson(url) {
  let random = Math.floor(Math.random() * 10);
  const promise = new Promise((resolve, reject) => {
    fetch(`https://api.unsplash.com/search/photos?query=motivational&client_id=${api_key}`)
      .then(response => response.json())
      .then((data) => {
        const promise = new Promise((resolve, reject) => {
          let image = data.results[random];
          console.log(image.urls.regular);
          resolve(`<div><div class='moti_title'>Here's a quote to keep you motivated:</div>
    <span class='moti_qoute'>
        <img src="${image.urls.small}" alt="" srcset="">
    </span> </div>`);

        })
        return promise;
      }).then(x => {
        resolve(x)
      });
  })
  return promise
}
async function DailyQuotes() {
  quote = await getJson(apiUrl)
}
DailyQuotes();
//Random quote generated

(function (root, factory) {

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = factory(root, exports);
    }
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function (exports) {
      root.Lockr = factory(root, exports);
    });
  } else {
    root.Lockr = factory(root, {});
  }

}(this, function (root, Lockr) {
  'use strict';

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
      var len = this.length >>> 0;

      var from = Number(arguments[1]) || 0;
      from = (from < 0) ?
        Math.ceil(from) :
        Math.floor(from);
      if (from < 0)
        from += len;

      for (; from < len; from++) {
        if (from in this &&
          this[from] === elt)
          return from;
      }
      return -1;
    };
  }

  Lockr.prefix = "";

  Lockr._getPrefixedKey = function (key, options) {
    options = options || {};

    if (options.noPrefix) {
      return key;
    } else {
      return this.prefix + key;
    }

  };

  Lockr.set = function (key, value, options) {
    var query_key = this._getPrefixedKey(key, options);

    try {
      localStorage.setItem(query_key, JSON.stringify({
        "data": value
      }));
    } catch (e) {
      if (console) console.warn("Lockr didn't successfully save the '{" + key + ": " + value + "}' pair, because the localStorage is full.");
    }
  };

  Lockr.get = function (key, missing, options) {
    var query_key = this._getPrefixedKey(key, options),
      value;

    try {
      value = JSON.parse(localStorage.getItem(query_key));
    } catch (e) {
      if (localStorage[query_key]) {
        value = {
          data: localStorage.getItem(query_key)
        };
      } else {
        value = null;
      }
    }
    if (value === null) {
      return missing;
    } else if (typeof value === 'object' && typeof value.data !== 'undefined') {
      return value.data;
    } else {
      return missing;
    }
  };

  Lockr.sadd = function (key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
      json;

    var values = Lockr.smembers(key);

    if (values.indexOf(value) > -1) {
      return null;
    }

    try {
      values.push(value);
      json = JSON.stringify({
        "data": values
      });
      localStorage.setItem(query_key, json);
    } catch (e) {
      console.log(e);
      if (console) console.warn("Lockr didn't successfully add the " + value + " to " + key + " set, because the localStorage is full.");
    }
  };

  Lockr.smembers = function (key, options) {
    var query_key = this._getPrefixedKey(key, options),
      value;

    try {
      value = JSON.parse(localStorage.getItem(query_key));
    } catch (e) {
      value = null;
    }

    if (value === null)
      return [];
    else
      return (value.data || []);
  };

  Lockr.sismember = function (key, value, options) {
    var query_key = this._getPrefixedKey(key, options);

    return Lockr.smembers(key).indexOf(value) > -1;
  };

  Lockr.keys = function () {
    var keys = [];
    var allKeys = Object.keys(localStorage);

    if (Lockr.prefix.length === 0) {
      return allKeys;
    }

    allKeys.forEach(function (key) {
      if (key.indexOf(Lockr.prefix) !== -1) {
        keys.push(key.replace(Lockr.prefix, ''));
      }
    });

    return keys;
  };

  Lockr.getAll = function () {
    var keys = Lockr.keys();
    return keys.map(function (key) {
      return Lockr.get(key);
    });
  };

  Lockr.srem = function (key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
      json,
      index;

    var values = Lockr.smembers(key, value);

    index = values.indexOf(value);

    if (index > -1)
      values.splice(index, 1);

    json = JSON.stringify({
      "data": values
    });

    try {
      localStorage.setItem(query_key, json);
    } catch (e) {
      if (console) console.warn("Lockr couldn't remove the " + value + " from the set " + key);
    }
  };

  Lockr.rm = function (key) {
    localStorage.removeItem(key);
  };

  Lockr.flush = function () {
    if (Lockr.prefix.length) {
      Lockr.keys().forEach(function (key) {
        localStorage.removeItem(Lockr._getPrefixedKey(key));
      });
    } else {
      localStorage.clear();
    }
  };
  return Lockr;

}));

var array1 = [];
const saAddSite = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Add custom Site",
    html:
      '<div style="font-family:Product Sans; letter-spacing:1px; margin:0;">' +
      '<input id="inputSiteName" class="swal2-input" placeholder="Name" autofocus style:"height: 2.625em; padding: 0 25px; background: #1f1f1f;">' +
      ' <p style="display: none; margin-top: 4px; margin-left: 3px;" id="erro"></p>' +
      "<br/>" +
      '<input type="url" id="inputSiteLink" class="swal2-input" placeholder="Link" autofocus>' +
      '<p style="display: none; margin-top: 4px; margin-left: 3px;" id="error"></p>' +
      "</div>",
    background: "#353535",
    color: "white",
    focusConfirm: false,
    preConfirm: () => {
      if (!document.getElementById("inputSiteLink").value.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )) {
        Swal.showValidationMessage(
          '<i class="fa fa-info-circle"></i> Invalid URL'
        );
      }
      if (!document.getElementById("inputSiteName").value){
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle" style="font-family:Product sans"></i> Please Enter the Site Name'
          );
      }
      return [
        document.getElementById("inputSiteName").value,
        document.getElementById("inputSiteLink").value,
      ];
    },
  });

  if (formValues) {
    array1 = formValues;
    addSite();

    // Swal.fire(JSON.stringify(formValues));
  }
  console.log("aaaa", array1);
};
const addSite = () => {
  var site = array1[0];
  var site_link = array1[1];
  var flaglink = 0,
    flagname = 0;
  if (site_link.trim() === "") {
    flaglink = 1;
  }
  if (site.trim() === "") {
    flagname = 1;
  } else if (~!site_link.indexOf("http")) {
    site_link = "http://" + site_link;
  }

  /* Check if the url entered is valid or not using a regex */
  function ValidUrl() {
    UrlEntered = site_link;
    result = UrlEntered.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return result;
  }

  if (flaglink != 1 && flagname != 1 && ValidUrl()) {
    Lockr.sadd("customSites", [site, site_link]);
    addGridElement(site, site_link);
    document.getElementById("error").innerHTML = "";
    document.getElementById("error").style.display = "hidden";
    document.getElementById("erro").innerHTML = "";
    document.getElementById("erro").style.display = "hidden";
    document.getElementById("SiteLink").value = "";
    document.getElementById("SiteName").value = "";
    $("#mm1").modal("toggle");
  } else if (flaglink === 1 && flagname != 1) {
    document.getElementById("error").innerHTML =
      "<p style='color:#FF0000;font-family:Product Sans'>ERROR: Incorrect website URL</p>";
    document.getElementById("error").style.display = "block";
    document.getElementById("erro").innerHTML = "";
    document.getElementById("erro").style.display = "hidden";
  } else if (!ValidUrl() && flagname != 1) {
    document.getElementById("error").innerHTML =
      "<p style='color:#FF0000;font-family:Product Sans'>ERROR: Incorrect website URL</p>";
    document.getElementById("error").style.display = "block";
    document.getElementById("erro").innerHTML = "";
    document.getElementById("erro").style.display = "hidden";
  } else if (flagname === 1 && flaglink != 1) {
    document.getElementById("erro").innerHTML =
      "<p style='color:#FF0000;font-family:Product Sans''>ERROR: No label provided</p>";
    document.getElementById("erro").style.display = "block";
    document.getElementById("error").innerHTML = "";
    document.getElementById("error").style.display = "hidden";
  } else if (flagname == 1 && flaglink === 1) {
    document.getElementById("error").innerHTML =
      "<p style='color:#FF0000;font-family:Product Sans''>ERROR: Incorrect website URL</p>";
    document.getElementById("error").style.display = "block";
    document.getElementById("erro").innerHTML =
      "<p style='color:#FF0000;font-family:Product Sans''>ERROR: No label provided</p>";
    document.getElementById("erro").style.display = "block";
  }
};
console.log("aaaa", array1);

var min;
var count = 0;
var tab;

$(document).ready(function () {
  $('.total-container').fadeIn();

  if (Lockr.get('notificationAlert')) {
    document.getElementById("notification").checked = true;
  }

  if (Lockr.get('audioAlert')) {
    document.getElementById("audioAlert").checked = true;
  }

  updateSites();

  // get query string then run choice with that value.

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ""));
  }

  var query = getParameterByName('time');

  window.onload = function () {
    if (query != null) {
      choice(null, query);
      $('#btn_end').addClass("clicked");
    };
  };
  $("#modalClose").click(function (event) {
    document.getElementById("error").innerHTML = "";
    document.getElementById("error").style.display = "hidden";
    document.getElementById("erro").innerHTML = "";
    document.getElementById("erro").style.display = "hidden";
    document.getElementById("inputSiteLink").value = "";
    document.getElementById("inputSiteName").value = "";

  });
  


  $("#addSiteButton").click(function (event) {

    var site = $("form input[type='site']").val()
    var site_link = $("form input[type='site_link']").val()
    var flaglink = 0,
      flagname = 0;
    if (site_link.trim() === "") {
      flaglink = 1;
    }
    if (site.trim() === "") {
      flagname = 1;
    } else if (~!site_link.indexOf("http")) {
      site_link = "http://" + site_link;
    }
   
    /* Check if the url entered is valid or not using a regex */
    function ValidUrl() {
      UrlEntered = $('#inputSiteLink').val();
      result = UrlEntered.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      return result;
    }

    if (flaglink != 1 && flagname != 1 && ValidUrl()) {
      Lockr.sadd('customSites', [site, site_link]);
      addGridElement(site, site_link);
      document.getElementById("error").innerHTML = "";
      document.getElementById("error").style.display = "hidden";
      document.getElementById("erro").innerHTML = "";
      document.getElementById("erro").style.display = "hidden";
      document.getElementById("inputSiteLink").value = "";
      document.getElementById("inputSiteName").value = "";
      $('#mm1').modal1('toggle');
    } else if (flaglink === 1 && flagname != 1) {
      document.getElementById("error").innerHTML = "<p style='color:#FF0000;font-family:Product Sans'>ERROR: Incorrect website URL</p>";
      document.getElementById("error").style.display = "block";
      document.getElementById("erro").innerHTML = "";
      document.getElementById("erro").style.display = "hidden";
    } else if (!ValidUrl() && flagname != 1) {
      document.getElementById("error").innerHTML = "<p style='color:#FF0000;font-family:Product Sans'>ERROR: Incorrect website URL</p>";
      document.getElementById("error").style.display = "block";
      document.getElementById("erro").innerHTML = "";
      document.getElementById("erro").style.display = "hidden";
    } else if (flagname === 1 && flaglink != 1) {
      document.getElementById("erro").innerHTML = "<p style='color:#FF0000;font-family:Product Sans''>ERROR: No label provided</p>";
      document.getElementById("erro").style.display = "block";
      document.getElementById("error").innerHTML = "";
      document.getElementById("error").style.display = "hidden";
    } else if (flagname == 1 && flaglink === 1) {
      document.getElementById("error").innerHTML = "<p style='color:#FF0000;font-family:Product Sans''>ERROR: Incorrect website URL</p>";
      document.getElementById("error").style.display = "block";
      document.getElementById("erro").innerHTML = "<p style='color:#FF0000;font-family:Product Sans''>ERROR: No label provided</p>";
      document.getElementById("erro").style.display = "block";
    }
    event.preventDefault();
  });

  $('.content').on('click', '.delete', function () {
    Swal.fire({
      html: "<p style='font-family:Product Sans; letter-spacing:1px;'>Are you sure to delete this website?</p>",
      background: "#353535",
      color: "white",
      confirmButtonText: "Delete",
      showCancelButton: true,
      animation: "slide-from-top",
      filter: 'blur(10px)',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        tabLink = $(this).attr('data-name');
        tab = $(this).attr('data-tab');
        $(this).remove();
        deleteTab(tab, tabLink);
      }
    })
  });

  /*Runs on site grid click*/
  $('.content').on('click', 'a.siteLink', function () {
    tab = $(this).attr('data-link')
    OpenInNew(min, tab);
  });

  /*Runs on video click*/
  $('#video-gallery').click(function () {
    if (count == 0) {
      OpenInNew(min, tab, "video");
      count = 1;
    }
  });

  // Check if the enter url is valid or not using a regex
  const isUrlValid = () => {
    enteredUrl = $('#enterUrl').val();
    res = enteredUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null);
  }
   const isUrlValid1 = () => {
     enteredUrl = $("#inputSiteLink").val();
     res = enteredUrl.match(
       /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
     );
     return res !== null;
   };

  /*Runs on 'enter url' click*/
  $('#urlClick').click(function () {
    if (isUrlValid()) {
      if (count == 0) {
        customUrl();
        count = 1;
      }
    } else {
      Swal.fire({
        html: "<p style='font-family:Product Sans; letter-spacing:1px;'>Please enter a valid website URL!</p>",
        background: "#353535",
        color: "white",
        icon: "error",

      })
    }
  });

  // $('body').keyup(e => {

  //   isVisible = $('.content').hasClass('visible')
  //   if (e.key === 'Enter' && isVisible) {
  //     if (isUrlValid()) {
  //       if (count == 0) {
  //         customUrl();
  //         count = 1;
  //       }
  //     } else {
  //       Swal.fire({
  //         html: "<p style='font-family:Product Sans; letter-spacing:1px;'>Please enter a valid website URL!</p>",
  //         background: "#353535",
  //         icon: "error",

  //         color: "white",
  //       });
  //     }
  //   }
  // })

    $("body").keyup((e) => {
      if (e.key === "Enter") {
        if (isUrlValid1()) {
          if (count == 0) {
            customUrl1();
            count = 1;
          }
        } else {
          Swal.fire({
            html: "<p style='font-family:Product Sans; letter-spacing:1px;'>Please enter a valid website URL!</p>",
            background: "#353535",
            icon: "error",

            color: "white",
          });
        }
      }
    });

  $('.time-button').click(function () {
    $(".time-button").each(function (i, hello) {
      $(hello).removeClass("clicked");
    });
    $(this).addClass("clicked");
  });

  // if (Lockr.get('background') == undefined) {
  //     Lockr.set('pastUser', 'yes');
  // }


  if (screen.width <= 480) {
    $('#background').hide();
    $('#notification').hide();
    $('#logo').hide();
  }
  if (Lockr.get('pastUser') == undefined) {
    Lockr.set('pastUser', 'yes');

    Swal.fire({
      html: "<p style='font-family:Product Sans; letter-spacing:1px;'>Welcome! Select a break time, go to your favorite website and when the time's up, your tab will self-destruct!</p>",
      background: "#353535",

      color: "white",
      icon: "info",
    })
  }
});

// Runs when the settings dropdown is Hovered/Clicked
var flag3 = true;

function inside2() {
  document.getElementById("list2").style.display = "block";
}

function outside2() {
  if (flag3)
    document.getElementById("list2").style.display = "none";
}

function btnClick() {
  if (!flag3) {
    document.getElementById("list2").style.display = "block";
  }
}
window.addEventListener('mouseup', function (event) {
  var box = document.getElementById('list2');
  var b1 = document.getElementById('switch1');
  var b2 = document.getElementById('switch2');
  var b3 = document.getElementById('switch3');
  if ((event.target != box && event.target.parentNode != box) && (event.target != b1 && event.target.parentNode != b1) && (event.target != b2 && event.target.parentNode != b2) && (event.target != b3 && event.target.parentNode != b3)) {
    box.style.display = 'none';
    flag3 = !flag3;
  }
});


// Runs when the list elements of the dropdown is clicked
var flag1 = 0;
var flag2 = 0;

function Notif_Click() {
  if (flag1 == 0) {
    document.getElementById("show").innerHTML = "";
    flag1 = 1;
  } else {
    document.getElementById("show").innerHTML = "";
    flag1 = 0;
  }
}

function Audio_Click() {
  if (flag2 == 0) {
    document.getElementById("show").innerHTML = "";
    flag2 = 1;
  } else {
    document.getElementById("show").innerHTML = "";
    flag2 = 0;
  }
}

var first = true; // a variable to check whether a function is being called for the first time
// Alert Permission to Display Desktop Notifications
setInterval(function () {
  if (flag1 == 1) {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission()
    }
  }
}, 500);


$("#notification").click(function (event) {
  if (flag1 === 1)
    Lockr.set('notificationAlert', true);
  // console.log("True");
  else
    Lockr.set('notificationAlert', false);
});

$("#audioAlert").click(function (event) {
  if (flag2 === 1)
    Lockr.set('audioAlert', true);
  else
    Lockr.set('audioAlert', false);
});

/*Function that runs when custom button is pressed. Presents sweet alert then parses input accordingly*/
function Custom(e) {
  $('.content').removeClass('visible');
  Swal.fire({
    title: "Custom Time",
    html: "<p style='font-family:Product Sans; letter-spacing:1px;'>How long do you want a break?</p>",
    input: 'text',
    animation: "slide-from-top",
    confirmButtonText: "Let's go!",
    showCancelButton: true,
    inputPlaceholder: "35m, 1.5h, etc.",
    background: "#353535",
    color: "white",
    inputColor: '#1f1f1f',

    allowOutsideClick: false,
    preConfirm: (inputValue) => {
      // console.log(inputValue);
      if (inputValue === false) {
        return false;
      }
      if (inputValue === "") {
        Swal.fire({
          html: "<p style='font-family:Product Sans; letter-spacing:1px;'>You need to write something!</p>",
          text: "",
          background: "#353535",

          color: "white",
          icon: "error",
        });
        return false
      }
      var flag_min = 0;
      var flag_hrs = 0;
      var flag_sec = 0;
      let convertIntoMinVal = 0;
      for (let i = 0; i < inputValue.length; i++) {
        if (inputValue[i] == 's' || inputValue[i] == 'S') flag_sec = 1;

        if (inputValue[i] == 'm' || inputValue[i] == 'M') flag_min = 1;
        if (inputValue[i] == 'h' || inputValue[i] == 'H') flag_hrs = 1;

      }

      // checking whether the custom input is zero or not;
      //ex-> 000,0001,0m,01h
      isZero = true;
      for (i = 0; i < inputValue.length; i++) {

        if (inputValue[i] == '0') {
          continue;
        }
        if ((inputValue[i] > '0' && inputValue[i] <= '9') || (inputValue[0] > "9" || inputValue[0] < "0")) {
          isZero = false;
          break;
        }


      }

      if (isZero) {
        Swal.fire({
          html: "<p style='font-family:Product Sans; letter-spacing:1px;'>Number should be greater than 0!</p>",
          background: "#353535",
          icon: "error",
          color: "white",
        });
        return false;
      }


      if (flag_hrs && flag_min) {
        let hh = 0;
        let i;
        for (i = 0; i < inputValue.length; i++) {
          if (inputValue[i] >= 'a' && inputValue[i] <= 'z' || inputValue[i] >= 'A' && inputValue[i] <= 'Z' || inputValue[i] == ' ') break;
          hh = hh * 10 + (inputValue[i] - '0');

        }
        let mm = 0;
        for (; i < inputValue.length; i++) {
          if (inputValue[i] >= 'a' && inputValue[i] <= 'z' || inputValue[i] >= 'A' && inputValue[i] <= 'Z' || inputValue[i] == ' ') continue;
          mm = mm * 10 + (inputValue[i] - '0');

        }
        convertIntoMinVal = hh * 60 + parseInt(mm);


      } else if (flag_hrs) {
        let hh = 0;
        for (let i = 0; i < inputValue.length; i++) {
          if (inputValue[i] >= 'a' && inputValue[i] <= 'z' || inputValue[i] >= 'A' && inputValue[i] <= 'Z' || inputValue[i] == ' ') break;
          hh = hh * 10 + (inputValue[i] - '0');

        }
        convertIntoMinVal = hh * 60;
      } 

      
      else if (flag_sec) {
        let ss = 0;
        for (let i = 0; i < inputValue.length; i++) {
          if (inputValue[i] >= 'a' && inputValue[i] <= 'z' || inputValue[i] >= 'A' && inputValue[i] <= 'Z' || inputValue[i] == ' ') break;
          ss = ss * 10 + (inputValue[i] - '0');

        }
        convertIntoMinVal = ss/60;
      }
      
      else {
        let mm = 0;
        for (let i = 0; i < inputValue.length; i++) {
          if (inputValue[i] >= 'a' && inputValue[i] <= 'z' || inputValue[i] >= 'A' && inputValue[i] <= 'Z' || inputValue[i] == ' ') break;
          mm = mm * 10 + (inputValue[i] - '0');

        }
        convertIntoMinVal = mm;
      }
      if (convertIntoMinVal > 0) {
        choice(e, convertIntoMinVal);
        document.getElementById("btn_end").innerHTML = parseFloat(convertIntoMinVal).toFixed(2) + " min";
        $(".content").css("display", "inline");
        return true
      } else {
        Swal.fire({
          html: "<p style='font-family:Product Sans; letter-spacing:1px;'>Please enter valid number!</p>",
          background: "#353535",
          icon: "error",
          color: "white",
        });
        return false;
      }
    }
  });
};
/*Run after time button clicked*/
var run = 0;

function choice(e, minutes) {
  let arr = (document.getElementsByClassName("time-button"));
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.backgroundColor = "rgb(140, 179, 238)";
    arr[i].style.color = "#000";
  }
  e.style.backgroundColor = "rgb(89, 151, 245)";
  e.style.color = "black";
  run = 1;
  Swal.close();
  if ($("#noty_bottomCenter_layout_container").is(":visible") == true) {
    $('#noty_bottomCenter_layout_container').hide();
  }
  min = minutes;
  $(".content").fadeIn();
  setTimeout(() => {
    $(".content").addClass('visible');
  }, 400);
  $(window).animate({
    scrollTop: $(".custom-url").offset().top + 80
  }, 500);
};

var diff = 0;
var complete = false;

//Number of current winows open
var windowCount = 0;
//Stores windows
var windows = [];

//* ------- Circular timer ---------
var num = 360;
var circularContainer = document.querySelector(".circular-container")
var container = document.querySelector(".container")
var secEle = document.querySelector(".sec");
var minEle = document.querySelector(".min");

//*------ Pause and stop button -----------

const stopBtn = document.querySelector(".stop-btn")
const pauseBtn = document.querySelector(".pause-btn")
const extraBtn = document.querySelector(".extra-btn")


function OpenInNew(min, tab, type) {

   
  /*MAJOR KEY*/
  if (type != "video") {
    /*Assigns win to open loading.html. Write to page. Then change the location to whatever the user chose.*/
    var win = window.open('loading.html', '_blank');
    // win.document.write('Loading site...this tab will self-destruct');
    setTimeout(function () {
        // const prevLocation = win.location; 
      win.location = tab;
   
      
    //   if(win.location !== prevLocation){
    //       win.closed = false;
    //   }
    }, 6500);
    /*Place win in array. Increment windowCount.*/
    windows[windowCount] = win;
    windowCount += 1;


  }
  
  if (count == 0) {
       //* as soon as newtab opens 
    pauseBtn.textContent = "Pause"
    count = 1;
    time = min * 60000 + 6000; // Added Extra 6 seconds for loading page
    var duration = 60 * min;
    timeDisplay = document.querySelector("#time");
    document.getElementById("buttons").style.visibility = "hidden";
    document.getElementById("subHeader").style.visibility = "hidden";
    circularContainer.style.display = "block";
    startTimer(duration, timeDisplay);

    // Alert audio automatically plays after 50% and 90% time completion
    var halfcall = setTimeout(halfAlertAudio, 0.5 * time);
    var fullcall = setTimeout(fullAlertAudio, 0.9 * time);

    function halfAlertAudio() {
      var a1 = document.getElementById("audio1");
      // plays the alert if audio permission in dropdown is allowed
      if (flag2 == 1) {
        a1.play();
      }
    }

    function fullAlertAudio() {
      var a2 = document.getElementById("audio2");
      // plays the alert if audio permission in dropdown is allowed
      if (flag2 == 1) {
        a2.play();
      }
    }



    // runs when time is up

    var myTimeout = window.setTimeout(function () {
      $.fancybox.close();
      for (i = 0; i < windowCount; i++) {
        windows[i].location.href = "close.html"
      }
      complete = true;
      diff = 0;

      document.getElementById("header").innerHTML = "Time's up!";
      document.getElementById("subHeader").innerHTML = "Get back to work!";
      document.title = "Take a Break";

      Swal.fire({
        title: "Time's up, back to work!",
        html: quote,
        icon: "success",
        background: "#353535",
        color: "white",
        imageSize: "200x200",
        confirmButtonText: 'OK',
        animation: "slide-from-top",
        filter: 'blur(10px)',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location = "./index.html";
        }
      })
      window.scrollTo(0, 0);

      setTimeout(ale, 14000);

      function ale() {
        alert("That's all!");
        window.location = "./index.html";
      };
      $.fancybox.close();
    }, time+1000);
  }

  var a = setInterval(d, 1000);

  function d() {

    for (i = 0; i < windowCount; i++) {
      win1 = windows[i];
      if (win1.closed) {
        var loc = windows.indexOf(win1)
        windows.splice(loc, 1);
        windowCount--;
      }
      /*If one of the windows is closed, find it in the array and delete it. Then find the length*/
      if (windowCount == 0 && complete == false) {
          //* if no tab then remove the stop and pause button
        extraBtn.classList.remove("active");
        // clearing/stoping timeout to execute 
        clearTimeout(myTimeout);

        document.title = "Take a Break";
        Swal.fire({
          title: "You closed out early!",
          background: "#353535",
          color: "white",
          showCancelButton: "true",
          imageSize: "200x200",
          confirmButtonText: "Keep Browsing!",
          cancelButtonText: "I'm done!",
          animation: "slide-from-top",
          filter: 'blur(10px)',
          allowOutsideClick: false,
          // imageUrl: getRandomTimeUp(gifTime, '/assets/gifs/'),
        }).then((result) => {
          if (result.isConfirmed == false) {
           return window.location = "./index.html";
          }
          return setInt =  setInterval(timer, 1000);
        })

      }

    }
  }

  window.onunload = function () {
    if (win && !win.closed) {
      win.close();
    }
  };
};



//*stop button handler
stopBtn.addEventListener("click",()=>{
    Swal.fire({
        title: "Stop this timer ?",
        background: "#353535",
        color: "white",
        showCancelButton: "true",
        imageSize: "200x200",
        confirmButtonText: "Yes, close it",
        cancelButtonText: "No, wait!",
        animation: "slide-from-top",
        filter: 'blur(10px)',
        allowOutsideClick: false,
       
      }).then((result) => {
        if (result.isConfirmed) {
          window.location = "./index.html";
        }
      })
})




var timer;
var setInt
var increase =0;

function startTimer(duration, display) {

    //* show the pause and stop button

    extraBtn.classList.add("active");

  var start = Date.now(),
    seconds,
    minutes = 0


    //* handler for pause button 
    

    timer =  function () {

       
       
    var once = 0;
    // get the number of seconds that have elapsed since startTimer() was called 
    diff = duration + 6 - ( increase++ | 0); // Added 6sec to the total duration of timer
    // does the same job as parseInt truncates the float

    const timediff = diff;
    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;
    minutes = minutes < 10 ? +minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    
    if (complete == false) {
        container.style.setProperty("--a",num+"deg")
        const a = container.style.getPropertyValue("--a");
        container.style.background = ` conic-gradient(#8cb3ee var(--a) ,#8cb3ee 0deg ,#585862d5 0deg,#585862d5 360deg)`
        num = num - (num / timediff);
       
      if (diff == 60) {
        display.textContent = "1 minute";
        document.title = "1 minute";
      

        secEle.textContent = seconds;
        minEle.textContent = minutes;


      } else if (diff < 60) {
        display.textContent = seconds + " seconds";

        // stops the timer to be displayed on title till the loading page is shown
        if (first == true) {
          setTimeout(() => {
            first = false;
          }, 6000);
        } else {
          document.title = seconds + " seconds";
        }
        secEle.textContent = seconds;
        minEle.textContent = minutes;
        
      } else {
        display.textContent = minutes + ":" + seconds + " minutes";

        // stops the timer to be displayed on title till the loading page is shown
        if (first == true) {
          setTimeout(() => {
            first = false;
          }, 6000);
        } else {
          document.title = minutes + ":" + seconds + " minutes";
        }
        secEle.textContent = seconds;
        minEle.textContent = minutes;
      
      }

      if (diff <= 0) {
        // add one second so that the count down starts at the full duration
        // example 05:00 not 04:59
        start = Date.now() + 1000;
      }




      //* pausing the timer 
      if (complete == false && windowCount == 0) {
        
        document.title = "Take a Break";
        setTimeout(() => {
          document.title = "Take a Break - Self-Destructing Tabs!";
        }, 1500);

        clearInterval(setInt);
        setInt = null;

        first = true
        // decrementing count   
        count = 0;

        // resuming the timer  with (6 sec extension)  

        // min = Math.abs(((time - 6000) - (time - 6000) - (diff * 1000) / 60000));

      }

      //asking for permission to reload
      // if (window.performance)  {
      //    console.info("window.performance works fine on this browser");
      //   }
      if ((performance.navigation.type == performance.navigation.TYPE_RELOAD) && (diff > 0)) {
        // console.info( "This page is  reloaded");

        $(window).bind('beforeunload', function () {
          return "Do you want to leave";
        });
      }




      // Executes after 50% of the time is over
      if (diff == duration * 0.5) {
        showNotification1();

        function showNotification1() {
          if (flag1 == 1) {
            const notification = new Notification("New Message from TakeABreak!", {
              body: "50% of your break is over",
              icon: "assets/banner.png",
              vibrate: true
            })

            setTimeout(() => {
              notification.close();
            }, 10000);
          }
        }
      }
      // Executes after 90% of the time is over
      else if (diff == duration * 0.1) {
        showNotification2();

        function showNotification2() {
          if (flag1 == 1) {
            const notification = new Notification("New Message from TakeABreak!", {
              body: "90% of your break is over",
              icon: "assets/banner.png",
              vibrate: true
            })

            setTimeout(() => {
              notification.close();
            }, 10000);
          }
        }
      }
    }


    if (complete == true || diff == 0) {
      /*("cleared setInt");*/
      clearInterval(setInt);
      complete = true;
      return;
    }
  };

  setInt= setInterval(timer, 1000)
};

pauseBtn.addEventListener("click",(e)=>{
         
       
       
    if(e.target.textContent == "Pause") {
        e.target.textContent = "Resume"
       
        clearInterval(setInt);
        
    }
    else if(e.target.textContent == "Resume"){
        console.log('clicked');
        e.target.textContent = "Pause"

        return setInt =  setInterval(timer, 1000);
    }
   
    
    
    
})


function customUrl() {
  if (count == 0) {
    var customSite = document.getElementById("enterUrl").value;
    if (!~customSite.indexOf("http")) {
      customSite = "http://" + customSite;
    }
    OpenInNew(min, customSite);
    count = 1;
  }
};


// Runs to modify html and create grid with elements from array below
var siteName = "";
var siteLabel = "";
var sites = [
  ["Reddit", "Reddit"],
  ["Facebook", "Facebook"],
  ["Youtube", "YouTube"],
  ["Instagram", "Instagram"],
  ["Netflix", "Netflix"]
];

function updateSites() {
  $(".rig.columns-6.websites").append(
    "<a data-toggle='modal1' onclick='saAddSite()' data-target='#mm1' class='addCustom'><li class='outbound-link'><img id='Add Site' src='assets/plus.png' onclick='saAddSite()'><p>Add Site</p></li></a>"
  );
  for (i = 0; i < sites.length; i++) {
    siteName = sites[i][0];
    siteLabel = sites[i][1];

    if (siteName == 'Youtube') {
      imgSrc = 'assets/youtube.png'
    } else if (siteName == "Netflix") {
      imgSrc = "assets/netflix.png"
    } else if (siteName == "Facebook") {
      imgSrc = "assets/facebook.png"
    } else if (siteName == "Instagram") {
      imgSrc = "assets/instagram.png"
    } else if (siteName == 'Reddit') {
      imgSrc = 'assets/reddit.png'
    } else {
      imgSrc = 'https://logo.clearbit.com/' + siteName.toLowerCase();
    }
    var req = $.ajax({
      url: imgSrc,
      dataType: "html",
      timeout: 10000
    });

    req.success(function () { });

    req.error(function () {
      console.log('Oh noes! Error when updating sites');
    });

    $('.rig.columns-6.websites').append("<a class='siteLink' data-link='http://" + siteName.toLowerCase() + ".com' target='_blank'><li class='outbound-link' class='outbound-link'><img id='" + siteName + "' src=" + imgSrc + "><p>" + siteLabel + "</p></li></a>");



    Lockr.sadd('siteData', [siteName, siteLabel]);
  }
  if (Lockr.get('customSites') != undefined) {
    for (i = 0; i < Lockr.get('customSites').length; i++) {
      customLink = Lockr.get('customSites')[i][0];
      customLabel = Lockr.get('customSites')[i][1];
      addGridElement(customLink, customLabel);
    }
  }

};

function addGridElement(siteLabel, siteLink) {
  var newLabel = siteLabel.replace(/\s+/g, '');
  var testLink = 'https://logo.clearbit.com/' + newLabel.toLowerCase() + '.com';
  var newSiteLabel = siteLabel.substring(0, 14);
  var newSiteLabel = newSiteLabel.replace(/\s/g, '&nbsp;')

  $.ajax({
    type: 'HEAD',
    url: testLink,
    success: function () {
      $('.rig.columns-6.websites').append("<a class='siteLink' data-link=" + siteLink + " target='_blank'><li class='outbound-link' class='outbound-link'><img id='" + siteLabel + "' src='https://logo.clearbit.com/" + newLabel.toLowerCase() + ".com'/><p>" + newSiteLabel + "</p></li></a>");
      $('.rig.columns-6.websites').append("<img src='assets/delete.svg' class='delete' id='delete' data-tab = '" + siteLabel + "' data-name='" + siteLink + "'>");
    },
    error: function () {
      $('.rig.columns-6.websites').append("<a class='siteLink' data-link=" + siteLink + " target='_blank'><li class='outbound-link' class='outbound-link'><img id='" + siteLabel + "' src='assets//web.png'/><p>" + newSiteLabel + "</p></li></a>");
      $('.rig.columns-6.websites').append("<img src='assets/delete.svg' style='cursor:pointer' id='delete' class='delete' data-tab = '" + siteLabel + "' data-name='" + siteLink + "'>");
    }
  });
};

function deleteTab(tab, tabLink) {
  $("[data-link='" + tabLink + "']").hide();
  Lockr.srem('customSites', [tab, tabLink]);
  var items = JSON.parse(localStorage.getItem("customSites"));
  for (var i = 0; i < items.data.length; i++) {
    var name = items.data[i][0];
    if (name == tab) {
      items.data.splice(i, 1);
      item = JSON.stringify(items);
      localStorage.setItem("customSites", item);
      return;
    }
  }
};

//about added
document.getElementById('aboutcorner').addEventListener('click',function(){
  Swal.fire({
    html: "<p style='font-family:Product Sans; letter-spacing:1px;'>Welcome! Select a break time, go to your favorite website and when the time's up, your tab will self-destruct!</p>",
    background: "#353535",
    color: "white",
    icon: "info",
  })
});
