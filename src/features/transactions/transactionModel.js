import { stringToDate } from '../utils/dateUtils';

export const TransactionProperties = {
    CREATION_DATE: "creation_date",
    DATE: "date",
    TYPE: "type",
    CATEGORY: "category",
    AMOUNT: "amount",
    CURRENCY: "currency",
    CONSTANT: "constant",
    PERIOD: "period",
    COMMENT: "comment",
    UNEXPECTED: "unexpected"
}

export class TransactionEntity {
    creation_date;
    date;
    type;
    category;
    amount;
    currency;
    constant;
    period;
    comment;
    unexpected;

    setBasedOnFormData(values, isCustomCategory) {
        this.amount = values.amount;
        this.comment = values.comment;
        this.constant = values.constant;
        this.date = stringToDate(values.date, "DD/MM/YYYY", "/").getTime();
        this.currency = values.currency;
        this.period = values.period;
        this.type = values.type;
        this.unexpected = values.unexpected;
        this.category = isCustomCategory ? values.otherCategory : values.category;
    }
}

export const getTransactionsByDateDesc = (transactions) => {
    return [...transactions].sort((a, b) => {
        return b.date - a.date;
    })
}