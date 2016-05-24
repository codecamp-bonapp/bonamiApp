import {Pipe} from 'angular2/core';

@Pipe({
    name: 'timeLeft'
})

export class TimeLeft {
    transform(value, args) {
        var diff = Math.floor((+(new Date(value)) - Date.now()) / 1000);
        var days = Math.floor(diff / 86400);
        diff %= 86400;
        var hours = Math.floor(diff / 3600);
        diff %= 3600;
        var minutes = Math.floor(diff / 60);

        var str = "";

        if (days > 0) {
            str += days + " ";

            if (days > 4 || days == 0) str += "dní";
            else if (days == 1) str += "den";
            else str += "dny";
        }

        str += " " + hours + " ";
        if (hours > 4 || hours == 0) str += "hodin";
        else if (hours == 1) str += "hodina";
        else str += "hodiny";

        if (days == 0) {
            str += " " + minutes + " ";
            if (minutes > 4 || minutes == 0) str += "hodin";
            else if (minutes == 1) str += "hodina";
            else str += "hodiny";
        }

        return str;
    }
}