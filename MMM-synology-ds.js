/* Magic Mirror
 * Module: MMM-synology-ds
 *
 * MIT Licensed.
 */

Module.register('MMM-synology-ds', {
    message: null,
    downloadList: null,

    defaults: {
        protocol: 'HTTP',
        host: null,
        port: null,
        user: null,
        passwd: null,
        refreshInterval: 10, // in seconds
        
        displayColumns: {
            id: false, 
            statuts_icon: true, 
            statuts: false, 
            title: true, 
            size: true, 
            percent_completed: true, 
            download_icon: true, 
            speed_download: true, 
            upload_icon: true, 
            speed_upload: true
        },
        
        displayTasks: {
            finished: true, 
            downloading: true, 
            waiting: true, 
            hash_checking: true, 
            paused: true, 
            seeding: true,
            error: true
        }, 
        
        maxItems: 5,
        compactMode: false,
        compactMaxLen: 30,
        showCompleted: false,
        textSize: 'xsmall',
        iconSize: 'small',

        msgEmptyList: 'No task'
    },

    getStyles: function() {
        "use strict";
        return ["font-awesome.css", "MMM-synology-ds.css"];
    },

    start: function() {
        "use strict";
        // Setting default config
        if(!this.config.port){
            this.config.port = (this.config.protocol === 'HTTP') ? 5000 : 5001;    
        }
        
        // Checking server configuration
        if(!this.config.host || !this.config.port || !this.config.user || !this.config.passwd) {
            this.message = 'No server configuration detected';
        }
        else{
            this.message = 'Loading...';

            // Sending configuration / Connection
            this.sendSocketNotification('SYNO-INITIALIZE', this.config);
        }
    },


    socketNotificationReceived: function(notification, data) {
        "use strict";
        this.message = null;
        this.downloadList = null;
        
        switch(notification) {
            case 'SYNO-ERROR':
                this.message = data;
                break;
            case 'SYNO-DOWNLOAD-LIST':
                this.downloadList = data;
                break;
            case 'SYNO-DOWNLOAD-LIST-EMPTY':
                this.message = this.config.msgEmptyList;
                break;
        } 
        
        this.updateDom();
        
    },


    // Override dom generator.
    getDom: function() {
        "use strict";
        var wrapper = document.createElement("div");
        var icon;
        var statusIconCell;
        
        // If message: no tasks to display (error)
        if(this.message){
            wrapper.className = 'align-right small';
            wrapper.innerHTML = this.message;
            return wrapper;
        }

        var table = document.createElement("table");
        if(this.config.compactMode){
            table.className = 'compact';    
        }
        
        for(var d in this.downloadList){
            var item = this.downloadList[d];
            
            // Row
            var row = document.createElement('tr');
            table.appendChild(row);
            
            // ID
            if(this.config.displayColumns.id){
                var idCell = document.createElement("td");
                idCell.className = "align-right " + this.config.textSize;
                idCell.innerHTML = item.id;
                row.appendChild(idCell);
            }
            
            if(!this.config.compactMode){
                // Status Icon
                if(this.config.displayColumns.statuts_icon){
                    statusIconCell = document.createElement("td");
                    statusIconCell.className = this.config.iconSize;
                    row.appendChild(statusIconCell);

                    icon = document.createElement("span");
                    icon.className = "thin bright fa fa-" + this.getStatusIcon(item.status); // todo
                    statusIconCell.appendChild(icon);
                }
            }
            // Status (text)
            if(this.config.displayColumns.statuts){
                var statutsCell = document.createElement("td");
                statutsCell.className = "align-right " + this.config.textSize;
                statutsCell.innerHTML = item.status;
                row.appendChild(statutsCell);
            }
            
            // Title
            if(this.config.displayColumns.title){
                var titleCell = document.createElement("td");
                titleCell.className = "align-left " + this.config.textSize;
                if(this.config.compactMode && item.title.length > this.config.compactMaxLen){
                    titleCell.innerHTML = item.title.substring(0, this.config.compactMaxLen) + '...';
                }
                else{
                    titleCell.innerHTML = item.title;
                }
                row.appendChild(titleCell);
            }
            
            // Size
            if(this.config.displayColumns.size){
                var sizeCell = document.createElement("td");
                sizeCell.className = "align-right " + this.config.textSize;
                sizeCell.innerHTML = item.additional.transfer.size_downloaded_conv;
                row.appendChild(sizeCell);
                
                sizeCell = document.createElement("td");
                sizeCell.className = "align-right " + this.config.textSize;
                sizeCell.innerHTML = item.size_conv;
                row.appendChild(sizeCell);
            }
            
            // Percentage download
            if(this.config.displayColumns.percent_completed){
                var percentCell = document.createElement("td");
                percentCell.className = "align-right bright " + this.config.textSize;
                percentCell.innerHTML = item.additional.transfer.percent_completed;
                row.appendChild(percentCell);
            }
            
            if(!this.config.compactMode || (this.config.compactMode && item.additional.transfer.speed_download > 0)){

                // Download icon
                if(this.config.displayColumns.download_icon){
                    var downloadIconCell = document.createElement("td");
                    downloadIconCell.className = 'align-right ' + this.config.iconSize;
                    row.appendChild(downloadIconCell);
                    
                    if(item.additional.transfer.speed_download > 0){
                        icon = document.createElement("span");
                        icon.className = "bright fa fa-arrow-circle-down";
                        downloadIconCell.appendChild(icon);
                    }
                }
                
                // Speed download
                if(this.config.displayColumns.speed_download){
                    var speedDownloadCell = document.createElement("td");
                    speedDownloadCell.className = "align-right bright " + this.config.textSize;
                    speedDownloadCell.innerHTML = item.additional.transfer.speed_download_conv;
                    row.appendChild(speedDownloadCell);
                }
            }
            
            if(!this.config.compactMode || (this.config.compactMode && item.additional.transfer.speed_upload > 0 && item.additional.transfer.speed_download === 0)){
            
                // Upload icon
                if(this.config.displayColumns.upload_icon){
                    var uploadIconCell = document.createElement("td");
                    uploadIconCell.className = 'align-right ' + this.config.iconSize;
                    row.appendChild(uploadIconCell);

                    if(item.additional.transfer.speed_upload > 0){
                        icon = document.createElement("span");
                        icon.className = "bright fa fa-arrow-circle-up";
                        uploadIconCell.appendChild(icon);
                    }
                
                }
                
                // Upload upload
                if(this.config.displayColumns.speed_upload){
                    var speedUploadCell = document.createElement("td");
                    speedUploadCell.className = "align-right bright " + this.config.textSize;
                    speedUploadCell.innerHTML = item.additional.transfer.speed_upload_conv;
                    row.appendChild(speedUploadCell);
                }
            }
            
            if(this.config.compactMode && item.additional.transfer.speed_download === 0 && item.additional.transfer.speed_upload === 0){
            // Status Icon
                if(this.config.displayColumns.statuts_icon){
                    statusIconCell = document.createElement("td");
                    statusIconCell.className = 'align-right ' + this.config.iconSize;
                    row.appendChild(statusIconCell);

                    icon = document.createElement("span");
                    icon.className = "thin bright fa fa-" + this.getStatusIcon(item.status); // todo
                    statusIconCell.appendChild(icon);
                }
            }    
        }
        return table;

    },
    
    getStatusIcon: function(status) {
        "use strict";
        
        switch(status){
            case 'finished':
                return 'check-circle';
            case 'downloading':
                return 'arrow-circle-down';
            case 'waiting':
                return 'clock-o';
            case 'hash_checking':
                return 'circle-o-notch';
            case 'paused': 
                return 'pause-circle';
            case 'seeding':
                return 'arrow-circle-up';
            case 'error':
                return 'exclamation-circle';
            default:
                return 'question-circle ';
        }
    }
});
