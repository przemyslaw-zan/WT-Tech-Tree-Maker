# WarThunder Tech Tree Maker

This tool allows creation of tech trees for the game [WarThunder](https://warthunder.com/en). Tech trees are used in game to organize vehicles of one or several nations into a progression system. An example of an official tech tree is [USA ground vehicles](https://wiki.warthunder.com/Category:USA_ground_vehicles). Some players of the game like to propose their custom tech trees, that are not in the game yet, and this tool is here to help them.

## [You can use the tool here!](https://przemyslaw-zan.github.io/WT-Tech-Tree-Maker/)

### [Examples of output trees](https://zanju.neocities.org/)

## Table of Contents

1. [Working on the tech tree](#working-on-the-tech-tree)
   1. [Adding vehicles](#adding-vehicles)
   2. [Editing vehicles](#editing-vehicles)
   3. [Removing vehicles](#removing-vehicles)
   4. [Vehicle ordering](#vehicle-ordering)
   5. [Data backup](#data-backup)
   6. [Exporting the tech tree](#exporting-the-tech-tree)
2. [Good practices](#good-practices)
3. [Contributing to the tool](#contributing-to-the-tool)

## Working on the tech tree

All your work will be automatically saved in the memory of your machine, and you can return here at any time. However, You should backup all your work to make sure it is not lost when you accidentally clear your browser. See: [Data backup](#data-backup).

First, you should name your project - simply type it in in the input on top of the page. Below the name field, there is place for description - this is where you can describe idea behind your project, and anything else you might want to point out.

In the top left, there is a menu that will open windows containing tools that will aid you in the creation of the tech tree, and will be described in the following section.

### Adding vehicles

In order to add the vehicle, click on the `Add vehicle` at the menu. Here, You will have to provide at the very least: name, rank and branch of the vehicle. Rank defines which horizontal section vehicle will belong to, and branch will define which vertical line will be in. Further information about the vehicle can be filled in here: Type of the vehicle defines whether it is a regular or a special one. Special ones are automatically placed in the apropriate section of the tree (Special or premium vehicles are located in separate space on the right side). Battle rating is value that vehicles are sorted by, by default. This can be overcome with the "Follow:" option. More on that in the [Vehicle ordering](#vehicle-ordering) section. Connection defines relation to other vehicles in the line: It can be either connected, disconnected, or foldered. Thumbnail defines image that will be displayed on the tech tree tab representing the vehicle.

Images and description is what will display in the pop-up window after clicking on the vehicle. That window can only appear if at least one of two criteria is met, otherwise nothing will happen after clicking on it:

- There are more than zero images
- Description is not empty, and is different from the default one

Images can be added using the `Add image +` button. Clicking it will add one image slot, where You can input link to the image, and optionally, it's caption. Order of the images can be changed by clicking either arrow (⬆️ and ⬇️) on the left side. Image can be removed using the ❌ button.

After all the data is filled in, click the `Add vehicle` button at the bottom of the window to add it in, and see it displayed on the tech tree.

This window can be exited at any time, and will contain any previously filled data later, as long as website stays loaded. If you wish to exit the tool, make sure to save the vehicle first, and add remaining data later using the edit option.

### Editing vehicles

To edit the vehicle click on the `Edit vehicle` at the menu. This will bring up window that is virtually identical to the one that is used to add vehicles, exept at the top it has option to select the vehicle to edit. After selecting the vehicle, all it's data will be filled up, and can be edited at will. Remember that You need to save any changes made using the button at the bottom, similarry to adding the vehicle. If You will select another vehicle to edit before saving the changes, they will be lost.

### Removing vehicles

To delete any vehicle click on the `Delete vehicle` at the menu. Here, you can select any vehicle from the drop-down list, and then click `Delete vehicle` button in order to remove it, and all it's data.

You can also use the `CLEAR TECH TREE` button to remove title, description, and all of the vehicles at once. Be cautious, as this permamently deletes everything you put in the tool, and clears it from browser history, so make sure to back up your work first. See: [Data backup](#data-backup).

### Vehicle ordering

All vehicles are placed in a specific branch and rank. Vehicles in the same branch and rank are ordered by the BR value. If that is equal, then they are ordered by the order in which they were added to the tech tree.

If vehicles are foldered, the same rules apply. In the following example, `Vehicle D` which is placed after the folder is considered to be placed after `Vehicle C` (the last vehicle of the folder) and not the `Vehicle A` (the "root" of the folder):

- `Vehicle A [BR 1.0]`
  - `Vehicle B [BR 2.0]`
  - `Vehicle C [BR 3.0]`
- `Vehicle D [BR 4.0]`

In order to overwrite the default ordering, `Follow` value of the vehicle can be used. If You were to give `Vehicle X [BR 2.0]` follow option of `Vehicle Y [BR 3.0]` the resulting ordering would look like that:

- `Vehicle Y [BR 3.0]`
- `Vehicle X [BR 2.0]`
- `Vehicle Z [BR 4.0]`

When applying custom ordering with a folder, keep in mind that **vehicle placed after the folder should follow the last vehicle of the folder, not the "root" of the folder**.

Example: If You want to have `Vehicle γ` foldered with `Vehicle α`, and then `Vehicle β` following after the folder, it is enough to give `Vehicle β` follow option of `Vehicle γ`. That way, `Vehicle γ` will be naturally placed after the `Vehicle α` due to it's higher BR, and `Vehicle β` will be placed after `Vehicle γ`, so after the folder.

- `Vehicle α [BR 2.0]`
  - `Vehicle γ [BR 4.0]`
- `Vehicle β [BR 3.0]`

In order to remove custom ordering, you can either edit each individual vehicle, or for convinience, visit the `Vehicle ordering` at the menu. Here, you can see, and remove every custom ordering included in the tech tree. This tab will also ligh up with warning if You accidentally create conficting follows, such as infinite loop of two vehicles following each other, or multiple vehicles following one vehicle.

### Data backup

To download or upload your data backup click on the `Backup` at the menu. To download the backup file, simply click the `Download Tech Tree Backup` button. In order to load that backup, first, choose the file, and then click the `Load the backup` button.

### Exporting the tech tree

To download ready version of your project click on the `Export tree` at the menu. This will download standalone HTML file containing your entire tech tree. You can view it simply by opening it in your browser. Then, you can upload it to the internet for other people to see. [Neocities](https://neocities.org/) is a great place where you can host your tech tree for free.

## Good practices

- BACK UP YOUR WORK. See: [Data backup](#data-backup).
- Make sure that all the images used are uploaded to [Imgur](https://imgur.com/), or some other "permament" image hosting site to prevent them from dissapearing later on. It would be quite sad to find Your work later down the line, only to realize that half the images are gone missing.
- Use small resolution image for the thumbnail - loading 2000 x 2000 image might take a while, not everyone has quick connection. If you have high-resolution image that you want to use as a thumbnail, you can easily downscale it using free software, eg. [Paint.NET](https://www.getpaint.net/).
- In the description include links to the sources that you used while researching about your vehicle.

## Contributing to the tool

I welcome anyone who wishes to help with improving the tool, especially fixing my ugly CSS work.
