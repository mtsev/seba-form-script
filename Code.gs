function onFormSubmit(e) {
  
  // Log form submission values for debugging
  var values = e.namedValues;
  for (Key in values) {
    var label = Key;
    var data = values[Key];
    Logger.log(label + ": " + data);
  };
  
  // Verification code
  var code = getPad(values[discord].toString() + seed, 6);
  Logger.log("Code: " + code);
  
  // Email subject
  var subject = "Discord verification for " + serverName;
  
  // Load html template
  var templ = HtmlService.createTemplateFromFile('verify-email');
  templ.name = values[name];
  templ.discord = values[discord];
  templ.email = values[email];
  templ.code = code;
  templ.replyto = senderEmail;
  templ.valediction = valediction;
  templ.server = serverLink;
  
  // Send to student email if zID exists else to given email
  var recipient;
  
  // Send email with zID to student email
  if (values[zID].toString().length > 0) {
    templ.type = "Student ID";
    templ.value = values[zID];
    recipient = values[zID] + "@unsw.edu.au";
  }
  
  // Send email with phone number to given email
  else if (values[phone].toString().length > 0) {
    templ.type = "Phone number";
    templ.value = values[phone];
    recipient = values[email];
  }

  // If neither zID nor phone number are provided, send email requesting them  
  else {
    templ = HtmlService.createTemplateFromFile('missing-info-email')
    templ.name = values[name];
    templ.form = formLink;
    recipient = values[email];
  }
  
  // Get email body from html template  
  var body = templ.evaluate().getContent();
  
  // Send email
  GmailApp.sendEmail(recipient, subject, '', {name:senderName,htmlBody:body});
  return;
}
