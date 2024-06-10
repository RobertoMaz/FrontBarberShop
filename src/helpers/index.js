export const formatCurrency = price => 
    Number(price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })

