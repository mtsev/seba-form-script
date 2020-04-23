# seba-form-script

Google script for lo-fi society verification form. Generates and emails verification code to be checked by [Discord bot seba](https://github.com/mtsev/seba). **Must be configured with same seed value as the bot.**

Emails will be sent from the form owner's account. It is recommended for your society's gmail account to be the form owner.

## Installation
1. Open the script editor for your form responses spreadsheet under "Tools".

2. Add `Code.gs`, `config.gs`, and the `.html` files to the project.

3. Modify `config.gs` to tailor to your server.

4. Click on the clock icon (between the save and run icons) to see the project's triggers.

5. Add trigger to run function `onFormSubmit` with event source `From spreadsheet` for event type `On form submit`.

## Database
To enable database features for the Discord bot, you must also give the Google script access so that the database can be populated with members' details as they submit them.

First, set up the database following the instructions in [seba/database](https://github.com/mtsev/seba/tree/master/database). **You must set up the database first before proceeding.**

Then log in to MySQL, entering your MySQL root user password when prompted:
```
$ mysql -uroot -p
Enter password:
```

Make a new user for the script to access the database as. Replace `username` with the username, `password` with the password, and `db_name` with the database name:
```
mysql> CREATE USER username IDENTIFIED BY 'password';
mysql> GRANT INSERT ON db_name.submissions TO username;
mysql> exit
```

To enable remote access to the database, open up the `mysqld.cnf` file:
```
$ sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Navigate down to the `bind-address` line:
```
. . .
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address            = 127.0.0.1
. . .
```

Change the address to `0.0.0.0`:
```
. . .
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address            = 0.0.0.0
. . .
```

Then close and save the file. Restart MySQL to let the changes take effect:
```
$ sudo service mysql restart
```

If you have a firewall, open up port `3306` for **each of the IP ranges [in this list](https://developers.google.com/apps-script/guides/jdbc#using_jdbcgetconnectionurl)** one at a time like so:
```
$ sudo ufw allow from 64.18.0.0/20 to any 3306
$ sudo ufw allow from 64.233.160.0/19 to any 3306
. . .
```
and so on.

Finally, add the `jdbc.gs` file to the project and set the config values at the top of `jdbc.gs` for your database. For example:

```
var host = '192.168.0.2:3306';
var user = 'seba_form_usr';
var pwd = 'P@ssw0rd!';
var db = 'seba_db';
```
