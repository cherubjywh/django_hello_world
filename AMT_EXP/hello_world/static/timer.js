var clicked;
var previous = "default";
var clicks = 0;

var imageArray;
var timeString;
var srcGet;
var click_able = false;
var srcChoose;
var starter = 0;
var errorChecker = 0;

$(document).ready(function() {
  $("#disabler").css("width", $("#category").width());
  $("#disabler").css("height", $("#category").height());
  formTreeView();
  $('#images').hide();
  $('#default').show();
  imageRandom();
  timerCollaborate();
  srcGetter();
});

function formTreeView() {

  $.jstree.defaults.core = {};
  $("#category").on("open_node.jstree", function (e, data) {
     
    var idList = [];

    var openNodes = [];    
          // get all parent nodes to keep open
      $("#"+data.node.id).parents(".jstree-node").each(function() {
         openNodes.push(this.id);
      });
       // add current node to keep open
      openNodes.push( data.node.id );
      clicks++;
      //imageDisplay(data.node.id);
       //console.log(data.node.id);
       // close all other nodes
      $(".jstree-node").each( function() {
        if( openNodes.indexOf(this.id) === -1 ) {
         $("#category").jstree().close_node(this.id);
        }
      })
  }).jstree({  
      "core" : {
        "data" : data,
        "themes": {
            "url": true,
            "icons": true
        }
    }
  });

  
  $('#category').on('select_node.jstree', function (e, data) {
    data.instance.toggle_node(data.node);
    // clicked = data.instance.get_node(data.node).id;
    clicks++;
    // alert(clicked);
    imageDisplay(data.node.id);
    // alert(data.instance.get_node(data.node).children.length);
    // data.instance.untoggle_node(data.node);
  });
}


function imageDisplay(clicked) {
    $("#default").fadeOut().hide();
    if (clicked != null) {
      var objHide;
      if (previous == "default") {
        objHide = $("#default");
      } else {
        if ($("#images #" + previous).length > 0) {
          objHide = $("#images #" + previous);
        }
      }
      // var i = 0;
      // if (kidHide != null) {
      //   for (i = 0; i < kidHide.length; i++) {
      //     if (objHide == null || objHide.length == 0) {
      //       objHide = $("#images #" + kidHide[i]);
      //     } else {
      //       objHide = objHide.add($("#images #" + kidHide[i]));
      //     }
      //   }
      // }
      alert ($("#images #" + clicked).length);
      var objShow = $("#images #" + clicked);
      // if ($("#images #" + clicked).length > 0) {
      //   objShow = $("#images #" + clicked);
      // }

      // if (kidShow.length == 0) {
      //   alert("leaf");
      //   click_able = true;
      // } else {
      //   click_able = false;
      // }

      // for (i = 0; i < kidShow.length; i++) {
      //   if ($("#images #" + kidShow[i]).length>0) {
      //     if (objShow == null || objShow.length == 0) {
      //       objShow = $("#images #" + kidShow[i]);
      //     } else {
      //       objShow = objShow.add($("#images #" + kidShow[i]));
      //     }
      //   }
        
      // }

      if (objHide != null) {
        var $hide2 = objHide.fadeOut();
      }
      if (objShow != null) {
        var $show2 = objShow.fadeIn();
      }
      $(document).ajaxStop(function() {
        if ($hide2 != null) {
          $hide2.hide();
        }
      });
    }
    $(document).ajaxStart(function() {
      if ($show2 != null) {
        $show2.show();
      }
    });
    previous = clicked;
}

function timerCollaborate() {
  var h2 = document.getElementsByTagName("h2")[0],
  start = document.getElementById("start"),
  restart = document.getElementById("restart"),
  seconds = 0, minutes = 0, hours = 0,
  t;

  function add() {
    if (starter > 0) {
      seconds++;
      if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
              minutes = 0;
              hours++;
          }
      }
      
      h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
      
      timer();
      timeString = h2.textContent;
    }
  }

  function timer() {
    t = setTimeout(add, 1000);
  }
  timer();
  start.onclick = function() {
    if (starter == 0) {
      timer();
      starter = 1;
      $("#disabler").css("width", "0px");
      $("#disabler").css("height", "0px");
    }
  }
  restart.onclick = function() {
    clicks=0;
    location.reload();
  }
}

function imageRandom() {
  imageArray = $("#images").find("img").map(function() {
    return $(this).attr("src");
  }).get();
  var getVal = Math.floor((Math.random() * (imageArray.length - 1)));
  srcChoose = imageArray[getVal]; //grabs the source of the images
  $("#temporary img").attr("src", srcChoose); //grabs image and set the source equal to grabbed source
}

function srcGetter() {
    $("#images img").click(function() {
      alert("get");
      srcGet = $(this).attr("src"); //grabs the source of the images
      alert(srcGet);
    
    // srcGet = $("#images img").attr("src");
    if (click_able) {
      alert(srcGet);
      alert(srcChoose);
      var n = srcGet.localeCompare(srcChoose);
      if (errorChecker == 0) {
        if (n ==0)  {
          alert("Good Job, You get the answer in " + timeString + " with " + clicks + " clicks");
          $('input[name="user-input"]').val(timeString + " with " + clicks + " clicks");
          $("#images img").hide();
          errorChecker = 1;
          starter = 0;
          location.reload();
        } else {
        alert("Wrong Picture Try again");
        }
      }
    }
    });
}
