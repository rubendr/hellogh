var width = 340;// 320; // We will scale the photo width to this
    var height = 280;// 0; // This will be computed based on the input stream
    var streaming = false;
    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;
    var video2 = null;
    function startup() {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      photodata = document.getElementById('photodata');

      video2 = document.getElementById('video2');
      navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
          video2.srcObject = stream;
          video2.play();
        })
        .catch(function (err) {
          console.log("An error occured! " + err);
          //alert("An error occured! " + err);
          $("#lblcamera").html("CAM:" + err);
        });
      video.addEventListener('canplay', function (ev) {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          video.setAttribute('facingMode', 'user');
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);

      video2.addEventListener('canplay', function (ev) {
        if (!streaming) {
          height = video2.videoHeight / (video2.videoWidth / width);
          video2.setAttribute('width', width);
          video2.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);
      video.addEventListener('unload', function (e) {
        alert('unloaded video');
      });
      video.addEventListener('onload', function () {
        alert('loaded');
      });
      clearphoto();
    }

    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);

    }

    function takepicture() {
      var context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
        photodata.value = data;
      } else {
        clearphoto();
      }
    }

    startup();