window.modalComponent = Vue.extend({
    template: `
        <div>Laravel com Vue</div> 
        <slot name="slot1">2 + 2 = 4</slot>
        <div>Laravel com Vue</div>
        <slot name="slot2">2 + 2 = 4</slot>
        `,
    data() {
        return {
        };
    }
});