// User will enter in which country they want
// convert to AUD from EU
//User will enter in how much money they have in AUD and what it will equate to
//User will enter in how much money they have in ___ and what it will equate to in AUD



const menu = require("./src/UILayer/Menu")





async function Program() {
    // Your Code Here...
    
    await menu();
    

    }

Program().then(() => {
    process.exit(0)
});






