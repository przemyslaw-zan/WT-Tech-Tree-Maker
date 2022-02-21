'use strict';
/* eslint-disable no-unused-vars */
function createHtmlContent ( data ) {
	return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${ data.title }</title>
        <meta name="description" content="This tech tree was generated using WT-Tech-Tree-Maker." />
        <meta name="generator" content="https://github.com/przemyslaw-zan/WT-Tech-Tree-Maker" />
        <link rel="icon" href="https://warthunder.com/i/favicons/mstile-144x144.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </head>
    <body>
        <span style="position: absolute; right: 10px; top: 3px">
            Created using
            <a href="https://github.com/przemyslaw-zan/WT-Tech-Tree-Maker" target="_blank"> WT Tech Tree Maker </a>
        </span>
        <h1 style="text-align: center; border-bottom: 1px solid black; padding: 5px">${ data.title }</h1>
        <div style="max-width: 1000px; margin: auto; padding: 0 3px 0 3px">${ data.description }</div>
        <div id="techTreeWrapper">
            <div id="techTree">${ data.tree }</div>
        </div>
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
    <style>${ data.styles }</style>
    <script
        src="https://code.jquery.com/jquery-3.5.1.js"
        integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
        crossorigin="anonymous"
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/galleria/1.6.1/galleria.min.js"></script>
    <script>
        const vehicleList = ${ data.vehicles }
        const descriptionTemplate =
        '<h3><em>Year:</em> <strong>XXXX</strong>&nbsp;<em>Development stage:</em>&nbsp;<strong>X</strong></h3>\u005Cn\u005Cn<p>Historical description...</p>\u005Cn\u005Cn<h3><em>Primary weapon:</em> <strong>X</strong></h3>\u005Cn\u005Cn<p>Primary weapon description...</p>\u005Cn\u005Cn<h3><em>Secondary weapon:</em> <strong>X</strong></h3>\u005Cn\u005Cn<p>Secondary weapon description...</p>\u005Cn\u005Cn<h3><em>Other info:</em></h3>\u005Cn\u005Cn<p>Crew, armor, mobility etc...</p>\u005Cn\u005Cn<h3><em>Proposed BR:</em> <strong>X.X</strong></h3>\u005Cn\u005Cn<p>Justification for Battle Rating placement...</p>\u005Cn\u005Cn<p><em>Links:</em></p>\u005Cn\u005Cn<ol>\u005Cn\u005Ct<li>Source 1...</li>\u005Cn\u005Ct<li>Source 2...</li>\u005Cn\u005Ct<li>WT forum discussion on the vehicle...</li>\u005Cn</ol>\u005Cn'
        const screenshotMode = false;

        Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.6.1/themes/classic/galleria.classic.min.js')
        Galleria.run('.galleria')
        Galleria.configure({
            _toggleInfo: false
        })

        document.querySelectorAll( '.close' ).forEach( ( item ) => {
            item.addEventListener( 'click', closeModal );
        } );
        window.onclick = function (event) {
            if (event.target.classList.contains('modal')) {
                closeModal()
            }
        }

        document.querySelector( '#techTree' ).addEventListener( 'click', techTreeClickProcessor );

        ${ data.functions.map( fn => fn.toString() ).join( ';' ) }
    </script>
</html>
`;
}
