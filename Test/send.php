<html>
    <head><title>PHP TEST</title></head>
    <body>
        <?php

        $dsn = 'mysql:dbname=testDB;host=localhost';
        $user = 'root';
        $password = 'P@ssw0rd';

        try{
            $dbh = new PDO($dsn, $user, $password);

            echo '接続に成功しました。';

            $dbh->query('SET NAMES sjis');

            $sql = 'select * from testdbszk';
            foreach ($dbh -> query($sql) as $row){
                print($row['id']);
                print($row['name'].'<br>');
            }
        }catch (PDOException $e){
            print('Error:'.$e->getMessage());
            die();
        }

        $dbh = null;

        ?>

    </body>
    </html>