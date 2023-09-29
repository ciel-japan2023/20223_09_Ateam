
//年月のテストデータです。必要になったらコメントアウトを消してください
//let year = ["2019","2020","2021","2022","2023"];
//let month = ["1","2","3","4","5","6","7","8","9","10","11","12"]

//年を取得
let DB_year = DB.sql('SELECT Date_format(date,"%Y") as yyyymm FROM TP_calendar Group by yyyymm;');

for(i=0;i<DB_year.length;i++){
	$("#year_select").append('<option value="year'+i+'">'+DB_year[i]["yyyymm"]+'</option>')
}

let year_pull = $("#year_select").children(':selected').text();
let month_pull = $("#month_select").children(':selected').text();


$("#year_select").on("change",function(){
year_pull = $("#year_select").children(':selected').text();
 });
 
 $("#month_select").on("change",function(){
 month_pull = $("#month_select").children(':selected').text();
 });



//戻るボタン押下時の処理
$("#botan1").on("click", function(){

 location.href = "../Select_Menu/title_top.html"  //勤務時間計算システムへ画面遷移
 
 });

//OKボタン押下時の処理
$("#botan2").on("click", function(){
  localStorage.setItem("year",year_pull);
   localStorage.setItem("month",month_pull);

 
 location.href = "../Worktime/work_math.html"  //勤務時間計算画面へ画面遷移
 
});


