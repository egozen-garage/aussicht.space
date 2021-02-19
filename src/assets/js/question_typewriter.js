function typewriterSript(){
    console.log("finale the typewriter function is called");

    document.addEventListener('DOMContentLoaded',function(event){

        var timeToReloadNewText = 10000; // 10 seconds
        
        var dataText = [
            // <?php echo $one_item["question"]; ?>
            "Aber was wäre, wenn wir die Uhr zurückdrehen könnten?",
            "Wie sollten Sie ein Produkt und eine darauf basierende Dienstleistung entwerfen?",
            "Wie können wir uns von den Glaubenssystemen der herrschenden Klassen zu denen der Mittelschichten bewegen?",
            "Welcher Zweck und welche Funktion hat ein Farbstoff?",
            "Wie können wir diesen Abgrund an Verschwendung vermeiden?",
            "Wie sollten Sie es schreiben?",
            "Warum schaffen wir ein neues Ideal?",
            "Sollten wir alle so töricht sein?",
            "Warum sollen wir glauben, dass die Bedingungen, die große Pandemie von 1918 verursachten?"
        ];

        // types one text in the typewriter
        // keeps calling itself until the text is finished
        function typeWriter(text, i, fnCallback) { 
            // checks if the text isn't finished yet, and add next character
            if (i < (text.length)) {
                // document.querySelector("span").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
                document.getElementById("type-questions").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

                // wait for a while and call this function again for the next character
                setTimeout(function() {
                    typeWriter(text, i + 1, fnCallback)
                }, 100);
            }
            
            // when text is finished, call the callback function again
            else if (typeof fnCallback == 'function') {
                setTimeout(function() {
                    deleteText(text, i);
                }, timeToReloadNewText);
                
                // call callback after timeout
                setTimeout(fnCallback, 100*(text.length)+timeToReloadNewText+600);    
            }
        }

        function deleteText(text, i){
            if (i <= (text.length) && i > 0) {
                document.getElementById("type-questions").innerHTML = text.substring(0, i-1) +'<span aria-hidden="true"></span>';
                // wait for a while and call this function again for the next character
                setTimeout(function() {
                    deleteText(text, i - 1)
                }, 100);
            }
        }
        
        // start animation for the text in the dataText array
        function StartTextAnimation(i) {
            if (typeof dataText[i] == 'undefined'){
                setTimeout(function() {
                    StartTextAnimation(0);
                }, 2000);
            }
            
            // if dataText[i] exists, start animation
            if (i < dataText[i].length) {
                typeWriter(dataText[i], 0, function(){
                    // after callback (and whole text has been animated)
                    // start new text
                    StartTextAnimation(i + 1);
                    //setTimeout(function() {
                        // start deleting old text

                        // let TextToDelete = dataText[i];
                        // for (i = (TextToDelete[i].length); i > 0; i--){
                        //     document.getElementById("type-questions").innerHTML = TextToDelete.substring(0, i-1) +'<span aria-hidden="true"></span>';
                        // }
                        // start new text
                    //    StartTextAnimation(i + 1);
                    //}, 1000);
                });
            }
        }
        StartTextAnimation(0);
    });

}