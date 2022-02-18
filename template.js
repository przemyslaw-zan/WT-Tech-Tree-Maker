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
        <meta name="description" content="This tech tree was generated using WT-Tech-Tree-Maker. ${ data.description }" />
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
        <div id="techtree_wrapper">
            <div id="techtree">${ data.tree }</div>
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

        function isFolderRoot(node) {
            const initialNode = node
            const nodesWithId = []
            let output
            while (!node.classList.contains('foldertooltip')) {
                node = node.parentNode
                if (node.classList.contains('branch')) {
                    return false
                }
            }
            output = node.querySelector('.foldertooltiptext')
            for (const childNode of node.querySelectorAll('*')) {
                if (childNode.id) nodesWithId.push(childNode)
            }
            if (initialNode.isSameNode(nodesWithId[0])) {
                return output
            }
            return false
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
            document.querySelectorAll('.foldertooltiptext').forEach((node) => {
                node.style.visibility = 'hidden'
            })
            let element = e.target
            if (!element.id) element = element.parentNode
            if (!element.id) return
            const folderDiv = isFolderRoot(element)
            if (folderDiv) {
                folderDiv.style.visibility = 'visible'
            } else {
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
            }
        })
    </script>
</html>
`;
}
