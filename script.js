'use strict';
/* eslint-disable no-undef */
( () => {
	const vehicleList = [];
	const descriptionTemplate =
		'<h3><em>Year:</em> <strong>XXXX</strong>&nbsp;<em>Development stage:</em>&nbsp;<strong>X</strong></h3>\n\n<p>Historical description...</p>\n\n<h3><em>Primary weapon:</em> <strong>X</strong></h3>\n\n<p>Primary weapon description...</p>\n\n<h3><em>Secondary weapon:</em> <strong>X</strong></h3>\n\n<p>Secondary weapon description...</p>\n\n<h3><em>Other info:</em></h3>\n\n<p>Crew, armor, mobility etc...</p>\n\n<h3><em>Proposed BR:</em> <strong>X.X</strong></h3>\n\n<p>Justification for Battle Rating placement...</p>\n\n<p><em>Links:</em></p>\n\n<ol>\n\t<li>Source 1...</li>\n\t<li>Source 2...</li>\n\t<li>WT forum discussion on the vehicle...</li>\n</ol>\n';
	const classIcons = [
		{
			id: 'none',
			name: 'None',
			shapes: [
				{ type: 'line', 'stroke-width': '2', y2: '14', x2: '17', y1: '1', x1: '4', stroke: '#ff0000' },
				{ type: 'line', 'stroke-width': '2', y2: '14', x2: '4', y1: '1', x1: '17', stroke: '#ff0000' }
			]
		},
		{
			id: 'lt',
			name: 'Light Tank',
			shapes: [ { type: 'rect', height: '9', width: '21', y: '3', x: '0', fill: '#ffeeee' } ]
		},
		{
			id: 'mt',
			name: 'Medium Tank',
			shapes: [
				{ type: 'rect', height: '9', width: '21', y: '3', x: '0', fill: '#ffaaaa' },
				{ type: 'rect', height: '4', width: '6', y: '11', x: '0', fill: '#ffaaaa' },
				{ type: 'rect', height: '4', width: '6', y: '11', x: '15', fill: '#ffaaaa' }
			]
		},
		{
			id: 'ht',
			name: 'Heavy Tank',
			shapes: [
				{ type: 'rect', height: '9', width: '21', y: '3', x: '0', fill: '#ff6666' },
				{ type: 'rect', height: '4', width: '6', y: '11', x: '0', fill: '#ff6666' },
				{ type: 'rect', height: '4', width: '6', y: '11', x: '15', fill: '#ff6666' },
				{ type: 'rect', height: '4', width: '7', y: '0', x: '7', fill: '#ff6666' }
			]
		},
		{
			id: 'td',
			name: 'Tank Destroyer',
			shapes: [
				{ type: 'rect', height: '5', width: '21', y: '10', x: '0', fill: '#bde9b5' },
				{ type: 'line', y2: '10', x2: '0', y1: '0', x1: '21', 'stroke-width': '3', stroke: '#bde9b5' }
			]
		},
		{
			id: 'spaa',
			name: 'Self Propelled Anti-Air',
			shapes: [
				{ type: 'rect', height: '5', width: '21', y: '10', x: '0', fill: '#c6a0ff' },
				{ type: 'rect', height: '11', width: '4', y: '0', x: '4', fill: '#c6a0ff' },
				{ type: 'rect', height: '11', width: '4', y: '0', x: '13', fill: '#c6a0ff' }
			]
		},
		{
			id: 'fighter',
			name: 'Fighter',
			shapes: [
				{ type: 'path', d: 'm0,7.5l10.5,-7.5l10.5,7.5l-10.5,7.5l-10.5,-7.5z', fill: '#ffac6f' }
			]
		},
		{
			id: 'attacker',
			name: 'Attacker',
			shapes: [
				{ type: 'path', d: 'm0,7.5l10.5,-5l10.5,5l-10.5,5l-10.5,-5z', fill: '#bde9b5' }
			]
		},
		{
			id: 'bomber',
			name: 'Bomber',
			shapes: [
				{ type: 'rect', height: '7.5', width: '21', y: '0', x: '0', fill: '#a3b1ff' },
				{ type: 'path', d: 'm0,7.5l10.5,-7.5l10.5,7.5l-10.5,7.5l-10.5,-7.5z', fill: '#a3b1ff' }
			]
		},
		{
			id: 'ahel',
			name: 'Attack Helicopter',
			shapes: [
				{ type: 'path', d: 'm0,7.5l10.5,-5l10.5,5l-10.5,5l-10.5,-5z', fill: '#f2f266' }
			]
		},
		{
			id: 'uhel',
			name: 'Utility Helicopter',
			shapes: [
				{ type: 'rect', height: '7.5', width: '21', y: '0', x: '0', fill: '#9bf266' },
				{ type: 'path', d: 'm0,7.5l10.5,-7.5l10.5,7.5l-10.5,7.5l-10.5,-7.5z', fill: '#9bf266' }
			]
		},
		{
			id: 'tboat',
			name: 'Torpedo Boat',
			shapes: [
				{ type: 'path', 'stroke-width': '2', d: 'M20 1L.75 7 20 13z', stroke: '#01d1de', fill: 'none' }
			]
		},
		{
			id: 'gboat',
			name: 'Gun Boat',
			shapes: [
				{ type: 'path', 'stroke-width': '2', d: 'M20 1L.75 7 20 13z', stroke: '#a3b1ff', fill: '#a3b1ff' }
			]
		},
		{
			id: 'barge',
			name: 'Barge',
			shapes: [
				{ type: 'path', 'stroke-width': '2', d: 'M1 1h19v12H1z', stroke: '#f8cdae', fill: 'none' }
			]
		},
		{
			id: 'dd',
			name: 'Frigate / Destroyer',
			shapes: [
				{ type: 'path', 'stroke-width': '2', d: 'M20 1H7L.75 7 7 13h13z', stroke: '#f8a86d', fill: 'none' }
			]
		},
		{
			id: 'cl',
			name: 'Light Cruiser',
			shapes: [
				{ type: 'path', 'stroke-width': '2', d: 'M20 1H7L.75 7 7 13h13z', stroke: '#f8a6a6', fill: 'none' },
				{ type: 'path', 'stroke-width': '2', d: 'M15.75 1v12', stroke: '#f8a6a6' }
			]
		},
		{
			id: 'ca',
			name: 'Heavy Cruiser',
			shapes: [
				{ type: 'path', 'stroke-width': '2', d: 'M20 1H7L.75 7 7 13h13z', stroke: '#ffaaaa', fill: 'none' },
				{ type: 'path', 'stroke-width': '2', d: 'M16 1H20v12h-4z', stroke: '#ffaaaa', fill: '#ffaaaa' }
			]
		},
		{
			id: 'cc',
			name: 'Battlecruiser',
			shapes: [
				{ type: 'path', 'stroke-width': '2', d: 'M20 1H7L.75 7 7 13h13z', stroke: '#fda9a9', fill: 'none' },
				{ type: 'path', 'stroke-width': '2', d: 'M18 1H20v12h-2z', stroke: '#fda9a9', fill: '#ffaaaa' },
				{ type: 'path', 'stroke-width': '2', d: 'M11 1H13v12h-2z', stroke: '#fda9a9', fill: '#ffaaaa' }
			]
		},
		{
			id: 'bb',
			name: 'Battleship',
			shapes: [
				{ type: 'path', 'stroke-width': '2', d: 'M20 1H7L.75 7 7 13h13z', stroke: '#fd6565', fill: 'none' },
				{ type: 'path', 'stroke-width': '2', d: 'M16 1v12', stroke: '#fd6565' },
				{ type: 'path', 'stroke-width': '2', d: 'M12 1v12', stroke: '#fd6565' },
				{ type: 'path', 'stroke-width': '2', d: 'M8 1v12', stroke: '#fd6565' }
			]
		}
	];
	let sortingLoopError = false;

	init();

	// #region Nav menu listeners
	document.querySelector( '#navAdd' ).addEventListener( 'click', () => {
		closeModal();
		document.querySelector( '#addModal' ).style.display = 'block';
		document.querySelector( 'body' ).style.overflow = 'hidden';
	} );
	document.querySelector( '#navEdit' ).addEventListener( 'click', () => {
		closeModal();
		document.querySelector( '#editModal' ).style.display = 'block';
		document.querySelector( 'body' ).style.overflow = 'hidden';
	} );
	document.querySelector( '#navDel' ).addEventListener( 'click', () => {
		closeModal();
		document.querySelector( '#delModal' ).style.display = 'block';
		document.querySelector( 'body' ).style.overflow = 'hidden';
	} );
	document.querySelector( '#navOrder' ).addEventListener( 'click', () => {
		closeModal();
		document.querySelector( '#orderModal' ).style.display = 'block';
		document.querySelector( 'body' ).style.overflow = 'hidden';
	} );
	document.querySelector( '#navBackup' ).addEventListener( 'click', () => {
		closeModal();
		document.querySelector( '#backupModal' ).style.display = 'block';
		document.querySelector( 'body' ).style.overflow = 'hidden';
	} );
	document.querySelector( '#navExport' ).addEventListener( 'click', () => {
		closeModal();
		document.querySelector( '#exportModal' ).style.display = 'block';
		document.querySelector( 'body' ).style.overflow = 'hidden';
	} );
	document.querySelector( '#navClone' ).addEventListener( 'click', () => {
		closeModal();
		document.querySelector( '#cloneModal' ).style.display = 'block';
		document.querySelector( 'body' ).style.overflow = 'hidden';
	} );
	// #endregion Nav menu listeners

	// #region General modal listeners
	document.querySelectorAll( '.close' ).forEach( ( item ) => {
		item.addEventListener( 'click', () => {
			closeModal();
		} );
	} );
	window.onclick = function ( event ) {
		if ( event.target.classList.contains( 'modal' ) ) {
			closeModal();
		}
	};
	// #endregion General modal listeners

	// #region Add modal listeners
	document.querySelector( '#addButton' ).addEventListener( 'click', () => {
		const readSuccesful = readVehicleInput();
		if ( readSuccesful ) {
			localStorage.setItem( 'save', JSON.stringify( vehicleList ) );
			fillEditSelection( vehicleList );

			drawTree( organizeTree( vehicleList ) );
			document.querySelector( '#vehicleimagelist' ).innerHTML = '';
			updateVehicleOrderList();
		}
	} );
	document.querySelector( '#vehicleimagelistadd' ).addEventListener( 'click', ( e ) => {
		e.preventDefault();
		const list = document.querySelector( '#vehicleimagelist' );
		list.appendChild( createImageListItem() );
	} );
	document.querySelector( '#vehicletype' ).addEventListener( 'change', ( e ) => {
		const choice = e.target.value;
		const connection = document.querySelector( '#vehicleconnection' );
		if ( [ 'researchable', 'reserve' ].includes( choice ) ) {
			connection.value = 'yes';
		} else {
			connection.value = 'no';
		}
	} );
	// #endregion Add modal listeners

	// #region Edit modal listeners
	document.querySelector( '#editButton' ).addEventListener( 'click', () => {
		const readSuccesful = readVehicleEditInput();
		if ( readSuccesful ) {
			localStorage.setItem( 'save', JSON.stringify( vehicleList ) );
			fillEditSelection( vehicleList );

			drawTree( organizeTree( vehicleList ) );
			document.querySelector( '#vehicleimagelistedit' ).innerHTML = '';
			updateVehicleOrderList();
		}
	} );
	$( '#editionSelect' ).on( 'change', ( e ) => {
		if ( e.target.value === 'undefined' ) return;
		document.querySelector( '#vehicleimagelistedit' ).innerHTML = '';
		const vehicleId = e.target.value;
		const vehicle = vehicleList.find( ( item ) => {
			return item.id === vehicleId;
		} );
		document.querySelector( '#vehiclenameedit' ).value = vehicle.name;
		document.querySelector( '#vehiclerankedit' ).value = vehicle.rank;
		document.querySelector( '#vehiclebredit' ).value = vehicle.br;
		document.querySelector( '#vehicletypeedit' ).value = vehicle.type;
		document.querySelector( '#vehicleconnectionedit' ).value = vehicle.connection;
		document.querySelector( '#vehiclebranchedit' ).value = vehicle.branch;
		document.querySelector( '#vehiclefollowedit' ).value = vehicle.follow;
		CKEDITOR.instances.vehicledescriptionedit.setData( vehicle.description );
		document.querySelector( '#vehiclethumbnailedit' ).value = vehicle.thumbnail;
		if ( vehicle.images ) {
			const list = document.querySelector( '#vehicleimagelistedit' );
			for ( const image of vehicle.images ) {
				const url = image.image ? image.image : '';
				const desc = image.description ? image.description : '';
				list.appendChild( createImageListItem( url, desc ) );
			}
		}
		if ( vehicle.classIcon ) {
			document.querySelector( `#${ vehicle.classIcon }edit` ).click();
		} else {
			document.querySelector( '#noneedit' ).click();
		}
	} );
	document.querySelector( '#vehicleimagelisteditadd' ).addEventListener( 'click', ( e ) => {
		e.preventDefault();
		const list = document.querySelector( '#vehicleimagelistedit' );
		list.appendChild( createImageListItem() );
	} );
	document.querySelector( '#vehicletypeedit' ).addEventListener( 'change', ( e ) => {
		const choice = e.target.value;
		const connection = document.querySelector( '#vehicleconnectionedit' );
		if ( [ 'researchable', 'reserve' ].includes( choice ) ) {
			connection.value = 'yes';
		} else {
			connection.value = 'no';
		}
	} );
	// #endregion Edit modal listeners

	// #region Delete modal listeners
	$( '#deleteVehicleSelect' ).on( 'change', ( e ) => {
		if ( e.target.value === 'undefined' ) return;
		const vehicle = vehicleList.find( ( vehicle ) => {
			return vehicle.id === e.target.value;
		} );

		const target = document.querySelector( '#vehicleDeleteDisplay' );
		target.innerHTML = '';
		target.appendChild( createVehicleBadge( vehicle ) );
	} );
	document.querySelector( '#deleteVehicleButton' ).addEventListener( 'click', () => {
		const id = document.querySelector( '#deleteVehicleSelect' ).value;
		if ( id === 'undefined' ) return;
		const name = vehicleList.find( ( vehicle ) => {
			return vehicle.id === id;
		} ).name;

		const con = confirm( `Do you want to delete ${ name }?` );
		if ( con === true ) {
			const newList = [];
			vehicleList.forEach( ( element ) => {
				if ( element.id !== id ) {
					newList.push( element );
				}
			} );

			vehicleList.splice( 0, vehicleList.length );
			newList.forEach( ( item ) => vehicleList.push( item ) );

			localStorage.setItem( 'save', JSON.stringify( vehicleList ) );
			fillEditSelection( vehicleList );
			document.querySelector( '#vehicleDeleteDisplay' ).innerHTML = '';
			drawTree( organizeTree( vehicleList ) );
			updateVehicleOrderList();
		}
	} );
	document.querySelector( '#deleteAllButton' ).addEventListener( 'click', () => {
		const con = confirm( 'Do you want to delete ALL VEHICLES, tech tree name and it\'s description? This is irreversible!' );
		if ( con === true ) {
			vehicleList.splice( 0, vehicleList.length );
			document.querySelector( '#techtreename' ).value = '';
			CKEDITOR.instances.techtreemaindesc.setData( '' );
			localStorage.clear();

			const organizedVehicles = organizeTree( vehicleList );
			drawTree( organizedVehicles );
			closeModal();
			updateVehicleOrderList();
		}
	} );
	// #endregion Delete modal listeners

	// #region Order modal listeners
	document.querySelector( '#vehicleOrderList' ).addEventListener( 'click', ( e ) => {
		if ( e.target.classList.contains( 'removeConnection' ) ) {
			const id = e.target.parentNode.id;
			const index = vehicleList.findIndex( ( vehicle ) => {
				return vehicle.id === id;
			} );
			vehicleList[ index ].follow = undefined;
			localStorage.setItem( 'save', JSON.stringify( vehicleList ) );
			drawTree( organizeTree( vehicleList ) );
			updateVehicleOrderList();
		}
	} );
	// #endregion Order modal listeners

	// #region Backup modal listeners
	document.querySelector( '#backupDownload' ).addEventListener( 'click', () => {
		const title = document.querySelector( '#techtreename' ).value;
		const description = CKEDITOR.instances.techtreemaindesc.getData();
		const content = { title, description, vehicleList };
		const fileName = title.toLowerCase().trim()
			.replaceAll( ' ', '_' ) + '_backup.json';
		var file = new Blob( [ JSON.stringify( content ) ], { type: 'application/json' } );
		if ( window.navigator.msSaveOrOpenBlob ) window.navigator.msSaveOrOpenBlob( file, fileName );
		else {
			var a = document.createElement( 'a' ),
				url = URL.createObjectURL( file );
			a.href = url;
			a.download = fileName;
			document.body.appendChild( a );
			a.click();
			setTimeout( function () {
				document.body.removeChild( a );
				window.URL.revokeObjectURL( url );
			}, 0 );
		}
	} );
	document.querySelector( '#loadBackup' ).addEventListener( 'click', () => {
		const file = document.querySelector( '#backupUpload' ).files[ 0 ];
		if ( !file ) return;
		file.text().then( ( result ) => {
			try {
				const loadedData = JSON.parse( result );
				if ( !loadedData.title || !loadedData.description || !loadedData.vehicleList ) {
					window.alert( 'Incorrect save file! Make sure you upload correct save file!' );
					return;
				}
				const con = confirm(
					'Do you want to load data from save file? This will override all current data, if you work on multiple trees, make sure to backup them first!'
				);
				if ( con === true ) {
					document.querySelector( '#techtreename' ).value = loadedData.title;
					CKEDITOR.instances.techtreemaindesc.setData( loadedData.description );
					vehicleList.splice( 0, vehicleList.length );
					loadedData.vehicleList.forEach( ( element ) => {
						vehicleList.push( element );
					} );
					fillEditSelection( vehicleList );
					drawTree( organizeTree( vehicleList ) );
					updateVehicleOrderList();

					localStorage.setItem( 'title', loadedData.title );
					localStorage.setItem( 'description', loadedData.description );
					localStorage.setItem( 'save', JSON.stringify( vehicleList ) );

					closeModal();
				}
			} catch ( e ) {
				window.alert( `An error occured:\n${ e }\nMake sure you upload correct save file!` );
			}
		} );
	} );
	// #endregion Backup modal listeners

	// #region Export modal listeners
	document.querySelector( '#exportTechTreeButton' ).addEventListener( 'click', () => {
		const title = document.querySelector( '#techtreename' ).value;
		const description = CKEDITOR.instances.techtreemaindesc.getData();
		const tree = document.querySelector( '#techtree' ).innerHTML;
		const vehicles = JSON.stringify( vehicleList );
		const file = new Blob( [ createHtmlContent( title, description, tree, vehicles ) ] );
		const fileName = title.toLowerCase().trim()
			.replaceAll( ' ', '_' ) + '.html';
		if ( window.navigator.msSaveOrOpenBlob ) window.navigator.msSaveOrOpenBlob( file, fileName );
		else {
			const a = document.createElement( 'a' ),
				url = URL.createObjectURL( file );
			a.href = url;
			a.download = fileName;
			document.body.appendChild( a );
			a.click();
			setTimeout( function () {
				document.body.removeChild( a );
				window.URL.revokeObjectURL( url );
			}, 0 );
		}
	} );
	// #endregion Export modal listeners

	// #region Clone modal listeners
	document.querySelector( '#copyCloneUtility' ).addEventListener( 'click', () => {
		const cloneUtility = `
		resBranches = Number( document.querySelectorAll( '.tree th' )[ 1 ].getAttribute( 'colspan' ) || 0 );
		i = 0;
		vehicleList = [ ...document.querySelectorAll( '.tree-item' ) ].map( node => {
			const vehicle = {};
		
			i++;
			vehicle.id = 'v' + i;
		
			vehicle.name = node.innerText;
		
			vehicle.thumbnail = node.querySelector( '.tree-item-img img' ).src;
		
			vehicle.type = node.querySelector( '.tree-item-background img' ).src.match( /_([^\\/]+)\\.png/ )[ 1 ];
		
			switch ( vehicle.type ) {
			case 'own':
				vehicle.type = 'researchable';
				break;
			case 'prem':
				vehicle.type = 'premium';
				break;
			case 'squad':
				vehicle.type = 'squadron';
			}
		
			const parentNode = node.parentNode;
			if ( parentNode.classList.contains( 'tree-group-collapse' ) ) {
				if ( [ ...parentNode.querySelectorAll( '.tree-item' ) ][ 0 ].innerText === vehicle.name ) {
					vehicle.connection = 'first';
				} else {
					vehicle.connection = 'folder';
				}
			}
		
			while ( node.tagName !== 'TD' ) {
				node = node.parentNode;
			}
			node = node.parentNode;
		
			vehicle.branch = [ ...node.querySelectorAll( 'td' ) ].findIndex( td => {
				const vehiclesInBranch = [ ...td.querySelectorAll( '.tree-item' ) ].map( vehicle => vehicle.innerText );
				return vehiclesInBranch.includes( vehicle.name );
			} ) + 1;
		
			if ( vehicle.branch > resBranches ) {
				vehicle.branch = vehicle.branch - resBranches;
				if ( vehicle.type === 'researchable' ) {
					vehicle.type = 'event';
				}
			}
		
			node = node.parentNode;
		
			vehicle.rank = [ ...node.querySelectorAll( 'tr' ) ].findIndex( tr => {
				const vehiclesInRank = [ ...tr.querySelectorAll( '.tree-item' ) ].map( vehicle => vehicle.innerText );
				return vehiclesInRank.includes( vehicle.name );
			} );
		
			vehicle.br = 0;
		
			if ( vehicle.connection !== 'folder' ) {
				vehicle.connection = 'yes';
			}
			if ( vehicle.type !== 'researchable' ) {
				vehicle.connection = 'no';
			}
			vehicle.name = vehicle.name.trim().replace( /\\s/g, '\\u0020' )
				.replace( /[^\\x00-\\xFF]/g, '\\u002a' );
		
			return vehicle;
		} );
		title = document.querySelector( '#firstHeading' ).innerText;
		description = 'This tech tree was cloned from the WT wiki on ' + new Date();
		
		content = {
			title,
			description,
			vehicleList
		};
		fileName = title.toLowerCase().trim()
			.replaceAll( ' ', '_' ) + '_backup.json';
		file = new Blob( [ JSON.stringify( content ) ], {
			type: 'application/json'
		} );
		if ( window.navigator.msSaveOrOpenBlob ) window.navigator.msSaveOrOpenBlob( file, fileName );
		else {
			var a = document.createElement( 'a' ),
				url = URL.createObjectURL( file );
			a.href = url;
			a.download = fileName;
			document.body.appendChild( a );
			a.click();
			setTimeout( function () {
				document.body.removeChild( a );
				window.URL.revokeObjectURL( url );
			}, 0 );
		}
		`;
		navigator.clipboard.writeText( cloneUtility )
			.then( () => {
				alert( 'Successfully copied the utility!' );
			} )
			.catch( err => {
				alert( 'Error during copying: ', err );
			} );
	} );
	// #endregion Clone modal listeners

	// #region Tech tree listeners
	document.querySelector( '#techtree' ).addEventListener( 'click', ( e ) => {
		document.querySelectorAll( '.foldertooltiptext' ).forEach( ( node ) => {
			node.style.visibility = 'hidden';
		} );
		let element = e.target;
		if ( !element.id ) element = element.parentNode;
		if ( !element.id ) return;
		const folderDiv = isFolderRoot( element );
		if ( folderDiv ) {
			folderDiv.style.visibility = 'visible';
		} else {
			const vehicle = vehicleList.find( ( item ) => {
				return item.id === element.id;
			} );
			if ( !isClickable( vehicle ) ) return;
			document.querySelector( '#modal_title' ).innerText = vehicle.name;
			if ( vehicle.images )
				$( '.galleria' )
					.data( 'galleria' )
					.load( [ ...vehicle.images ] );
			document.querySelector( '#modalDesc' ).innerHTML = vehicle.description;
			const info = document.querySelector( '.galleria-info' );
			info.style.width = 'fit-content';
			info.style.left = 'auto';
			info.style.bottom = '50px';
			info.style.top = 'auto';
			info.style.right = '0px';
			document.querySelector( '.galleria-info-text' ).style.backgroundColor = 'RGBA(0, 0, 0, 0.85)';
			document.querySelector( '.galleria-info-text' ).style.padding = '3px';
			document.querySelector( '#vehicleDisplayModal' ).style.display = 'block';
			document.querySelector( 'body' ).style.overflow = 'hidden';
		}
	} );
	// #endregion Tech tree listeners

	// #region Main title & description listeners
	document.querySelector( '#techtreename' ).addEventListener( 'change', ( e ) => {
		localStorage.setItem( 'title', e.target.value );
	} );
	CKEDITOR.instances.techtreemaindesc.on( 'change', () => {
		localStorage.setItem( 'description', CKEDITOR.instances.techtreemaindesc.getData() );
	} );
	CKEDITOR.on( 'dialogDefinition', function ( ev ) {
		const dialogName = ev.data.name;
		const dialogDefinition = ev.data.definition;
		if ( dialogName == 'link' ) {
			const infoTab = dialogDefinition.getContents( 'info' );
			const protocolField = infoTab.get( 'protocol' );
			protocolField[ 'default' ] = 'https://';

			const targetTab = dialogDefinition.getContents( 'target' );
			const targetField = targetTab.get( 'linkTargetType' );
			targetField[ 'default' ] = '_blank';
		}
	} );
	CKEDITOR.on( 'instanceReady', function ( e ) {
		// First time
		e.editor.document.getBody().setStyle( 'background-color', 'rgb(36, 46, 51)' );
		e.editor.document.getBody().setStyle( 'color', 'white' );
		// in case the user switches to source and back
		e.editor.on( 'contentDom', function () {
			e.editor.document.getBody().setStyle( 'background-color', 'rgb(36, 46, 51)' );
			e.editor.document.getBody().setStyle( 'color', 'white' );
		} );
	} );
	// #endregion Main title & description listeners

	// #region Miscellaneous listeners
	window.onbeforeunload = () => {
		return 'Do you really want to leave this page?';
	};
	// #endregion Miscellaneous listeners

	// #region Tech tree building functions
	function organizeTree ( vehicleList ) {
		sortingLoopError = false;
		const sortedVehicles = {};
		for ( const vehicle of vehicleList ) {
			const branchName = ![ 'researchable', 'reserve' ].includes( vehicle.type ) ? `premium_${ vehicle.branch }` : vehicle.branch;
			const vehicleRegion = `rank_${ vehicle.rank }_branch_${ branchName }`;
			if ( sortedVehicles[ vehicleRegion ] === undefined ) sortedVehicles[ vehicleRegion ] = [];
			sortedVehicles[ vehicleRegion ].push( vehicle );
		}
		for ( const region in sortedVehicles ) {
			let array = sortedVehicles[ region ];
			array.sort( ( a, b ) => a.br - b.br );
			const followers = array.filter( ( item ) => {
				return ![ undefined, 'undefined' ].includes( item.follow );
			} );
			if ( followers.length > 0 ) {
				let i = 0;
				while ( !isFollowApplied( array ) ) {
					for ( const follower of followers ) {
						if (
							array.findIndex( ( item ) => {
								return item.id === follower.follow;
							} ) === -1
						)
							continue;
						array.splice( array.indexOf( follower ), 1 );
						const target =
							array.findIndex( ( item ) => {
								return item.id === follower.follow;
							} ) + 1;
						array.splice( target, 0, follower );
					}
					// Anti infinite loop safety
					i++;
					if ( i > 1000 ) {
						console.log( 'infinite loop detected' );
						sortingLoopError = true;
						break;
					}
				}
			}

			const temp = [ ...array ];
			array = [];
			for ( const vehicle of temp ) {
				if ( array.length === 0 ) {
					array.push( vehicle );
					continue;
				}
				if ( vehicle.connection === 'folder' ) {
					if ( array[ array.length - 1 ].constructor === Array ) {
						array[ array.length - 1 ].push( vehicle );
						continue;
					}
					const popped = array.pop();
					array.push( [ popped, vehicle ] );
					continue;
				}
				array.push( vehicle );
			}
			sortedVehicles[ region ] = array;
		}
		return sortedVehicles;
	}
	function isFollowApplied ( array ) {
		array = [ ...array ];
		if ( ![ undefined, 'undefined' ].includes( array[ 0 ].follow ) ) {
			if (
				array.some( ( vehicle ) => {
					return vehicle.id === array[ 0 ].follow;
				} )
			)
				return false;
		}
		while ( array.length >= 2 ) {
			if ( ![ undefined, 'undefined' ].includes( array[ 1 ].follow ) ) {
				if ( array[ 0 ].id !== array[ 1 ].follow ) return false;
			}
			array.shift();
		}
		return true;
	}
	function drawTree ( organizedVehicles ) {
		const tbody = document.querySelector( '#techtree' );
		tbody.innerHTML = '';
		const ranks = [];
		const branches = [];
		for ( const region in organizedVehicles ) {
			const rank = region.slice( 5, 6 );
			if ( !ranks.includes( rank ) ) ranks.push( rank );
			const branch = region.slice( 14 );
			if ( !branches.includes( branch ) ) branches.push( branch );
		}
		ranks.sort();
		branches.sort();
		const techtree = document.querySelector( '#techtree' );
		techtree.innerHTML = '';
		for ( const rank of ranks ) {
			let firstPremiumBranch = true;
			const rankDiv = document.createElement( 'div' );
			rankDiv.classList.add( 'rank' );
			const rankNumDiv = document.createElement( 'div' );
			rankNumDiv.classList.add( 'rankNumber' );
			const rankNumDivText = document.createElement( 'div' );
			rankNumDivText.innerHTML = `Rank <b>${ romanize( rank ) }</b>`;
			rankNumDivText.classList.add( 'rankNumberText' );
			rankNumDiv.appendChild( rankNumDivText );
			rankDiv.appendChild( rankNumDiv );
			for ( const branch of branches ) {
				const branchDiv = document.createElement( 'div' );
				branchDiv.classList.add( 'branch' );
				if ( branch.indexOf( 'premium' ) !== -1 && firstPremiumBranch ) {
					firstPremiumBranch = false;
					branchDiv.style.borderLeft = '2px solid white';
				}
				const region = `rank_${ rank }_branch_${ branch }`;
				if ( organizedVehicles[ region ] !== undefined ) {
					for ( const vehicle of organizedVehicles[ region ] ) {
						if ( vehicle.constructor === Array ) {
							branchDiv.appendChild( createFolder( vehicle ) );
						} else {
							branchDiv.appendChild( createVehicleBadge( vehicle ) );
						}
					}
				}
				const filler = document.createElement( 'div' );
				filler.classList.add( 'fillerDiv' );
				filler.classList.add( `badgeLine_${ branch }` );
				branchDiv.appendChild( filler );
				rankDiv.appendChild( branchDiv );
			}
			techtree.appendChild( rankDiv );
		}

		affixFolderNumbers();
		affixBranchLines( branches );
		sanitizeFolderLeftover( branches );
		sanitizeFolderLines();
		setFillerSizes();
	}
	function romanize ( num ) {
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
			i;
		for ( i in lookup ) {
			while ( num >= lookup[ i ] ) {
				roman += i;
				num -= lookup[ i ];
			}
		}
		return roman;
	}
	function affixFolderNumbers () {
		const toAffix = document.querySelectorAll( '.folderNumber' );
		toAffix.forEach( ( item ) => {
			const notch = document.createElement( 'div' );
			notch.innerText = `+${ item.innerText - 1 }`;
			notch.classList.add( 'folderNumber' );
			item.parentNode.querySelector( '.vehicleBadge' ).appendChild( notch );
			item.remove();
		} );
	}
	function affixBranchLines ( branches ) {
		branches.forEach( ( branchIndex ) => {
			const nodes = document.querySelectorAll( `.badgeLine_${ branchIndex }` );
			const lineArray = [];
			nodes.forEach( ( node ) => {
				lineArray.push( node );
			} );
			while ( !lineArray[ 0 ].classList.contains( 'vehicleBadge' ) ) lineArray.shift();
			lineArray.reverse();
			while ( !lineArray[ 0 ].classList.contains( 'vehicleBadge' ) ) lineArray.shift();

			let connected = false;
			let arrow = false;
			while ( lineArray.length > 0 ) {
				if ( lineArray[ 0 ].classList.contains( 'connected_yes' ) || lineArray[ 0 ].classList.contains( 'connected_folder' ) ) {
					connected = true;
					arrow = true;
					lineArray.shift();
					continue;
				}
				if ( arrow ) {
					arrow = false;
					lineArray[ 0 ].innerHTML += '<div class="lineArrow"></div>';
					lineArray.shift();
					continue;
				}
				if ( lineArray[ 0 ].classList.contains( 'connected_no' ) ) {
					connected = false;
				}
				if ( connected ) {
					lineArray[ 0 ].innerHTML += '<div class="lineDiv"></div>';
					lineArray.shift();
					continue;
				}
				lineArray.shift();
			}
		} );
	}
	function sanitizeFolderLeftover ( branches ) {
		for ( const rank of document.querySelectorAll( '.rank' ) ) {
			loop: for ( const branch of branches ) {
				const lineItems = rank.querySelectorAll( `.badgeLine_${ branch }` );
				const vehicleBadges = [ ...lineItems ].filter( ( item ) => {
					return item.classList.contains( 'vehicleBadge' );
				} );
				if ( vehicleBadges.length > 0 && vehicleBadges.pop().classList.contains( 'connected_folder' ) ) {
					let connectors = [ ...lineItems ].filter( ( item ) => {
						return item.classList.contains( 'badgeLine' );
					} );
					connectors = connectors.filter( ( item ) => {
						item = item.parentNode.parentNode.parentNode.parentNode.parentNode;
						return !item.classList.contains( 'foldertooltiptext' );
					} );
					const lastConnector = connectors.pop();
					let reachedConnector = false;
					let firstVehicle = true;
					for ( const item of document.querySelectorAll( `.badgeLine_${ branch }` ) ) {
						if ( reachedConnector ) {
							if ( item.classList.contains( 'vehicleBadge' ) ) {
								if ( firstVehicle ) {
									firstVehicle = false;
									continue;
								}
								if ( item.classList.contains( 'connected_no' ) ) {
									lastConnector.innerHTML = '';
									break loop;
								}

								if ( item.classList.contains( 'connected_yes' ) ) {
									break loop;
								}
							}
						}
						if ( item.isSameNode( lastConnector ) ) reachedConnector = true;
					}
					lastConnector.innerHTML = '';
				}
			}
		}
	}
	function sanitizeFolderLines () {
		const folders = document.querySelectorAll( '.foldertooltiptext' );
		folders.forEach( ( folder ) => {
			folder = [ ...folder.querySelectorAll( '.badgeLine' ) ];
			if ( folder[ 0 ].children[ 0 ] !== undefined ) {
				folder[ 0 ].children[ 0 ].style.borderColor = 'rgba(0, 0, 0, 0)';
			}
			folder.reverse();
			if ( folder[ 0 ].children[ 0 ] !== undefined ) {
				folder[ 0 ].children[ 0 ].style.backgroundColor = 'rgba(0, 0, 0, 0)';
			}
		} );
	}
	function setFillerSizes () {
		const fillers = document.querySelectorAll( '.fillerDiv' );
		fillers.forEach( ( div ) => {
			const y1 = div.getBoundingClientRect().y;
			const y2 = div.parentNode.getBoundingClientRect().y + div.parentNode.getBoundingClientRect().height;
			div.style.height = `${ y2 - y1 }px`;
		} );
	}
	// #endregion Tech tree building functions

	// #region Vehicle badge functions
	function createVehicleBadge ( vehicle ) {
		const div = document.createElement( 'div' );
		let img = '';
		if ( vehicle.thumbnail !== undefined ) img = `<img src="${ vehicle.thumbnail }">`;
		let svg = '';
		if ( vehicle.classIcon ) {
			svg = createSvg( classIcons.find( classIcon => classIcon.id === vehicle.classIcon ) );
		}
		let brLabel = '';
		if ( vehicle.type === 'reserve' ) brLabel = `<i>Reserve</i> (${ vehicle.br.toFixed( 1 ) })`;
		else brLabel = vehicle.br.toFixed( 1 );
		let branchLine = '';
		if ( [ 'researchable', 'reserve' ].includes( vehicle.type ) ) branchLine = `badgeLine_${ vehicle.branch }`;
		else branchLine = `badgeLine_premium_${ vehicle.branch }`;
		div.innerHTML = `<table>
<tbody>
<tr>
<td rowspan="3" class="badgeSide"></td>
<td class="badgeLine ${ branchLine }"></td>
<td rowspan="3" class="badgeSide"></td>
</tr>
<tr>
<td id="${ vehicle.id }"
class="vehicleBadge type_${ vehicle.type } ${ branchLine }
connected_${ vehicle.connection }"
style="position:relative; ${ isClickable( vehicle ) ? 'cursor:pointer;' : '' }">
<span class="vehicleName">${ vehicle.name }</span>
<b class="vehicleBr">${ brLabel }</b>
${ img }
${ svg }
</td>
</tr>
<tr>
<td class="badgeLine ${ branchLine }"></td>
</tr>
</tbody>
</table>`;
		return div;
	}
	function createFolder ( folder ) {
		const folderDiv = document.createElement( 'div' );
		const tooltipText = document.createElement( 'span' );
		folderDiv.appendChild( createVehicleBadge( folder[ 0 ] ) );
		folderDiv.classList.add( 'foldertooltip' );
		tooltipText.classList.add( 'foldertooltiptext' );

		for ( const vehicle of folder ) {
			tooltipText.appendChild( createVehicleBadge( vehicle ) );
		}

		folderDiv.innerHTML += `<div class="folderNumber">${ folder.length }</div>`;

		folderDiv.appendChild( tooltipText );

		return folderDiv;
	}
	function isClickable ( vehicle ) {
		const images = vehicle.images?.length > 0;
		const description = vehicle.description?.length > 0 && vehicle.description !== descriptionTemplate;
		return description || images;
	}
	function isFolderRoot ( node ) {
		const initialNode = node;
		const nodesWithId = [];
		while ( !node.classList.contains( 'foldertooltip' ) ) {
			node = node.parentNode;
			if ( node.classList.contains( 'branch' ) ) {
				return false;
			}
		}
		const output = node.querySelector( '.foldertooltiptext' );
		for ( const childNode of node.querySelectorAll( '*' ) ) {
			if ( childNode.id ) nodesWithId.push( childNode );
		}
		if ( initialNode.isSameNode( nodesWithId[ 0 ] ) ) {
			return output;
		}
		return false;
	}
	function createSvg ( icon ) {
		const shapes = icon.shapes.map( shape => {
			const shapesSvg = [];
			for ( const property in shape ) {
				if ( property === 'type' ) {
					continue;
				}
				shapesSvg.push( `${ property }="${ shape[ property ] }"` );
			}
			return `<${ shape.type } ${ shapesSvg.join( ' ' ) }/>`;
		} ).join();
		return `<svg width="21" height="15" xmlns="http://www.w3.org/2000/svg"><g>${ shapes }</g></svg>`;
	}
	// #endregion Vehicle badge functions

	// #region Miscellaneous menu functions
	function readVehicleInput () {
		const name = document.querySelector( '#vehiclename' ).value.trim();
		if ( name.length === 0 ) {
			window.alert( 'You have to provide name of the vehicle!' );
			return false;
		}
		const rank = Number( document.querySelector( '#vehiclerank' ).value );
		if ( !/^[1-9]$/.test( rank.toString() ) ) {
			window.alert( 'Rank has to be a natural number between 1 and 9!' );
			return false;
		}
		const br = Number( document.querySelector( '#vehiclebr' ).value );
		if ( ( !/^\d+\.\d$/.test( br ) && !/^\d+$/.test( br ) ) || br < 0 || br >= 100 ) {
			window.alert( 'Battle rating must have one or zero decimal places, and be a non-negative number less than 100!' );
			return false;
		}
		const type = document.querySelector( '#vehicletype' ).value;
		const connection = document.querySelector( '#vehicleconnection' ).value;
		const branch = Number( document.querySelector( '#vehiclebranch' ).value );
		if ( !/^[1-9]$/.test( branch.toString() ) ) {
			window.alert( 'Branch has to be a natural number between 1 and 9!' );
			return false;
		}
		let classIcon = document.querySelector( 'input[name="classIcons"]:checked' ).value;
		if ( classIcon === 'none' ) {
			classIcon = undefined;
		}
		const follow = document.querySelector( '#vehiclefollowedit' ).value;
		const description = CKEDITOR.instances.vehicledescription.getData();
		const id = 'v' + Date.now();
		const thumbnail = document.querySelector( '#vehiclethumbnail' ).value;
		const images = [];
		document
			.querySelector( '#vehicleimagelist' )
			.querySelectorAll( 'li' )
			.forEach( ( item ) => {
				const image = item.querySelectorAll( 'input' )[ 0 ].value;
				const description = item.querySelectorAll( 'input' )[ 1 ].value.trim();
				if ( image ) images.push( { image, description } );
			} );

		const vehicle = {
			name,
			rank,
			br,
			type,
			connection,
			branch,
			classIcon,
			follow,
			description,
			id,
			thumbnail,
			images
		};
		vehicleList.push( vehicle );
		document.querySelector( '#newForm' ).reset();
		document.querySelector( '#none' ).checked = true;
		CKEDITOR.instances.vehicledescription.setData( descriptionTemplate );
		closeModal();
		return true;
	}
	function readVehicleEditInput () {
		const name = document.querySelector( '#vehiclenameedit' ).value.trim();
		if ( name.length === 0 ) {
			window.alert( 'You have to provide name of the vehicle!' );
			return false;
		}
		const rank = Number( document.querySelector( '#vehiclerankedit' ).value );
		if ( !/^[1-9]$/.test( rank.toString() ) ) {
			window.alert( 'Rank has to be a natural number between 1 and 9!' );
			return false;
		}
		const br = Number( document.querySelector( '#vehiclebredit' ).value );
		if ( ( !/^\d+\.\d$/.test( br ) && !/^\d+$/.test( br ) ) || br < 0 || br >= 100 ) {
			window.alert( 'Battle rating must have one or zero decimal places, and be a non-negative number less than 100!' );
			return false;
		}
		const type = document.querySelector( '#vehicletypeedit' ).value;
		const connection = document.querySelector( '#vehicleconnectionedit' ).value;
		const branch = Number( document.querySelector( '#vehiclebranchedit' ).value );
		if ( !/^[1-9]$/.test( branch.toString() ) ) {
			window.alert( 'Branch has to be a natural number between 1 and 9!' );
			return false;
		}
		let classIcon = document.querySelector( 'input[name="classIconsedit"]:checked' ).value;
		if ( classIcon === 'none' ) {
			classIcon = undefined;
		}
		const follow = document.querySelector( '#vehiclefollowedit' ).value;
		const description = CKEDITOR.instances.vehicledescriptionedit.getData();
		CKEDITOR.instances.vehicledescriptionedit.setData( '' );
		const id = document.querySelector( '#editionSelect' ).value;
		const thumbnail = document.querySelector( '#vehiclethumbnailedit' ).value;
		const images = [];
		document
			.querySelector( '#vehicleimagelistedit' )
			.querySelectorAll( 'li' )
			.forEach( ( item ) => {
				const image = item.querySelectorAll( 'input' )[ 0 ].value;
				const description = item.querySelectorAll( 'input' )[ 1 ].value.trim();
				if ( image ) images.push( { image, description } );
			} );

		const vehicle = {
			name,
			rank,
			br,
			type,
			connection,
			branch,
			classIcon,
			follow,
			description,
			id,
			thumbnail,
			images
		};
		vehicleList.forEach( ( element, index, array ) => {
			if ( element.id === vehicle.id ) {
				array[ index ] = vehicle;
			}
		} );
		document.querySelector( '#editForm' ).reset();
		document.querySelector( '#noneedit' ).checked = true;
		closeModal();
		return true;
	}
	function fillEditSelection ( vehicleList ) {
		const selectArr = [
			document.querySelector( '#editionSelect' ),
			document.querySelector( '#vehiclefollow' ),
			document.querySelector( '#vehiclefollowedit' ),
			document.querySelector( '#deleteVehicleSelect' )
		];
		selectArr.forEach( ( item ) => {
			item.innerHTML = '';
		} );
		const vehicles = [];
		for ( const vehicle of vehicleList ) {
			const name = vehicle.name;
			const id = vehicle.id;
			vehicles.push( {
				name,
				id
			} );
		}
		vehicles.sort( ( a, b ) => {
			return a.name.localeCompare( b.name );
		} );
		const defaultOption = '<option value="undefined">-- nothing selected --</option>';
		for ( const select of selectArr ) {
			select.innerHTML += defaultOption;
			for ( const vehicle of vehicles ) {
				const option = document.createElement( 'option' );
				option.value = vehicle.id;
				option.innerText = vehicle.name;
				select.appendChild( option );
			}
		}
	}
	function updateVehicleOrderList () {
		const tbody = document.querySelector( '#vehicleOrderList' );
		tbody.innerHTML = '';
		const followers = [];
		const targets = [];
		vehicleList.forEach( ( vehicle ) => {
			if ( vehicle.follow ) followers.push( vehicle );
		} );
		for ( const follower of followers ) {
			const target = vehicleList.find( ( vehicle ) => {
				return vehicle.id === follower.follow;
			} );
			if ( !target ) {
				follower.follow = undefined;
				return;
			}
			targets.push( target );
			const tr = document.createElement( 'tr' );
			tr.innerHTML = `<td>${ target.name }</td><td>➡️</td><td>${ follower.name }</td><th class="removeConnection">Remove this connection</th>`;
			tr.id = follower.id;
			tbody.appendChild( tr );
		}

		// Checking multiple follows on the same target
		targets.forEach( ( item, index, arr ) => {
			arr[ index ] = item.name;
		} );
		const multipleFollows = [];
		for ( const target of targets ) {
			if ( !multipleFollows.includes( target ) && targets.indexOf( target ) !== targets.lastIndexOf( target ) ) multipleFollows.push( target );
		}
		const loopError = document.querySelector( '#followLoopWarning' );
		loopError.style.display = 'none';
		document.querySelector( '#navOrder' ).innerHTML = 'Vehicle ordering';
		document.querySelector( '#multipleFollowWarning' ).innerHTML = '';
		if ( sortingLoopError || multipleFollows.length > 0 ) {
			console.log( 'trigger #1' );
			document.querySelector( '#navOrder' ).innerHTML = 'Vehicle ordering <b style="color:red;">WARNING!</b>';
		}
		if ( sortingLoopError ) {
			console.log( 'trigger #2' );
			loopError.style.display = 'block';
		}
		if ( multipleFollows.length > 0 ) {
			console.log( 'trigger #3' );
			const p = document.querySelector( '#multipleFollowWarning' );
			p.innerHTML += '<b style="color:red;">WARNING!</b> Following vehicles have more than one vehicle placed behind them:<br>';
			for ( const follow of multipleFollows ) p.innerHTML += `<br>${ follow }`;
			p.innerHTML += '<br><br>This can cause problems with ordering, make sure each vehicle has no more than one follower.';
		}
	}
	function createImageListItem ( url, description ) {
		const listItem = document.createElement( 'li' );
		const table = document.createElement( 'table' );
		const tbody = document.createElement( 'tbody' );

		const tr1 = document.createElement( 'tr' );

		const td1 = document.createElement( 'td' );
		td1.rowSpan = 2;
		const remove = document.createElement( 'div' );
		remove.style.cursor = 'pointer';
		remove.innerText = '❌';
		td1.appendChild( remove );
		tr1.appendChild( td1 );

		remove.addEventListener( 'click', () => {
			listItem.remove();
		} );

		const td2 = document.createElement( 'td' );
		const moveUp = document.createElement( 'div' );
		moveUp.style.cursor = 'pointer';
		moveUp.innerText = '⬆️';
		td2.appendChild( moveUp );
		tr1.appendChild( td2 );

		moveUp.addEventListener( 'click', () => {
			if ( listItem.previousSibling ) {
				listItem.previousSibling.before( listItem );
			}
		} );

		const td3 = document.createElement( 'td' );
		const urlLabel = document.createElement( 'label' );
		urlLabel.innerText = 'URL:';
		td3.appendChild( urlLabel );
		tr1.appendChild( td3 );

		const td4 = document.createElement( 'td' );
		const urlInput = document.createElement( 'input' );
		if ( url ) urlInput.value = url;
		td4.appendChild( urlInput );
		tr1.appendChild( td4 );

		const td5 = document.createElement( 'td' );
		td5.rowSpan = 2;
		td5.style.padding = 0;
		const img = document.createElement( 'img' );
		if ( url ) img.src = url;
		img.height = '50';
		td5.appendChild( img );
		tr1.appendChild( td5 );

		urlInput.addEventListener( 'change', ( e ) => {
			const url = e.target.value;
			img.src = url;
		} );

		const tr2 = document.createElement( 'tr' );

		const td6 = document.createElement( 'td' );
		const moveDown = document.createElement( 'div' );
		moveDown.style.cursor = 'pointer';
		moveDown.innerText = '⬇️';
		td6.appendChild( moveDown );
		tr2.appendChild( td6 );

		moveDown.addEventListener( 'click', () => {
			if ( listItem.nextSibling ) {
				listItem.nextSibling.after( listItem );
			}
		} );

		const td7 = document.createElement( 'td' );
		const descLabel = document.createElement( 'label' );
		descLabel.innerText = 'Caption:';
		td7.appendChild( descLabel );
		tr2.appendChild( td7 );

		const td8 = document.createElement( 'td' );
		const descInput = document.createElement( 'input' );
		if ( description ) descInput.value = description;
		td8.appendChild( descInput );
		tr2.appendChild( td8 );

		tbody.appendChild( tr1 );
		tbody.appendChild( tr2 );

		table.appendChild( tbody );
		listItem.appendChild( table );

		return listItem;
	}
	// #endregion Miscellaneous menu functions

	// #region Other functions
	function closeModal () {
		document.querySelector( 'body' ).style.overflow = 'visible';
		document.querySelectorAll( '.modal' ).forEach( ( modal ) => {
			modal.style.display = 'none';
		} );
		$( '.galleria' ).data( 'galleria' )
			.splice( 0, $( '.galleria' ).data( 'galleria' )
				.getDataLength() );
		$( '.galleria' ).data( 'galleria' )
			.destroy();
		Galleria.run( '.galleria' );
	}
	function fillClassSelection ( edit ) {
		const targetHtml = document.querySelector( edit ? '#vehicleclassiconsedit' : '#vehicleclassicons' );
		for ( const classIcon of classIcons ) {
			const div = document.createElement( 'div' );
			div.classList.add( 'tooltip' );

			const span = document.createElement( 'span' );
			span.classList.add( 'tooltiptext' );
			span.innerText = classIcon.name.replace( /\s/g, '\u00A0' ).replace( /-/g, '\u2011' );
			span.style.width = 'fit-content';
			span.style.maxWidth = '999px';
			span.style.padding = '3px';

			const label = document.createElement( 'label' );
			label.htmlFor = classIcon.id + ( edit ? 'edit' : '' );
			label.classList.add( 'classIconContainer' );

			const input = document.createElement( 'input' );
			input.type = 'radio';
			input.id = classIcon.id + ( edit ? 'edit' : '' );
			input.name = 'classIcons' + ( edit ? 'edit' : '' );
			input.value = classIcon.id;
			input.style.display = 'none';
			if ( input.id === 'none' ) {
				input.checked = true;
			}

			label.appendChild( input );
			label.innerHTML += createSvg( classIcon );
			div.appendChild( label );
			div.appendChild( span );
			targetHtml.appendChild( div );

			document.querySelector( `#none${ edit ? 'edit' : '' }` ).click();
		}
	}
	function init () {
		// Modal slideshow initialization
		Galleria.loadTheme( 'https://cdnjs.cloudflare.com/ajax/libs/galleria/1.6.1/themes/classic/galleria.classic.min.js' );
		Galleria.run( '.galleria' );
		Galleria.configure( {
			_toggleInfo: false
		} );

		// Enabling advanced selection
		$( '#editionSelect' ).select2( { width: '15em' } );
		$( '#vehiclefollow' ).select2( { width: '15em' } );
		$( '#vehiclefollowedit' ).select2( { width: '15em' } );
		$( '#deleteVehicleSelect' ).select2( { width: '15em' } );

		// Text editor initialization
		CKEDITOR.config.height = 350;
		CKEDITOR.replace( 'vehicledescription' );
		CKEDITOR.replace( 'vehicledescriptionedit' );
		CKEDITOR.instances.vehicledescription.setData( descriptionTemplate );
		CKEDITOR.replace( 'techtreemaindesc' );
		CKEDITOR.config.uiColor = '#A4D0E6';

		// Adding class icon selection
		fillClassSelection( false );
		fillClassSelection( true );

		// Loading save from local storage
		const save = localStorage.getItem( 'save' );
		if ( save ) {
			const arr = JSON.parse( save );
			arr.forEach( ( element ) => {
				vehicleList.push( element );
			} );
			fillEditSelection( vehicleList );
			const organizedVehicles = organizeTree( vehicleList );
			drawTree( organizedVehicles );
			updateVehicleOrderList();
		}
		const techTreeTitle = localStorage.getItem( 'title' );
		if ( techTreeTitle ) {
			document.querySelector( '#techtreename' ).value = techTreeTitle;
		}
		const techTreeDescription = localStorage.getItem( 'description' );
		if ( techTreeDescription ) {
			CKEDITOR.instances.techtreemaindesc.setData( techTreeDescription );
		}
	}
	// #endregion Other functions
} )();
