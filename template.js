function createHtmlContent(title, description, tree) {
	return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
    </head>
    <body>
        <h1>${title}</h1>
        <p>${description}</p>
        <div id="techtree">${tree}</div>
    </body>
    <style>
        /*https://www.w3schools.com/css/css_tooltip.asp*/

        :root {
            --main_bg: rgb(48, 48, 48);
            --text_col: white;

            --tech_tree_bg: rgb(36, 46, 51);
        }

        td {
            border: 1px black solid;
        }

        ul {
            padding-left: 17px;
        }

        body {
            padding-top: 50px;
            font-family: 'Arial';
            background-color: var(--tech_tree_bg);
            color: var(--text_col);
        }

        .type_researchable,
        .type_event {
            background-color: rgb(46, 66, 80);
        }

        .type_premium {
            background-color: rgb(60, 52, 28);
        }

        .type_squadron {
            background-color: rgb(48, 70, 44);
        }

        .badgeSide {
            width: 10px;
        }

        .badgeLine {
            height: 20px;
            padding: 0px;
        }

        #techtree {
            margin: auto;
            width: fit-content;
        }

        #techtree img,
        #delModal .modal-body img {
            position: absolute;
            bottom: 0px;
            left: 0px;
            max-height: 70%;
            max-width: 80%;
        }

        #vehicleDeleteDisplay {
            background-color: var(--tech_tree_bg);
            width: fit-content;
            margin: 10px;
            margin: auto;
            border-radius: 10px;
        }

        #techtreename {
            display: block;
            margin: auto;
            text-align: center;
            height: 2rem;
            font-size: 2rem;
        }

        #techtreenamelabel,
        #techtreemaindesclabel {
            display: block;
            text-align: center;
        }

        #deleteAllButton {
            display: block;
            margin: auto;
            margin-top: 10px;
            background-color: rgb(212, 0, 0);
            color: black;
            font-weight: bold;
            padding: 10px;
            border: 3px black dashed;
            cursor: pointer;
        }

        a {
            color: greenyellow;
        }

        #techtree table,
        #delModal .modal-body table {
            border-collapse: separate;
            border-spacing: 0;
        }

        #techtree td,
        #delModal .modal-body td {
            border-color: rgba(0, 0, 0, 0);
            border-top-width: 0px;
            border-bottom-width: 0px;
        }

        .rank {
            border-left: 2px solid white;
            border-right: 2px solid white;
            border-bottom: 2px solid white;
            display: flex;
            width: fit-content;
        }

        .rank:first-of-type {
            border-top: 2px solid white;
        }

        .branch {
            width: 182px;
            display: inline-block;
            vertical-align: top;
            flex-shrink: 0;
        }

        .vehicleName {
            z-index: 1;
            text-shadow: 0px 0px 11px #000000;
            max-width: 140px;
            position: absolute;
            top: 0px;
            left: 4px;
        }

        .vehicleBr {
            z-index: 1;
            text-shadow: 0px 0px 11px #000000;
            position: absolute;
            bottom: 1px;
            right: 2px;
        }

        .folderNumber {
            position: absolute;
            top: -1px;
            right: -1px;
            border: none;
            text-align: right;
            width: 30px;
            height: 30px;
            background: linear-gradient(to top right, transparent 50%, #000000 0) top right/30px 30px no-repeat, transparent;
        }

        .vehicleBadge {
            width: 150px;
            height: 50px;
            border: 1px black solid !important;
        }

        /*.fillerDiv {}*/

        nav {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 3;
        }

        nav div {
            background-color: cadetblue;
            padding: 3px;
            margin-top: 3px;
            border-radius: 0 5px 5px 0;
            border: 1px solid black;
            border-left: none;
            cursor: pointer;
            text-align: center;
        }

        .lineDiv {
            width: 20px;
            background-color: rgb(96, 125, 139);
            height: 100%;
            margin: auto;
        }

        .lineArrow {
            width: 0px;
            height: 0px;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 20px solid rgb(96, 125, 139);
            margin: auto;
        }

        .rankNumber {
            border-right: 2px solid white;
            display: flex;
            align-items: center;
        }

        .rankNumberText {
            writing-mode: vertical-rl;
            text-orientation: mixed;
            padding: 3px;
            height: fit-content;
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
        }

        #vehicleimagelist td,
        #vehicleimagelistedit td {
            border: none;
            transform: translateY(10px);
        }

        #vehicleimagelist,
        #vehicleimagelistedit {
            margin-top: 0;
        }

        #vehicleimagelist li::marker,
        #vehicleimagelistedit li::marker {
            font-size: 2rem;
        }

        /*REGION TOOLTIPS*/
        .tooltip {
            position: relative;
            display: inline-block;
        }

        .tooltip .tooltiptext {
            visibility: hidden;
            width: 300px;
            background-color: black;
            text-align: center;
            padding: 5px 0;
            border-radius: 6px;

            position: absolute;
            z-index: 2;
        }

        .tooltip:hover .tooltiptext {
            visibility: visible;
        }

        .foldertooltip {
            margin-bottom: -4px;
            position: relative;
            display: inline-block;
        }

        .foldertooltip .foldertooltiptext {
            visibility: hidden;
            background-color: rgb(64, 85, 97);
            border-radius: 6px;
            position: absolute;
            z-index: 2;
        }

        .foldertooltiptext {
            top: 0px;
        }

        .foldertooltip:hover .foldertooltiptext {
            visibility: visible;
        }

        /*ENDREGION TOOLTIPS*/

        /* The Modal (background) */
        .modal {
            display: none;
            /* Hidden by default */
            position: fixed;
            /* Stay in place */
            z-index: 2;
            /* Sit on top */
            left: 0;
            top: 0;
            width: 100%;
            /* Full width */
            height: 100%;
            /* Full height */
            overflow: auto;
            /* Enable scroll if needed */
            background-color: rgb(0, 0, 0);
            /* Fallback color */
            background-color: rgba(0, 0, 0, 0.75);
            /* Black w/ opacity */
        }

        /* Modal Content/Box */
        .modal-content {
            background-color: rgb(46, 66, 80);
            margin: 15% auto;
            /* 15% from the top and centered */
            padding: 20px;
            width: 80%;
            /* Could be more or less, depending on screen size */
            max-width: 750px;
        }

        .modal-gallery {
            width: 100%;
        }

        /* The Close Button */
        .close {
            color: rgb(255, 255, 255);
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .galleria {
            width: 100%;
            height: 400px;
            background: #000;
        }

        .cke_wysiwyg_div,
        .cke_wysiwyg_frame {
            background-color: black;
        }

        .close:hover,
        .close:focus {
            color: rgb(255, 0, 0);
            text-decoration: none;
            cursor: pointer;
        }

        /* Modal Header */
        .modal-header {
            padding: 2px 16px;
            background-color: rgb(25, 37, 46);
            color: white;
        }

        /* Modal Body */
        .modal-body {
            padding: 10px;
        }

        /* Modal Content */
        .modal-content {
            position: relative;
            margin: auto;
            padding: 0;
            width: 80%;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            animation-name: animatetop;
            animation-duration: 0.4s;
        }

        /* Add Animation */
        @keyframes animatetop {
            from {
                top: -300px;
                opacity: 0;
            }

            to {
                top: 0;
                opacity: 1;
            }
        }
    </style>
    <script></script>
</html>

    `
}