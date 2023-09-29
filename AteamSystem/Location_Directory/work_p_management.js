let sql1 = 'select location_id, location_name from company_money_maneger.TM_Location'; //[TM_Staff]のテーブルから全てSELECTするSQL文
let select_sql = DB.sql(sql1) //SELECT文をDB.sqlに代入し実行する
let j = select_sql.length //SELECTしたテーブルの行数をカウントし、その数値を変数jに代入
$("#change").prop("disabled", true); //更新ボタンをデフォルトで無効化




        //テーブルにDBから取得した表を挿入する処理
        
	    for(var i = 0; i < j; i++){
	      $("#location_table").append("<tr><td>" + select_sql[i]["location_id"] + "</td><td>" 
	       + select_sql[i]["location_name"] + "</td></tr>")
	     }

	    //ユーザーテーブルをクリックしたときの処理
	    $(function(){
	     $("#location_table").on("click","td",function(){
	       $("#id_form").prop("readonly", true); //[勤務ID]テキストボックスを編集不可にする
	       $("#change").prop("disabled", false); //更新ボタンを有効化
	       $("#add").prop("disabled", true); //登録ボタンを無効化にする
	       
	        let cell = $(this).text()  //テーブル上の[勤務ID]セルの文字列を変数cellに格納
	        const nextCell = $(this).next(); //テーブル上の[勤務先]セルの文字列を変数nextCellに格納
	        
	        //テーブル上の[勤務ID]以外クリック不可にする処理
	        const colIndex = $(this).index();
	        if (colIndex !== 0) return;
	        
	        $("#id_form").val(cell) //[勤務ID]テキストボックスに変数cellを代入
	        $("#name_form").val(nextCell.text())  //[勤務先]テキストボックスにテキストへ変換した変数nextCellを代入

	        });
	   });
              
   
	     //登録ボタン押下時の処理
	     $(function(){
	       $("#add").on("click",function(){
	        
	        let add_length_check = String($("#id_form").val().length)   //[勤務ID]テキストボックスに入力された文字数をカウントして、格納
            let add_id_form =  $("#id_form").val()   //[勤務ID]テキストボックスに入力された内容を格納
            let add_name_form = $("#name_form").val()  //[勤務先]テキストボックスに入力された内容を格納
	        
	        //[勤務ID]テキストボックスに入力された文字数が4桁以外、もしくは数値以外が入力されるとアラートを表示して処理終了
	        if(add_length_check != 4 || isNaN(add_id_form) || add_id_form.includes(" ")){
	          alert("勤務先IDが不正です")
	          return;
	          }
	          
	          //[勤務先]テキストボックスが空白だった場合、アラートを表示して処理終了
	          if(add_name_form == ""){
	           alert("勤務先が未入力です")
	          return;
	         }
	          
	           //try内が正常処理、cath(e)内がSQL側のエラーにより構文エラーになるとアラート表示
	         try {
	        console.log(add_length_check)
	        
	         
	           //[勤務先ID]、[勤務先]テキストボックスの内容と文字列を組み合わせてUPDATE文を発行
	          let sql2 = 'insert into TM_Location(location_id, location_name, create_date) values("' + add_id_form + '","' + add_name_form + '", curdate())'
	          let update_sql = DB.sql(sql2)
	          
	         //画面をリロードする
	          window.location.reload();
	          
	          }catch(e) {
                 alert("入力された勤務先IDが既に存在しているか、IDが登録できない数値です");
                  window.location.reload();
              }
	          
	         
	       });
	      });
	      
	      //更新ボタン押下時の処理
	      $(function(){
	      
	       $("#change").on("click",function(){
	         
	          let ch_length_check = String($("#id_form").val().length)
              let ch_id_form =  $("#id_form").val()
              let ch_name_form = $("#name_form").val()
   
	          console.log(ch_length_check)
	          if(ch_length_check != 4){
	          alert("勤務先IDが不正です")
	          return;
	         }if(ch_name_form == ""){
	           alert("勤務先が未入力です")
	          return;
	         }
	         
	         //UPDATE文を発行
	         let sql3 = 'UPDATE TM_Location SET location_name = "' + ch_name_form + '", create_date = curdate() WHERE location_id  = "' + ch_id_form + '"' 
	         console.log(sql3)
	         let change_sql = DB.sql(sql3)
	         window.location.reload();
	         
	         
	        });
	      });
	      
	      
	      $("#back").on("click", function(){
           location.href = "../Admin_Panel/mng_menu_select.html"
 
          });