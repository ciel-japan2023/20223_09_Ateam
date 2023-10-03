<html>
    <head>
        <meta charset = "UTF-8">
        <title>PHP TEST</title>
    </head>
    <body>
        <?php

        $dsn = 'mysql:dbname=company_money_maneger;host=192.168.1.252';
        $user = 'root';
        $password = 'Cielj@p@n-2019';

        try{
            $dbh = new PDO($dsn, $user, $password);

            echo '接続に成功しました。';

            $dbh->query('SET NAMES utf8');

            $sql = 'select * from TM_Staff';
            foreach ($dbh -> query($sql) as $row){
                print($row['staff_name']);
            }
        }catch (PDOException $e){
            print('Error:'.$e->getMessage());
            die();
        }

        $dbh = null;

        ?>

    </body>
    </html>