module.exports = {
    template: `
        <div :id="modal.id" class="modal">
            <div class="modal-content">
                <slot name="content"></slot>
            </div>
            <div class="modal-content">
                <slot name="footer"></slot>
            </div>
        </div>
    `,
    props: ['modal'],
    data() {
        return {
            modal: {
                id: ''
            }
        };
    }
};