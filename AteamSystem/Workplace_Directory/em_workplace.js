$("#del_flg_show").prop("checked", false)   //「削除済みのみ表示」chkboxのデフォルトをチェックなしにする
$("#change_button").prop("disabled", true); //デフォルトで更新ボタンを無効化

////////////////////以下SQL文一覧////////////////////

let sql1 = 'SELECT te_staff_location.del_flg, te_staff_location.staff_id, tm_staff.staff_name, tm_location.location_name, agreement_name, start_time, end_time, work_time,overtime_start, road_money, note FROM te_staff_location INNER JOIN tm_staff ON te_staff_location.staff_id = tm_staff.staff_id INNER JOIN tm_location ON te_staff_location.location_id =  tm_location.location_id INNER JOIN tc_agreement ON te_staff_location.agreement_id = tc_agreement.agreement_id where (te_staff_location.del_flg = "0" ) order by staff_id asc'
//[tm_staff_location]とINNER JOINしたテーブルからSELECTするSQL文

let sql2 = 'SELECT staff_id, staff_name FROM tm_staff'   //[tm_staff]から社員ID、社員名をSELECTするSQL
let sql3 = 'SELECT location_id, location_name  FROM tm_location'   //[tm_location]から勤務先ID、勤務先をSELECTするSQL
let sql4 = 'SELECT * FROM tc_agreement'  //[tc_agreement]から契約形態ID、契約形態をSELECTするSQL

//////////////////////////////////////////////////////



//各機能実行
table_create_all()
staff_id_select_insert()
location_select_insert()
areement_select_insert()

        
        //[削除済みのみ表示]のフラグ有無分岐
        $(function(){
            $("#del_flg_show").on("click",function(){
            console.log("R")
            
             if($("#del_flg_show").is(':checked')){
	               $("#table").empty();
	               $("#table").append("<th>社員番号</th><th>社員名</th><th>勤務先</th><th>契約形態</th><th>始業</th><th>終業</th><th>勤務時間</th><th>残業開始</th><th>交通費</th><th>備考</th>");
                   sql1 = 'SELECT te_staff_location.del_flg, te_staff_location.staff_id, tm_staff.staff_name, tm_location.location_name, agreement_name, start_time, end_time, work_time,overtime_start, road_money, note FROM te_staff_location INNER JOIN tm_staff ON te_staff_location.staff_id = tm_staff.staff_id INNER JOIN tm_location ON te_staff_location.location_id =  tm_location.location_id INNER JOIN tc_agreement ON te_staff_location.agreement_id = tc_agreement.agreement_id where (te_staff_location.del_flg = "1" ) order by staff_id asc'
                   table_create_all()
                }else{
                   $("#table").empty();
	               $("#table").append("<th>社員番号</th><th>社員名</th><th>勤務先</th><th>契約形態</th><th>始業</th><th>終業</th><th>勤務時間</th><th>残業開始</th><th>交通費</th><th>備考</th>");
                   sql1 = 'SELECT te_staff_location.del_flg, te_staff_location.staff_id, tm_staff.staff_name, tm_location.location_name, agreement_name, start_time, end_time, work_time,overtime_start, road_money, note FROM te_staff_location INNER JOIN tm_staff ON te_staff_location.staff_id = tm_staff.staff_id INNER JOIN tm_location ON te_staff_location.location_id =  tm_location.location_id INNER JOIN tc_agreement ON te_staff_location.agreement_id = tc_agreement.agreement_id where (te_staff_location.del_flg = "0" ) order by staff_id asc'
                   table_create_all()
               }
           });
	   });


        //テーブルにDBから取得した表を挿入する処理
    function table_create_all(){
        let select_sql = DB.sql(sql1) //SELECT文をDB.sqlに代入し実行する
        let j = select_sql.length //SELECTしたテーブルの行数をカウントし、その数値を変数jに代入

	    for(var i = 0; i < j; i++){
	    
	      $("#table").append(
	      "<tr><td>" 
          + select_sql[i]["staff_id"] + 
          "</td><td>" 
          + select_sql[i]["staff_name"] + 
          "</td><td>" 
          + select_sql[i]["location_name"] + 
          "</td><td>" 
          + select_sql[i]["agreement_name"] + 
          "</td><td>" 
          + select_sql[i]["start_time"].slice(0,5) + 
          "</td><td>" 
          + select_sql[i]["end_time"].slice(0,5) + 
          "</td><td>" 
          + select_sql[i]["work_time"].slice(0,5) + 
          "</td><td>" 
          + select_sql[i]["overtime_start"].slice(0,5) + 
          "</td><td>" 
          + select_sql[i]["road_money"] + 
          "</td><td>" 
          + select_sql[i]["note"] + 
          "</td></tr>"
	      )
	     }
	     
	  }
	  
	 //[tm_staff]から社員番号プルダウンにデータ挿入
	function staff_id_select_insert(){
	    let select_sql = DB.sql(sql2) //SELECT文をDB.sqlに代入し実行する
        let j_2 = select_sql.length //SELECTしたテーブルの行数をカウントし、その数値を変数jに代入
       
        
	  for(var i_2 = 0; i_2 < j_2; i_2++){
	  
	    $("#staff_id_select").append('<option value="' + select_sql[i_2]["staff_id"] + '">'+ select_sql[i_2]["staff_id"] + "   " + select_sql[i_2]["staff_name"] + '</option>')
	     
	  }
	}
	
	//[tm_location]から勤務先IDプルダウンにデータ挿入
	function location_select_insert(){
	   	let select_sql = DB.sql(sql3) //SELECT文をDB.sqlに代入し実行する
        let j_3 = select_sql.length //SELECTしたテーブルの行数をカウントし、その数値を変数jに代入

	  for(var i_3 = 0; i_3 < j_3; i_3++){
      
      $("#location_name_select").append('<option value="' + select_sql[i_3]["location_name"] + '">' + select_sql[i_3]["location_id"] + "   " + select_sql[i_3]["location_name"] + '</option>')
      
	  }
	}


    //[tm_location]から契約形態IDプルダウンにデータ挿入
	function areement_select_insert(){
	   	let select_sql = DB.sql(sql4) //SELECT文をDB.sqlに代入し実行する
        let j_4 = select_sql.length //SELECTしたテーブルの行数をカウントし、その数値を変数jに代入

	  for(var i_4 = 0; i_4 < j_4; i_4++){
      
      $("#agreement_select").append('<option value="' + select_sql[i_4]["agreement_name"] + '">' + select_sql[i_4]["agreement_name"] + '</option>')
      
	  }
	}
	
	
	
	//テーブルをクリックしたときの処理
	  $(function(){
	     $("#table").on("click","td",function(){
	        $("#staff_id_select").prop('disabled', true); //社員番号選択を無効化
	        $("#location_name_select").prop('disabled', true); //勤務地ID選択を無効化
	        $("#agreement_select").prop('disabled', true); //契約形態選択を無効化
	        $("#add_button").prop('disabled', true); //登録ボタンを無効化
	        $("#change_button").prop("disabled", false); //更新ボタンを有効化

	        
	        //社員番号以外のセルクリック禁止にする処理
	        const colIndex = $(this).index();
	        if (colIndex !== 0) return;
	        
	        //テーブル上の値の取得
            const staff_id_cell = $(this).text()
	        const staff_name_cell = $(this).next().text();
	        const location_cell = $(this).next().next().text();
	        const agreement_cell = $(this).next().next().next().text();
	        const start_time_cell = $(this).next().next().next().next().text();
	        const end_time_cell = $(this).next().next().next().next().next().text();
	        const work_time_cell = $(this).next().next().next().next().next().next().text();
	        const overtime_time_cell = $(this).next().next().next().next().next().next().next().text();
	        const road_money_cell = $(this).next().next().next().next().next().next().next().next().text();
	        const note_cell = $(this).next().next().next().next().next().next().next().next().next().text();
            

          
            //各プルダウン、テキストボックスに反映
            $("#staff_id_select").val(staff_id_cell)
            $("#location_name_select").val(location_cell)
            $("#agreement_select").val(agreement_cell)
            $("#start_time").val(start_time_cell)
            $("#end_time").val(end_time_cell)
            $("#work_time").val(work_time_cell)
            $("#over_time").val(overtime_time_cell)
            $("#road_money").val(road_money_cell)
            $("#note").val(note_cell)
            
            
            //クリックされたテーブルの内容から、「社員番号」「勤務場所」「契約形態」の条件(WHERE) で削除フラグの情報を[TE_Staff_Location]と[TM_Location]と[TC_Agreement]からSELECTする
            let del_sql = DB.sql('select del_flg from TE_Staff_Location inner join TM_Location on TE_Staff_Location.location_id = TM_Location.location_id inner join TC_Agreement on TE_Staff_Location.agreement_id = TC_Agreement.agreement_id where staff_id = "' +  staff_id_cell + '" and  location_name = "' + location_cell + '" and agreement_name ="' +  agreement_cell + '"') 
            //DBから取得した配列要素を変数に代入
            let del_convert = del_sql[0]["del_flg"]
                        
            //選択された社員に削除フラグがあるかないか判別し、削除フラグに反映
            if(del_convert == 1){
               $("#del_flg").prop("checked", true)   //1だったら削除フラグオン
            }else{
               $("#del_flg").prop("checked", false)  //0だったら削除フラグオフ
            }
           
	     });
	  });
	      
	      
	      //登録ボタン押下時の処理
	      $(function(){
	       $("#add_button").on("click",function(){
           
           
	       //プルダウンのボリューム要素が「勤務地」なので、変数[location_name]を元にSELECT文で勤務地IDを照会する
	       let location_name = $("#location_name_select").val() //勤務先IDプルダウンで選択中の値を変数に代入(変数[location_name])
	       let location_id_sql = DB.sql('SELECT location_id FROM TM_Location WHERE location_name = "' + location_name + '"') 
	       let  Li_convert = location_id_sql[0]["location_id"] //SELECTで生成した配列から変数に代入
	       console.log(Li_convert)
	       
	       //上同様に、契約形態名から契約形態IDへ変換
	       let agreement_name = $("#agreement_select").val()
	       console.log(agreement_name)
	       let agreement_name_sql = DB.sql('SELECT agreement_id FROM TC_Agreement WHERE agreement_name = "' + agreement_name + '"') 
	       let Ai_convert =  agreement_name_sql[0]["agreement_id"]
	       console.log("id=" + Ai_convert)
	       
	       
	       
	       try{
	       //プルダウン、テキストボックスで入力した内容で[TE_Staff_Location]へINSERT
	       let sql_5 = 'insert into TE_Staff_Location(staff_id, location_id, agreement_id, road_money, start_time, end_time, work_time, overtime_start, del_flg, note) values("' + $("#staff_id_select").val() + '","' +  Li_convert + '","' + Ai_convert + '","' + $("#road_money").val() + '","' + $("#start_time").val() + '","' +  $("#end_time").val() + '","' +   $("#work_time").val() + '","' + $("#over_time").val() + '", "0", "' + $("#note").val() + '")'
           console.log(sql_5)
           let add_sql = DB.sql(sql_5) //SELECT文をDB.sqlに代入し実行する
           window.location.reload();
           
           }catch(e) {
                alert("交通費が入力されていないか、登録しようとした「社員番号」「勤務場所」「契約形態」の組み合わせと同様のレコードがDB上に既に存在しています");
               window.location.reload();
             }
           
	     });
	  });

	      //更新ボタン押下時の処理
	      $(function(){
	        $("#change_button").on("click",function(){
	         
	          let del_flg_update = 0
	         
	         if($("#del_flg").is(':checked')){
  	           del_flg_update = 1
	         }else{
	           del_flg_update = 0
	         }
	         
	          //プルダウンのボリューム要素が「勤務地」なので、変数[location_name]を元にSELECT文で勤務地IDを照会する
	           let c_location_name = $("#location_name_select").val() //勤務先IDプルダウンで選択中の値を変数に代入(変数[location_name])
	           let c_location_id_sql = DB.sql('SELECT location_id FROM TM_Location WHERE location_name = "' + c_location_name + '"') 
	           let  c_Li_convert = c_location_id_sql[0]["location_id"] //SELECTで生成した配列から変数に代入
	            console.log(c_Li_convert)
	       
	           //上同様に、契約形態名から契約形態IDへ変換
	           let c_agreement_name = $("#agreement_select").val()
	           console.log(c_agreement_name)
	           let c_agreement_name_sql = DB.sql('SELECT agreement_id FROM TC_Agreement WHERE agreement_name = "' + c_agreement_name + '"') 
	           let c_Ai_convert =  c_agreement_name_sql[0]["agreement_id"]
	           console.log("id=" + c_Ai_convert)

	         let chg = 'update TE_Staff_Location SET road_money = "' + $("#road_money").val() + '", start_time = "' +  $("#start_time").val() + '", end_time ="' +  $("#end_time").val() + '", work_time ="' + $("#work_time").val() + '", overtime_start = "' + $("#over_time").val() + '", del_flg = "' +  del_flg_update + '", note ="' + $("#note").val() +  '" where staff_id = "' +  $("#staff_id_select").val() + '" and location_id = "' +  c_Li_convert + '" and agreement_id = "' +  c_Ai_convert + '"'
             let chg_sql = DB.sql(chg) //SELECT文をDB.sqlに代入し実行する
             window.location.reload();
	
	      });
	    });
	    
	     //戻るボタン押下時の処理
	      $("#back").on("click", function(){
           location.href = "../Admin_Panel/mng_menu_select.html"
 
          });
	    
	    
	    