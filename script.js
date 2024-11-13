let order = {};
let currentStep = 1;

function selectOption(step, option) {
    order[step] = option;
    document.getElementById(`step${currentStep}`).style.display = 'none';
    
    let nextStep;

    switch(step) {
        case 'drinkType':
            nextStep = 2;
            break;
        case 'intensity':
            nextStep = 3;
            break; 
        case 'condiment':
            if (option === 'evaporated') {
                nextStep = 4;
            } else if (option === 'butter') {
                nextStep = 6;
            } else if (option === 'condensed'|| option === 'sugar') {
                nextStep = 5;
            } else {
                nextStep = 7;
            }
            break;
        case 'sugarOption':
            nextStep = option === 'sugar' ? 5 : 7;
            break;
        case 'sweetness':
            nextStep = 7;
            break;
        case 'condensedMilk':
            nextStep = 7;
            break;
        case 'temperature':
            generateResult();
            return;
        default:
            nextStep = currentStep + 1;
    }

    for (let i = 1; i <= 7; i++) {
        document.getElementById(`step${i}`).style.display = 'none';
        }
        document.getElementById(`step${nextStep}`).style.display = 'block'

        currentStep = nextStep;
}

function generateResult() {
    let result = '';
    let component = ''; //newly added to display component
    let phonetic = '';

    // Drink type
    result += order.drinkType.charAt(0).toUpperCase() + order.drinkType.slice(1);
    phonetic += order.drinkType.toUpperCase() + ' ';

    //newly added to display component
    switch(order.drinkType) {    
        case 'kopi':
            if (order.intensity === 'gau') {
                component += 'strong coffee';
            } else if (order.intensity === 'po') {
                component += 'coffee + water';
            } else {
            component += 'coffee';
            }
        break;
        case 'teh':
            if (order.intensity === 'gau') {
                component += 'strong tea';
            } else if (order.intensity === 'po') {
                component += 'tea + water';
            } else {
            component += 'tea';
            }
        break;
    }

    // Condiments
    switch(order.condiment) {
        case 'evaporated':
            result += '-C';
            phonetic += 'SEE ';
            component += ' + evaporated milk'; // newly added
            // Intensity
            if (order.intensity === 'gau') {
                result += ' Gau';
                phonetic += 'GOW ';
            } else if (order.intensity === 'po') {
                result += ' Po';
                phonetic += 'POH ';
            }
            
            //sugar and sweetness
            if (order.sugarOption === 'sugar') {
                if (order.sweetness === 'less') {
                    result += ' Siew Dai';
                    phonetic += 'SEW DIE ';
                    component += ' + less sugar'; // newly added
                } else if (order.sweetness === 'more') {
                    result += ' Gah Dai';
                    phonetic += 'GAH DIE ';
                    component += ' + extra sugar'; // newly added
                } else {                           //new added
                    component += ' + sugar';    //new added
                }
            } else {
                result += ' Kosong';
                phonetic += 'KOH-song ';
                component += ' + no sugar'; // newly added
            }
            break;
            
        case 'condensed':
            // Intensity
            if (order.intensity === 'gau') {
                result += ' Gau';
                phonetic += 'GOW ';
            } else if (order.intensity === 'po') {
                result += ' Po';
                phonetic += 'POH ';
            }
            
            //sugar and sweetness
            if (order.sweetness === 'less') {
                result += ' Siew Dai';
                phonetic += 'SEW DIE ';
                component += ' + less condensed milk'; // newly added
            } else if (order.sweetness === 'more') {
                result += ' Gah Dai';
                phonetic += 'GAH DIE ';
                component += ' + extra condensed milk'; // newly added
            } else {                                    // newly added
                component += ' + condensed milk'; // newly added
            }
            break;

        case 'sugar':
            result += '-O';
            phonetic += 'OH ';

            // Intensity
            if (order.intensity === 'gau') {
                result += ' Gau';
                phonetic += 'GOW ';
            } else if (order.intensity === 'po') {
                result += ' Po';
                phonetic += 'POH ';
            }
            
            //sugar and sweetness
            if (order.sweetness === 'less') {
                result += ' Siew Dai';
                phonetic += 'SEW DIE ';
                component += ' + less sugar'; // newly added
            } else if (order.sweetness === 'more') {
                result += ' Gah Dai';
                phonetic += 'GAH DIE ';
                component += ' + extra sugar'; // newly added
            } else {                        // newly added
                component += ' + sugar'; // newly added
            }
            break;
        case 'butter':
            // Intensity
            if (order.intensity === 'gau') {
                result += ' Gau';
                phonetic += 'GOW ';
            } else if (order.intensity === 'po') {
                result += ' Po';
                phonetic += 'POH ';
            }

            result += ' Gu You';
            phonetic += 'GOO YOH ';
            component += ' + butter'; // newly added
            if (order.condensedMilk === 'yes') {
                // No specific term for this, so add a space it to the description
                result += ' ';
                component += ' + condensed milk'; // newly added
            }
            break;
        case 'none':
            component += ' + no sugar'; // newly added

            // Intensity
            if (order.intensity === 'gau') {
                result += '-O Gau Kosong';
                phonetic += 'OH GOW KOH-song';
            } else if (order.intensity === 'po') {
                result += '-O Po Kosong';
                phonetic += 'OH POH KOH-song';
            } else {
                result += '-O Kosong';
                phonetic += 'OH KOH-song ';
            }
            break;
    }

    // Temperature
    if (order.temperature === 'cold') {
        result += ' Peng';
        phonetic += 'PENG';
        component += ', cold'; // newly added
    } else {                   // newly added
        component += ', hot'; // newly added
    }

    result = result.trim();
    phonetic = phonetic.trim();

    document.getElementById('result').innerHTML = `
    <p id="resultLiner">Your order: ${result}</p>
    <p id="componentLiner"><weak>(${component})</weak></p>
    <p id="phoneticLiner">How to pronounce: ${phonetic}</p>`;       //newly added
    document.getElementById('result').style.display = 'block';

    // Show the reset button after generating the result
    document.getElementById('resetButton').style.display = 'block';

    // Hide all steps
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`step${i}`).style.display = 'none';
    }
}

function resetChoices() {
    // Reset the order object and current step
    order = {};
    currentStep = 1;

    for (let i = 1; i <= 7; i++) {
        document.getElementById(`step${i}`).style.display = 'none';
    }
    
    document.getElementById(`step1`).style.display = 'block';

    document.getElementById('result').innerHTML = '';
    document.getElementById('result').style.display = 'none';

    // Hide the reset button
    document.getElementById('resetButton').style.display = 'none';
}

function goBack() {
    if (currentStep > 1) {
        document.getElementById(`step${currentStep}`).style.display = 'none';
        currentStep--;
        const lastStep = Object.keys(order).pop();
        delete order[lastStep];

        // Special handling for going back from certain steps
        if (currentStep === 3) {
            document.getElementById('step3').style.display = 'block';
        } else if (currentStep === 4 && order.condiments !== 'evaporated') {
            goBack(); // Skip step 4 if not needed
        } else {
            document.getElementById(`step${currentStep}`).style.display = 'block';
        }
    }

    // Hide result and reset button if they were visible
    document.getElementById('result').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    resetChoices();
});