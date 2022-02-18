# LumiNUS Quiz Enhancer
An ambitious project to improve the overall LumiNUS Quiz experience.

# Features
  - Auto fill-in when the JSON data of previous response is provided

# Todo
  - Deploy as userscript
  
# Usage
1. Produce JSON response
    - Enter the Quiz page
        > Quiz <br/>
        Due: <br/>
        Marks: <br/>
        Time Limit: <br/>
        Allowed Attempts: Unlimited attempts
    - Press `F12` to open developer tools
    - Switch to `Network` tab
    - Click on the attempt you would like to load
2. Copy the response
    - Open the line appeared on `Network`
    - Check out its `Response`
    - Click `Raw` and copy everything
3. Paste this script
    - Start the new attempt
    - Press `F12`
    - Switch to `Console` tab
    - Paste the latest build onto console and enter
4. Enjoy the thing
    - Now it should prompt you
    - Kindly paste whatever you got from step 2
5. Sit back with relief
  
# Disclaimer
The purpose is merely reduce your pain to attempt based on your own previous responses. There is no warranty of functionality. Use it wisely, and at your own risk.