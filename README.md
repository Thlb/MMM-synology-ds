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

| Option                       | Description
| ---------------------------- | -----------
| `host`                       | Synology Hostname/IP.  <br><br>**Required**<br>**Possible values:** `localhost`, `url` or a IP<br>**Default value:** `null`
| `port`                       | Synology port.  <br><br><br>**Default value:** ` 5000 ` (Default Synology port)
| `login`                      | Synology account.  <br><br>**Required**<br>**Default value:** `null`
| `passwd`                     | Account password.  <br><br>**Required**<br>**Default value:** `null`
| `refreshInterval`            | The refresh interval (in seconds).<br><br>**Default value:** `10`
| `maxItems`                   | Maxium number displayed tasks<br><br>**Possible values:** `numeric`<br>**Default value:** `5`
| `compactMode`                | The size of module is reduced. Number of caracters of the task name is limited by `compactMaxLen`<br>**Recommended for:** `top_left`, `top_right`, ` bottom_left`, ` bottom_right`, ` bottom_center`, `middle_center`<br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `compactMaxLen`              | Maximum number of caracters of the task name<br><br>**Possible values:** `numeric`<br>**Default value:** `30`
| `textSize`                   | <br><br>**Possible values:** `xsmall`, `small`, `medium`, `large`, `xlarge`<br>**Default value:** `xsmall`
| `iconSize`                   | Size of FontAwesome icons<br><br>**Possible values:** `xsmall`, `small`, `medium`, `large`, `xlarge`<br>**Default value:** `small`
| `msgEmptyList`	           | Display message when no tasks on Download Station<br><br>**Possible values:** Any string you want!<br>**Default value:** `No task`



Additional settings are available to :

- Display / hide columns
- Display / hide tasks (by status)

## Additional configuration : Display / hide columns

The <code>displayColumns</code> property contains the list of each column you can display/hide
| Option                       | Description
| ---------------------------- | -----------
| `id`                         | Display task ID (used for debug)<br><br>**Possible values:** `true` or `false`<br>**Default value:** `false`
| `status_icon`                | Display task status (FontAwesome icon)<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `status`                     | Display task status (text)<br><br>**Possible values:** `true` or `false`<br>**Default value:** `false`
| `title`                      | Display task title<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `size`                       | Display size of download task<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `percent_completed`          | Display percentage download completed<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `download_icon`              | Display download speed icon<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `speed_download`             | Display download speed value<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `upload_icon`                | Display upload speed icon<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `speed_upload`               | Display upload speed value<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`


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

| Option                       | Description
| ---------------------------- | -----------
| `finished`                   | Finished task (download completed, but not seeding)<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `downloading`                | Download in progress Task<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `waiting`                    | Waiting task (Download will start shortly)<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `hash_checking`              | Checking current task integrity<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `paused`                     | Paused task<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `seeding`                    | Download completed, sharing.<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `error`                      | Error task<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`


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
