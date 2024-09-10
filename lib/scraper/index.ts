import * as cheerio from "cheerio"
import axios from "axios";
import { extractPrice } from "../utils";
import { extractCurrency } from "../utils";
export async function scrapeAmazonProduct(url:string){
    if(!url)return;
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (100000 * Math.random()) | 0;
    const options = {
        auth:{
            username: `${username}-session-${session_id}`,
            password: password
        },
        host: 'proxy.superproxy.io',
        port: port,
        rejectUnauthorized: false
    }

    try{
       const response = await axios.get(url, options); 
       const $ = cheerio.load(response.data);

       const title = $("#productTitle").text().trim();
               
        const currentPrice = extractPrice(
        $('.priceToPay span.a-price-whole'), 
        $('a.size.base.a-color-price'),
        $('.a-button-selected .a-color-base') );
        $('.a-price .a-text-price')

        const originalPrice = extractPrice(
            $('#priceBlock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            // $('#listPrice'),
            // $('#priceblock_dealprice'),
            // $('.a-size-base.a-color-price'),
        )

        const outofStock = $('#availability').text().trim().toLowerCase() === 'currently unavailable';
        const image=  $('#imgBlkFront').attr('data-a-dynamic-image')|| $('#landingImage').attr('data-a-dynamic-image')||'{}';
        
        const imageUrls = Object.keys(JSON.parse(image));
        const currency = extractCurrency($('.a-price-symbol').text().trim());

        const dicountRate = $('.savingsPercentage').text().replace(/[-%]/g,"");
        //construct data object

        const data = {
            url,
            currency: currency || "₹",
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice),
            originalPrice: Number(originalPrice),
            discountRate: Number(dicountRate),
            isOutofStock:outofStock,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice)
        }

        return data;
        
    }

    catch(error: any){
        throw new Error(`Failed to scrape product: ${error.message}`);
    }
}