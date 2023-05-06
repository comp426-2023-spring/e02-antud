function onStartup() {
    $('.shots').hide()
    $('.rpsls').hide()
    $('#rules').hide()
    $('#result').hide()
}

// This function shows and hides the shot selection in the interface based 
// on whether or not the #opponent checkbox is checked
function showHideShots() {
    // Get the info from the checkbox
    let check = document.getElementById('opponent');

    let rpsSel = document.getElementById('rps');
    let rsplsSel = document.getElementById('rpsls');
    // Check if the checkbox is checked and show or hide options accordingly
        if (check.checked == true) {
    // Here, instead of just showing all of the options, use similar logic to 
    // check which of the game radio buttons is checked and show only those
    // options relevant to the game being selected (rps or rpsls). You can 
    // use similar jQuery 
            $('.shots').show()
            if (rpsSel.checked == true) {
                $('.rpsls').hide()
            }
            else {
                $('.rpsls').show()
            }
        } else {
            $('.shots').hide()
        }
        $('#result').hide()    
    }

    function rules() {
        $('#rules').toggle()
        console.log($('#rules')[0].innerText);
        if ($('#rules')[0].innerText == "Show Rules") {
            $('#rules')[0].innerText = "Hide Rules";
        }
        else {
            $('#rules')[0].innerText = "Show Rules";
        }    
    }
    // This function clears the input form and also resets the shot selection
    // radio buttons. 
    function startOver () {
        document.getElementById('userinput').reset();
        showHideShots();
        $('#rules').hide()
        $('#rules')[0].innerText = "Show Rules"
    }
    
    async function playGame () {
        $('#result').hide()
        let check = document.getElementById('opponent');
        // Get which game is being played based on the value in the form
        let game = $('input[type=radio][name=game]:checked').val();
        // Get which shot is being played based on the value in the form
        let shot = $('input[type=radio][name=shot]:checked').val();
        // Identify the base URL based on browser information
        let baseurl = window.location.href + 'app/'
        // Log the base URL
        console.log(baseurl)
        // This constructs a URL for the opponent option ONLY. To incorporate
        // the other option, you can use a conditional to change the URL based
        // on what is selected. You could also write separate functions, or use
        // a conditional somewhere above in this function to construct the 
        // correct URL
        let url = baseurl + game + '/play/' //+ shot remove for separete url
        // Log the full URL
        console.log(url)	

        if (check.checked == true) {
            url = url + shot
        }
    
        let response = await fetch(url)
        let result = await response.json()
        // Log the result
        console.log(result)
        // Here you should include code that uses the DOM API or jQuery to 
        // manipulate another block of HTML in the interface to display the 
        // results in some way. 

        //let img = document.getElementById('playerImage').src 
        document.getElementById('playerImage').src = './img/' + result.player + '.jpg'

        if (check.checked == true) {
            document.getElementById('opponentImage').src = '/img/' + result.opponent + '.jpg'
            document.getElementById('gameResults').innerHTML = 
                                                             'Result: ' + result.result +
                                                             '<br> You played: ' + result.player + 
                                                             '<br> Your opponent played: ' + result.opponent
        }
        else {
            document.getElementById('gameResult').innerHTML = 'Result: ' + result.player
        }
        $('#result').show
    }