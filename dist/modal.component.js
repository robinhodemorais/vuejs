"use strict";

window.modalComponent = Vue.extend({
    template: "\n        <div>Laravel com Vue</div> \n        <slot name=\"slot1\">2 + 2 = 4</slot>\n        <div>Laravel com Vue</div>\n        <slot name=\"slot2\">2 + 2 = 4</slot>\n        ",
    data: function data() {
        return {};
    }
});