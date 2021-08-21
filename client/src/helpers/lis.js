// DEFINED ALIASES FOR SOME COMMON LONG NAMED FUNCTIONS
export const  LIS = {
        id: function(id) {
            return document.getElementById(id);
        },
        remove: function(id) {
            document.getElementById(id).parentNode.removeChild(document.getElementById(id));
        },
    };