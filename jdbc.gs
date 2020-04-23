/* host ip of the database -- replace <host.ip.addr> */
var host = 'host.ip.addr';

/* port number to conenct to -- default port 3306 */
var port = '3306';

/* MySQL user to authenticate as -- replace <username> */
var user = 'username';

/* password of that MySQL user -- replace <password> */
var pwd = 'password';

/* name of the database to use -- replace <db_name> */
var db = 'db_name';


function insertSubmission(input) {
  
  var fields = ['discord_name', 'real_name', 'email_address'];
  var values = ['?', '?', '?'];
  
  // Add zID to statement if submitted
  if (input[zID].toString().length > 0) {
    fields.push('zid');
    values.push('?');
  }
  
  // Add phone number to statement if submitted
  if (input[phone].toString().length > 0) {
    fields.push('phone_number');
    values.push('?');
  }
  
  // Make connection
  var info = '?useUnicode=yes&characterEncoding=UTF-8';
  var url  = 'jdbc:mysql://' + host + ':' + port + '/' + db + info;
  var conn = Jdbc.getConnection(url, user, pwd);
  
  // Prepare statement
  var stmt = conn.prepareStatement('INSERT INTO submissions '
      + '(' + fields.join() + ') '
      + 'values (' + values.join() + ')');
  stmt.setString(1, input[discord]);
  stmt.setString(2, input[name]);
  stmt.setString(3, input[email]);
  
  // Set zID
  if (fields.includes('zid')) {
    stmt.setString(4, input[zID]);    
  }

  // Set phone number
  if (fields.includes('phone_number')) {
    stmt.setString(fields.length, input[phone]);
  }
  
  // Execute statement
  var results = stmt.executeUpdate();
  
  // Log result
  Logger.log(results + " rows affected");
}
