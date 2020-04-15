# seba-form-script

Google script for lo-fi society verification form. Generates and emails verification code to be checked by [Discord bot seba](https://github.com/mtsev/seba). **Must be configured with same seed value as the bot.**

Emails will be sent from the form owner's account. It is recommended for your society's gmail account to be the form owner.

## Installation
1. Open the script editor for your form responses spreadsheet under "Tools".

2. Add all the files in this repository (except `README.md`) to the project.

3. Modify `config.gs` to tailor to your server.

4. Click on the clock icon (between the save and run icons) to see the project's triggers.

5. Add trigger to run function `onFormSubmit` with event source `From spreadsheet` for event type `On form submit`.
