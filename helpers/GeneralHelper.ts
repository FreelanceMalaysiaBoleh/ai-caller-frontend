export const secondsToString = (seconds: number) => {
    var numyears = Math.floor(seconds / 31536000);
    var numdays = Math.floor((seconds % 31536000) / 86400);
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;

    return (numyears > 0 ? numyears + " years " : "")
        + (numdays > 0 ? numdays + " days " : "")
        + (numhours > 0 ? numhours + " hours " : "")
        + (numminutes > 0 ? numminutes + " minutes " : "") 
        + (numseconds > 0 ? numseconds + " seconds": "");

}