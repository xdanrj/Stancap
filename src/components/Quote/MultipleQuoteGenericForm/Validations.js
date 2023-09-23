export default class MultipleQuoteValidations {
    constructor(eventTarget) {
        this.eventTarget = eventTarget
    }

    isEmpty(quoteInputsValues) {
        if (quoteInputsValues && (quoteInputsValues.quote && quoteInputsValues.author)) {
            return false
        } else {
            return true
        }
    }

    showEventTarget() {
        return this.eventTarget.value
    }
}