export function ConvertLogsPaymentProvider(provider) {
    let firstPart = provider.split('_')[0];

    if ('PAYME'.includes(firstPart)) {
        return 'PayMe';
    } else if ('CLICK'.includes(firstPart)) {
        return 'Click';
    } else if ('UZUM'.includes(firstPart) || 'ALEPSIN'.includes(firstPart)) {
        return 'Uzum';
    } else if ('ANOR'.includes(firstPart)) {
        return 'Anor';
    } else {
        return null;
    }
}

