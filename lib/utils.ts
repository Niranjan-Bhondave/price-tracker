export function extractPrice(...elements: any){
    for(const element of elements){
        const priceText = element.text().trim();
        if(priceText)return priceText.replace(/\D/g, ""); 
    }
}

export function extractCurrency(element: any){
    const currency = element.match(/(₹|€|\$)/);
    return currency ? currency[0] : "₹";
}