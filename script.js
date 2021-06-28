'use strict';
//remember about folders funcitonality
//remember about ability to edit vehicles
(() => {
    let vehicleList = []

    const save = localStorage.getItem('save')
    if (save !== null) {
        const arr = JSON.parse(save)
        arr.forEach(element => {
            vehicleList.push(element)
        })
        fillEditSelection(vehicleList)
        const organizedVehicles = organizeTree(vehicleList)
        drawTree(organizedVehicles)
    }

    document.querySelector('#buttn1').addEventListener('click', () => {
        readVehicleInput()
        localStorage.setItem('save', JSON.stringify(vehicleList))
        fillEditSelection(vehicleList)

        const organizedVehicles = organizeTree(vehicleList)
        drawTree(organizedVehicles)
    })

    document.querySelector('#buttn2').addEventListener('click', () => {
        const organizedVehicles = organizeTree(vehicleList)
        console.log(organizedVehicles)
        drawTree(organizedVehicles)
    })

    document.querySelector('#buttn3').addEventListener('click', () => {
        vehicleList.splice(0, vehicleList.length)
        localStorage.clear()
    })

    document.querySelector('#buttn4').addEventListener('click', () => {
        readVehicleEditInput()
        localStorage.setItem('save', JSON.stringify(vehicleList))
        fillEditSelection(vehicleList)

        const organizedVehicles = organizeTree(vehicleList)
        drawTree(organizedVehicles)
    })

    document.querySelector('#buttn5').addEventListener('click', () => {
        const id = document.querySelector('#editionSelect').value
        const name = document.querySelector('#vehiclenameedit').value.trim()

        const con = confirm(`Do you want to delete ${name}?`)
        if (con === true) {
            const newList = []
            vehicleList.forEach((element) => {
                if (element.id !== id) {
                    newList.push(element)
                }
            })
            vehicleList = [...newList]

            localStorage.setItem('save', JSON.stringify(vehicleList))
            fillEditSelection(vehicleList)

            const organizedVehicles = organizeTree(vehicleList)
            drawTree(organizedVehicles)
        }
    })

    document.querySelector('#techtreetest').addEventListener('click', (e) => {
        if (e.target.tagName !== 'LI') return
        const vehicleId = e.target.id
        const vehicle = vehicleList.find((item) => {
            return item.id === vehicleId
        })
        console.log(vehicle)
    })

    document.querySelector('#editionSelect').addEventListener('change', (e) => {
        const vehicleId = e.target.value
        const vehicle = vehicleList.find((item) => {
            return item.id === vehicleId
        })
        document.querySelector('#vehiclenameedit').value = vehicle.name
        document.querySelector('#vehiclerankedit').value = vehicle.rank
        document.querySelector('#vehiclebredit').value = vehicle.br
        document.querySelector('#vehicletypeedit').value = vehicle.type
        document.querySelector('#vehicleconnectionedit').value = vehicle.connection
        document.querySelector('#vehiclebranchedit').value = vehicle.branch
        document.querySelector('#vehicleorderedit').value = vehicle.order
        document.querySelector('#vehicledescriptionedit').value = vehicle.description
        document.querySelector('#vehiclethumbnailedit').value = vehicle.thumbnail
    })

    function readVehicleInput() {
        const name = document.querySelector('#vehiclename').value.trim()
        if (name.length === 0) {
            window.alert('You have to provide name of the vehicle!')
            return
        }
        const rank = Number(document.querySelector('#vehiclerank').value)
        const br = Number(document.querySelector('#vehiclebr').value)
        const type = document.querySelector('#vehicletype').value
        const connection = document.querySelector('#vehicleconnection').value
        const branch = Number(document.querySelector('#vehiclebranch').value)
        const order = Number(document.querySelector('#vehicleorder').value)
        const description = document.querySelector('#vehicledescription').value
        const id = 'v' + Date.now()
        const thumbnail = document.querySelector('#vehiclethumbnail').value
        const vehicle = {
            name,
            rank,
            br,
            type,
            connection,
            branch,
            order,
            description,
            id,
            thumbnail
        }
        vehicleList.push(vehicle)
        document.querySelector('#newForm').reset()
    }

    function readVehicleEditInput() {
        const name = document.querySelector('#vehiclenameedit').value.trim()
        if (name.length === 0) {
            window.alert('You have to provide name of the vehicle!')
            return
        }
        const rank = Number(document.querySelector('#vehiclerankedit').value)
        const br = Number(document.querySelector('#vehiclebredit').value)
        const type = document.querySelector('#vehicletypeedit').value
        const connection = document.querySelector('#vehicleconnectionedit').value
        const branch = Number(document.querySelector('#vehiclebranchedit').value)
        const order = Number(document.querySelector('#vehicleorderedit').value)
        const description = document.querySelector('#vehicledescriptionedit').value
        const id = document.querySelector('#editionSelect').value
        const thumbnail = document.querySelector('#vehiclethumbnailedit').value
        const vehicle = {
            name,
            rank,
            br,
            type,
            connection,
            branch,
            order,
            description,
            id,
            thumbnail
        }
        vehicleList.forEach((element, index, array) => {
            if (element.id === vehicle.id) {
                array[index] = vehicle
            }
        })
        document.querySelector('#editForm').reset()
    }

    function validateVehicleInput() {

    }

    function fillEditSelection(vehicleList) {
        const select = document.querySelector('#editionSelect')
        select.innerHTML = ''
        const vehicles = []
        for (let vehicle of vehicleList) {
            const name = vehicle.name
            const id = vehicle.id
            vehicles.push({
                name,
                id
            })
        }
        vehicles.sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
        for (let vehicle of vehicles) {
            let option = document.createElement('option')
            option.value = vehicle.id
            option.innerText = vehicle.name
            select.appendChild(option)
        }
    }

    function organizeTree(vehicleList) {
        const sortedVehicles = {}
        for (let vehicle of vehicleList) {
            const vehicleRegion = `rank_${vehicle.rank}_branch_${vehicle.type!=='researchable'?`premium_${vehicle.branch}`:vehicle.branch}`
            if (sortedVehicles[vehicleRegion] === undefined) sortedVehicles[vehicleRegion] = []
            sortedVehicles[vehicleRegion].push(vehicle)
        }
        for (let region in sortedVehicles) {
            let array = sortedVehicles[region]
            array.sort((a, b) => a.order !== b.order ? a.order - b.order : a.br - b.br)
            let temp = [...array]
            array = []
            for (let vehicle of temp) {
                if (array.length === 0) {
                    array.push(vehicle)
                    continue
                }
                if (vehicle.connection === 'folder') {
                    if (array[array.length - 1].constructor === Array) {
                        array[array.length - 1].push(vehicle)
                        continue
                    }
                    let popped = array.pop()
                    array.push([popped, vehicle])
                    continue
                }
                array.push(vehicle)
            }
            sortedVehicles[region] = array
        }
        return sortedVehicles
    }

    function drawTree(organizedVehicles) {
        const tbody = document.querySelector('#techtreetest')
        tbody.innerHTML = ''
        const ranks = []
        const branches = []
        for (let region in organizedVehicles) {
            const rank = region.slice(5, 6)
            if (!ranks.includes(rank)) ranks.push(rank)
            const branch = region.slice(14)
            if (!branches.includes(branch)) branches.push(branch)
        }
        ranks.sort()
        branches.sort()
        const techtree = document.querySelector('#techtree')
        techtree.innerHTML = ''
        for (let rank of ranks) {
            let rankDiv = document.createElement('div')
            rankDiv.classList.add('rank')
            for (let branch of branches) {
                let branchDiv = document.createElement('div')
                branchDiv.classList.add('branch')
                let region = `rank_${rank}_branch_${branch}`
                if (organizedVehicles[region] !== undefined) {
                    for (let vehicle of organizedVehicles[region]) {
                        if (vehicle.constructor === Array) {
                            branchDiv.appendChild(createFolder(vehicle))
                        } else {
                            branchDiv.appendChild(createVehicleBadge(vehicle))
                        }
                    }
                }
                let filler = document.createElement('div')
                filler.classList.add('fillerDiv')
                filler.classList.add(`badgeLine_${branch}`)
                branchDiv.appendChild(filler)
                rankDiv.appendChild(branchDiv)
            }
            techtree.appendChild(rankDiv)
        }

        affixFolderNumbers()
        affixBranchLines(branches)
        sanitizeFolderLeftover(branches)
        sanitizeFolderLines()
        setFillerSizes()
    }

    function createVehicleBadge(vehicle) {
        let div = document.createElement('div')
        let img = ''
        if (vehicle.thumbnail !== undefined) img = `<img src="${vehicle.thumbnail}">`
        let branchLine = ''
        if (vehicle.type === 'researchable') branchLine = `badgeLine_${vehicle.branch}`
        else branchLine = `badgeLine_premium_${vehicle.branch}`
        div.innerHTML = `<table>
            <tbody>
                <tr>
                    <td rowspan="3" class="badgeSide"></td>
                    <td class="badgeLine ${branchLine}"></td>
                    <td rowspan="3" class="badgeSide"></td>
                </tr>
                <tr>
                    <td class="vehicleBadge type_${vehicle.type} ${branchLine} connected_${vehicle.connection}" style="position:relative;">
                        <span class="vehicleName">${vehicle.name}</span>
                        <b class="vehicleBr">${vehicle.br.toFixed(1)}</b>
                        ${img}
                    </td>
                </tr>
                <tr>
                    <td class="badgeLine ${branchLine}"></td>
                </tr>
            </tbody>
        </table>`
        return div
    }

    function createFolder(folder) {
        let folderDiv = document.createElement('div')
        let tooltipText = document.createElement('span')
        folderDiv.appendChild(createVehicleBadge(folder[0]))
        folderDiv.classList.add('foldertooltip')
        tooltipText.classList.add('foldertooltiptext')

        for (let vehicle of folder) {
            tooltipText.appendChild(createVehicleBadge(vehicle))
        }

        folderDiv.innerHTML += `<div class="folderNumber">${folder.length}</div>`



        folderDiv.appendChild(tooltipText)

        return folderDiv
    }

    function affixFolderNumbers() {
        let toAffix = document.querySelectorAll('.folderNumber')
        toAffix.forEach((item) => {
            let notch = document.createElement('div')
            notch.innerText = `+${item.innerText-1}`
            notch.classList.add('folderNumber')
            item.parentNode.querySelector('.vehicleBadge').appendChild(notch)
            item.remove()
        })
    }

    function affixBranchLines(branches) {
        branches.forEach((branchIndex) => {
            let nodes = document.querySelectorAll(`.badgeLine_${branchIndex}`)
            let lineArray = []
            nodes.forEach((node) => {
                lineArray.push(node)
            })
            while (!lineArray[0].classList.contains('vehicleBadge')) lineArray.shift()
            lineArray.reverse()
            while (!lineArray[0].classList.contains('vehicleBadge')) lineArray.shift()

            let connected = false
            let arrow = false
            while (lineArray.length > 0) {
                if (lineArray[0].classList.contains('connected_yes') || lineArray[0].classList.contains('connected_folder')) {
                    connected = true
                    arrow = true
                    lineArray.shift()
                    continue
                }
                if (arrow) {
                    arrow = false
                    lineArray[0].innerHTML += `<div class="lineArrow"></div>`
                    lineArray.shift()
                    continue
                }
                if (lineArray[0].classList.contains('connected_no')) {
                    connected = false
                }
                if (connected) {
                    lineArray[0].innerHTML += `<div class="lineDiv"></div>`
                    lineArray.shift()
                    continue
                }
                lineArray.shift()
            }
        })
    }

    function sanitizeFolderLeftover(branches) {
        for (let rank of document.querySelectorAll('.rank')) {
            loop: for (let branch of branches) {
                const lineItems = rank.querySelectorAll(`.badgeLine_${branch}`)
                const vehicleBadges = [...lineItems].filter((item) => {
                    return item.classList.contains('vehicleBadge')
                })
                if (vehicleBadges.length > 0 && vehicleBadges.pop().classList.contains('connected_folder')) {
                    let connectors = [...lineItems].filter((item) => {
                        return item.classList.contains('badgeLine')
                    })
                    connectors = connectors.filter((item) => {
                        item = item.parentNode.parentNode.parentNode.parentNode.parentNode
                        return !item.classList.contains('foldertooltiptext')
                    })
                    const lastConnector = connectors.pop()
                    let reachedConnector = false
                    let firstVehicle = true
                    for (let item of document.querySelectorAll(`.badgeLine_${branch}`)) {
                        if (reachedConnector) {
                            if (item.classList.contains('vehicleBadge')) {
                                if (firstVehicle) {
                                    firstVehicle = false
                                    continue
                                }
                                if (item.classList.contains('connected_no')) {
                                    lastConnector.innerHTML = ''
                                    break loop
                                }

                                if (item.classList.contains('connected_yes')) {
                                    break loop
                                }
                            }
                        }
                        if (item.isSameNode(lastConnector)) reachedConnector = true
                    }
                    lastConnector.innerHTML = ''
                }
            }
        }
    }

    function sanitizeFolderLines() {
        let folders = document.querySelectorAll('.foldertooltiptext')
        folders.forEach((folder) => {
            folder = [...folder.querySelectorAll('.badgeLine')]
            if (folder[0].children[0] !== undefined) {
                folder[0].children[0].style.borderColor = 'rgba(0, 0, 0, 0)'
            }
            folder.reverse()
            if (folder[0].children[0] !== undefined) {
                folder[0].children[0].style.backgroundColor = 'rgba(0, 0, 0, 0)'
            }
        })
    }

    function setFillerSizes() {
        let fillers = document.querySelectorAll('.fillerDiv')
        fillers.forEach((div) => {
            let y1 = div.getBoundingClientRect().y
            let y2 = div.parentNode.getBoundingClientRect().y + div.parentNode.getBoundingClientRect().height
            div.style.height = `${y2-y1}px`
        })
    }
})()