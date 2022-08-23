const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined,{currency:"NGN",style:"currency"})

export const formatCurrency = (number:number) => {
    return CURRENCY_FORMATTER.format(number)
 
}
