let DB = {};

DB.sql = function (sql_str){
    let result;
    //postメソッドで送るデータを定義 var data = {パラメータ名 : 値};
    var data = {
        sql : sql_str
    };

    $.ajax({
        type: "post",
        url: "send.php",
        data: data,
        async: false
    }).done(function (response) {
		// JSONデータを変換
		result = JSON.parse(response);
	}).fail(function (xhr, textStatus, errorThrown) {
		// 通信エラーだった時の処理
		result = "通信エラーです";
	});
    return result;
}
