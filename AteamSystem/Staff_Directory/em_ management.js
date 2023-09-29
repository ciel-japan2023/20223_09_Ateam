$("#del_flg_show").prop("checked", false)   //「削除済みのみ表示」chkboxのデフォルトをチェックなしにする
let sql1 = 'select staff_id, staff_name, del_flg from TM_Staff where del_flg = "0"'; //[TM_Staff]のテーブルから全てSELECTするSQL文
$("#change").prop("disabled", true); //更新ボタンをデフォルトで無効化


table_create_all() //テーブル作成関数実行

         //[削除済みのみ表示]のフラグ有無分岐 
	      $(function(){
            $("#del_flg_show").on("click",function(){
            
            //[削除済みのみ表示]のフラグがONだった場合、テーブルを全削除して削除フラグがあるデータだけをテーブルに挿入
	        if($("#del_flg_show").is(':checked')){
	                 $("#staff_table").empty(); //社員テーブルを空にする処理
	                  $("#staff_table").append("<tr><th>社員番号</th><th>社員名</th><th>削除</th></tr>"); //テーブル上のデータが抹消されるのでテーブルカラムだけ挿入
	            	   sql1 = 'select staff_id, staff_name, del_flg from TM_Staff where (del_flg = "1")' //[TM_Staff]のテーブルから削除済みだけをSELECTするSQL文
                       table_create_all() //テーブル作成関数実行
	         }else{
	             $("#staff_table").empty(); //社員テーブルを空にする処理
	             $("#staff_table").append("<tr><th>社員番号</th><th>社員名</th><th>削除</th></tr>");  //テーブル上のデータが抹消されるのでテーブルカラムだけ挿入
	             sql1 = 'select staff_id, staff_name, del_flg from TM_Staff where del_flg = "0"'; //[TM_Staff]のテーブルから全てSELECTするSQL文
	             table_create_all() //テーブル作成関数実行
	         }
	           
	       });
	   });

            


        //テーブルにDBから取得したデータを挿入する関数
    function table_create_all(){
        let select_sql = DB.sql(sql1) //SELECT文をDB.sqlに代入し実行する
        let j = select_sql.length //SELECTしたデータの行数をカウントし、その数値を変数jに代入
        $("#add").prop("disabled", false); //登録ボタンを有効化
        console.log(select_sql)
        //DBで取得したデータの行数分だけDBから取得したデータをテーブルに挿入していく処理
	    for(var i = 0; i < j; i++){
	      
	      if(select_sql[i]["del_flg"] == 1){   //取得したDBデータ上のdel_flgが1であった場合、文字列を"1"から"✓"に置き換えて格納
	         select_sql[i]["del_flg"] = "✓"
	       }else{                              //取得したDBデータ上のdel_flgが0であった場合、文字列を"1"から"-"に置き換えて格納
	          select_sql[i]["del_flg"] = "-"
	       }
	       //テーブルにDBデータを挿入する処理
	      $("#staff_table").append("<tr><td>" + select_sql[i]["staff_id"] + "</td><td>" 
	       + select_sql[i]["staff_name"] + "</td><td>" + select_sql[i]["del_flg"] + "</td></tr>")
	     }
	  }
	 
	
	 
	 
	  
	   
	     //ユーザーテーブルをクリックしたときの処理
	    $(function(){
	     $("#staff_table").on("click","td",function(){
	       $("#staff_id_input").prop("readonly", true);   //テーブルクリック時に[社員番号]テキストボックスを編集不可にする
	       $("#add").prop("disabled", true); //登録ボタンを無効化にする
	       $("#change").prop("disabled", false); //更新ボタンを有効化

	        let cell = $(this).text()   //テーブル上の[社員番号]セルの文字列を変数cellに格納
	        const nextCell = $(this).next(); //テーブル上の[社員名]セルの文字列を変数nextCellに格納
	        const nextnextCell = $(this).next().next(); //テーブル上の[削除]セルの文字列を変数nextnextCellに格納
	        const nnc = nextnextCell.text() //上記文字列をテキスト形式へ変換
	        
	        //テーブル上の[社員番号]以外クリック不可にする処理
	        const colIndex = $(this).index(); 
	        if (colIndex !== 0) return;
	        
	        
	        $("#staff_id_input").val(cell) //[社員番号]テキストボックスに変数cellを代入
	        $("#staff_name_input").val(nextCell.text())  //[社員名]テキストボックスにテキストへ変換した変数nextCellを代入
	        
            
            //テーブル上の[削除]セルが"✓"だった場合、[削除]フラグをONにする、そうでない場合はOFFにする
	        if(nnc == "✓"){
	        $("#del_flug").prop("checked", true)
	        }else{
	        $("#del_flug").prop("checked", false)
	        }
	        
	        });
	   });
              
   
	     //登録ボタン押下時の処理
	     $(function(){
	       $("#add").on("click",function(){
	        let add_length_check = String($("#staff_id_input").val().length)  //[社員番号]テキストボックスに入力された文字数をカウントして、格納
            let add_id_form =  $("#staff_id_input").val()  //[社員番号]テキストボックスに入力された内容を格納
            let add_name_form = $("#staff_name_input").val() //[社員名]テキストボックスに入力された内容を格納
	         
	         //[社員番号]テキストボックスに入力された文字数が6桁以外、数値以外、社員番号に空白文字が含まれていた場合アラートを表示して処理終了
	         if(add_length_check != 6 || isNaN(add_id_form) || add_id_form.includes("")){
	          alert("社員番号が不正です")
	          return;
	         }
	         
	         //try内が正常処理、cath(e)内がSQL側のエラーにより構文エラーになるとアラート表示
	         try {
	         
	         //[社員名]テキストボックスが空白だった場合、アラートを表示して処理終了
	         if(add_name_form == ""){
	            alert("社員名が未入力です")
	          return;
	          }
	         
	          //[社員番号]、[社員名]テキストボックス、[削除]フラグの内容と文字列を組み合わせてUPDATE文を発行
	          //(登録段階で削除フラグを付加することは想定していませんので、del_flg = 0としています、また、登録日もSQL側の関数を使ってINSERTしています)
	          let sql2 = 'insert into TM_Staff(staff_id, staff_name, y_holiday, del_flg, create_date) values("' + add_id_form + '","' + add_name_form + '","0","0",curdate())'
	          console.log(sql2)
	          let update_sql = DB.sql(sql2)
	          
	          //画面をリロードする
	          window.location.reload();
	     
	          
	          }catch(e) {
                 alert("入力された社員IDが既に存在しているか、IDが登録できない数値です");
                  window.location.reload();
              }
	          
	         
	       });
	      });
	      
	      //更新ボタン押下時の処理
	      $(function(){
	      
	       $("#change").on("click",function(){ 
	         
	          let ch_length_check = String($("#staff_id_input").val().length)   //[社員番号]テキストボックスに入力された文字数をカウントして、格納
              let ch_id_form =  $("#staff_id_input").val()    //[社員番号]テキストボックスに入力された内容を格納
              let ch_name_form = $("#staff_name_input").val() //[社員名]テキストボックスに入力された内容を格納
	          let ch_del = 'del_flg = "0"' //SQL文に含める文字列(削除フラグのカラム値セット)
	           
	           
	          //[削除]フラグがONだった場合、SQL文に含める文字を'del_flg = "1"'とする(削除フラグのカラム値セット)
	          if($("#del_flug").is(':checked')){
	           ch_del = 'del_flg = "1"'
	          }
	          
	          //[社員名]テキストボックスの入力欄が空白だったらアラートを表示して処理終了
	          if(ch_name_form == ""){
	           alert("社員名が未入力です")
	          return;
	         }
	         
	         //UPDATE文を発行
	         //(更新日付もSETします。INSERT処理の際と同様に更新日付を登録します)
	         let sql3 = 'UPDATE TM_Staff SET staff_name = "' + ch_name_form + '", ' + ch_del +',update_date = curdate() WHERE staff_id  = "' + ch_id_form + '"' 
	         let change_sql = DB.sql(sql3)
	         window.location.reload(); //画面をリロード
	         
	         
	        });
	      });
	      
	      //戻るボタン押下時の処理
	      $("#back").on("click", function(){
           location.href = "../Admin_Panel/mng_menu_select.html"
 
          });