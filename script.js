function generatePassword() {
    // Prompt for password length
    let length = prompt("Enter password length (8-128 characters) or type 'exit' to cancel:");
    
    if (length === null || length.toLowerCase() === 'exit') {
        return null; // User chose to exit
    }
    
    length = parseInt(length);
    
    // Validate length
    while (isNaN(length) || length < 8 || length > 128) {
        length = prompt("Invalid input. Please enter a number between 8 and 128, or type 'exit' to cancel:");
        if (length === null || length.toLowerCase() === 'exit') {
            return null; // User chose to exit
        }
        length = parseInt(length);
    }
    
    // Prompt for character types
    let includeLowercase = customConfirm("Include lowercase characters?");
    if (includeLowercase === null) return null;
    
    let includeUppercase = customConfirm("Include uppercase characters?");
    if (includeUppercase === null) return null;
    
    let includeNumeric = customConfirm("Include numeric characters?");
    if (includeNumeric === null) return null;
    
    let includeSpecial = customConfirm("Include special characters?");
    if (includeSpecial === null) return null;
    
    // Validate at least one character type is selected
    while (!(includeLowercase || includeUppercase || includeNumeric || includeSpecial)) {
        alert("You must select at least one character type.");
        includeLowercase = customConfirm("Include lowercase characters?");
        if (includeLowercase === null) return null;
        
        includeUppercase = customConfirm("Include uppercase characters?");
        if (includeUppercase === null) return null;
        
        includeNumeric = customConfirm("Include numeric characters?");
        if (includeNumeric === null) return null;
        
        includeSpecial = customConfirm("Include special characters?");
        if (includeSpecial === null) return null;
    }
    
    // Define character sets
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numericChars = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    // Create a pool of allowed characters based on user selection
    let allowedChars = '';
    if (includeLowercase) allowedChars += lowercaseChars;
    if (includeUppercase) allowedChars += uppercaseChars;
    if (includeNumeric) allowedChars += numericChars;
    if (includeSpecial) allowedChars += specialChars;
    
    // Generate password
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    
    return password;
}

// Custom confirm function with "Yes", "No", and "Exit" options
function customConfirm(message) {
    const result = prompt(message + " (Type 'yes', 'no', or 'exit')").toLowerCase();
    if (result === 'yes') return true;
    if (result === 'no') return false;
    if (result === 'exit') return null;
    return customConfirm(message); // Ask again if input is invalid
}

// Function to write password to the page
function writePassword() {
    const password = generatePassword();
    const passwordText = document.querySelector("#password");
    
    if (password === null) {
        passwordText.value = "Password generation cancelled.";
    } else {
        passwordText.value = password;
    }
}

// Get references to the #generate element
const generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);