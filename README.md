# Module: MMM-synology-ds
This [MagicMirror](https://github.com/MichMich/MagicMirror) module, display Synology Download Station tasks.

None compacted mode : <code>bottom_center</code>

![Synology DS visualisation 1](https://github.com/Thlb/MMM-synology-ds/blob/gh-pages/.github/screenshot-01.png?raw=true)

Compacted mode : <code>bottom_left</code>

![Synology DS visualisation 2](https://github.com/Thlb/MMM-synology-ds/blob/gh-pages/.github/screenshot-02.png?raw=true)

## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
- [synology-api](https://www.npmjs.com/package/synology-api)

## Installation

Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/Thlb/MMM-synology-ds
```

Navigate to the new `MMM-synology-ds` folder and install the node dependencies.
```
npm install
```

Configure the module in your `config.js` file.


## Using the module

To use this module, add it to the modules array in the `config/config.js` file. 


```javascript
modules: [
  {
    module: 'MMM-synology-ds',
    position: 'left_bottom',
    header: 'Download Station',
    config: {
      host: 'my.synology-ds.com',
      port: '5000', // Server port (not required if default port (5000) is used)
      login: 'account',
      passwd: 'password',
      refreshInterval: 10, // in seconds
      compactMode: true, // recommanded in left or right position.
    }
  },
]
```

## Configuration options

The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>

		<tr>
			<td><code>host</code></td>
			<td>Synology Hostname/IP.  
				<br>
				<br>
				<b>Required</b>
				<br>
				<b>Possible values:</b> <code>localhost</code>, <code>url</code> or a IP
				<br>
				<b>Default value:</b> <code>null</code>
			</td>
		</tr>
		
		<tr>
			<td><code>port</code></td>
			<td>Synology port.  
				<br>
				<br>
				<br>
				<b>Default value:</b> <code> 5000 </code> (Default Synology port)
			</td>
		</tr>
		<tr>
			<td><code>login</code></td>
			<td>Synology account.  
				<br>
				<br>
				<b>Required</b>
				<br>
				<b>Default value:</b> <code>null</code>
			</td>
		</tr>

		<tr>
			<td><code>passwd</code></td>
			<td>Account password.  
				<br>
				<br>
				<b>Required</b>
				<br>
				<b>Default value:</b> <code>null</code>
			</td>
		</tr>
   		<tr>
			<td><code>refreshInterval</code></td>
			<td>The refresh interval (in seconds).
				<br>
				<br>
				<b>Default value:</b> <code>10</code>
			</td>
		</tr>
		<tr>
			<td><code>maxItems</code></td>
			<td>Maxium number displayed tasks
				<br>
				<br>
				<b>Possible values:</b> <code>numeric</code>
				<br>
				<b>Default value:</b> <code>5</code>
			</td>
		</tr>
    	<tr>
			<td><code>compactMode</code></td>
			<td>The size of module is reduced. Number of caracters of the task name is limited by <code>compactMaxLen</code>
				<br>
				<b>Recommended for:</b> <code>top_left</code>, <code>top_right</code>, <code> bottom_left</code>, <code> bottom_right</code>, <code> bottom_center</code>, <code>middle_center</code>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>compactMaxLen</code></td>
			<td>Maximum number of caracters of the task name
				<br>
				<br>
				<b>Possible values:</b> <code>numeric</code>
				<br>
				<b>Default value:</b> <code>30</code>
			</td>
		</tr>
		<tr>
			<td><code>textSize</code></td>
			<td>
				<br>
				<br>
				<b>Possible values:</b> <code>xsmall</code>, <code>small</code>, <code>medium</code>, <code>large</code>, <code>xlarge</code>
				<br>
				<b>Default value:</b> <code>xsmall</code>
			</td>
		</tr>
		<tr>
			<td><code>iconSize</code></td>
			<td>Size of FontAwesome icons
				<br>
				<br>
				<b>Possible values:</b> <code>xsmall</code>, <code>small</code>, <code>medium</code>, <code>large</code>, <code>xlarge</code>
				<br>
				<b>Default value:</b> <code>small</code>
			</td>
		</tr>
		
		<tr>
			<td><code>msgEmptyList</code></td>
			<td>Display message when no tasks on Download Station
				<br>
				<br>
				<b>Possible values:</b> Any string you want!
				<br>
				<b>Default value:</b> <code>No task</code>
			</td>
		</tr>

	</tbody>
</table>


Additional settings are available to :

- Display / hide columns
- Display / hide tasks (by status)

## Additional configuration : Display / hide columns

The <code>displayColumns</code> property contains the list of each column you can display/hide

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>

    	<tr>
			<td><code>id</code></td>
			<td>Display task ID (used for debug)
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>false</code>
			</td>
		</tr>
		<tr>
			<td><code>status_icon</code></td>
			<td>Display task status (FontAwesome icon)
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>status</code></td>
			<td>Display task status (text)
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>false</code>
			</td>
		</tr>
		<tr>
			<td><code>title</code></td>
			<td>Display task title
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>size</code></td>
			<td>Display size of download task
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>percent_completed</code></td>
			<td>Display percentage download completed
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>download_icon</code></td>
			<td>Display download speed icon
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>speed_download</code></td>
			<td>Display download speed value
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>upload_icon</code></td>
			<td>Display upload speed icon
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>speed_upload</code></td>
			<td>Display upload speed value
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
	</tbody>
</table>

### Example :

```javascript
modules: [
  {
    module: 'MMM-synology-ds',
    position: 'left_bottom',
    header: 'Download Station',
    config: {
      host: 'my.synology-ds.com',
      port: '5000', // Server port (not required if default port (5000) is used)
      login: 'account',
      passwd: 'password',
      refreshInterval: 10, // in seconds
      compactMode: true, // recommanded in left or right position.
    
      displayColumns: {
          id: false, 
          status_icon: true, 
          statuts: false, 
          title: true, 
          size: true, 
          percent_completed: true, 
          download_icon: true, 
          speed_download: true, 
          upload_icon: true, 
          speed_upload: true
        }

   },
]
```

## Additional configuration : Display / hide tasks

The <code>displayTasks</code> property contains the list of tasks status you can display/hide. 

By default, all status are displayed. But, most important tasks will be displayed first : 

Priority :
 
	1. Error
	2. Finished
	3. Downloading
	4. Hash checking
	5. Waiting
	6. Paused
	7. Seeding (Task discarded if no upload in progress)

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>

    	<tr>
			<td><code>finished</code></td>
			<td>Finished task (download completed, but not seeding)
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>downloading</code></td>
			<td>Download in progress Task
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>waiting</code></td>
			<td>Waiting task (Download will start shortly)
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>hash_checking</code></td>
			<td>Checking current task integrity
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>paused</code></td>
			<td>Paused task
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>seeding</code></td>
			<td>Download completed, sharing.				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>error</code></td>
			<td>Error task
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
		
	</tbody>
</table>

### Example :

```javascript
modules: [
  {
    module: 'MMM-synology-ds',
    position: 'left_bottom',
    header: 'Download Station',
    config: {
      host: 'my.synology-ds.com',
      port: '5000', // Server port (not required if default port (5000) is used)
      login: 'account',
      passwd: 'password',
      refreshInterval: 10, // in seconds
      compactMode: true, // recommanded in left or right position.
    
      displayTasks: {
          finished: true, 
          downloading: true, 
          waiting: true, 
          hash_checking: true, 
          paused: true, 
          seeding: true,
          error: true
      }
   },
]
```