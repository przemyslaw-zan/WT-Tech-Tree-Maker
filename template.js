function createHtmlContent(title, description, tree, vehicles) {
	return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <meta name="generator" content="https://github.com/przemyslaw-zan/WT-Tech-Tree-Maker" />
        <link rel="icon" href="https://warthunder.com/i/favicons/mstile-144x144.png" />
    </head>
    <body>
        <span style="position: fixed; right: 10px">
            Created using
            <a href="https://github.com/przemyslaw-zan/WT-Tech-Tree-Maker" target="_blank"> WT Tech Tree Maker </a>
        </span>
        <h1 style="text-align: center; border-bottom: 1px solid black; padding: 5px">${title}</h1>
        <div style="max-width: 1000px; margin: auto;">${description}</div>
        <div id="techtree">${tree}</div>
        <div id="vehicleDisplayModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2 id="modal_title"></h2>
                </div>
                <div class="modal-gallery">
                    <div class="galleria" id="galleria"></div>
                </div>
                <div class="modal-body" id="modalDesc"></div>
            </div>
        </div>
    </body>
    <style>
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

        #nameInputDiv {
            text-align: center;
            padding-bottom: 15px;
        }

        blockquote {
            font-style: italic;
            border-left: 3px rgb(31, 31, 31) solid;
            padding: 5px;
        }

        #editSelectDiv {
            text-align: center;
            padding-bottom: 15px;
        }

        #vehicleimagelisteditadd,
        #vehicleimagelistadd {
            display: block;
            margin-top: 5px;
            background-color: rgb(78, 156, 0);
            color: white;
            border-radius: 3px;
            border: 1px solid black;
            cursor: pointer;
        }

        #addButton,
        #editButton {
            display: block;
            margin: auto;
            margin-top: 15px;
            font-size: 1.3rem;
            background-color: rgb(78, 156, 0);
            color: white;
            border-radius: 3px;
            border: 1px solid black;
            cursor: pointer;
        }

        #modalDesc h1,
        #modalDesc h2,
        #modalDesc h3 {
            font-weight: normal;
        }

        .flexWrapper {
            width: 50%;
            float: left;
        }

        .inputModalFlex {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .inputModalFlexChild {
            padding: 3px;
            width: fit-content;
        }

        .flexTitle {
            width: 100%;
            display: inline-block;
            text-align: center;
            font-size: large;
        }

        body {
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

        #orderModal table {
            margin: auto;
            border-spacing: 10px;
        }

        #orderModal td {
            border: none;
        }

        #orderModal th {
            color: rgb(221, 0, 0);
            cursor: pointer;
        }

        nav {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 3;
        }

        nav div {
            background-color: cadetblue;
            padding: 3px;
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

        #vehicleimagelist input,
        #vehicleimagelistedit input {
            width: 300px;
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
    <script
        src="https://code.jquery.com/jquery-3.5.1.js"
        integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
        crossorigin="anonymous"
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/galleria/1.6.1/galleria.min.js"></script>
    <script>
        const vehicleList = ${vehicles}
        const descriptionTemplate =
        '<h3><em>Year:</em> <strong>XXXX</strong>&nbsp;<em>Development stage:</em>&nbsp;<strong>X</strong></h3>\u005Cn\u005Cn<p>Historical description...</p>\u005Cn\u005Cn<h3><em>Primary weapon:</em> <strong>X</strong></h3>\u005Cn\u005Cn<p>Primary weapon description...</p>\u005Cn\u005Cn<h3><em>Secondary weapon:</em> <strong>X</strong></h3>\u005Cn\u005Cn<p>Secondary weapon description...</p>\u005Cn\u005Cn<h3><em>Other info:</em></h3>\u005Cn\u005Cn<p>Crew, armor, mobility etc...</p>\u005Cn\u005Cn<h3><em>Proposed BR:</em> <strong>X.X</strong></h3>\u005Cn\u005Cn<p>Justification for Battle Rating placement...</p>\u005Cn\u005Cn<p><em>Links:</em></p>\u005Cn\u005Cn<ol>\u005Cn\u005Ct<li>Source 1...</li>\u005Cn\u005Ct<li>Source 2...</li>\u005Cn\u005Ct<li>WT forum discussion on the vehicle...</li>\u005Cn</ol>\u005Cn'

        Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.6.1/themes/classic/galleria.classic.min.js')
        Galleria.run('.galleria')
        Galleria.configure({
            _toggleInfo: false
        })

        function isClickable(vehicle) {
            const images = vehicle.images?.length > 0
            const description = vehicle.description?.length > 0 && vehicle.description !== descriptionTemplate
            return description || images
        }

        function closeModal() {
            document.querySelector('body').style.overflow = 'visible'
            document.querySelectorAll('.modal').forEach((modal) => {
                modal.style.display = 'none'
            })
            $('.galleria').data('galleria').splice(0, $('.galleria').data('galleria').getDataLength())
            $('.galleria').data('galleria').destroy()
            Galleria.run('.galleria')
        }

        document.querySelectorAll('.close').forEach((item) => {
            item.addEventListener('click', () => {
                closeModal()
            })
        })
        window.onclick = function (event) {
            if (event.target.classList.contains('modal')) {
                closeModal()
            }
        }

        document.querySelector('#techtree').addEventListener('click', (e) => {
            let element = e.target
            if (!element.id) element = element.parentNode
            if (!element.id) return
            const vehicle = vehicleList.find((item) => {
                return item.id === element.id
            })
            if (!isClickable(vehicle)) return
            document.querySelector('#modal_title').innerText = vehicle.name
            if (vehicle.images)
                $('.galleria')
                    .data('galleria')
                    .load([...vehicle.images])
            document.querySelector('#modalDesc').innerHTML = vehicle.description
            const info = document.querySelector('.galleria-info')
            info.style.width = 'fit-content'
            info.style.left = 'auto'
            info.style.bottom = '50px'
            info.style.top = 'auto'
            info.style.right = '0px'
            document.querySelector('.galleria-info-text').style.backgroundColor = 'RGBA(0, 0, 0, 0.85)'
            document.querySelector('.galleria-info-text').style.padding = '3px'
            document.querySelector('#vehicleDisplayModal').style.display = 'block'
            document.querySelector('body').style.overflow = 'hidden'
        })
    </script>
</html>

    `
}
