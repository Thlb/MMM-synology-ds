/* Magic Mirror
 * Node Helper: MMM-synology-ds
 *
 * npm : https://www.npmjs.com/package/synology-api
 * MIT Licensed.
 */
 
var NodeHelper = require("node_helper");
var Syno = require('synology-api');
var util = require('util');


module.exports = NodeHelper.create({
    Syno: null,
    connected: false,
    tasks: null,
    consolePrefix: 'MMM-synology-ds : ',
    
    start: function function_name () {
        "use strict";
        var self = this;
        
    },    

    socketNotificationReceived: function(notification, payload){
        "use strict";
        var self = this;

        switch(notification){
            // Retrieving config from MMM-synology-ds.js
            case 'SYNO-INITIALIZE':
                this.config = payload;
                
                console.log(self.consolePrefix + 'Retrieving settings');
                setInterval(function() {
                    self.getTasks();
                }, self.config.refreshInterval * 1000);
            break;
            
            // Connexion to Synology
            case 'SYNO-LOGIN':
                self.logIn();
            break;    
        }
        
    },
    
    logIn: function() {
        "use strict";
        var self = this;
        
        // Host
        console.log(self.consolePrefix + 'Connecting to Synology : ' + self.config.host + ':' + self.config.port);
        console.log(self.consolePrefix + 'Protocol: ' + self.config.protocol);
        console.log(self.consolePrefix + 'User: ' + self.config.user);
        console.log(self.consolePrefix + 'Password: *****');
        
        self.Syno = new Syno(self.config.protocol, self.config.host, self.config.port, self.config.user, self.config.passwd, false);
    
        // Login to Synology
        self.Syno.Auth.Connect().then(function(value) {
            console.log(self.consolePrefix + "Connected succesfully!");
            self.connected = true;
            
        }, function(reason) {
            self.connected = false;
            console.log(self.consolePrefix + "Error : " + reason.Message);
            self.sendSocketNotification('SYNO-ERROR', reason.Message);
        });
    },

    getTasks: function() {
        "use strict";
        var self = this;

        // If successfully connected
        if(self.connected){
            // Get download task from synology
            self.Syno.DS.getTasks().then(function(value) {
                self.tasks = value.Tasks;
                
                // No task detected
                if(self.tasks.length === 0){
                    self.sendSocketNotification('SYNO-DOWNLOAD-LIST-EMPTY', null);
                }
                else{
                    // Filter tasks + add additionnal data
                    self.tasks = self.filterTasks();
                    
                    
                    // Sort the array of Tasks    
                    self.sortTasks();
                    
                    // Reduce array with config max item
                    self.tasks.splice(self.config.maxItems);
                    
                    // Sending tasks
                    self.sendSocketNotification('SYNO-DOWNLOAD-LIST', self.tasks);
                }
    
            }, function(reason) {
                self.connected = false;
                console.log(self.consolePrefix + "Error : " + reason.Message);
                self.sendSocketNotification('SYNO-ERROR', reason.Message);
            });
        }
        else{
            console.log(self.consolePrefix + 'No connexion to synology, trying to reconnect.');
            self.logIn();
        }
    },
    
    filterTasks: function(){
        "use strict";
        var self = this;
        
        var arrTasks = [];
        var T;
        
        // Check all the tasks
        for(var i in self.tasks){
            T = self.tasks[i];
            
            // Filtering the tasks we don't want to display
            switch(true){
                case (T.status === 'finished' && self.config.displayTasks.finished):
                case (T.status === 'downloading' && self.config.displayTasks.downloading):
                case (T.status === 'waiting' && self.config.displayTasks.waiting):
                case (T.status === 'hash_checking' && self.config.displayTasks.hash_checking):
                case (T.status === 'paused' && self.config.displayTasks.paused):
                case (T.status === 'seeding' && self.config.displayTasks.seeding && T.additional.transfer.speed_upload >0):    
                case (T.status === 'error' && self.config.displayTasks.error):
                    // Add custom data : human readable size, percentage completed, ...
                    T = self.additionalData(T);
                    
                    // Push task in temporary array
                    arrTasks.push(T);
                break;    
            }
        }                        
        return arrTasks;
        
        
    },

    sortTasks: function(){
        "use strict";
        var self = this;
        
        // Step 1 : Sort by create time
        self.tasks.sort(function (a, b) {
            var compareA = a.additional.detail.completed_time;
            var compareB = b.additional.detail.completed_time;

            if (compareA === 0){ compareA = a.additional.detail.create_time; }
            if (compareB === 0){ compareB = b.additional.detail.create_time; }

            if (!compareA) { compareA = 99999999999999999; }
            if (!compareB) { compareB = 99999999999999999; }
              
            if (compareA > compareB) { return 1; }
            if (compareA < compareB) { return -1; }
            
            return 0;
        });
        
        self.tasks.reverse();
        
        // Step 2 : Sort by status (downloading task first)
        self.tasks.sort(function (a, b) {
            var compareA = a.status;
            var compareB = b.status;
            
            if (compareA > compareB) { return 1; }
            if (compareA < compareB) { return -1; }
            
            return 0;
        });
    },
    
    additionalData: function(T){
        "use strict";
        var self = this;
        
        // Converting octet to human readable units
        // Download Speed
        T.additional.transfer.speed_download_conv = '';
        if(T.additional.transfer.speed_download > 0){
            T.additional.transfer.speed_download_conv = (self.octetConv(T.additional.transfer.speed_download, true) + '/s').replace("o/s", "b/s");
            
        }

        // Converting octet to human readable units
        // Upload Speed
        T.additional.transfer.speed_upload_conv = '';
        if(T.additional.transfer.speed_upload > 0){
            T.additional.transfer.speed_upload_conv = (self.octetConv(T.additional.transfer.speed_upload, true) + '/s').replace("o/s", "b/s");
        }
        
        // Converting octet to human readable units
        // Size
        T.size_conv = '';
        if(T.size > 0){
            T.size_conv = self.octetConv(T.size, true);
        }
        
        // Converting octet to human readable units
        // Size downloaded
        T.additional.transfer.size_downloaded_conv = '';
        if(T.additional.transfer.size_downloaded > 0){
            T.additional.transfer.size_downloaded_conv = self.octetConv(T.additional.transfer.size_downloaded, true);
        }
        
        //item.additional.transfer.size_downloaded
        // Percentage downloaded
        if(T.additional.transfer.size_downloaded){
            T.additional.transfer.percent_completed = T.additional.transfer.size_downloaded * 100 / T.size;
            if(!Number.isInteger(T.additional.transfer.percent_completed)){
                T.additional.transfer.percent_completed = parseFloat(T.additional.transfer.percent_completed).toFixed(1);
            }
        }
        else{
            T.additional.transfer.percent_completed = 0;    
        }
        T.additional.transfer.percent_completed += '%';
        
        
        return T;
        
    },
    
    octetConv: function(value, units) {
        "use strict";
        var unitStr;
        
        switch(true){
            // Ko
            case (value < 1048576):
                value = parseFloat(value / 1024).toFixed(1);
                unitStr = 'Ko';
            break;
            // Mo
            case (value < 1073741824):
                value = parseFloat(value / 1048576).toFixed(1);
                unitStr = 'Mo';
            break;
            // Go
            case (value < 1099511627776):
                value = parseFloat(value / 1073741824).toFixed(1);
                unitStr = 'Go';
            break;
            // To
            case (value < 1125899906842624):
                value = parseFloat(value / 1099511627776).toFixed(1) + ' To';
                unitStr = 'To';
            break;
            default:
                value = 0;    
        }
        
        return (units) ? (value + ' ' + unitStr) : value;
    }
    
 });

/*
Task object structure
{
    "additional": {
        "detail": {
            "completed_time": 1467021216,
            "connected_leechers": 0,
            "connected_peers": 0,
            "connected_seeders": 0,
            "create_time": 1467021085,
            "destination": "path/to/folder",
            "seedelapsed": 0,
            "started_time": 1467021089,
            "total_peers": 0,
            "total_pieces": 0,
        },
        "transfer": {
            "downloaded_pieces": 0,
            "size_downloaded": 1432079673,
            "size_uploaded": 0,
            "speed_download": 0,
            "speed_upload": 0
        }
    },
    "id": "dbid_881",
    "size": 1432079673,
    "status": "finished",
    "title": "Myfile.mkv",
    //--- Custom fields ---\\
}
*/
