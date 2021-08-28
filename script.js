'use strict'
;(() => {
	const vehicleList = []
	const descriptionTemplate =
		'<h3><em>Year:</em> <strong>XXXX</strong>&nbsp;<em>Development stage:</em>&nbsp;<strong>X</strong></h3>\n\n<p>Historical description...</p>\n\n<h3><em>Primary weapon:</em> <strong>X</strong></h3>\n\n<p>Primary weapon description...</p>\n\n<h3><em>Secondary weapon:</em> <strong>X</strong></h3>\n\n<p>Secondary weapon description...</p>\n\n<h3><em>Other info:</em></h3>\n\n<p>Crew, armor, mobility etc...</p>\n\n<h3><em>Proposed BR:</em> <strong>X.X</strong></h3>\n\n<p>Justification for Battle Rating placement...</p>\n\n<p><em>Links:</em></p>\n\n<ol>\n\t<li>Source 1...</li>\n\t<li>Source 2...</li>\n\t<li>WT forum discussion on the vehicle...</li>\n</ol>\n'

	init()

	//#region Nav menu listeners
	document.querySelector('#navAdd').addEventListener('click', () => {
		closeModal()
		document.querySelector('#addModal').style.display = 'block'
		document.querySelector('body').style.overflow = 'hidden'
	})
	document.querySelector('#navEdit').addEventListener('click', () => {
		closeModal()
		document.querySelector('#editModal').style.display = 'block'
		document.querySelector('body').style.overflow = 'hidden'
	})
	document.querySelector('#navDel').addEventListener('click', () => {
		closeModal()
		document.querySelector('#delModal').style.display = 'block'
		document.querySelector('body').style.overflow = 'hidden'
	})
	document.querySelector('#navOrder').addEventListener('click', () => {
		closeModal()
		document.querySelector('#orderModal').style.display = 'block'
		document.querySelector('body').style.overflow = 'hidden'
	})
	document.querySelector('#navBackup').addEventListener('click', () => {
		closeModal()
		document.querySelector('#backupModal').style.display = 'block'
		document.querySelector('body').style.overflow = 'hidden'
	})
	document.querySelector('#navExport').addEventListener('click', () => {
		closeModal()
		document.querySelector('#exportModal').style.display = 'block'
		document.querySelector('body').style.overflow = 'hidden'
	})
	//#endregion Nav menu listeners

	//#region General modal listeners
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
	//#endregion General modal listeners

	//#region Add modal listeners
	document.querySelector('#addButton').addEventListener('click', () => {
		readVehicleInput()
		localStorage.setItem('save', JSON.stringify(vehicleList))
		fillEditSelection(vehicleList)

		drawTree(organizeTree(vehicleList))
		closeModal()
		updateVehicleOrderList()
	})
	document.querySelector('#vehicleimagelistadd').addEventListener('click', (e) => {
		e.preventDefault()
		const list = document.querySelector('#vehicleimagelist')
		list.appendChild(createImageListItem())
	})
	//#endregion Add modal listeners

	//#region Edit modal listeners
	document.querySelector('#editButton').addEventListener('click', () => {
		readVehicleEditInput()
		localStorage.setItem('save', JSON.stringify(vehicleList))
		fillEditSelection(vehicleList)

		drawTree(organizeTree(vehicleList))
		document.querySelector('#vehicleimagelistedit').innerHTML = ''
		updateVehicleOrderList()
		closeModal()
	})
	document.querySelector('#editionSelect').addEventListener('change', (e) => {
		if (e.target.value === 'undefined') return
		document.querySelector('#vehicleimagelistedit').innerHTML = ''
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
		document.querySelector('#vehiclefollowedit').value = vehicle.follow
		CKEDITOR.instances.vehicledescriptionedit.setData(vehicle.description)
		document.querySelector('#vehiclethumbnailedit').value = vehicle.thumbnail
		if (vehicle.images) {
			const list = document.querySelector('#vehicleimagelistedit')
			for (let image of vehicle.images) {
				const url = image.image ? image.image : ''
				const desc = image.description ? image.description : ''
				list.appendChild(createImageListItem(url, desc))
			}
		}
	})
	document.querySelector('#vehicleimagelisteditadd').addEventListener('click', (e) => {
		e.preventDefault()
		const list = document.querySelector('#vehicleimagelistedit')
		list.appendChild(createImageListItem())
	})
	//#endregion Edit modal listeners

	//#region Delete modal listeners
	document.querySelector('#deleteVehicleSelect').addEventListener('change', (e) => {
		if (e.target.value === 'undefined') return
		const vehicle = vehicleList.find((vehicle) => {
			return vehicle.id === e.target.value
		})

		const target = document.querySelector('#vehicleDeleteDisplay')
		target.innerHTML = ''
		target.appendChild(createVehicleBadge(vehicle))
	})
	document.querySelector('#deleteVehicleButton').addEventListener('click', () => {
		const id = document.querySelector('#deleteVehicleSelect').value
		if (id === 'undefined') return
		const name = vehicleList.find((vehicle) => {
			return vehicle.id === id
		}).name

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

			drawTree(organizeTree(vehicleList))
			updateVehicleOrderList()
		}
	})
	document.querySelector('#deleteAllButton').addEventListener('click', () => {
		const con = confirm(`Do you want to delete ALL VEHICLES, tech tree name and it's description? This is irreversible!`)
		if (con === true) {
			vehicleList.splice(0, vehicleList.length)
			document.querySelector('#techtreename').value = ''
			CKEDITOR.instances.techtreemaindesc.setData('')
			localStorage.clear()

			const organizedVehicles = organizeTree(vehicleList)
			drawTree(organizedVehicles)
			closeModal()
			updateVehicleOrderList()
		}
	})
	//#endregion Delete modal listeners

	//#region Order modal listeners
	document.querySelector('#vehicleOrderList').addEventListener('click', (e) => {
		if (e.target.classList.contains('removeConnection')) {
			const id = e.target.parentNode.id
			const index = vehicleList.findIndex((vehicle) => {
				return vehicle.id === id
			})
			vehicleList[index].follow = undefined
			localStorage.setItem('save', JSON.stringify(vehicleList))
			drawTree(organizeTree(vehicleList))
			updateVehicleOrderList()
		}
	})
	//#endregion Order modal listeners

	//#region Backup modal listeners
	document.querySelector('#backupDownload').addEventListener('click', () => {
		const title = document.querySelector('#techtreename').value
		const description = CKEDITOR.instances.techtreemaindesc.getData()
		const content = { title, description, vehicleList }
		var file = new Blob([JSON.stringify(content)], { type: 'application/json' })
		if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(file, 'WT_TECH_TREE_MAKER_SAVE')
		else {
			var a = document.createElement('a'),
				url = URL.createObjectURL(file)
			a.href = url
			a.download = 'WT_TECH_TREE_MAKER_SAVE'
			document.body.appendChild(a)
			a.click()
			setTimeout(function () {
				document.body.removeChild(a)
				window.URL.revokeObjectURL(url)
			}, 0)
		}
	})
	document.querySelector('#backupUpload').addEventListener('change', (e) => {
		if (!e.target.files[0]) return
		e.target.files[0].text().then((result) => {
			try {
				const loadedData = JSON.parse(result)
				if (!loadedData.title || !loadedData.description || !loadedData.vehicleList) {
					window.alert('Incorrect save file! Make sure you upload correct save file!')
					return
				}
				const con = confirm(
					`Do you want to load data from save file? This will override all current data, if you work on multiple trees, make sure to backup them first!`
				)
				if (con === true) {
					document.querySelector('#techtreename').value = loadedData.title
					CKEDITOR.instances.techtreemaindesc.setData(loadedData.description)
					vehicleList.splice(0, vehicleList.length)
					loadedData.vehicleList.forEach((element) => {
						vehicleList.push(element)
					})
					fillEditSelection(vehicleList)
					drawTree(organizeTree(vehicleList))
					updateVehicleOrderList()

					localStorage.setItem('title', loadedData.title)
					localStorage.setItem('description', loadedData.description)
					localStorage.setItem('save', JSON.stringify(vehicleList))

					closeModal()
				}
			} catch (e) {
				window.alert(`An error occured:\n${e}\nMake sure you upload correct save file!`)
			}
		})
	})
	//#endregion Backup modal listeners

	//#region Export modal listeners
	document.querySelector('#exportTechTreeButton').addEventListener('click', () => {
		const title = document.querySelector('#techtreename').value
		const description = CKEDITOR.instances.techtreemaindesc.getData()
		const tree = document.querySelector('#techtree').innerHTML
		const vehicles = JSON.stringify(vehicleList)
		const file = new Blob([createHtmlContent(title, description, tree, vehicles)])
		if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(file, 'exported_tech_tree.html')
		else {
			let a = document.createElement('a'),
				url = URL.createObjectURL(file)
			a.href = url
			a.download = 'exported_tech_tree.html'
			document.body.appendChild(a)
			a.click()
			setTimeout(function () {
				document.body.removeChild(a)
				window.URL.revokeObjectURL(url)
			}, 0)
		}
	})
	//#endregion Export modal listeners

	//#region Tech tree listeners
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
	//#endregion Tech tree listeners

	//#region Main title & description listeners
	document.querySelector('#techtreename').addEventListener('change', (e) => {
		localStorage.setItem('title', e.target.value)
	})
	CKEDITOR.instances.techtreemaindesc.on('change', () => {
		localStorage.setItem('description', CKEDITOR.instances.techtreemaindesc.getData())
	})
	CKEDITOR.on('dialogDefinition', function (ev) {
		const dialogName = ev.data.name
		const dialogDefinition = ev.data.definition
		if (dialogName == 'link') {
			const infoTab = dialogDefinition.getContents('info')
			const protocolField = infoTab.get('protocol')
			protocolField['default'] = 'https://'

			const targetTab = dialogDefinition.getContents('target')
			const targetField = targetTab.get('linkTargetType')
			targetField['default'] = '_blank'
		}
	})
	CKEDITOR.on('instanceReady', function (e) {
		// First time
		e.editor.document.getBody().setStyle('background-color', 'rgb(36, 46, 51)')
		e.editor.document.getBody().setStyle('color', 'white')
		// in case the user switches to source and back
		e.editor.on('contentDom', function () {
			e.editor.document.getBody().setStyle('background-color', 'rgb(36, 46, 51)')
			e.editor.document.getBody().setStyle('color', 'white')
		})
	})
	//#endregion Main title & description listeners

	//#region Tech tree building functions
	function organizeTree(vehicleList) {
		const sortedVehicles = {}
		for (let vehicle of vehicleList) {
			const vehicleRegion = `rank_${vehicle.rank}_branch_${vehicle.type !== 'researchable' ? `premium_${vehicle.branch}` : vehicle.branch}`
			if (sortedVehicles[vehicleRegion] === undefined) sortedVehicles[vehicleRegion] = []
			sortedVehicles[vehicleRegion].push(vehicle)
		}
		for (let region in sortedVehicles) {
			let array = sortedVehicles[region]
			array.sort((a, b) => a.br - b.br)
			const followers = array.filter((item) => {
				return ![undefined, 'undefined'].includes(item.follow)
			})
			if (followers.length > 0) {
				let i = 0
				while (!isFollowApplied(array)) {
					for (let follower of followers) {
						if (
							array.findIndex((item) => {
								return item.id === follower.follow
							}) === -1
						)
							continue
						array.splice(array.indexOf(follower), 1)
						let target =
							array.findIndex((item) => {
								return item.id === follower.follow
							}) + 1
						array.splice(target, 0, follower)
					}
					//Anti infinite loop safety
					i++
					if (i > 1000) break
				}
			}

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
	function isFollowApplied(array) {
		array = [...array]
		if (![undefined, 'undefined'].includes(array[0].follow)) {
			if (
				array.some((vehicle) => {
					return vehicle.id === array[0].follow
				})
			)
				return false
		}
		while (array.length >= 2) {
			if (![undefined, 'undefined'].includes(array[1].follow)) {
				if (array[0].id !== array[1].follow) return false
			}
			array.shift()
		}
		return true
	}
	function drawTree(organizedVehicles) {
		const tbody = document.querySelector('#techtree')
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
			let firstPremiumBranch = true
			let rankDiv = document.createElement('div')
			rankDiv.classList.add('rank')
			let rankNumDiv = document.createElement('div')
			rankNumDiv.classList.add('rankNumber')
			let rankNumDivText = document.createElement('div')
			rankNumDivText.innerHTML = `Rank <b>${romanize(rank)}</b>`
			rankNumDivText.classList.add('rankNumberText')
			rankNumDiv.appendChild(rankNumDivText)
			rankDiv.appendChild(rankNumDiv)
			for (let branch of branches) {
				let branchDiv = document.createElement('div')
				branchDiv.classList.add('branch')
				if (branch.indexOf('premium') !== -1 && firstPremiumBranch) {
					firstPremiumBranch = false
					branchDiv.style.borderLeft = '2px solid white'
				}
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
	function romanize(num) {
		var lookup = {
				M: 1000,
				CM: 900,
				D: 500,
				CD: 400,
				C: 100,
				XC: 90,
				L: 50,
				XL: 40,
				X: 10,
				IX: 9,
				V: 5,
				IV: 4,
				I: 1
			},
			roman = '',
			i
		for (i in lookup) {
			while (num >= lookup[i]) {
				roman += i
				num -= lookup[i]
			}
		}
		return roman
	}
	function affixFolderNumbers() {
		let toAffix = document.querySelectorAll('.folderNumber')
		toAffix.forEach((item) => {
			let notch = document.createElement('div')
			notch.innerText = `+${item.innerText - 1}`
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
			div.style.height = `${y2 - y1}px`
		})
	}
	//#endregion Tech tree building functions

	//#region Vehicle badge functions
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
					<td id="${vehicle.id}"
						class="vehicleBadge type_${vehicle.type} ${branchLine}
							connected_${vehicle.connection}"
						style="position:relative; ${isClickable(vehicle) ? 'cursor:pointer;' : ''}">
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
	function isClickable(vehicle) {
		const images = vehicle.images?.length > 0
		const description = vehicle.description?.length > 0 && vehicle.description !== descriptionTemplate
		return description || images
	}
	//#endregion Vehicle badge functions

	//#region Miscellaneous menu functions
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
		const follow = document.querySelector('#vehiclefollowedit').value
		const description = CKEDITOR.instances.vehicledescription.getData()
		const id = 'v' + Date.now()
		const thumbnail = document.querySelector('#vehiclethumbnail').value
		const images = []
		document
			.querySelector('#vehicleimagelist')
			.querySelectorAll('li')
			.forEach((item) => {
				const image = item.querySelectorAll('input')[0].value
				const description = item.querySelectorAll('input')[1].value.trim()
				images.push({ image, description })
			})
		const vehicle = {
			name,
			rank,
			br,
			type,
			connection,
			branch,
			follow,
			description,
			id,
			thumbnail,
			images
		}
		vehicleList.push(vehicle)
		document.querySelector('#newForm').reset()
		CKEDITOR.instances.vehicledescription.setData(descriptionTemplate)
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
		const follow = document.querySelector('#vehiclefollowedit').value
		const description = CKEDITOR.instances.vehicledescriptionedit.getData()
		CKEDITOR.instances.vehicledescriptionedit.setData('')
		const id = document.querySelector('#editionSelect').value
		const thumbnail = document.querySelector('#vehiclethumbnailedit').value
		const images = []
		document
			.querySelector('#vehicleimagelistedit')
			.querySelectorAll('li')
			.forEach((item) => {
				const image = item.querySelectorAll('input')[0].value
				const description = item.querySelectorAll('input')[1].value.trim()
				images.push({ image, description })
			})
		const vehicle = {
			name,
			rank,
			br,
			type,
			connection,
			branch,
			follow,
			description,
			id,
			thumbnail,
			images
		}
		vehicleList.forEach((element, index, array) => {
			if (element.id === vehicle.id) {
				array[index] = vehicle
			}
		})
		document.querySelector('#editForm').reset()
	}
	function fillEditSelection(vehicleList) {
		const selectArr = [
			document.querySelector('#editionSelect'),
			document.querySelector('#vehiclefollow'),
			document.querySelector('#vehiclefollowedit'),
			document.querySelector('#deleteVehicleSelect')
		]
		selectArr.forEach((item) => {
			item.innerHTML = ''
		})
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
		const defaultOption = '<option value="undefined">-- nothing selected --</option>'
		for (let select of selectArr) {
			select.innerHTML += defaultOption
			for (let vehicle of vehicles) {
				let option = document.createElement('option')
				option.value = vehicle.id
				option.innerText = vehicle.name
				select.appendChild(option)
			}
		}
	}
	function updateVehicleOrderList() {
		const tbody = document.querySelector('#vehicleOrderList')
		tbody.innerHTML = ''
		const followers = []
		const targets = []
		vehicleList.forEach((vehicle) => {
			if (vehicle.follow) followers.push(vehicle)
		})
		for (const follower of followers) {
			const target = vehicleList.find((vehicle) => {
				return vehicle.id === follower.follow
			})
			if (!target) {
				follower.follow = undefined
				return
			}
			targets.push(target)
			let tr = document.createElement('tr')
			tr.innerHTML = `<td>${follower.name}</td><td>→</td><td>${target.name}</td><th class="removeConnection">Remove this connection</th>`
			tr.id = follower.id
			tbody.appendChild(tr)
		}

		//Checking multiple follows on the same target
		targets.forEach((item, index, arr) => {
			arr[index] = item.name
		})
		const multipleFollows = []
		for (const target of targets) {
			if (!multipleFollows.includes(target) && targets.indexOf(target) !== targets.lastIndexOf(target)) multipleFollows.push(target)
		}
		if (multipleFollows.length > 0) {
			document.querySelector('#navOrder').innerHTML = 'Vehicle ordering <b style="color:red;">WARNING!</b>'
			const p = document.querySelector('#multipleFollowWarning')
			p.innerHTML += '<b style="color:red;">WARNING!</b> Following vehicles have more than one vehicle placed behind them:<br>'
			for (const follow of multipleFollows) p.innerHTML += `<br>${follow}`
			p.innerHTML += '<br><br>This can cause problems with ordering, make sure each vehicle has no more than one follower.'
		} else {
			document.querySelector('#navOrder').innerHTML = 'Vehicle ordering'
			document.querySelector('#multipleFollowWarning').innerHTML = ''
		}
	}
	function createImageListItem(url, description) {
		let listItem = document.createElement('li')
		let table = document.createElement('table')
		let tbody = document.createElement('tbody')

		let tr1 = document.createElement('tr')

		let td1 = document.createElement('td')
		td1.rowSpan = 2
		let remove = document.createElement('div')
		remove.style.cursor = 'pointer'
		remove.innerText = '❌'
		td1.appendChild(remove)
		tr1.appendChild(td1)

		remove.addEventListener('click', () => {
			listItem.remove()
		})

		let td2 = document.createElement('td')
		let moveUp = document.createElement('div')
		moveUp.style.cursor = 'pointer'
		moveUp.innerText = '⬆️'
		td2.appendChild(moveUp)
		tr1.appendChild(td2)

		moveUp.addEventListener('click', () => {
			if (listItem.previousSibling) {
				listItem.previousSibling.before(listItem)
			}
		})

		let td3 = document.createElement('td')
		let urlLabel = document.createElement('label')
		urlLabel.innerText = 'URL:'
		td3.appendChild(urlLabel)
		tr1.appendChild(td3)

		let td4 = document.createElement('td')
		let urlInput = document.createElement('input')
		if (url) urlInput.value = url
		td4.appendChild(urlInput)
		tr1.appendChild(td4)

		let td5 = document.createElement('td')
		td5.rowSpan = 2
		td5.style.padding = 0
		let img = document.createElement('img')
		if (url) img.src = url
		img.height = '50'
		td5.appendChild(img)
		tr1.appendChild(td5)

		urlInput.addEventListener('change', (e) => {
			const url = e.target.value
			img.src = url
		})

		let tr2 = document.createElement('tr')

		let td6 = document.createElement('td')
		let moveDown = document.createElement('div')
		moveDown.style.cursor = 'pointer'
		moveDown.innerText = '⬇️'
		td6.appendChild(moveDown)
		tr2.appendChild(td6)

		moveDown.addEventListener('click', () => {
			if (listItem.nextSibling) {
				listItem.nextSibling.after(listItem)
			}
		})

		let td7 = document.createElement('td')
		let descLabel = document.createElement('label')
		descLabel.innerText = 'Caption:'
		td7.appendChild(descLabel)
		tr2.appendChild(td7)

		let td8 = document.createElement('td')
		let descInput = document.createElement('input')
		if (description) descInput.value = description
		td8.appendChild(descInput)
		tr2.appendChild(td8)

		tbody.appendChild(tr1)
		tbody.appendChild(tr2)

		table.appendChild(tbody)
		listItem.appendChild(table)

		return listItem
	}
	//#endregion Miscellaneous menu functions

	//#region Other functions
	function closeModal() {
		document.querySelector('body').style.overflow = 'visible'
		document.querySelectorAll('.modal').forEach((modal) => {
			modal.style.display = 'none'
		})
		$('.galleria').data('galleria').splice(0, $('.galleria').data('galleria').getDataLength())
		$('.galleria').data('galleria').destroy()
		Galleria.run('.galleria')
	}
	function init() {
		//Modal slideshow initialization
		Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.6.1/themes/classic/galleria.classic.min.js')
		Galleria.run('.galleria')
		Galleria.configure({
			_toggleInfo: false
		})

		//Text editor initialization
		CKEDITOR.config.height = 350
		CKEDITOR.replace('vehicledescription')
		CKEDITOR.replace('vehicledescriptionedit')
		CKEDITOR.instances.vehicledescription.setData(descriptionTemplate)
		CKEDITOR.replace('techtreemaindesc')
		CKEDITOR.config.uiColor = '#A4D0E6'

		//Loading save from local storage
		const save = localStorage.getItem('save')
		if (save) {
			const arr = JSON.parse(save)
			arr.forEach((element) => {
				vehicleList.push(element)
			})
			fillEditSelection(vehicleList)
			const organizedVehicles = organizeTree(vehicleList)
			drawTree(organizedVehicles)
			updateVehicleOrderList()
		}
		const techTreeTitle = localStorage.getItem('title')
		if (techTreeTitle) {
			document.querySelector('#techtreename').value = techTreeTitle
		}
		const techTreeDescription = localStorage.getItem('description')
		if (techTreeDescription) {
			CKEDITOR.instances.techtreemaindesc.setData(techTreeDescription)
		}
	}
	//#endregion Other functions
})()
