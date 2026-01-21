# time line todo list and progress
Created Monday 17 November 2025

![](./time_line_files/pasted_image.png)

Use Expereince

* ☐ Page presentation
	* ☐ A master time line (initial context) is loaded with immediate children at a predetermined timescale
		* ☐ drill down url like:  page.com/time_line/event_name?start=01011981&end=12311981&tags=bob_ross
	* ☐ main element has
		* ☐ parental bread crumb 
			* ☐ max elements?
	* ☐ each child has
		* ☐ name
		* ☐ start/end
		* ☐ details
			* ☐ on click major players are updated in the side bar
		* ☐ see all
			* ☐ on click item gets full page
		* ☐ focus button
			* ☐ on click
				* ☐ this becomes the top time line item
				* ☐ url is changed so this state can be linked
	* ☐ bottom of page
		* ☐ list of actions taken
			* ☐ click an action to rewind to that state



Visual
------

* ☐ how to render page boxes
	* ☐ create stacked horizontal lanes
	* ☐ give each box a z axis value
	* ☐ line from the box to the time line
* ☐ how to scale visually?
	* ☐ infinte scroll scale with unloaded elements off screen
	* ☐ single page scale with time line selection
		* ☐ click select time, select ,start and end time, scale all element horizontally
		* ☐ time line scale slider
			* ☐ ![](./time_line_files/pasted_image008.png)
	* ☐ relevent players side bar
	* ☐ hilight things based on player tagging



Back end
--------

#### database objects

* ☐ time_line_element
	* ☐ data
		* ☐ Start date
		* ☐ End date
		* ☐ Duration (computed)
		* ☐ Name
		* ☐ icon
		* ☐ description short
		* ☐ description body (html)
		* ☐ description url
* ☐ element_type
	* ☐ concept: 
		* ☐ a noun
	* ☐ data
		* ☐ name (event, person, place, thing )
		* ☐ description
* ☐ element_association
	* ☐ data
		* ☐ assoc_type_id
		* ☐ start (if blank start of parent is assumed)
		* ☐ end (if blank end of parent is assumed)
		* ☐ element_id
		* ☐ parent id
		* ☐ contested (-1 -  +5)
* ☐ association type
	* ☐ concept
		* ☐ a description
	* ☐ data
		* ☐ description
* ☐ tags
	* ☐ concept
		* ☐ arbitraty strings to attach to players
		* ☐ groups associated players
	* ☐ data
		* ☐ name
		* ☐ description
* ☐ element tag
	* ☐ data
		* ☐ play id
		* ☐ tag id
* ☐ tag combination (maybe second version))
	* ☐ concept
		* ☐ any 2 tags appearing together
	* ☐ data
		* ☐ tag 1
		* ☐ tag 2
		* ☐ description


How to format time
------------------


Requests to the backend
-----------------------

get new focus element
Send
parent id
time start
time end
return 
parent details
child details

time scale change
same as get new focus element
		

How to form and place the time line boxes and lines
---------------------------------------------------


* ☐ time line element start / end
* ☐ size of display area
* ☐ calcualte pixels / unit time
* ☐ calcualte the width of each child
	* ☐ if size falls below threashold remove from list?
* ☐ use height to caluclate the numer of lanes possible?
* ☐ **child collision logic**
	* ☐ render child 1 in lane 1, easy
		* ▷ keep track of the X/Y of the corners of child 1
		* ☐ if next child start before previous child end
			* ☐ render on next lane down
		* ☐ subsequent child render the same way but starting at lane 1
	* ▷ keep lanes in array with open/used pixels recorded


Code Structure
--------------


* ☐ Controllers
	* ☐ timeline
	* ☐ user
* ☐ View
	* ☐ partials
		* ☑ header
		* ☑ footer
		* ▷ element_cell
	* ☐ index
* ☐ Model
	* ☐ timeline
	* ☐ user
* ☐ Core
	* ☐ db.js



markers
-------

* ☐ if new marker overlaps existing one
	* ☐ join them
	* ☐ increment displayed number
	* ☐ keep child IDs in data
* ▷ list of marker locations array?


Collapsing  small children
--------------------------

* ☑ set min size to dispaly text
* ☐ on click zoom timeline to get smallest child into visible range


Zooming
-------

* ☑ Actually zoom view
* ☐ load zoomed view in modal


Wikipedia API integration
-------------------------

* ☑ request limit?
	* ☑ 5000 / hr with key
	* ☑ 500 / hr no key
* ☐ loginn JasonWMcC PW: hbox excite
* ☑ data is not structured
	* ☑ only included name, some meta data and huge HTML blob
* ☐ add wikipedia api ID to the db
	* ☐ if Id is prersent... fill details screen with the wikipedia output
	* ☐ cache output, 
	* ☐ if more than a day old, re-fetch


Make html-line realtive rather than absolute
--------------------------------------------

* ☐ did it
* ☑ sources:\
	* ☑ <https://cuth.github.io/html-lines/>
	* ☑ <https://github.com/cuth/html-lines/blob/master/html-lines.js>
* ☐ submit fork
* ☐ test code:
	* ☐ ``var lineSettings = {``

``    name: 'match-line',``
``    state: 'new',``
``    stroke: 3``
``};``
	
	
``pan1_anchor = LINES.createAnchor({``
``    el: document.getElementById('TL_ELEMENT_4'),``
``    xOrigin: 'left',``
``    xOffset: 1,``
``    yOrigin: 'top``'
``});``
	
	
	
``pan2_anchor = LINES.createAnchor({``
``    el: document.getElementById('TL_ELEMENT_7'),``
``    xOrigin: 'left',``
``    xOffset: 1,``
``    yOrigin: 'top``'
``});``
	
``LINES.createLine(pan1_anchor, pan2_anchor, lineSettings, document.getElementById('TL_ZONE_INNER'));``
	


Next steps
----------


* ☑ min child render size
* ☑ place un renderd children as flags only
* ☑ flag with number if too many too close together
	* ☒ on click of flag zoom time line to render children in the group
	* ☑ swicth to showing  crushed children with crush styling
* ☑ custom time line zoom
* ☑ basic time line element insert screen (simple form)
* ☑ modal
	* ☑ just expand the time line element
	* ☒ figure out the modal library to use
		* ☐ maye make it myself or use soemthing simple
	* ☒ launch modal
	* ☐ fill modal with data
	* ☐ fill modal with partial time line
		* ☐ time line modal should be visually linked to time line element
* ☑ allow off-screen scrolling zoom mode
	* ☑ mode to show-all with the off-screen
		* ☑ scales to show the smallest element
* ☑ fix issue with max canvas width
* ▷ Limit to entered start and end dates
	* ☐ what did I mean here?
		* ☐ only render this aprt of the time line as means of zooming in really far
	* ☒ create issue whe ntryingto scroll to evens out of the zone
	* ▷ instead create multiple canvas elements side by side
* ▷ **new element types**
	* ☐ create elemnt type with no end date
	* ☐ abutting era dividers
* ▷ link same elements with seperate associations
	* ☑ associated elements should link visually
		* ☐ same lane?
		* ☐ draw a line between
			* ☐ line system located but is not relative to scrolling elements (absolute)
* ☐ handle **deep zoom** with multiple canvas elements
* ☐ **add days zoom level**
	* ☐ will reuire more / different computation
* ☐ add api connection for wikipedia
* ☐ fill body with **pull from Wikipedia**
* ☐ **add location** to assocaition
* ☐ allow for **date uncertainty** (missing day/month)
* ☐ add **focus** button to make eleemnt the time line
* ☐ add **bread crumb** to rewind focus
* ☐ find nodejs hosting!
	* ☐ or fake the back end


looks ya react Js

BUG
---

* ☐ from year view the detail zoom is more than 100% of the inner area
* ☐ CHOME only, final year cut off
* ☐ handle tl_width=Infinitypx case using min width math?
* ☐ Items starting close together overlapping, preventing zoom-in
	* ☐ might need to enforce min width for spacing
	* ☐ could pad starting edge in collision detection
* ☐ fix dates off by a month


Best practice alignment / Hardening
-----------------------------------

* ☐ 1. Add input validation (express-validator or joi)
* ☐ 2. Implement proper error handling with try-catch and HTTP error responses
	* ☐ centralize and tie to db log
* ☐ 3. Add security middleware (helmet, cors, rate limiting)
	* ☑ rate limiting seems reasonable to not bloat the backnd
* ☐ 4. Replace global variables with dependency injection
	* ☐ probably over kill
* ☐ 5. Add a logging framework (winston or pino?)
	* ☐ could do this in house easily
	* ☐ enable undo of edits
* ☐ 6. Write tests (at minimum, unit tests for models/controllers)
	* ☐ will reuire a testing engine?
* ☐ 7. Create documentation (README, setup guide)
* ☐ 8. Add linting (eslint) and formatting (prettier)
* ☐ 9. move to non-sequential IDS 
	* ☑ I know how to do this in php but not in nodejs











