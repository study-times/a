var firebaseConfig = {

    apiKey: "AIzaSyDZG5TL_cjWvPHl-Z50WYi5pavCeweShzo",
    authDomain: "gakusyuzikan-589f0.firebaseapp.com",
    databaseURL: "https://gakusyuzikan-589f0-default-rtdb.firebaseio.com",
    projectId: "gakusyuzikan-589f0",
    storageBucket: "gakusyuzikan-589f0.appspot.com",
    messagingSenderId: "882074972938"
    
    };
    
    
    var data;
    var racelabel=[];
    var racetimes=[];
    var racedata=[];
    var racebgcolors =[];
    var ownlabel=[];
    var owntimes=[];
    var owndata=[];
    var yeslabel=[];
    var yestimes=[];
    var yesdata=[];
    var yesbgcolors =[];
    
    // Initialize FireBase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    var db=firebase.database();
    
    
    setTimeout(() => {
        if(!auth.currentUser){
            location.href="./index.html";
         }
        document.getElementById("runArea").remove();
            db.ref('archive').on('value', function (obj) {
                data = obj.val();
                console.log(obj.val());
                racelabel=[];
                racetimes=[];
                racedata=[];
                racebgcolors=[];
                ownlabel=[];
                owntimes=[];
                owndata=[];
                yeslabel=[];
                yestimes=[];
                yesdata=[];
                yesbgcolors =[];
            race(data);
            own(data);
            yes(data);
            })
        }, 1000);
    
    
            function format(dt){
        var y = dt.getFullYear();
      var m = ('00' + (dt.getMonth()+1)).slice(-2);
      var d = ('00' + dt.getDate()).slice(-2);
      var format = y + '-' + m + '-' + d;
      return format
            }
    
    
            function race(data){
            var today = format(new Date());
            var todaydata = data[today];
            var keys =Object.keys(todaydata);
            for(i=0;i<keys.length;i++){
                var array=[];
                array.push(todaydata[keys[i]].name);
                array.push(todaydata[keys[i]].time);
                racedata.push(array);
            }
            racedata.sort(function(a, b) {
                return b[1] - a[1];
            });
            console.log(racedata);
            var name = auth.currentUser.displayName;
            for(i=0;i<keys.length;i++){
                racelabel.push(racedata[i][0]);
                racetimes.push(racedata[i][1]);
                if(name==racedata[i][0]){
                    racebgcolors.push("red");
                }else{
                    racebgcolors.push("blue");
                }
            }
            racechart(racelabel,racetimes,racebgcolors);
            }
    
    
            function own(data){
                var keys =Object.keys(data);
                var uid = auth.currentUser.uid;
                for(i=0;i<keys.length;i++){
                    var array =[];
                    var idata = data[keys[i]][uid];
                    if(!idata){
                        array.push(0);
                    }else{
                        array.push(idata.time)
                    }
                    array.push(keys[i]);
                    owndata.push(array);
                }
                console.log(owndata);
                owndata.sort(function(a, b) {
                return b[1] - a[1];
                });
                for(i=0;i<keys.length;i++){
                owntimes.push(owndata[i][0]);
                ownlabel.push(owndata[i][1]);
            }
            ownchart(ownlabel,owntimes)
            }
    
    
            function yes(data){
                console.log('a');
            var today = new Date();
            today.setDate(today.getDate() - 1);
            var yesterday = format(new Date(today));
            console.log(yesterday);
            var yesterdaydata = data[yesterday];
            if(!yesterdaydata){
                document.getElementById('nodata').innerHTML="データがありませんでした";
            }else{
            var keys =Object.keys(yesterdaydata);
            for(i=0;i<keys.length;i++){
                var array=[];
                array.push(yesterdaydata[keys[i]].name);
                array.push(yesterdaydata[keys[i]].time);
                yesdata.push(array);
            }
            yesdata.sort(function(a, b) {
                return b[1] - a[1];
            });
            console.log(yesdata);
            var name = auth.currentUser.displayName;
            for(i=0;i<keys.length;i++){
                yeslabel.push(yesdata[i][0]);
                yestimes.push(yesdata[i][1]);
                if(name==yesdata[i][0]){
                    yesbgcolors.push("red");
                }else{
                    yesbgcolors.push("blue");
                }
            }
            yesterdaychart(yeslabel,yestimes,yesbgcolors);
        }
            }
    
    
            function racechart(labs,times,colors){
            // 棒グラフの設定
            let barCtx = document.getElementById("race");
            let barConfig = {
              type: 'bar',
              data: {
                labels: labs,
                datasets: [{
                  data: times,
                  label: '時間（分）',
                  backgroundColor:colors,
                  borderWidth: 1,
                }]
              },
            };
            let barChart = new Chart(barCtx, barConfig);
        }
    
    
        function ownchart(labs,times){
            let lineCtx = document.getElementById("own");
            // 線グラフの設定
            let lineConfig = {
              type: 'line',
              data: {
                labels: labs,
                datasets: [{
                  label: '学習時間',
                  data: times,
                  borderColor: '#f88',
                }],
              },
            };
            let lineChart = new Chart(lineCtx, lineConfig);
        }
    
        function yesterdaychart(labs,times,colors){
            // 棒グラフの設定
            let barCtx = document.getElementById("yesterday");
            let barConfig = {
              type: 'bar',
              data: {
                labels: labs,
                datasets: [{
                  data: times,
                  label: '時間（分）',
                  backgroundColor:colors,
                  borderWidth: 1,
                }]
              },
            };
            let barChart = new Chart(barCtx, barConfig);
        }