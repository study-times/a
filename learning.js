var firebaseConfig = {

    apiKey: "AIzaSyDZG5TL_cjWvPHl-Z50WYi5pavCeweShzo",
    authDomain: "gakusyuzikan-589f0.firebaseapp.com",
    databaseURL: "https://gakusyuzikan-589f0-default-rtdb.firebaseio.com",
    projectId: "gakusyuzikan-589f0",
    storageBucket: "gakusyuzikan-589f0.appspot.com",
    messagingSenderId: "882074972938"
    
    };
    // Initialize FireBase
    firebase.initializeApp(firebaseConfig);
    var db=firebase.database();
    const auth = firebase.auth();
    
    setTimeout(() => {
     document.getElementById("runArea").remove();
     if(!auth.currentUser.uid){
        location.href="./index.html";
     }
        db.ref('users/'+auth.currentUser.uid).on('value', function (obj) {
            console.log(auth.currentUser);
            if(!obj.val()){
                console.log("a")
                db.ref('users/'+auth.currentUser.uid).update({
        "name": auth.currentUser.displayName,
        "status":"stop",
        "time": 0,
        "record":new Date()
       });
            }else{
        udata=obj.val();
    console.log(udata);
            }
    });
    }, 1000);
    
    
            var rotate = localStorage.getItem('rotate');
            var check = document.getElementById('switch1').checked;
            var center = document.getElementById('center');
            console.log(rotate)
          if(rotate=="true"){
            document.getElementById('switch1').checked=true;
                center.style.cursor="not-allowed";
            }else if(!rotate){
                document.getElementById('switch1').checked=true;
                center.style.cursor="not-allowed";
            }else if(rotate=="false"){
                center.setAttribute('onclick','start()');
                center.style.cursor="pointer";
            }
    
            if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
                window.addEventListener("orientationchange", function() {
        var orientation = window.orientation;
        if (orientation === 0) {
            stop();
        } else {
            start();
      }
    });
      } else {
        center.setAttribute('onclick','start()');
        center.style.cursor="pointer";
        document.getElementById('tggle').style.display="none";
                document.getElementById('switch1').checked=false;
        localStorage.setItem('rotate','false');
      }
    
    
    
            function routate(){
            var check = document.getElementById('switch1').checked;
                if(check){
                    localStorage.setItem('rotate',"true");
                center.setAttribute('onclick','');
                center.style.cursor="not-allowed";
                }else{
                    localStorage.setItem('rotate',"false");
                center.setAttribute('onclick','start()');
                center.style.cursor="pointer";
                }
            }
    
            function start(){
            var check = document.getElementById('switch1').checked;
                document.body.style.backgroundColor='#Ffa07a';
                document.getElementById('status').innerText='学習中';
                document.getElementById('tggle').style.display="none";
                document.getElementById('changebutton').style.display="none";
                if(!check){	
                    center.setAttribute('onclick','stop()');
                }
                
                if(!checkdate()){
                    retimer();
                }
                saimer();
            }
    
            
            function stop(){
            var check = document.getElementById('switch1').checked;
                document.body.style.backgroundColor="lightgreen";
                document.getElementById('status').innerText='休憩中';
                document.getElementById('changebutton').style.display="block";
                if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
                document.getElementById('tggle').style.display="block";
      } else {
      }
                if(!check){
                    center.setAttribute('onclick','start()');
                }
                stimer();
            }
    
    
            const time = document.getElementById('time');
    //https://tcd-theme.com/2022/06/javascript-stopwatch.html
    // 開始時間
    let rtime;
    // 停止時間
    // タイムアウトID
    let timeoutID;
    
    // スタートボタンがクリックされたら時間を進める
    function saimer(){
      startTime = Date.now();
      rtime = Number(udata.time);
      displayTime();
    }
    
    // 時間を表示する関数
    function displayTime() {
      var currentTime = rtime;
      const hour = Math.floor(currentTime/3600);
      const min = Math.floor((currentTime-3600*hour)/60);
      const sec = currentTime-3600*hour-min*60;
      const h = String(hour).padStart(2, '0');
      const m = String(min).padStart(2, '0');
      const s = String(sec).padStart(2, '0');
      rtime=rtime+1;
      time.textContent = `${h}:${m}:${s}`;
      timeoutID = setTimeout(displayTime, 1000);
    }
    
    // ストップボタンがクリックされたら時間を止める
    function stimer(){
      clearTimeout(timeoutID);
      db.ref('users/'+auth.currentUser.uid).update({
            "name": auth.currentUser.displayName,
        "status":"stop",
        "time": rtime,
        "record":new Date()
    });
    }
    
    // リセットボタンがクリックされたら時間を0に戻す
    function retimer(){
      time.textContent = '00:00:00';
      stopTime = 0;
      db.ref('users/'+auth.currentUser.uid).update({
            "name": auth.currentUser.displayName,
        "status":"stop",
        "time": stopTime,
        "record":new Date()
    });
    }
    
    function checkdate(){
        var recordDate = udata.record;
        var rec = new Date(recordDate);
    var ago = new Date();
    ago.setHours(ago.getHours() -4);
    console.log("ago="+ago);
    console.log("now="+rec);
    if(ago.getDate() == rec.getDate()){
        console.log('true');
        return true;
    }else{
        console.log('false');
        return false;
    }
    
    }