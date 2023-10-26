// ==UserScript==
// @name         Neopets - Customization Contest Picture Enlarger
// @description  Enlarges pet image x4 when voting in the customization spotlight.
// @version      2.0
// @homepage     https://github.com/razvr/neo-customization-spotlight/
// @updateURL    https://github.com/razvr/neo-customization-spotlight/blob/main/customizationspotlight.user.js
// 
// @match        *://*.neopets.com/spotlights/custompet/custom_spotlight_votes.phtml*
// @icon         https://www.neopets.com/favicon.ico
// @grant        none
//
// @author       razur
// @namespace    https://reddit.com/u/razur
// ==/UserScript==

(function() {
    'use strict';

    var targetDOM = $('#content > table > tbody > tr > td.content > table > tbody > tr:nth-child(2) > td');
    var imgHTML = targetDOM.html();

    // Finds where the in the HTML string the petName starts.
    var cpnIndex = imgHTML.indexOf('/cpn/') + 5;
    var cpIndex = imgHTML.indexOf('/cp/') + 4;

    var petName = '';
    var newImageHTML = '';

    // Neopets uses 2 different hosting folder for pet images: one which uses the pet's name (/cpn/) and one the uses a hash string (/cp/).

    if(imgHTML.indexOf('cp/') === -1){
        // If pet name is in the URL. (uses /cpn/)
        petName = imgHTML.slice(cpnIndex, imgHTML.lastIndexOf('/1'));
        newImageHTML = '<img src="http://pets.neopets.com/cpn/' + petName + '/1/5.png">';

    } else {
        // If pet name is NOT in the URL. (uses /cp/)
        petName = imgHTML.slice(cpIndex, imgHTML.lastIndexOf('/1'));
        newImageHTML = '<img src="http://pets.neopets.com/cp/' + petName + '/1/5.png">';
        petName = '';

    }

    //Add the image and the pets name (if the pet comes from a /cpn/ folder) to the screen.
    petName ?
        targetDOM.html(newImageHTML + '<br /><br /> <b>Pet Name:</b> <a href="https://www.neopets.com/petlookup.phtml?pet=' + petName + '">' + petName + '</a>')
        : targetDOM.html(newImageHTML);

})();
