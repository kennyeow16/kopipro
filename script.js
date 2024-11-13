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
    let phonetic = '';

    // Drink type
    result += order.drinkType.charAt(0).toUpperCase() + order.drinkType.slice(1);
    phonetic += order.drinkType.toUpperCase() + ' ';

    // Condiments
    switch(order.condiment) {
        case 'evaporated':
            result += '-C';
            phonetic += 'SEE ';
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
                } else if (order.sweetness === 'more') {
                    result += ' Gah Dai';
                    phonetic += 'GAH DIE ';
                }
            } else {
                result += ' Kosong';
                phonetic += 'KOH-song ';
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
            } else if (order.sweetness === 'more') {
                result += ' Gah Dai';
                phonetic += 'GAH DIE ';
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
            } else if (order.sweetness === 'more') {
                result += ' Gah Dai';
                phonetic += 'GAH DIE ';
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
            if (order.condensedMilk === 'yes') {
                // No specific term for this, so add a space it to the description
                result += ' ';
            }
            break;
        case 'none':
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
    }

    result = result.trim();
    phonetic = phonetic.trim();

    document.getElementById('result').innerHTML = `Your order: ${result}<br>How to pronounce: ${phonetic}`;
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