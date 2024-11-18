// export const filters = [
//     {
//         text: 'Payme payment',
//         value: 'PAYME_PAYMENT',
//     },
//     {
//         text: 'Payme confirm',
//         value: 'PAYME_CONFIRM',
//     },
//     {
//         text: 'Payme status',
//         value: 'PAYME_STATUS',
//     },
//     {
//         text: 'Click payment',
//         value: 'CLICK_PAYMENT',
//     },
//     {
//         text: 'Click confirm',
//         value: 'CLICK_CONFIRM',
//     },
//     {
//         text: 'Uzum payment',
//         value: 'APELSIN_PAYMENT',
//     },
//     {
//         text: 'Uzum confirm',
//         value: 'APELSIN_CONFIRM',
//     },
//     {
//         text: 'Uzum reversal',
//         value: 'APELSIN_REVERSAL',
//     },
//     {
//         text: 'Uzum partial canceled',
//         value: 'APELSIN_PARTIAL_CANCELLED',
//     },
//     {
//         text: 'Anor payment',
//         value: 'ANOR_PAYMENT',
//     },
//     {
//         text: 'Anor confirm',
//         value: 'ANOR_FISCAL',
//     },
//     {
//         text: 'Anor status',
//         value: 'ANOR_STATUS',
//     },
//     {
//         text: 'Anor cancel',
//         value: 'ANOR_CANCEL',
//     }
// ]

export const log_types = [
    {
        text: 'Payme',
        value: 'PAYME',
        children: [
            {
                text: 'Payme payment',
                value: 'PAYME_PAYMENT',
            },
            {
                text: 'Confirm',
                value: 'PAYME_CONFIRM',
            },
            {
                text: 'Status',
                value: 'PAYME_STATUS',
            },
        ]
    },
    {
        text: 'Click',
        value: 'CLICK',
        children: [
            {
                text: 'Click payment',
                value: 'CLICK_PAYMENT',
            },
            {
                text: 'Click confirm',
                value: 'CLICK_CONFIRM',
            },
        ]
    },
    {
        text: 'Uzum',
        value: 'APELSIN',
        children: [
            {
                text: 'Uzum payment',
                value: 'APELSIN_PAYMENT',
            },
            {
                text: 'Uzum confirm',
                value: 'APELSIN_CONFIRM',
            },
            {
                text: 'Uzum reversal',
                value: 'APELSIN_REVERSAL',
            },
            {
                text: 'Uzum partial canceled',
                value: 'APELSIN_PARTIAL_CANCELLED',
            },
        ]
    },
    {
        text: 'Anor',
        value: 'ANOR',
        children: [
            {
                text: 'Anor payment',
                value: 'ANOR_PAYMENT',
            },
            {
                text: 'Anor confirm',
                value: 'ANOR_FISCAL',
            },
            {
                text: 'Anor status',
                value: 'ANOR_STATUS',
            },
            {
                text: 'Anor cancel',
                value: 'ANOR_CANCEL',
            }
        ]
    },
]


export const status_types = [
    {
        text: 'Success',
        value: true
    },
    {
        text: 'Failure',
        value: false
    }
]
